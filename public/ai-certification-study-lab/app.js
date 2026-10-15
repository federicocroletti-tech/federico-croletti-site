(function () {
  "use strict";

  const config = window.STUDY_CONFIG;
  const main = document.getElementById("main-content");
  const labels = {
    overview: "Panoramica",
    path: "Percorso di studio",
    simulator: "Simulatore",
    evidence: "Fonti e verifica",
    editorial: "Standard editoriale"
  };
  const sourceById = Object.fromEntries(config.sources.map((source) => [source.id, source]));
  const savedProgress = readProgress();

  document.title = config.commercialName;
  document.querySelectorAll("[data-commercial-name]").forEach((element) => {
    element.textContent = config.commercialName;
  });
  document.querySelectorAll("[data-code]").forEach((element) => {
    element.textContent = config.certification.code;
  });

  document.addEventListener("click", (event) => {
    const viewButton = event.target.closest("[data-view]");
    if (viewButton) {
      event.preventDefault();
      showView(viewButton.dataset.view);
      return;
    }
    const lessonButton = event.target.closest("[data-lesson]");
    if (lessonButton) {
      showLesson(lessonButton.dataset.lesson);
      return;
    }
    const completeButton = event.target.closest("[data-complete]");
    if (completeButton) {
      toggleComplete(completeButton.dataset.complete);
      return;
    }
    const backButton = event.target.closest("[data-back]");
    if (backButton) showView("path");
  });

  document.addEventListener("change", (event) => {
    if (event.target.id !== "eligibility-acknowledgement") return;
    try {
      localStorage.setItem("study-lab-eligibility-acknowledged", String(event.target.checked));
    } catch (error) {
      console.warn("Impossibile salvare la dichiarazione di idoneità nel browser.", error);
    }
  });

  function readProgress() {
    try {
      const value = JSON.parse(localStorage.getItem("study-lab-progress") || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      console.warn("Impossibile leggere i progressi salvati localmente.", error);
      return [];
    }
  }

  function writeProgress() {
    try {
      localStorage.setItem("study-lab-progress", JSON.stringify(savedProgress));
    } catch (error) {
      console.warn("Impossibile salvare i progressi di studio nel browser.", error);
    }
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function showView(view) {
    if (!Object.prototype.hasOwnProperty.call(labels, view)) return;
    document.querySelectorAll(".nav-item").forEach((item) => {
      item.classList.toggle("active", item.dataset.view === view);
    });
    document.getElementById("breadcrumb-current").textContent = labels[view];
    const renderers = {
      overview: renderOverview,
      path: renderPath,
      simulator: renderSimulator,
      evidence: renderEvidence,
      editorial: renderEditorial
    };
    main.innerHTML = renderers[view]();
    main.focus({ preventScroll: true });
  }

  function renderHeading(eyebrow, title, description, action) {
    return `<div class="page-heading"><div><p class="eyebrow">${eyebrow}</p><h1>${title}</h1><p>${description}</p></div>${action || ""}</div>`;
  }

  function renderEligibilityNotice() {
    let acknowledged = false;
    try {
      acknowledged = localStorage.getItem("study-lab-eligibility-acknowledged") === "true";
    } catch (error) {
      console.warn("Impossibile leggere la dichiarazione di idoneità nel browser.", error);
    }
    return `<div class="notice"><span class="notice-icon">!</span><div><strong>Accesso e idoneità: verifica prima di registrarti o acquistare</strong><p>${escapeHtml(config.commercial.eligibilityNotice)} La certificazione specifica richiesta non è stata confermata; non è attiva alcuna registrazione o vendita.</p><label class="eligibility-check"><input id="eligibility-acknowledgement" type="checkbox" ${acknowledged ? "checked" : ""}> Dichiaro di aver verificato autonomamente la mia idoneità. Questa dichiarazione non è verificata dalla piattaforma e non abilita registrazione o acquisto.</label></div></div>`;
  }

  function renderLessonCard(lesson) {
    const complete = savedProgress.includes(lesson.id);
    return `<article class="lesson-card"><div class="lesson-top"><span class="lesson-number">${lesson.number} · ${lesson.category}</span><span class="lesson-duration">${lesson.duration}</span></div><h3>${escapeHtml(lesson.title)}</h3><p>${escapeHtml(lesson.summary)}</p><button class="lesson-link" type="button" data-lesson="${lesson.id}">${complete ? "Rivedi il modulo ↗" : "Apri il modulo ↗"}</button></article>`;
  }

  function renderOverview() {
    const completedCount = savedProgress.length;
    return `${renderHeading("IL TUO PERCORSO", "Impara con metodo, verifica i fatti.", "Un percorso pratico e indipendente per usare Claude con chiarezza e giudizio.")}<section class="hero"><div class="hero-copy"><p class="eyebrow">PREPARAZIONE PRATICA · CONTENUTI ORIGINALI</p><h1>Competenze utili.<br>Informazioni trasparenti.</h1><p>Studia prompting, valutazione critica e uso responsabile dell’AI. La corrispondenza con la certificazione indicata resta da verificare: nessun contenuto viene presentato come blueprint ufficiale.</p><div class="hero-actions"><button class="button" type="button" data-view="path">Inizia il percorso <span>→</span></button><button class="button secondary" type="button" data-view="evidence">Controlla le fonti</button></div></div><div class="hero-aside">STUDIO<br><span>01—04</span>MODULI</div></section>${renderEligibilityNotice()}<section class="metrics"><div class="metric-card"><div class="metric-top">Obiettivi d'esame verificati <span class="metric-icon">◎</span></div><div class="metric-value">0 <small>da fonte ufficiale</small></div></div><div class="metric-card"><div class="metric-top">Blocchi di lancio aperti <span class="metric-icon">!</span></div><div class="metric-value">${config.launchBlockers.filter((blocker) => blocker.status === "OPEN").length} <small>da risolvere</small></div></div><div class="metric-card"><div class="metric-top">Quiz pubblicati <span class="metric-icon">✓</span></div><div class="metric-value">0 <small>in attesa di revisione</small></div></div></section><div class="section-heading"><h2>Il percorso di studio</h2><button class="text-link" type="button" data-view="path">Vedi tutti i moduli →</button></div><section class="cards-grid">${config.lessons.slice(0, 2).map(renderLessonCard).join("")}</section><div class="progress-card"><div class="progress-row"><span>Il tuo avanzamento</span><strong>${completedCount} di ${config.lessons.length} moduli completati</strong></div><div class="progress-track"><div class="progress-fill" style="width:${Math.round((completedCount / config.lessons.length) * 100)}%"></div></div></div>`;
  }

  function renderPath() {
    const completedCount = savedProgress.length;
    return `${renderHeading("PERCORSO DIDATTICO", "Costruisci competenze riutilizzabili.", "Quattro moduli brevi. Contenuti di studio generali, non dichiarati come obiettivi ufficiali dell'esame.", `<span class="tag">${completedCount}/${config.lessons.length} COMPLETATI</span>`)}<section class="cards-grid">${config.lessons.map(renderLessonCard).join("")}</section><div class="policy-callout">Questi contenuti didattici sono indipendenti. Domini, obiettivi e pesi della certificazione non sono stati verificati e non vengono dedotti o inventati.</div>`;
  }

  function showLesson(id) {
    const lesson = config.lessons.find((item) => item.id === id);
    if (!lesson) return;
    document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === "path"));
    document.getElementById("breadcrumb-current").textContent = "Percorso di studio";
    const sources = lesson.sourceIds.map((sourceId) => sourceById[sourceId]).filter(Boolean);
    main.innerHTML = `${renderHeading(`MODULO ${lesson.number} · ${lesson.category}`, lesson.title, lesson.summary, `<button class="button secondary" type="button" data-back>← Torna ai moduli</button>`)}<article class="lesson-detail"><span class="tag">${lesson.duration} · STUDIO PRATICO</span><h2>${escapeHtml(lesson.objective)}</h2><p class="lead">Applica questi principi al tuo lavoro quotidiano. L'esercizio è didattico e non rappresenta una domanda o un obiettivo d'esame verificato.</p><ol>${lesson.content.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}</ol><div class="source-note"><strong>Fonti pubbliche consultate</strong><br>${sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a> · verificata il ${source.checkedAt}`).join("<br>")}</div><div class="completion-row"><span class="tag ${savedProgress.includes(lesson.id) ? "verified" : ""}">${savedProgress.includes(lesson.id) ? "COMPLETATO" : "NON COMPLETATO"}</span><button class="button" type="button" data-complete="${lesson.id}">${savedProgress.includes(lesson.id) ? "Segna come da ripassare" : "Segna come completato"}</button></div></article>`;
    main.focus({ preventScroll: true });
  }

  function toggleComplete(id) {
    const index = savedProgress.indexOf(id);
    if (index === -1) savedProgress.push(id);
    else savedProgress.splice(index, 1);
    writeProgress();
    showLesson(id);
  }

  function renderSimulator() {
    const drafts = config.questions.filter((question) => !canPublishQuestion(question));
    const published = config.questions.filter(canPublishQuestion);
    return `${renderHeading("ESERCITATI", "Simulatore di pratica", "Una simulazione d'esame richiede un blueprint verificato e quesiti che abbiano superato la revisione editoriale.")}${renderEligibilityNotice()}<section class="simulator-empty"><div class="empty-symbol">◷</div><span class="tag open">NON DISPONIBILE · BLOCCO DI LANCIO</span><h2>La simulazione non è ancora attiva</h2><p>Non possiamo associare i quiz a una certificazione non verificata. Le domande in bozza restano escluse dall'esperienza di pratica finché non superano tutti i controlli editoriali e di accuratezza.</p><button class="button secondary" type="button" data-view="evidence">Consulta verifica e blocchi <span>→</span></button><div class="simulator-meta"><span class="tag">${drafts.length} bozze non pubblicate</span><span class="tag">${published.length} domande pubblicate</span><span class="tag">Durata e numero quesiti UNVERIFIED</span></div></section><p class="page-footer-note">Nessuna domanda autentica o ricostruita da esami viene usata. Non inviare domande ricordate o materiali riservati.</p>`;
  }

  function renderEvidence() {
    const openBlockerCount = config.launchBlockers.filter((blocker) => blocker.status === "OPEN").length;
    return `${renderHeading("REGISTRO DELLE EVIDENZE", "Prima le fonti. Poi le affermazioni.", `Verifica ufficiale effettuata il ${config.certification.lastVerifiedAt}. Ogni dato relativo all'esame resta collegato alla fonte e al suo stato.`)}${renderEligibilityNotice()}<div class="section-heading"><h2>Stato dei dati di certificazione</h2><span class="tag open">EXAM GUIDE: UNVERIFIED</span></div><div style="overflow-x:auto"><table class="fact-table"><thead><tr><th>Dato</th><th>Valore registrato</th><th>Fonte, verifica e stato</th></tr></thead><tbody>${config.examFactEvidence.map(renderExamFact).join("")}</tbody></table></div><div class="section-heading"><h2>Fonti ufficiali e pubbliche</h2><span class="tag">VERIFICATE IL 15 OTT 2026</span></div><div class="source-cards">${config.sources.slice(0, 4).map(renderSourceCard).join("")}</div><div class="section-heading"><h2>Blocchi che impediscono il lancio</h2><span class="tag open">${openBlockerCount} APERTI · ${config.launchBlockers.length - openBlockerCount} RISOLTI</span></div><div class="blocker-list">${config.launchBlockers.map(renderBlocker).join("")}</div>`;
  }

  function renderExamFact(fact) {
    const value = fact.value === null ? "Non verificato" : fact.value;
    const sources = fact.sourceIds.map((id) => sourceById[id]).filter(Boolean);
    const evidence = sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a> · ${source.checkedAt} · Exam Guide: ${source.examGuideVersion || "UNVERIFIED"}`).join("<br>");
    return `<tr><td>${escapeHtml(fact.field)}</td><td>${escapeHtml(value)}<br><span class="page-footer-note">${escapeHtml(fact.detail)}</span></td><td><span class="tag ${fact.status === "VERIFIED" ? "verified" : "open"}">${fact.status}</span><br><span class="page-footer-note">${evidence || "Nessuna fonte registrata"}</span></td></tr>`;
  }

  function renderSourceCard(source) {
    return `<article class="source-card"><div class="source-card-top"><div><h3>${escapeHtml(source.title)}</h3><small>${escapeHtml(source.publisher)} · verificata ${source.checkedAt} · Exam Guide: ${source.examGuideVersion || "UNVERIFIED"}</small></div><span class="tag verified">${source.status}</span></div><p>${source.supports.map(escapeHtml).join(" ")}</p><p><a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.url)}</a></p></article>`;
  }

  function renderBlocker(blocker) {
    return `<article class="blocker-row"><span class="status-dot ${blocker.status === "RESOLVED" ? "resolved-dot" : ""}"></span><div><strong>${escapeHtml(blocker.id)}</strong><p>${escapeHtml(blocker.detail)}${blocker.resolution ? `<br><strong>Risoluzione:</strong> ${escapeHtml(blocker.resolution)} · ${blocker.resolvedAt}` : ""}</p></div><span class="tag ${blocker.status.toLowerCase()}">${blocker.status}</span></article>`;
  }

  function publicationCheck(question) {
    const declaration = question.originalContentDeclaration;
    const sourcePass = question.sourceIds.some((id) => sourceById[id] && sourceById[id].status === "VERIFIED");
    return [
      ["Autore conferma l'originalità", declaration.authorConfirmed],
      ["Revisore conferma l'originalità", declaration.reviewerConfirmed],
      ["Esclusi ricordi, dump e materiali riservati", declaration.isOriginal && !declaration.basedOnExamRecall && !declaration.basedOnExamDump && !declaration.basedOnRestrictedMaterial],
      ["Fonte pubblica autorizzata collegata", sourcePass],
      ["Autorizzazione all'uso della fonte verificata", question.sourceAuthorizationVerified === true],
      ["Originalità verificata", question.originalityChecked],
      ["Accuratezza tecnica verificata", question.technicalAccuracyChecked],
      ["Revisione del testo fonte completata", question.sourceReproductionChecked === true],
      ["Nessuna riproduzione sostanziale della fonte", question.containsSubstantialSourceReproduction === false]
    ].map(([label, pass]) => `<li><span>${pass ? "✓" : "○"}</span>${label}</li>`).join("") + `<li><span>${passesPublicationRequirements(question) ? "✓" : "○"}</span>Requisiti di pubblicazione soddisfatti</li>`;
  }

  function passesPublicationRequirements(question) {
    const declaration = question.originalContentDeclaration;
    const hasPublicAuthorizedSource = question.sourceAuthorizationVerified === true &&
      question.sourceIds.some((id) => sourceById[id] && sourceById[id].status === "VERIFIED");
    return declaration.isOriginal === true &&
      declaration.authorConfirmed === true &&
      declaration.reviewerConfirmed === true &&
      declaration.basedOnExamRecall === false &&
      declaration.basedOnExamDump === false &&
      declaration.basedOnRestrictedMaterial === false &&
      hasPublicAuthorizedSource &&
      question.originalityChecked === true &&
      question.technicalAccuracyChecked === true &&
      question.sourceReproductionChecked === true &&
      question.containsSubstantialSourceReproduction === false;
  }

  function canPublishQuestion(question) {
    return question.status === "PUBLISHED" && passesPublicationRequirements(question);
  }

  function renderDraft(question) {
    const sources = question.sourceIds.map((id) => sourceById[id]).filter(Boolean);
    return `<article class="draft-card"><div class="source-card-top"><span class="tag draft">${question.status === "PUBLISHED" ? "PUBLISHED · BLOCCATA" : question.status}</span><span class="tag">${question.type === "single-choice" ? "RISPOSTA SINGOLA" : escapeHtml(question.type)}</span></div><h3>${escapeHtml(question.prompt)}</h3><details><summary>Dettagli revisione e dichiarazione originale</summary><p>${question.options.map((option) => escapeHtml(option)).join("<br>")}<br><br><strong>Risposta proposta:</strong> ${escapeHtml(question.options[question.correctOption])}<br><strong>Razionale:</strong> ${escapeHtml(question.explanation)}</p><ul class="checklist">${publicationCheck(question)}</ul><p><strong>Fonti:</strong> ${sources.map((source) => `<a href="${source.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)}</a>`).join(" · ") || "Nessuna fonte collegata"}</p><p>originalContentDeclaration: ${escapeHtml(JSON.stringify(question.originalContentDeclaration))}</p><p>La dichiarazione dell'autore non sostituisce la revisione indipendente. Una domanda non è pubblicata finché tutti i criteri non sono verificati.</p></details></article>`;
  }

  function renderEditorial() {
    const published = config.questions.filter(canPublishQuestion);
    const drafts = config.questions.filter((question) => !canPublishQuestion(question));
    return `${renderHeading("QUALITÀ E SICUREZZA DEI CONTENUTI", "Originalità prima della pubblicazione.", "Regole permanenti per ogni quesito, con controlli espliciti e tracciabilità delle fonti.")}<div class="policy-callout"><strong>Regola editoriale permanente.</strong> ${escapeHtml(config.editorialPolicy.publicationRule)}</div><div class="grid-two"><section class="panel"><h2>Controlli obbligatori</h2><ul class="checklist"><li><span>○</span>Autore conferma che il contenuto è originale.</li><li><span>○</span>Revisore indipendente conferma originalità e accuratezza tecnica.</li><li><span>○</span>Dichiarati falsi: derivazione da ricordi d'esame, exam dump o materiali riservati.</li><li><span>○</span>Almeno una fonte pubblica autorizzata e autorizzazione d'uso verificata.</li><li><span>○</span>Revisione che esclude riproduzioni sostanziali del testo fonte.</li><li><span>○</span>Moderazione preventiva; rifiutare contenuti inviati da candidati dopo l'esame.</li></ul><p>Stato pubblicabile solo se tutte le condizioni sono vere. In questa versione la revisione non è delegata né simulata.</p></section><section class="panel"><h2>Stato del repository contenuti</h2><p><strong>${drafts.length}</strong> bozze · <strong>${published.length}</strong> pubblicate</p><p>Le domande iniziali hanno la dichiarazione di originalità richiesta con <code>reviewerConfirmed: false</code>, e restano DRAFT. Nessuna è mostrata nel simulatore.</p><div class="policy-callout">Non inviare, raccogliere o ricostruire domande incontrate durante un esame. Nessun materiale riservato viene accettato.</div></section></div><div class="section-heading"><h2>Bozze non pubblicate</h2><span class="tag open">${drafts.length} DA RIVEDERE</span></div><div class="cards-grid">${drafts.length ? drafts.map(renderDraft).join("") : `<div class="panel"><p>Nessuna bozza attualmente registrata.</p></div>`}</div>`;
  }

  showView("overview");
})();
