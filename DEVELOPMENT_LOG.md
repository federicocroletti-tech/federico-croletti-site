# Development Log

## 2026-07-15 - Privacy, cookie consent and pre-publication checks

### Cosa è stato fatto

- Configurati dati pubblici confermati: email, LinkedIn, GitHub e localita pubblica.
- Mantenuto WhatsApp predisposto ma non pubblicato perche manca un numero pubblico valido.
- Configurato endpoint reale FormSubmit AJAX per il form contatti senza backend proprietario.
- Implementata gestione consenso cookie con banner, pannello preferenze e salvataggio locale.
- Configurato Plausible Analytics in modo condizionale: lo script viene caricato solo dopo consenso Analytics.
- Aggiunta pagina Cookie Policy raggiungibile da `/cookie-policy`.
- Estesa la Privacy Policy con sezioni su titolare, finalita, dati trattati, base giuridica, conservazione, fornitori, trasferimenti extra UE, diritti e nota di validazione.
- Aggiornato footer con Privacy Policy, Cookie Policy e pulsante Gestisci preferenze cookie.
- Aggiornata sitemap con la pagina Cookie Policy.
- Aggiornato link CV pubblico a `/assets/documents/cv/Federico_Croletti_CV.pdf`.

### Note privacy

- Testi predisposti secondo buone pratiche privacy, da validare con un professionista prima della pubblicazione definitiva.
- Nessuna dichiarazione di conformita legale assoluta.
- Nessuna secret key, credenziale SMTP o token privato nel frontend.

### Validazioni

- Build production da rieseguire dopo ogni modifica pre-pubblicazione.
- Test unitari da eseguire prima di commit/push.

## 2026-07-15 - Foto personale pagina Chi sono

### Cosa è stato fatto

- Aggiunta foto personale in `public/assets/images/profile/federico-croletti-profile.png`.
- Integrata la foto nella pagina Chi sono con testo introduttivo, alt text e didascalia i18n IT/EN.
- Aggiornati layout e stili responsive della sezione iniziale della pagina Chi sono.

### Validazioni

- JSON i18n validato.
- Build production completata con successo.

## 2026-07-15 - Fix form contatti e test completi

### Cosa è stato fatto

- Corretto il payload del form contatti da JSON a `application/x-www-form-urlencoded`, piu compatibile con FormSubmit AJAX e con CORS dei servizi form statici.
- Aggiunti selettori `data-cy` ai campi del form per test E2E stabili.
- Aggiunta configurazione Karma/Jasmine con builder `@angular/build:karma`.
- Aggiunta configurazione Cypress E2E e test che compila il form, accetta privacy, intercetta la POST verso FormSubmit e verifica il payload.
- Aggiunto runner `scripts/run-cypress.cjs` per avviare Angular su porta 4300, eseguire Cypress e chiudere il dev server su Windows senza dipendere da `wmic.exe`.

### Diagnosi endpoint

- Dalla rete corrente `formsubmit.co` viene reindirizzato a `https://dnsblocknotice.capgemini.com`; questo indica un blocco DNS/proxy locale verso il provider, non un errore Angular.
- Il test Cypress intercetta la richiesta e conferma che il frontend invia correttamente la POST configurata.

### Validazioni

- `npm run test`: 4 file test, 6 test passati.
- `npm run test:karma`: 6 test Jasmine/Karma passati in Chrome Headless.
- `npm run build`: build production completata.
- `npm run test:cypress`: 1 spec E2E passato.
- `npm run test:full`: suite completa passata.

## 2026-07-15 - Contenuti servizi, AI e UI dropdown contatti

### Cosa è stato fatto

- Migliorata la grafica del menu a tendina della tipologia richiesta nel form contatti, con panel dedicato, opzioni piu leggibili e stato hover/selezionato coerente col design.
- Ampliati i contenuti della Home per raccontare anche servizi pratici: siti web, WordPress, SPID, PEC, firma digitale, backup, formattazione PC, gestione email e supporto digitale.
- Ampliata la pagina Chi sono per bilanciare esperienza enterprise, servizi pratici e AI, con riferimenti alla certificazione AWS Certified AI Practitioner.
- Estesa la pagina Servizi con nuove attivita: WordPress, manutenzione siti, migrazione dati, gestione mail/account, contenuti con AI e guida AI con basi AWS AI Practitioner.
- Aggiornate meta description di Home, Chi sono e Servizi.

### Fonti e limiti

- Usate fonti locali gia presenti nel progetto: docs, contenuti sito, timeline e CV pubblicato come asset.
- LinkedIn pubblico non e stato estraibile automaticamente senza login e il PDF CV non e stato leggibile con strumenti locali disponibili; per evitare dati inventati sono stati usati solo dati gia verificati nel progetto o forniti esplicitamente.

### Validazioni

- JSON i18n validato.
- Build production completata con successo.
