/* Versioned product and certification facts. Null means the value is not verified. */
window.STUDY_CONFIG = {
  configVersion: "1.0.0",
  commercialName: "AI Certification Study Lab",
  certification: {
    name: "Claude Certified Associate – Foundations",
    code: "CCAO-F",
    version: null,
    availability: {
      value: null,
      status: "UNVERIFIED"
    },
    status: "UNVERIFIED",
    examGuideVersion: null,
    examGuideStatus: "UNVERIFIED",
    domains: [],
    objectives: [],
    weightsPercent: null,
    durationMinutes: null,
    questionCount: null,
    languages: [],
    languageStatus: "UNVERIFIED",
    accessRequirements: {
      status: "UNVERIFIED",
      knownProgramStatement: "Pearson VUE dichiara che il programma di certificazione Claude è aperto alle organizzazioni del Claude Partner Network. L'applicabilità specifica a CCAO-F non è verificata.",
      sourceIds: ["pearson-claude-program"]
    },
    geographicLimitations: {
      status: "UNVERIFIED",
      value: null
    },
    organizationalLimitations: {
      status: "UNVERIFIED",
      value: null
    },
    lastVerifiedAt: "2026-10-15"
  },
  disclaimerStatus: "LEGAL_REVIEW_REQUIRED",
  commercial: {
    salesEnabled: false,
    registrationEnabled: false,
    eligibilitySelfDeclarationRequired: true,
    eligibilityNotice: "Pearson VUE descrive l'accesso al programma di certificazione Claude per le organizzazioni del Claude Partner Network. Non presumere che chiunque possa sostenere l'esame: l'idoneità individuale e quella per CCAO-F non sono verificate. Prima di qualsiasi eventuale registrazione o acquisto, verifica autonomamente la tua idoneità. Questa piattaforma non la verifica."
  },
  sources: [
    {
      id: "pearson-claude-program",
      title: "Claude Certification Program by Anthropic",
      url: "https://www.pearsonvue.com/us/en/anthropic.html",
      publisher: "Pearson VUE",
      checkedAt: "2026-10-15",
      examGuideVersion: null,
      status: "VERIFIED",
      supports: [
        "Pearson VUE descrive un Claude Certification Program con ruoli Practitioner, Architect e Developer.",
        "Pearson VUE dichiara che la certificazione è aperta alle organizzazioni del Claude Partner Network e che la formazione Academy è riservata ai membri della rete.",
        "La pagina riporta le procedure generali di prenotazione e ripetizione per il programma, ma non collega tali regole al titolo/codice CCAO-F richiesto."
      ]
    },
    {
      id: "anthropic-partner-network-2026",
      title: "Introducing the Claude Partner Network",
      url: "https://www.anthropic.com/news/claude-partner-network",
      publisher: "Anthropic",
      checkedAt: "2026-10-15",
      examGuideVersion: null,
      status: "VERIFIED",
      supports: [
        "Anthropic descrive il Claude Partner Network come programma per organizzazioni partner.",
        "Anthropic nomina la prima certificazione tecnica come Claude Certified Architect, Foundations, disponibile per i partner; l'articolo non conferma Associate – Foundations o CCAO-F."
      ]
    },
    {
      id: "anthropic-partner-academy-architect-foundations",
      title: "Claude Certified Architect – Foundations Certification",
      url: "https://anthropic-partners.skilljar.com/claude-certified-architect-foundations-certification",
      publisher: "Anthropic Partner Academy",
      checkedAt: "2026-10-15",
      examGuideVersion: null,
      status: "VERIFIED",
      supports: [
        "La pagina pubblica della Partner Academy identifica la certificazione come Claude Certified Architect – Foundations e ne descrive contenuti tecnici.",
        "La pagina non conferma Associate – Foundations né il codice CCAO-F."
      ]
    },
    {
      id: "anthropic-services-track-2026",
      title: "Claude Partner Network Services Track and Partner Hub",
      url: "https://www.anthropic.com/news/services-track-partner-hub",
      publisher: "Anthropic",
      checkedAt: "2026-10-15",
      examGuideVersion: null,
      status: "VERIFIED",
      supports: [
        "Anthropic descrive i requisiti del Services Track per le organizzazioni e indica che gli esami di certificazione sono disponibili tramite Anthropic Partner Academy.",
        "La pagina non conferma il titolo o il codice CCAO-F."
      ]
    },
    {
      id: "anthropic-prompt-engineering",
      title: "Prompt engineering overview",
      url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview",
      publisher: "Documentazione pubblica Anthropic",
      checkedAt: "2026-10-15",
      examGuideVersion: null,
      status: "VERIFIED",
      supports: [
        "Prima dell'ottimizzazione dei prompt, definire criteri di successo, modi empirici di test e una prima bozza.",
        "Non tutti i problemi si risolvono modificando il prompt."
      ]
    },
    {
      id: "anthropic-evaluation-guide",
      title: "Define success criteria and build evaluations",
      url: "https://platform.claude.com/docs/en/test-and-evaluate/develop-tests",
      publisher: "Documentazione pubblica Anthropic",
      checkedAt: "2026-10-15",
      examGuideVersion: null,
      status: "VERIFIED",
      supports: [
        "La guida tratta la definizione di criteri misurabili e la valutazione dei risultati di sistemi basati su Claude."
      ]
    }
  ],
  examFactEvidence: [
    {
      field: "Nome della certificazione",
      value: "Claude Certified Associate – Foundations",
      status: "UNVERIFIED",
      detail: "Le fonti consultate non confermano il titolo richiesto.",
      sourceIds: ["pearson-claude-program", "anthropic-partner-network-2026", "anthropic-partner-academy-architect-foundations"]
    },
    {
      field: "Codice",
      value: "CCAO-F",
      status: "UNVERIFIED",
      detail: "Il codice non è presente nelle fonti pubbliche consultate.",
      sourceIds: ["pearson-claude-program", "anthropic-partner-network-2026", "anthropic-partner-academy-architect-foundations"]
    },
    {
      field: "Versione della certificazione",
      value: null,
      status: "UNVERIFIED",
      detail: "Non è stata trovata una versione pubblica riferibile al titolo/codice richiesto.",
      sourceIds: ["pearson-claude-program", "anthropic-partner-network-2026", "anthropic-partner-academy-architect-foundations"]
    },
    {
      field: "Disponibilità della certificazione richiesta",
      value: null,
      status: "UNVERIFIED",
      detail: "Le fonti ufficiali descrivono il programma Claude e la certificazione Architect Foundations, ma non confermano Associate – Foundations / CCAO-F.",
      sourceIds: ["pearson-claude-program", "anthropic-partner-network-2026", "anthropic-partner-academy-architect-foundations"]
    },
    {
      field: "Versione Exam Guide",
      value: null,
      status: "UNVERIFIED",
      detail: "Non è stato verificato un Exam Guide pubblico per il titolo/codice richiesto.",
      sourceIds: ["pearson-claude-program", "anthropic-partner-network-2026"]
    },
    {
      field: "Domini, obiettivi e pesi",
      value: null,
      status: "UNVERIFIED",
      detail: "Blueprint e obiettivi d'esame non verificati.",
      sourceIds: ["pearson-claude-program", "anthropic-partner-network-2026"]
    },
    {
      field: "Durata e numero quesiti",
      value: null,
      status: "UNVERIFIED",
      detail: "Dati non pubblicati nelle pagine consultate; nessun valore ipotizzato.",
      sourceIds: ["pearson-claude-program"]
    },
    {
      field: "Lingue dell'esame",
      value: null,
      status: "UNVERIFIED",
      detail: "Lingue disponibili non verificate; la lingua della pagina non è un'indicazione d'esame.",
      sourceIds: ["pearson-claude-program"]
    },
    {
      field: "Requisiti di accesso e idoneità",
      value: "Programma Claude: aperto alle organizzazioni del Claude Partner Network",
      status: "UNVERIFIED",
      detail: "L'applicabilità specifica a CCAO-F e i requisiti per il singolo candidato non sono verificati.",
      sourceIds: ["pearson-claude-program", "anthropic-partner-network-2026"]
    },
    {
      field: "Limitazioni territoriali",
      value: null,
      status: "UNVERIFIED",
      detail: "Limitazioni territoriali per il titolo richiesto non verificate.",
      sourceIds: ["pearson-claude-program"]
    },
    {
      field: "Limitazioni organizzative",
      value: "Il programma Pearson VUE è descritto come riservato alle organizzazioni del Claude Partner Network",
      status: "UNVERIFIED",
      detail: "La limitazione per il programma generale è pubblicata; le condizioni specifiche per CCAO-F non sono verificate.",
      sourceIds: ["pearson-claude-program", "anthropic-partner-network-2026", "anthropic-services-track-2026"]
    }
  ],
  launchBlockers: [
    { id: "CERTIFICATION_VERSION_NOT_VERIFIED", status: "OPEN", detail: "Il titolo e il codice richiesti non sono confermati dalle fonti pubbliche consultate." },
    { id: "OFFICIAL_EXAM_GUIDE_NOT_VERIFIED", status: "OPEN", detail: "Non è stato verificato un Exam Guide pubblico per CCAO-F." },
    { id: "EXAM_BLUEPRINT_NOT_VERIFIED", status: "OPEN", detail: "Domini, obiettivi e pesi dell'esame non risultano verificati." },
    { id: "EXAM_ACCESS_REQUIREMENTS_NOT_VERIFIED", status: "OPEN", detail: "I requisiti specifici di accesso all'esame CCAO-F non sono verificati." },
    { id: "TARGET_MARKET_ELIGIBILITY_NOT_VERIFIED", status: "OPEN", detail: "Non è verificato chi possa sostenere la specifica certificazione; il programma Pearson è descritto come riservato alle organizzazioni del Claude Partner Network." },
    { id: "PARTNER_NETWORK_RESTRICTIONS_NOT_VERIFIED", status: "OPEN", detail: "Applicabilità e condizioni della rete per il titolo richiesto non verificate." },
    { id: "ANTHROPIC_TRADEMARK_REVIEW_MISSING", status: "OPEN", detail: "Revisione dei marchi e della presentazione commerciale da svolgere." },
    { id: "CERTIFICATION_NAME_USAGE_REVIEW_MISSING", status: "OPEN", detail: "Revisione dell'uso del nome della certificazione da svolgere." },
    { id: "DISCLAIMER_LEGAL_REVIEW_MISSING", status: "OPEN", detail: "Disclaimer contrassegnato LEGAL_REVIEW_REQUIRED." },
    { id: "CONTENT_ORIGINALITY_REVIEW_MISSING", status: "OPEN", detail: "Revisione editoriale e di originalità da completare prima della pubblicazione dei quesiti." },
    {
      id: "EXAM_DUMP_PREVENTION_NOT_VERIFIED",
      status: "RESOLVED",
      detail: "Per questa anteprima statica sono assenti input, upload e invio di contenuti degli utenti; tutte le domande restano DRAFT e la pubblicazione richiede i controlli editoriali.",
      resolvedAt: "2026-10-15",
      resolution: "Verificato da scripts/verify-editorial-guard.mjs. Non abilita contenuti futuri o nuovi processi di authoring senza nuova revisione."
    },
    {
      id: "OFFICIAL_CONTENT_ACCESS_RESTRICTIONS_NOT_VERIFIED",
      status: "RESOLVED",
      detail: "Il catalogo contiene solo riferimenti e sintesi originali di pagine pubbliche ufficiali; non sono incorporati materiali, screenshot o corsi riservati.",
      resolvedAt: "2026-10-15",
      resolution: "Verificato da scripts/verify-editorial-guard.mjs. Ogni nuova fonte o contenuto richiede verifica separata."
    }
  ],
  lessons: [
    {
      id: "clear-prompts",
      number: "01",
      title: "Dai contesto e definisci il risultato",
      category: "PROMPTING",
      duration: "6 min",
      summary: "Un prompt utile chiarisce il compito, il contesto e la forma della risposta attesa.",
      objective: "Rendi espliciti l'obiettivo, il pubblico, i vincoli e il formato desiderato.",
      content: [
        "Inizia descrivendo il risultato concreto che ti serve, invece di chiedere genericamente «aiutami».",
        "Aggiungi il contesto necessario, indica i vincoli e chiedi una struttura adatta all'uso previsto.",
        "Se il risultato è ambiguo, chiedi a Claude di esplicitare le ipotesi o di porre domande prima di procedere."
      ],
      sourceIds: ["anthropic-prompt-engineering"]
    },
    {
      id: "review-results",
      number: "02",
      title: "Valuta prima di iterare",
      category: "VALUTAZIONE",
      duration: "7 min",
      summary: "Definisci criteri di qualità e verifica gli output su esempi rappresentativi.",
      objective: "Valuta le risposte rispetto a criteri osservabili, non solo in base a una sensazione.",
      content: [
        "Prima di ottimizzare una richiesta, chiarisci cosa significa «buon risultato» per il tuo caso d'uso.",
        "Prova la richiesta su esempi diversi e confronta le risposte con i criteri stabiliti.",
        "Se il risultato non è adeguato, individua la causa: prompt, contesto, scelta del modello o processo."
      ],
      sourceIds: ["anthropic-prompt-engineering", "anthropic-evaluation-guide"]
    },
    {
      id: "choose-tools",
      number: "03",
      title: "Scegli la funzionalità adatta",
      category: "SCELTA CONSAPEVOLE",
      duration: "5 min",
      summary: "Parti dal bisogno e dai limiti del compito, non dalla funzionalità più complessa.",
      objective: "Scegli un approccio proporzionato al risultato e verifica che sia disponibile nel tuo contesto.",
      content: [
        "Descrivi il lavoro che vuoi completare e quali informazioni Claude deve poter usare.",
        "Verifica disponibilità, limiti e impostazioni dell'ambiente in cui stai utilizzando Claude.",
        "Preferisci il flusso più semplice che soddisfa i criteri; controlla i risultati prima di riutilizzarli."
      ],
      sourceIds: ["anthropic-prompt-engineering"]
    },
    {
      id: "responsible-use",
      number: "04",
      title: "Usa il giudizio umano",
      category: "USO RESPONSABILE",
      duration: "6 min",
      summary: "Tratta l'output come una proposta da controllare, soprattutto quando le conseguenze sono rilevanti.",
      objective: "Riconosci incertezza, errori possibili e necessità di verifica prima di agire.",
      content: [
        "Controlla fatti, calcoli, citazioni e assunzioni prima di condividere o applicare una risposta.",
        "Non inserire informazioni sensibili se non sei autorizzato e non hai verificato le regole del tuo ambiente.",
        "Per decisioni ad alto impatto, coinvolgi una persona competente e segui i processi della tua organizzazione."
      ],
      sourceIds: ["anthropic-prompt-engineering", "anthropic-evaluation-guide"]
    }
  ],
  questions: [
    {
      id: "draft-success-criteria",
      status: "DRAFT",
      type: "single-choice",
      prompt: "Un team vuole rendere più affidabile una richiesta usata ogni giorno. Qual è il passo iniziale più solido?",
      options: [
        "Aggiungere istruzioni sempre più lunghe senza misurare il risultato",
        "Definire criteri di successo e casi di prova rappresentativi",
        "Cambiare modello dopo ogni risposta insoddisfacente",
        "Considerare riuscita la prova quando una risposta sembra convincente"
      ],
      correctOption: 1,
      explanation: "La documentazione pubblica Anthropic consiglia di chiarire i criteri di successo e come testarli prima di ottimizzare il prompt.",
      sourceIds: ["anthropic-prompt-engineering", "anthropic-evaluation-guide"],
      originalityChecked: false,
      technicalAccuracyChecked: false,
      sourceAuthorizationVerified: false,
      sourceReproductionChecked: false,
      containsSubstantialSourceReproduction: null,
      originalContentDeclaration: {
        isOriginal: true,
        basedOnExamRecall: false,
        basedOnExamDump: false,
        basedOnRestrictedMaterial: false,
        authorConfirmed: true,
        reviewerConfirmed: false
      }
    },
    {
      id: "draft-prompt-scope",
      status: "DRAFT",
      type: "single-choice",
      prompt: "Un risultato non soddisfa i criteri stabiliti. Quale approccio aiuta a scegliere il miglior intervento successivo?",
      options: [
        "Verificare la causa del problema prima di modificare prompt, contesto o modello",
        "Ripetere la stessa richiesta finché compare una risposta accettabile",
        "Aggiungere sempre esempi, anche se il problema dipende dalla scelta del modello",
        "Rimuovere i criteri di valutazione per evitare risultati negativi"
      ],
      correctOption: 0,
      explanation: "Non ogni problema è risolvibile con il prompt: valutare la causa evita di intervenire sulla parte sbagliata.",
      sourceIds: ["anthropic-prompt-engineering"],
      originalityChecked: false,
      technicalAccuracyChecked: false,
      sourceAuthorizationVerified: false,
      sourceReproductionChecked: false,
      containsSubstantialSourceReproduction: null,
      originalContentDeclaration: {
        isOriginal: true,
        basedOnExamRecall: false,
        basedOnExamDump: false,
        basedOnRestrictedMaterial: false,
        authorConfirmed: true,
        reviewerConfirmed: false
      }
    }
  ],
  editorialPolicy: {
    publicationRule: "Nessuna domanda può essere pubblicata se deriva direttamente o indirettamente da ricordi dell'esame, exam dump, materiali riservati, corsi riservati o contenuti forniti da candidati dopo l'esame.",
    mustHavePublicAuthorizedSource: true,
    requireSourceAuthorizationReview: true,
    requireOriginalityReview: true,
    requireTechnicalAccuracyReview: true,
    prohibitSubstantialSourceReproduction: true,
    publishOnlyWhenAllChecksPass: true
  }
};
