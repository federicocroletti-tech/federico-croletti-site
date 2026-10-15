# Federico Croletti Site

Sito personale Angular di Federico Croletti. Il posizionamento principale e Senior Frontend Engineer specializzato in Angular, TypeScript, RxJS, Micro Frontend e applicazioni enterprise. La linea di assistenza informatica locale e separata nella landing `/assistenza-informatica-milano`.

## Stack

- Angular 22 con standalone components e lazy loading via `loadComponent`.
- TypeScript, SCSS, Angular Material, ngx-translate ancora presente per parti legacy.
- SEO centralizzata tramite `SeoService` con title, description, canonical, Open Graph, Twitter Card e JSON-LD gestito per pagina.
- Deploy statico su Render.

## Avvio locale

```bash
npm ci
npm start
```

URL locale: `http://localhost:4200/`.

## Build

```bash
npm run build
```

Output produzione: `dist/federico-croletti-site/browser`.

## Test

```bash
npm test
npm run test:karma
npm run test:cypress
```

Il progetto non espone al momento uno script `lint` in `package.json`.

## Struttura principale

- `src/app/app.routes.ts`: routing pubblico.
- `src/app/core`: servizi e costanti condivise.
- `src/app/features/home`: homepage professionale.
- `src/app/features/frontend-services`: consulenza Angular e frontend per aziende.
- `src/app/features/local-support`: landing local SEO per assistenza informatica a Milano.
- `src/app/features/articles`: elenco e dettaglio articoli.
- `public/sitemap.xml` e `public/robots.txt`: indicizzazione.
- `render.yaml`: deploy statico Render con fallback verso `index.html`.

## Route pubbliche

- `/`
- `/esperienza`
- `/competenze`
- `/progetti`
- `/servizi-frontend`
- `/assistenza-informatica-milano`
- `/articoli`
- `/articoli/:slug`
- `/contatti`
- `/privacy`
- `/cookie-policy`
- `/404`

La vecchia route `/servizi` reindirizza alla landing locale per evitare duplicazioni.

## Deploy Render

Configurazione corrente:

```yaml
buildCommand: npm ci && npm run build
staticPublishPath: ./dist/federico-croletti-site/browser
routes:
	- type: rewrite
		source: /*
		destination: /index.html
```

Il fallback e necessario per il routing Angular client-side.

## Variabili e configurazioni

Le configurazioni runtime sono in `src/environments/`:

- `siteUrl`
- `contactEndpoint`
- `contactFallbackEndpoint`
- `emailJs`
- `analytics`

Non inserire segreti nel codice. La chiave pubblica EmailJS presente e da trattare come configurazione client-side, non come segreto server.

## Documentazione operativa

- `docs/SEO.md`
- `docs/GOOGLE_BUSINESS_PROFILE.md`
- `docs/CONTENT_PLAN.md`
- `docs/PRIVACY_CHECKLIST.md`
- `docs/ONLINE_REPUTATION.md`
