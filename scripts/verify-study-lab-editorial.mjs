import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const appRoot = resolve(repositoryRoot, "public", "ai-certification-study-lab");
const configContext = { window: {} };
runInNewContext(readFileSync(resolve(appRoot, "config.js"), "utf8"), configContext);
const config = configContext.window.STUDY_CONFIG;
const errors = [];
const allowedHosts = new Set([
  "www.pearsonvue.com",
  "www.anthropic.com",
  "anthropic.com",
  "anthropic-partners.skilljar.com",
  "platform.claude.com"
]);

for (const source of config.sources) {
  let hostname;
  try {
    hostname = new URL(source.url).hostname;
  } catch {
    errors.push(`Fonte con URL non valido: ${source.id}`);
    continue;
  }
  if (!allowedHosts.has(hostname)) errors.push(`Fonte non ufficiale/non consentita: ${source.id}`);
}

for (const question of config.questions) {
  const declaration = question.originalContentDeclaration;
  const declarationIsSafe = declaration.isOriginal === true &&
    declaration.authorConfirmed === true &&
    declaration.basedOnExamRecall === false &&
    declaration.basedOnExamDump === false &&
    declaration.basedOnRestrictedMaterial === false &&
    typeof declaration.reviewerConfirmed === "boolean";
  if (!declarationIsSafe) errors.push(`Dichiarazione di originalità non valida: ${question.id}`);

  if (question.status === "PUBLISHED") {
    const hasAuthorizedPublicSource = question.sourceAuthorizationVerified === true &&
      question.sourceIds.some((id) => config.sources.some((source) => source.id === id && source.status === "VERIFIED"));
    const publishable = declaration.reviewerConfirmed === true &&
      question.originalityChecked === true &&
      question.technicalAccuracyChecked === true &&
      question.sourceReproductionChecked === true &&
      question.containsSubstantialSourceReproduction === false &&
      hasAuthorizedPublicSource;
    if (!publishable) errors.push(`Domanda pubblicata senza tutti i controlli: ${question.id}`);
  }
}

const html = readFileSync(resolve(appRoot, "index.html"), "utf8");
const app = readFileSync(resolve(appRoot, "app.js"), "utf8");
if (/<form\b|<input\b[^>]*type=["']file/i.test(html)) errors.push("Trovato un form o upload file nella UI statica.");
if (/\b(FormData|XMLHttpRequest|fetch\s*\(|sendBeacon|upload)\b/i.test(app)) errors.push("Trovata una API di invio o upload nell'app statica.");
if (config.commercial.salesEnabled || config.commercial.registrationEnabled) {
  errors.push("Vendita o registrazione non sono disabilitate.");
}

const resolvedIds = new Set(config.launchBlockers.filter((blocker) => blocker.status === "RESOLVED").map((blocker) => blocker.id));
for (const required of ["EXAM_DUMP_PREVENTION_NOT_VERIFIED", "OFFICIAL_CONTENT_ACCESS_RESTRICTIONS_NOT_VERIFIED"]) {
  if (!resolvedIds.has(required)) errors.push(`Controllo statico atteso non risolto: ${required}`);
}

if (errors.length) {
  console.error(errors.map((error) => `FAIL: ${error}`).join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Editorial safeguards verified. ${config.questions.length} questions remain unpublished; ${resolvedIds.size} implementation blockers resolved.`);
}
