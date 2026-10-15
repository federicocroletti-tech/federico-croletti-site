# FedericoCrolettiSite

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 22.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Project portfolio

The `/progetti` page groups visible projects into domain collections while keeping
technology filters available.

### Gestire titoli, descrizioni e visibilita

Modifica **`src/app/features/projects/data/projects.config.ts`**. Ogni voce e
identificata dall'ID stabile del progetto:

```ts
'content-cockpit': {
  visible: true,
  title: {
    it: 'Content Cockpit',
    en: 'Content Cockpit',
  },
  description: {
    it: 'La descrizione italiana del prodotto.',
    en: 'The English product description.',
  },
},
```

- `visible: true` mostra la scheda; `visible: false` la nasconde da tutti i
  filtri, dalle raccolte e dai conteggi.
- Compila sempre titolo e descrizione sia in `it` sia in `en`.
- Non cambiare gli ID e non eliminare le voci per nasconderle: usa `visible`.
- Le modifiche vengono applicate con la build e il successivo deploy, non
  immediatamente sul sito online.
- Nascondere una scheda non protegge dati riservati e non disabilita eventuali
  pagine o demo raggiungibili direttamente tramite URL.
- `isPublic` nei metadati non e il controllo di visibilita della scheda.

Tutti i progetti esistenti restano visibili per impostazione iniziale. La
configurazione viene verificata: ID sconosciuti, voci mancanti e testi vuoti
generano un errore esplicito.

Project metadata (links, technologies, cover, role) and collection order live in
`src/app/features/projects/data/projects.data.ts`. Other Italian and English UI
copy and role descriptions live in `public/assets/i18n`. Project titles and
descriptions have a single source of truth in `projects.config.ts`.

Every project has a dedicated, original SVG cover in `public/assets/images/projects`
(960 x 600). These are conceptual illustrations, not product screenshots or client
assets. When adding a project, set its category and cover URL, add both translations,
and provide a new cover. Covers are decorative next to the project title, have
explicit dimensions and are lazy-loaded except for the first visible card.

Role, full technology stack and tags remain available in each card's expandable
details. Demo and repository links retain their original destinations.

The independent AI Certification Study Lab prototype is served from
`/ai-certification-study-lab/` as a static site asset. Its listing and UI
explicitly state that the referenced CCAO-F certification is unverified; it is
not an official course or exam simulator, and the simulator and commercial
registration remain disabled.

Run `npm run check:study-lab-editorial` to verify its source allowlist,
publication declarations, disabled registration/sales, and absence of user
content submission or upload paths.

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
