# Responsive Audit - Fase 1

Data audit: 2026-10-15

## Ambito

Questa Fase 1 contiene solo analisi del repository, inventario tecnico, risultati iniziali di lint/test/build e piano operativo. Non sono stati modificati file applicativi in questa fase; e stato creato solo questo documento.

## Stato iniziale del workspace

Il working tree non era pulito prima dell'audit.

Modifiche preesistenti rilevate:

- `README.md` modificato.
- `public/assets/i18n/en.json` modificato.
- `public/assets/i18n/it.json` modificato.
- `src/app/features/projects/data/projects.data.ts` modificato.
- `src/app/features/projects/models/project-item.model.ts` modificato.
- `src/app/features/projects/page/projects-page.component.html` modificato; in un primo controllo Git lo aveva segnalato come cancellato, ma il file e risultato leggibile nel filesystem durante l'audit.
- `src/app/features/projects/page/projects-page.component.scss` modificato.
- `src/app/features/projects/page/projects-page.component.ts` modificato.
- `TODO.md` non tracciato.
- `public/assets/images/projects/` non tracciato.

Queste modifiche sono considerate preesistenti e non sono state alterate durante la Fase 1.

## Tecnologie individuate

- Angular application standalone/lazy loaded.
- Angular 22 (`@angular/core` `^22.0.0`, CLI/build `^22.0.6`).
- TypeScript `~6.0.2`.
- Angular Material/CDK 22.
- RxJS `~7.8.0`.
- `@ngx-translate/core` e `@ngx-translate/http-loader` per i18n.
- EmailJS per invio form contatto.
- Vitest tramite Angular unit-test builder.
- Karma/Jasmine ancora configurati come target alternativo.
- Cypress 14.5.4 per E2E.
- SCSS come linguaggio stili componenti.
- Font locali: Plus Jakarta Sans, Source Serif 4, Material Icons Outlined.

## Versione Angular

Versione individuata da `package.json`:

- `@angular/core`: `^22.0.0`
- `@angular/cli`: `^22.0.6`
- `@angular/build`: `^22.0.6`
- `@angular/material`: `^22.0.4`

## Strategia di styling

- Stile globale in `src/styles.scss`.
- SCSS per componente tramite `styleUrl`.
- Tema Material prebuilt `azure-blue.css` incluso prima di `src/styles.scss`.
- Design token CSS custom properties in `:root` per colori, ombre, radius e `--content-width`.
- Utility globali principali: `.section`, `.section--compact`, `.page-heading`, `.grid`, `.grid--2`, `.grid--3`, `.grid--4`, `.cta-row`, `.site-card`, `.pill-list`, `.pill`.
- Breakpoint globali presenti a `900px` e `640px`.
- Breakpoint medio gia presenti in piu file a `901px-1920px` e `max-height: 820px`.
- Uso esteso di `clamp()`, CSS Grid e Flexbox.
- Uso frequente di override Angular Material con `!important` e `::ng-deep`.

## Struttura layout e routing

Route pubbliche individuate:

- `/` home.
- `/chi-sono` about.
- `/servizi` services.
- `/progetti` projects.
- `/portfolio` alias projects.
- `/contatti` contact.
- `/privacy` privacy.
- `/cookie-policy` cookie policy.
- wildcard redirect a `/`.

Struttura shell:

- `AppShellComponent` con header, main, footer, cookie banner/preferenze e floating WhatsApp.
- Header sticky con navigazione desktop e menu mobile CSS-only basato su checkbox.
- Footer responsive con flex wrapping.
- Cookie banner fixed bottom-right, ridotto su viewport medi/mobile.
- Cookie preferences modal fixed con `max-height: calc(100vh - 48px)` e scroll interno.

## Componenti con problemi responsive o aree da verificare

### Header e navigazione

File principali:

- `src/app/layout/header/header.component.html`
- `src/app/layout/header/header.component.ts`
- `src/app/layout/header/header.component.scss`

Problemi rilevati:

- Il menu mobile e basato su checkbox CSS nascosta e `label`, non su stato Angular.
- `aria-expanded` non rappresenta lo stato reale del menu.
- `aria-controls` e presente sul label, ma il controllo non e un vero button.
- Non risulta gestione Escape.
- Non risulta chiusura automatica dopo navigazione.
- Il menu mobile dipende da interazione CSS, quindi la gestione focus/stato e fragile.
- Il breakpoint mobile e fisso a `820px`; va validato rispetto ai contenuti tradotti EN/IT e al browser zoom 200%.

### Hero home

File principali:

- `src/app/features/home/page/home-page.component.html`
- `src/app/features/home/page/home-page.component.scss`

Problemi rilevati:

- `.hero-section` usa `min-height: calc(100vh - 108px)` nella regola base.
- Titolo e spaziature usano `vw` e clamp ampi; sui laptop/viewport bassi serve verificare reflow reale.
- Decorazione `::before` usa offset negativo in breakpoint medio/mobile (`right: -24px`, mobile `-90px`), mitigato da `overflow-x: hidden` globale ma da verificare per reflow/zoom.
- CTA numerose nella hero: possibile wrapping denso su 320px, landscape basso e testi EN lunghi.

### About

File principali:

- `src/app/features/about/page/about-page.component.html`
- `src/app/features/about/page/about-page.component.scss`

Problemi rilevati:

- Colonne `minmax(0, 1fr) minmax(260px, 340px)` e sticky side column.
- Side column sticky con `top: 118px`/`102px`; da verificare con header sticky, zoom 200% e viewport bassi.
- Foto profilo dichiarata 768x768 ma resa come card portrait `aspect-ratio: 4 / 5` con `object-fit: cover`; scelta visiva intenzionale ma da validare per non tagliare elementi importanti.

### Services

File principali:

- `src/app/features/services/page/services-page.component.html`
- `src/app/features/services/page/services-page.component.scss`

Problemi rilevati:

- Accordion categorie usa button con `aria-expanded` e `aria-controls`, positivo.
- I contenuti espansi usano griglia `.grid--3`, che diventa due colonne sotto 900px e una sotto 640px.
- Gap di categoria originariamente molto ampio (`clamp(34px, 6vw, 72px)`), mitigato da breakpoint medio ma ancora da verificare su tablet/landscape/zoom.
- Icone categoria fisse 56px/48px: probabilmente accettabili, da verificare con testi lunghi.

### Projects / Portfolio

File principali:

- `src/app/features/projects/page/projects-page.component.html`
- `src/app/features/projects/page/projects-page.component.ts`
- `src/app/features/projects/page/projects-page.component.scss`
- `src/app/features/projects/data/projects.data.ts`
- `src/app/features/projects/models/project-item.model.ts`

Problemi rilevati:

- Working tree incoerente: Git segnala il template HTML cancellato, ma il file e leggibile. Va risolto prima delle fasi successive.
- Filtri hanno overflow orizzontale intenzionale sotto 640px (`overflow-x: auto`), da verificare con tastiera e touch.
- Project cover immagini/SVG con `width="960" height="600"` e `loading` condizionale, buona base.
- `details/summary` usati per dettagli progetto, nativo e accessibile, ma il target `summary` va verificato a 320px e zoom 200%.
- `project-actions` e CTA possono generare wrapping con testi tradotti e pulsanti multipli.

### Contact e form

File principali:

- `src/app/features/contact/page/contact-page.component.html`
- `src/app/features/contact/page/contact-page.component.scss`
- `src/app/features/contact/components/contact-form/contact-form.component.html`
- `src/app/features/contact/components/contact-form/contact-form.component.scss`

Problemi rilevati:

- Layout a due colonne sopra 900px; passa a singola colonna sotto 900px.
- Form usa Angular Material e label native Material, positivo.
- Textarea ha `rows="7"` e `min-height: 150px`; da verificare su landscape basso.
- Submit ha `min-width: 190px`; diventa 100% sotto 640px.
- Uso esteso di `::ng-deep` e `!important` per forzare colori/input Material; da razionalizzare in fasi successive se possibile.
- Checkbox privacy e link annidato nella label: verificare focus/touch e lettura screen reader.

### Footer

File principali:

- `src/app/layout/footer/footer.component.html`
- `src/app/layout/footer/footer.component.scss`

Problemi rilevati:

- Footer flex con wrap link; passa a colonna solo sotto 680px.
- Molti link social/privacy/cookie: da verificare wrapping a 768/820 tablet e zoom 200%.
- Target minimi Material presumibilmente >=44px, ma da confermare in matrice browser.

### Cookie banner e preferences modal

File principali:

- `src/app/layout/cookie-banner/cookie-banner.component.html`
- `src/app/layout/cookie-banner/cookie-banner.component.scss`
- `src/app/layout/cookie-preferences/cookie-preferences.component.html`
- `src/app/layout/cookie-preferences/cookie-preferences.component.scss`

Problemi rilevati:

- Banner fixed bottom-right: puo coprire contenuti critici su laptop e landscape basso.
- Mobile banner occupa larghezza quasi piena e ha azioni in griglia 2 colonne; da verificare 320px.
- Preferences modal ha `max-height: calc(100vh - 48px)` e scroll interno, buona base.
- Da verificare focus trap, chiusura Escape e ordine focus nel modal.

### Language switcher

File principali:

- `src/app/layout/language-switcher/language-switcher.component.html`
- `src/app/layout/language-switcher/language-switcher.component.scss`

Problemi rilevati:

- Usa `mat-button-toggle-group`, accessibile come radiogroup.
- Altezza 44px e label brevi.
- Da verificare comportamento nel menu mobile e con tastiera.

## Dimensioni fisse sospette

- `--content-width: 1180px` globale, ridotto a 1100px su range medio; da verificare su ultrawide 2560 e zoom 200%.
- `.hero-section` base `min-height: calc(100vh - 108px)`.
- `.hero-section` seconda colonna `minmax(320px, 0.92fr)`.
- `.experience-section` seconda colonna `minmax(320px, 0.8fr)`.
- `.help-section` seconda colonna `minmax(300px, 0.8fr)`.
- `.contact-layout` prima colonna `minmax(260px, 0.58fr)`.
- `.profile-grid` seconda colonna `minmax(320px, 1fr)`.
- `.cookie-banner` base `width: min(100% - 32px, 520px)`.
- `.cookie-preferences` `width: min(100% - 32px, 640px)`.
- Submit form `min-width: 190px`.
- Review score `min-width: 168px`.
- Header nav mobile `max-height: 430px`, potenzialmente fragile con traduzioni/testi piu lunghi.

## Overflow potenziali

- Offset decorativi negativi in hero mobile e medio.
- Filtri progetto scrollabili orizzontalmente sotto 640px.
- Header desktop con brand + nav + language switcher, specialmente con testi EN e zoom 200%.
- Menu mobile CSS-only con `max-height` fisso.
- Cookie banner fixed su landscape basso e 320px.
- CTA row con molti pulsanti in hero e local service card.
- Footer link cluster su tablet e zoom.
- Modal cookie preferences con contenuto tradotto lungo.

Nota: `body { overflow-x: hidden; }` maschera overflow globali; nelle fasi successive va verificato che non nasconda contenuti realmente fuori viewport.

## Immagini non responsive o da ottimizzare

Evidenze:

- Angular/Cypress ha segnalato warning NG0913 ripetuti per `federico-mark-primary.png`.
- Angular/Cypress ha segnalato warning NG0913 per `federico-mark-wide.png`.
- Immagini brand usate in header e hero non hanno `srcset`/`sizes`.
- Header logo ha `width="48" height="32"` ma file sorgente e molto piu grande del rendering.
- Hero brand wide non dichiara `width`/`height` nel template home.
- Foto profilo dichiara `768x768` e usa object-fit cover in card 4:5; da verificare per ritaglio intenzionale e responsive loading.
- Progetti usano immagini/SVG con `width="960" height="600"`, `decoding="async"`, lazy/eager condizionale: buona base da validare.

## Problemi del menu mobile

- Implementazione CSS-only con checkbox nascosta.
- Nessun `aria-expanded` dinamico.
- Nessuna gestione Escape.
- Nessun close-on-navigation esplicito.
- Nessun focus management all'apertura/chiusura.
- Label visiva non e un `button`; puo essere meno robusta per tecnologie assistive.
- Stato aperto non e gestito da Angular, in contrasto con il requisito operativo per interazioni accessibili non banali.

## Problemi di accessibilita collegati al responsive design

- Menu mobile: stato ARIA e tastiera incompleti.
- Cookie preferences: focus trap/Escape non verificati in Fase 1.
- Cookie banner: puo coprire contenuto e floating WhatsApp su schermi piccoli/landscape.
- Elementi hover (`site-card:hover`, value item hover) non devono essere unica affordance; da verificare alternative focus.
- `prefers-reduced-motion` globale presente, ma usa `!important` e non e stato ancora validato nel browser.
- Alcuni link esterni usano testo icona `↗` nascosto correttamente con `aria-hidden`, positivo.
- Form ha label Material e messaggi errore, positivo; da verificare associazioni ARIA generate da Material a zoom 200%.
- Skip link presente, positivo; da verificare che header sticky non copra anchor target.

## File candidati a modifica nelle fasi successive

Priorita alta:

- `src/app/layout/header/header.component.ts`
- `src/app/layout/header/header.component.html`
- `src/app/layout/header/header.component.scss`
- `src/styles.scss`
- `src/app/features/home/page/home-page.component.scss`
- `src/app/features/home/page/home-page.component.html`
- `src/app/layout/cookie-banner/cookie-banner.component.scss`
- `src/app/layout/cookie-preferences/cookie-preferences.component.ts/html/scss`

Priorita media:

- `src/app/features/about/page/about-page.component.scss/html`
- `src/app/features/services/page/services-page.component.scss/html`
- `src/app/features/projects/page/projects-page.component.scss/html/ts`
- `src/app/features/contact/page/contact-page.component.scss/html`
- `src/app/features/contact/components/contact-form/contact-form.component.scss/html`
- `src/app/layout/footer/footer.component.scss/html`
- `src/app/layout/language-switcher/language-switcher.component.scss/html`

Priorita performance/media:

- `public/assets/images/brand/federico-mark-primary.png`
- `public/assets/images/brand/federico-mark-wide.png`
- `public/assets/images/profile/federico-croletti-profile.png`
- Template che usano immagini brand/profile/progetti.

Priorita governance/test:

- `package.json` per eventuale script lint se si decide di introdurre ESLint.
- Cypress E2E per test responsive/accessibilita se coerente con le fasi successive.

## Piano ordinato per priorita

1. Stabilizzare working tree progetti: chiarire perche Git segnala `projects-page.component.html` come cancellato mentre il file e leggibile.
2. Introdurre/razionalizzare token responsivi globali: spacing, content width, type scale, scroll margin per anchor e container.
3. Rifattorizzare header mobile da checkbox CSS-only a stato Angular accessibile con button, `aria-expanded`, Escape, close-on-navigation e focus behavior.
4. Verificare e ridurre dipendenza da `100vh`/`vh` in hero e sezioni alte, specialmente landscape e zoom 200%.
5. Consolidare griglie card e sezioni: home, about, services, projects, contact.
6. Rendere cookie banner/modal robusti su 320px, landscape basso e navigazione tastiera.
7. Verificare form contatto a 320px/landscape/zoom e ridurre override Material non necessari.
8. Ottimizzare immagini brand/profile: dimensioni reali, `width`/`height`, eventuali `srcset`/`sizes`, lazy loading corretto.
9. Aggiungere controlli responsive automatici con Cypress o Playwright se compatibile con tooling esistente.
10. Eseguire audit accessibilita manuale tastiera + automatico con axe/Lighthouse se introdotto o disponibile.

## Risultati reali di lint, type-check, test e build

### Lint

Risultato: non eseguibile come lint reale.

Evidenza:

- `npm pkg get scripts.lint` restituisce `{}`.
- Non esiste script `lint` in `package.json`.

MANUAL_TEST_REQUIRED: aggiungere o configurare uno script lint nelle fasi successive se richiesto come quality gate.

### Type-check

Comando eseguito:

```powershell
npm --prefix "c:\federico-sito-personale-md\personal site\federico-croletti-site" exec tsc -- -p "c:\federico-sito-personale-md\personal site\federico-croletti-site\tsconfig.app.json" --noEmit
```

Risultato: passato.

Exit code: `0`.

### Unit test

Comando eseguito tramite task VS Code `Angular: test unit`:

```powershell
npm test
```

Risultato: passato.

Dettagli:

- Test files: 4 passed / 4.
- Tests: 13 passed / 13.
- Durata: 102.74s.

### Build production

Comando eseguito tramite task VS Code `Angular: build production`:

```powershell
npm run build
```

Risultato: passato con warning.

Dettagli principali:

- Initial total raw: 498.94 kB.
- Initial estimated transfer: 123.42 kB.
- Output: `dist/federico-croletti-site`.

Warning:

- `src/app/features/home/page/home-page.component.scss` supera budget component style: budget 4.00 kB, totale 6.92 kB, eccedenza 2.92 kB.

### Cypress E2E

Comando eseguito:

```powershell
npm --prefix "c:\federico-sito-personale-md\personal site\federico-croletti-site" run test:cypress
```

Risultato: passato.

Dettagli:

- Cypress 14.5.4.
- Browser: Electron 130 headless.
- Spec: `contact-form.cy.ts`.
- Tests: 2 passing / 2.
- Failing: 0.
- Exit code: `0`.

Warning osservati durante E2E:

- `Missing baseUrl in compilerOptions. tsconfig-paths will be skipped`.
- NG0913 per `federico-mark-primary.png`.
- NG0913 per `federico-mark-wide.png`.

## Verifiche responsive della Fase 1

Tentativo eseguito:

- Avvio server tramite Cypress su `http://127.0.0.1:4300` riuscito durante E2E.
- Matrice browser iniziata, ma il server e stato chiuso dallo script Cypress prima del completamento; Playwright ha ricevuto `ERR_CONNECTION_REFUSED` su `/servizi`.
- Tentativi successivi di avviare dev server temporaneo su `4301` e `4302` sono rimasti in `Building...` o non hanno esposto una porta raggiungibile nel tempo utile; entrambi i processi sono stati chiusi per non lasciare terminali appesi.

Viewport richieste non completate in Fase 1:

- 320 x 568
- 360 x 800
- 375 x 812
- 390 x 844
- 412 x 915
- 568 x 320
- 768 x 1024
- 820 x 1180
- 1024 x 768
- 1280 x 720
- 1366 x 768
- 1440 x 900
- 1920 x 1080
- 2560 x 1440

MANUAL_TEST_REQUIRED: completare la matrice responsive quando il dev server e disponibile stabilmente, idealmente con uno script Cypress dedicato che gestisca server lifecycle e viewport.

## Problemi preesistenti

- Working tree non pulito con modifiche/cancellazione apparente su area projects.
- Script lint assente.
- Warning build: budget SCSS home superato.
- Warning Angular NG0913 su immagini brand sovradimensionate.
- Warning Cypress/dev server: `Missing baseUrl in compilerOptions. tsconfig-paths will be skipped`.
- Dev server manuale su porte 4301/4302 non ha completato esposizione porta durante i tentativi di audit.

## Problemi risolti in Fase 1

Nessun problema applicativo risolto: la fase era esclusivamente di analisi. E stato creato solo questo documento.

## Problemi ancora aperti

- Menu mobile non pienamente accessibile/stato ARIA non sincronizzato.
- Matrice responsive viewport richiesta non completata.
- Immagini brand sovradimensionate.
- Budget SCSS home sopra soglia.
- Possibili overflow mascherati da `overflow-x: hidden` globale.
- Cookie banner/modal da verificare con tastiera, zoom e landscape.
- Header sticky/anchor link da verificare.
- Working tree projects da chiarire prima di modifiche successive.

## Regressioni

Nessuna regressione applicativa introdotta in Fase 1, perche non sono stati modificati file applicativi.

## Lighthouse

Non eseguito in Fase 1: il dev server non e rimasto disponibile per una sessione browser stabile dopo Cypress.

MANUAL_TEST_REQUIRED: eseguire Lighthouse quando il server locale e stabile.

## DESIGN_REVIEW_REQUIRED

Non richiesto in Fase 1: non sono state introdotte modifiche visuali applicative. Le fasi successive possono richiederlo se si interviene su header, hero, spacing globale o cookie banner in modo percepibile.

## MANUAL_TEST_REQUIRED

- Matrice responsive completa sulle viewport richieste.
- Browser al 200% di zoom.
- Navigazione solo tastiera.
- Escape/focus management per menu mobile e cookie preferences.
- Touch target su dispositivi reali o emulazione touch.
- Firefox e WebKit.
- Lighthouse.

## Prossimo singolo passo operativo

Stabilizzare il working tree dell'area Projects e poi implementare la Fase 2 partendo dai token globali di layout/spacing in `src/styles.scss`, senza toccare contenuti personali.
