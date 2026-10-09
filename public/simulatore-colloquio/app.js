const questions = [
  {
    area: "Angular",
    title: "Architettura Angular senior",
    text: "Stai prendendo in carico una piattaforma Angular cresciuta per anni: feature module pesanti, servizi condivisi poco chiari e regressioni frequenti. Come imposteresti una ristrutturazione senza bloccare il delivery?",
    keywords: ["standalone", "lazy", "boundary", "feature", "shared", "dependency", "incrementale", "test", "metriche", "routing"],
    model: [
      "Partirei da una mappa dei bounded context e dei flussi critici, non da un refactor estetico.",
      "Isolerei feature e shared API, introducendo lazy loading o standalone dove riduce accoppiamento reale.",
      "Metterei test di regressione sui percorsi core e metriche su bundle, errori e tempi di delivery.",
      "Procederei per slice verticali, con criteri di uscita chiari e compatibilita mantenuta durante la transizione."
    ],
    depth: "A livello senior conta distinguere modularita tecnica da ownership di dominio. La ristrutturazione deve proteggere il delivery: dependency graph, regole di import, migrazione incrementale, contratti pubblici per le feature e test sui flussi ad alto rischio."
  },
  {
    area: "TypeScript",
    title: "Tipi come contratto",
    text: "Un team usa molti any nei DTO ricevuti dal backend e ha bug ricorrenti in produzione. Come miglioreresti la sicurezza dei tipi senza rallentare troppo il team?",
    keywords: ["unknown", "zod", "schema", "runtime", "dto", "strict", "narrowing", "type guard", "contratto", "api"],
    model: [
      "Sostituirei any con unknown ai confini esterni e validerei i payload prima di usarli.",
      "Allineerei DTO e contratti API con schema runtime o generazione da OpenAPI quando possibile.",
      "Abiliterei strict in modo progressivo, partendo dai moduli piu instabili e dai flussi core.",
      "Misurerei bug evitati e tempo di delivery per mantenere il cambiamento sostenibile."
    ],
    depth: "TypeScript protegge il codice compilato, non garantisce che il JSON runtime sia corretto. Un Tech Lead deve mettere validazione ai boundary, evitare any contagiosi e scegliere tra schema-first, OpenAPI generation o type guard in base a ownership del contratto."
  },
  {
    area: "RxJS",
    title: "Composizione reattiva",
    text: "Una pagina fa molte chiamate HTTP annidate, subscription manuali e memory leak. Come la riscriveresti con RxJS mantenendo leggibile il flusso?",
    keywords: ["switchMap", "combineLatest", "forkJoin", "takeUntil", "async", "shareReplay", "catchError", "unsubscribe", "stream", "cancellazione"],
    model: [
      "Trasformerei le subscription annidate in una pipeline dichiarativa con operatori di flattening corretti.",
      "Userei switchMap per richieste cancellabili, forkJoin o combineLatest quando la semantica lo richiede.",
      "Gestirei errori e loading nello stream, evitando stato sparso e subscribe manuali nei componenti.",
      "Chiuderei le risorse con async pipe, takeUntilDestroyed o pattern equivalente."
    ],
    depth: "La scelta tra switchMap, concatMap, mergeMap ed exhaustMap e una decisione di prodotto: cancellare, serializzare, parallelizzare o ignorare eventi concorrenti. La seniority emerge quando la semantica utente guida l'operatore."
  },
  {
    area: "Signals",
    title: "Signals e change detection",
    text: "Dove useresti Angular Signals in una codebase gia basata su RxJS e dove invece manterresti Observable?",
    keywords: ["signal", "computed", "effect", "observable", "interop", "state", "template", "asincrono", "derived", "change detection"],
    model: [
      "Userei signals per stato locale sincrono, derivazioni pure e binding template molto frequenti.",
      "Manterrei Observable per eventi asincroni, stream multipli, cancellazione e composizione temporale.",
      "Separerei lo stato read-model del componente dai flussi di IO, usando interop solo ai boundary.",
      "Eviterei effect per business logic non controllata: deve restare prevedibile e testabile."
    ],
    depth: "Signals non sostituisce RxJS in blocco. Il punto tecnico e usare signals per reattivita sincrona fine-grained e Observable per flussi temporali. L'interop va centralizzata per non creare un grafo reattivo difficile da ragionare."
  },
  {
    area: "NgRx",
    title: "Store globale o stato locale",
    text: "Il team vuole mettere ogni stato dentro NgRx per standardizzare. Quando sei d'accordo e quando ti opponi?",
    keywords: ["global", "local", "selector", "effect", "entity", "cache", "devtools", "boilerplate", "ownership", "facade"],
    model: [
      "Userei NgRx per stato condiviso, cache, workflow complessi e debug dove il costo e giustificato.",
      "Terrei locale lo stato effimero di UI, form temporanei e dettagli senza riuso cross-feature.",
      "Proteggerei i componenti con facade e selector stabili invece di accoppiarli allo store interno.",
      "La decisione dipende da ownership, complessita del flusso e necessita di tracciabilita."
    ],
    depth: "NgRx e un moltiplicatore: eccellente su flussi condivisi e complessi, costoso su stato banale. Un lead deve evitare sia store anarchico sia centralizzazione dogmatica, definendo criteri ripetibili e una API di feature."
  },
  {
    area: "Micro Frontend",
    title: "Confini organizzativi",
    text: "Un'azienda vuole passare a micro frontend per far lavorare team diversi in autonomia. Quali condizioni verifichi prima di accettare la scelta?",
    keywords: ["team", "ownership", "deploy", "bounded", "contratto", "design system", "governance", "monitoring", "versioning", "indipendente"],
    model: [
      "Verifico se il problema e davvero autonomia di team o solo cattiva modularizzazione del monolite.",
      "Definisco confini di dominio, ownership, contratti, design system e strategia di deploy indipendente.",
      "Valuto costi: performance, versioning, osservabilita, duplicazioni e gestione dei fallback.",
      "Partirei da un pilota su un dominio isolabile, con metriche prima di scalare."
    ],
    depth: "Il micro frontend e una scelta socio-tecnica. Senza ownership autonoma, contratti e pipeline mature aggiunge complessita senza benefici. Il criterio non e la moda architetturale, ma il rapporto tra indipendenza ottenuta e costo operativo."
  },
  {
    area: "Module Federation",
    title: "Runtime integration",
    text: "Con Module Federation, un remote aggiornato rompe la shell in produzione. Come progetti prevenzione, fallback e diagnosi?",
    keywords: ["remote", "shell", "shared", "singleton", "version", "fallback", "contract", "e2e", "monitoring", "rollback"],
    model: [
      "Bloccherei contratti e versioni condivise, evitando singleton incompatibili rilasciati senza governance.",
      "Aggiungerei contract test e smoke E2E tra shell e remote prima del deploy.",
      "Implementerei fallback, feature flag e rollback rapido per remote non caricabili.",
      "Osserverei errori di bootstrap, tempi di caricamento e mismatch di dipendenze in produzione."
    ],
    depth: "Module Federation sposta parte dell'integrazione a runtime. Servono compatibilita esplicita, shared dependencies governate, manifest versionati, fallback UX e test cross-app. Il rischio principale e scoprire l'incompatibilita quando l'utente carica la pagina."
  },
  {
    area: "Testing",
    title: "Strategia di test pragmatica",
    text: "Hai poca copertura, test fragili e pressione sul rilascio. Che strategia imposti per aumentare fiducia senza creare una suite lenta e inutile?",
    keywords: ["pyramid", "unit", "integration", "e2e", "contract", "flaky", "critical", "coverage", "ci", "regression"],
    model: [
      "Partirei dai flussi business critici e dai bug ricorrenti, non da una percentuale astratta.",
      "Distribuirei unit, integration, contract ed E2E in base al rischio e alla velocita di feedback.",
      "Rimuoverei o riscriverei i flaky test, perche una suite non affidabile perde autorita.",
      "Metterei quality gate progressivi in CI con ownership chiara della manutenzione."
    ],
    depth: "La copertura utile e quella che aumenta fiducia decisionale. Un lead deve sapere quali failure devono bloccare il deploy, quali test stanno vicino al codice e quali pochi E2E proteggono i percorsi utente davvero costosi."
  },
  {
    area: "Performance",
    title: "Diagnosi performance frontend",
    text: "Il prodotto segnala che l'app e lenta. Come distingui percezione, rete, rendering, bundle e API prima di proporre fix?",
    keywords: ["lcp", "inp", "cls", "bundle", "profiling", "network", "api", "lazy", "cache", "measure"],
    model: [
      "Prima misuro: Web Vitals, trace browser, network waterfall, bundle analyzer e metriche backend.",
      "Separo startup, navigazione, rendering e interazioni per non ottimizzare il sintomo sbagliato.",
      "Scelgo fix mirati: code splitting, cache, virtualizzazione, change detection o API aggregation.",
      "Concordo budget e monitoraggio continuo, per evitare regressioni dopo il rilascio."
    ],
    depth: "Performance senior significa diagnosi prima della cura. LCP, INP e CLS raccontano problemi diversi; bundle size, main thread, network e backend vanno letti insieme. Ogni ottimizzazione deve avere baseline, target e regressione monitorata."
  },
  {
    area: "Sicurezza",
    title: "Threat model frontend",
    text: "Quali rischi di sicurezza frontend valuti in una SPA enterprise con autenticazione, dati sensibili e integrazioni terze?",
    keywords: ["xss", "csrf", "token", "csp", "storage", "oauth", "sanitize", "dependency", "supply", "pii"],
    model: [
      "Parto da dati, attori e trust boundary: cosa esponiamo, a chi e con quali privilegi.",
      "Mitigo XSS con sanitizzazione, CSP, escaping e riduzione dei punti HTML dinamici.",
      "Tratto token e sessioni con attenzione a storage, refresh, scadenza, CSRF e logout reale.",
      "Controllo dipendenze, script terzi, logging di PII e autorizzazioni lato API."
    ],
    depth: "Il frontend non puo garantire authorization, ma puo amplificare o ridurre il rischio. Token handling, XSS, dipendenze, CSP e leakage di dati sono responsabilita concrete. Le decisioni vanno allineate con backend e security team."
  },
  {
    area: "Accessibilita",
    title: "Accessibilita come requisito",
    text: "Il team tratta l'accessibilita come controllo finale. Come la integri nel processo e quali problemi cerchi in una UI complessa?",
    keywords: ["wcag", "keyboard", "focus", "aria", "semantic", "contrast", "screen reader", "form", "modal", "axe"],
    model: [
      "La porto nei requisiti e nei criteri di accettazione, non come bug bash finale.",
      "Verifico semantica, navigazione tastiera, focus management, contrasto, errori form e modali.",
      "Uso tool automatici come rete di sicurezza, ma testo anche con screen reader e tastiera.",
      "Creo componenti accessibili di design system per non risolvere il problema pagina per pagina."
    ],
    depth: "L'accessibilita e architettura dell'interazione. ARIA non compensa HTML semantico sbagliato, e i tool automatici coprono solo una parte. Focus, tastiera e feedback degli errori sono spesso i punti piu rivelatori."
  },
  {
    area: "Architettura",
    title: "Decisioni reversibili e irreversibili",
    text: "Come documenti e comunichi una decisione architetturale controversa, ad esempio introdurre un design system o cambiare state management?",
    keywords: ["adr", "trade-off", "constraint", "risk", "migration", "stakeholder", "metric", "option", "reversible", "governance"],
    model: [
      "Scrivo una ADR breve con contesto, opzioni, decisione, trade-off, rischi e criteri di revisione.",
      "Distinguo vincoli reali da preferenze tecniche e chiarisco cosa e reversibile.",
      "Coinvolgo stakeholder impattati: frontend, backend, prodotto, design, QA e delivery.",
      "Definisco piano di migrazione, metriche di successo e condizioni per correggere rotta."
    ],
    depth: "Le buone decisioni architetturali non eliminano i trade-off: li rendono visibili. Una ADR utile crea memoria organizzativa e riduce discussioni ricorrenti. Il lead deve collegare tecnica, costo di migrazione e obiettivi di business."
  },
  {
    area: "Autenticazione",
    title: "Auth in SPA",
    text: "Disegna a grandi linee autenticazione e autorizzazione per una SPA Angular con API protette, ruoli e sessioni lunghe. Cosa eviti?",
    keywords: ["oauth", "oidc", "pkce", "refresh", "cookie", "token", "role", "guard", "interceptor", "authorization"],
    model: [
      "Userei OIDC/OAuth con Authorization Code + PKCE e una libreria mantenuta, non flussi custom.",
      "Separerei autenticazione frontend da autorizzazione reale, che deve stare sulle API.",
      "Gestirei refresh, scadenza, interceptor, guard e logout senza salvare token in modo ingenuo.",
      "Eviterei ruoli hardcoded come fonte di verita e dati sensibili nel client."
    ],
    depth: "In una SPA il client e ambiente non fidato. Guard e ruoli migliorano UX, ma non proteggono risorse. Le scelte su cookie, storage, refresh token e PKCE devono seguire threat model, IdP e policy aziendale."
  },
  {
    area: "Leadership",
    title: "Leadership tecnica",
    text: "Un progetto e in ritardo e il team propone scorciatoie che aumentano debito tecnico. Come guidi la decisione?",
    keywords: ["trade-off", "priorita", "rischio", "stakeholder", "debito", "scope", "decisione", "trasparenza", "delivery", "qualita"],
    model: [
      "Rendo espliciti costo, rischio e beneficio delle scorciatoie, senza trasformare tutto in dogma tecnico.",
      "Propongo opzioni: riduzione scope, rilascio progressivo, feature flag o debito con piano di rientro.",
      "Allineo prodotto e stakeholder sulla decisione, perche il rischio non deve restare nascosto nel team.",
      "Proteggo qualita minima su sicurezza, dati e percorsi core anche sotto pressione."
    ],
    depth: "La leadership tecnica non e dire sempre no. E convertire ambiguita in opzioni decisionali, rendere visibili i compromessi e difendere i vincoli non negoziabili. Il debito accettato deve avere owner, scadenza e ragione business."
  },
  {
    area: "Mentoring",
    title: "Far crescere il team",
    text: "Un developer mid produce codice funzionante ma poco manutenibile. Come lo aiuti senza diventare collo di bottiglia nelle review?",
    keywords: ["feedback", "pair", "review", "ownership", "principi", "esempi", "standard", "autonomia", "coaching", "retro"],
    model: [
      "Do feedback specifico sul comportamento del codice, non sulla persona, con esempi prima/dopo.",
      "Uso pairing mirato sui pattern ricorrenti e checklist condivise per ridurre review ripetitive.",
      "Delego ownership progressiva, chiarendo standard e lasciando spazio a decisioni autonome.",
      "Misuro miglioramento da meno rework, PR piu piccole e discussioni piu mature."
    ],
    depth: "Mentoring efficace crea autonomia, non dipendenza dal senior. Pattern library, review rubric, pairing breve e retro tecniche aiutano a trasformare giudizi soggettivi in criteri ripetibili."
  },
  {
    area: "Gestione dei conflitti",
    title: "Conflitto tecnico",
    text: "Due senior sono bloccati su approcci opposti e la discussione sta polarizzando il team. Come intervieni?",
    keywords: ["ascolto", "criteri", "dati", "decisione", "facilitazione", "trade-off", "esperimento", "timebox", "allineamento", "retro"],
    model: [
      "Riporto la discussione da preferenze personali a criteri condivisi e obiettivi del progetto.",
      "Faccio emergere assunzioni, rischi e dati mancanti, poi propongo un esperimento timebox se serve.",
      "Stabilisco chi decide e come, evitando consenso infinito e decisioni passive.",
      "Dopo la scelta, cerco commit esplicito e una retro per migliorare il processo."
    ],
    depth: "Il conflitto tecnico spesso nasconde criteri non esplicitati. Un Tech Lead facilita, non arbitra a gusto: definisce decision framework, raccoglie evidenze, assegna ownership e chiude la decisione con rispetto."
  },
  {
    area: "Stime",
    title: "Stimare in incertezza",
    text: "Ti chiedono una stima per una migrazione Angular complessa con dipendenze non ancora analizzate. Come rispondi?",
    keywords: ["incertezza", "range", "spike", "assunzioni", "rischio", "dipendenze", "milestone", "scope", "buffer", "evidenza"],
    model: [
      "Non darei una data puntuale mascherando incertezza: proporrei un range con assunzioni esplicite.",
      "Farei uno spike breve sulle dipendenze piu rischiose per trasformare ignoti in evidenza.",
      "Spezzerei la migrazione in milestone verificabili, con scope e criteri di completamento.",
      "Aggiornerei la stima man mano che cadono rischi, comunicando confidenza e impatti."
    ],
    depth: "Una buona stima e uno strumento di decisione, non una promessa magica. Range, confidence level, risk register e spike tecnici permettono a prodotto e management di scegliere consapevolmente tra tempo, scope e rischio."
  },
  {
    area: "Backend e prodotto",
    title: "Comunicazione cross-funzionale",
    text: "Frontend, backend e prodotto non sono allineati: API instabili, requisiti che cambiano e UX compromessa. Come rimetti ordine?",
    keywords: ["contratto", "api", "openapi", "mock", "product", "acceptance", "backend", "sync", "priorita", "feedback"],
    model: [
      "Creo un punto di allineamento su obiettivo utente, requisiti accettabili e trade-off di UX.",
      "Formalizzo contratti API con esempi, errori, stati vuoti e versioning, idealmente via OpenAPI.",
      "Uso mock o contract test per disaccoppiare delivery frontend e backend dove possibile.",
      "Mantengo feedback breve e frequente con prodotto, mostrando impatti concreti delle scelte."
    ],
    depth: "Il frontend spesso vede per primo la frizione tra API e UX. Un lead deve tradurre problemi tecnici in impatti prodotto, definire contratti verificabili e ridurre dipendenze bloccanti con mock, esempi e acceptance criteria condivisi."
  }
];

const criteria = [
  { name: "correttezza", keywords: ["perche", "dipende", "trade-off", "misuro", "test", "rischio"] },
  { name: "seniority", keywords: ["ownership", "metriche", "stakeholder", "incrementale", "governance", "confidenza"] },
  { name: "chiarezza", keywords: ["prima", "poi", "quindi", "criteri", "obiettivo", "distinguo"] },
  { name: "concretezza", keywords: ["esempio", "ci", "pipeline", "monitoring", "feature flag", "spike"] },
  { name: "rischi", keywords: ["rischio", "fallback", "rollback", "sicurezza", "performance", "regressione"] },
  { name: "esempi", keywords: ["ad esempio", "esempio", "caso", "scenario", "pr"] },
  { name: "decisione", keywords: ["sceglierei", "decido", "propongo", "eviterei", "priorita", "criterio"] }
];

const state = {
  current: 0,
  scores: []
};

const elements = {
  counter: document.querySelector("#question-counter"),
  area: document.querySelector("#area-label"),
  average: document.querySelector("#average-score"),
  difficulty: document.querySelector("#difficulty-pill"),
  topic: document.querySelector("#topic-pill"),
  title: document.querySelector("#question-title"),
  text: document.querySelector("#question-text"),
  answer: document.querySelector("#answer-input"),
  evaluate: document.querySelector("#evaluate-btn"),
  next: document.querySelector("#next-btn"),
  restart: document.querySelector("#restart-btn"),
  empty: document.querySelector("#feedback-empty"),
  content: document.querySelector("#feedback-content"),
  grade: document.querySelector("#grade-value"),
  strengths: document.querySelector("#strengths-list"),
  gaps: document.querySelector("#gaps-list"),
  model: document.querySelector("#model-answer"),
  depth: document.querySelector("#technical-depth")
};

function normalize(value) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

function countMatches(answer, keywords) {
  const normalized = normalize(answer);
  return keywords.filter((keyword) => normalized.includes(normalize(keyword))).length;
}

function unique(items) {
  return [...new Set(items)];
}

function evaluateAnswer(answer, question) {
  const words = normalize(answer).split(/\s+/).filter(Boolean);
  const topicMatches = countMatches(answer, question.keywords);
  const criterionMatches = criteria.map((criterion) => ({
    name: criterion.name,
    matched: countMatches(answer, criterion.keywords) > 0
  }));
  const matchedCriteria = criterionMatches.filter((criterion) => criterion.matched).length;
  const hasStructure = /(^|\n|\.)\s*(1\.|2\.|3\.|prima|poi|infine|partirei|userei|eviterei)/i.test(answer);
  const hasExample = /esempio|ad esempio|in un caso|scenario|pr\b|progetto/i.test(answer);
  const hasRisk = /rischio|trade-off|fallback|rollback|regressione|sicurezza|performance|accessibil/i.test(answer);
  const hasDecision = /sceglierei|decido|deciderei|propongo|eviterei|priorit/i.test(answer);

  let score = 3;
  score += Math.min(topicMatches, 6) * 0.55;
  score += matchedCriteria * 0.45;
  score += words.length >= 70 ? 0.9 : words.length >= 35 ? 0.45 : 0;
  score += hasStructure ? 0.55 : 0;
  score += hasExample ? 0.55 : 0;
  score += hasRisk ? 0.55 : 0;
  score += hasDecision ? 0.45 : 0;
  score = Math.max(1, Math.min(10, Math.round(score * 10) / 10));

  const strengths = [];
  const gaps = [];

  if (topicMatches >= 4) strengths.push("Buona copertura dei concetti tecnici attesi per l'area.");
  else gaps.push("Mancano alcuni concetti chiave specifici della domanda.");

  if (matchedCriteria >= 5) strengths.push("Risposta bilanciata sui criteri di seniority richiesti.");
  else gaps.push("La risposta non copre ancora tutti i criteri: decisione, rischi, esempi e concretezza.");

  if (hasStructure) strengths.push("Struttura leggibile, utile in un colloquio sotto pressione.");
  else gaps.push("Serve una struttura piu esplicita: contesto, scelta, trade-off, piano.");

  if (hasRisk) strengths.push("Riconosci rischi e trade-off invece di proporre una soluzione assoluta.");
  else gaps.push("I rischi ignorati sono il punto piu debole: regressioni, sicurezza, ownership o rollback.");

  if (hasExample) strengths.push("La presenza di esempi rende la risposta piu credibile.");
  else gaps.push("Aggiungi un esempio reale o una metrica per aumentare concretezza.");

  if (hasDecision) strengths.push("Mostri capacita decisionale e non solo elenco di possibilita.");
  else gaps.push("Chiudi con una scelta motivata: cosa faresti, cosa eviteresti e perche.");

  if (words.length < 35) gaps.push("Risposta troppo breve per un ruolo senior: manca profondita argomentativa.");

  return {
    score,
    strengths: unique(strengths).slice(0, 4),
    gaps: unique(gaps).slice(0, 5)
  };
}

function renderQuestion() {
  const question = questions[state.current];
  elements.counter.textContent = `${state.current + 1} / ${questions.length}`;
  elements.area.textContent = question.area;
  elements.topic.textContent = question.area;
  elements.difficulty.textContent = state.current > 11 ? "Scenario Tech Lead" : "Scenario senior";
  elements.title.textContent = question.title;
  elements.text.textContent = question.text;
  elements.answer.value = "";
  elements.next.disabled = true;
  elements.evaluate.disabled = false;
  elements.empty.classList.remove("hidden");
  elements.content.classList.add("hidden");
  renderAverage();
}

function renderAverage() {
  if (!state.scores.length) {
    elements.average.textContent = "-";
    return;
  }
  const average = state.scores.reduce((sum, score) => sum + score, 0) / state.scores.length;
  elements.average.textContent = `${average.toFixed(1)} / 10`;
}

function renderList(element, items) {
  element.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    element.append(li);
  });
}

function renderFeedback(result, question) {
  elements.empty.classList.add("hidden");
  elements.content.classList.remove("hidden");
  elements.grade.textContent = `${result.score} / 10`;
  renderList(elements.strengths, result.strengths);
  renderList(elements.gaps, result.gaps);
  renderList(elements.model, question.model);
  elements.depth.textContent = question.depth;
}

elements.evaluate.addEventListener("click", () => {
  const answer = elements.answer.value.trim();
  if (!answer) {
    elements.answer.focus();
    elements.answer.placeholder = "Scrivi almeno una risposta breve prima della valutazione.";
    return;
  }

  const question = questions[state.current];
  const result = evaluateAnswer(answer, question);
  state.scores[state.current] = result.score;
  renderFeedback(result, question);
  renderAverage();
  elements.next.disabled = state.current >= questions.length - 1;
  elements.evaluate.disabled = true;
});

elements.next.addEventListener("click", () => {
  if (state.current < questions.length - 1) {
    state.current += 1;
    renderQuestion();
    elements.answer.focus();
  }
});

elements.restart.addEventListener("click", () => {
  state.current = 0;
  state.scores = [];
  renderQuestion();
});

renderQuestion();