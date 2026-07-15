# Sito personale Federico Croletti - Project Overview

## Obiettivo
Creare un sito personale professionale, semplice, lineare e moderno per presentare Federico Croletti come Senior Software Engineer / Senior Software Developer, Team Leader e People Manager con forte specializzazione front-end Angular, architetture enterprise, micro frontend, i18n, CI/CD, cloud e AI applied tooling.

Il sito deve essere pensato per:
- recruiter e aziende;
- clienti o consulenze freelance;
- colleghi e community tecnica;
- persone che vogliono conoscere progetti, competenze e contatti.

## Identità professionale da comunicare
Federico è un professionista tecnico con esperienza in:
- applicazioni enterprise in ambito finanziario, assicurativo e geo-spaziale;
- front-end Angular moderno;
- micro frontend con Module Federation;
- design system e librerie UI condivise;
- i18n e gestione multi-lingua;
- Leaflet, WMS e mappe interattive;
- Team Leadership, People Management e mentorship;
- uso di AI tool come GitHub Copilot in contesti enterprise;
- cloud, CI/CD e soluzioni cloud-native.

## Tono del sito
Il tono deve essere:
- professionale ma umano;
- diretto e semplice;
- non troppo commerciale;
- orientato a competenze, risultati e affidabilità;
- scritto in italiano, con predisposizione i18n per inglese futuro.

## Stack scelto
- Angular aggiornato alla versione stabile più recente compatibile con il progetto.
- Angular Material.
- TypeScript.
- HTML semantico.
- SCSS modulare.
- Angular i18n o ngx-translate, preferibilmente ngx-translate se si vuole gestire facilmente contenuti JSON.
- Reactive Forms per il form contatti.
- Routing lazy-loaded.
- Render.com per build e deploy.

## Pagine principali
1. Home
2. Chi sono
3. Progetti
4. Contatti

## File tecnici collegati
- Architettura front-end
- i18n
- SEO, accessibilità e performance
- Backend opzionale
- Database opzionale
- Flusso Copilot / sviluppo / commit / push

## Regole generali di sviluppo
- Componenti standalone dove possibile.
- Separare smart/container component e presentational component.
- Usare facade/service per orchestrare dati, stato e logica.
- Evitare logica business nei template.
- Usare modelli TypeScript fortemente tipizzati.
- Usare SCSS condiviso con variabili, mixin e classi utility leggere.
- Preparare layout responsive mobile-first.
- Curare accessibilità: aria-label, focus, contrasto, navigazione tastiera.
- Preparare contenuti i18n da subito.
- Nessun backend obbligatorio nella prima versione.

## Struttura consigliata delle route
- `/` home
- `/chi-sono` chi sono e CV
- `/progetti` portfolio progetti
- `/contatti` contatti e form
- `/privacy` privacy policy minima

## Asset iniziali
- CV PDF scaricabile: `assets/documents/Federico_Croletti_CV_2026.pdf`
- Foto profilo: `assets/images/federico-profile.webp` oppure placeholder iniziale.
- Eventuali immagini progetto: `assets/images/projects/`.

## Output atteso da GitHub Copilot
Copilot deve leggere questi file markdown e produrre codice Angular pulito, modulare, testabile e coerente con le best practice definite.
