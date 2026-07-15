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
