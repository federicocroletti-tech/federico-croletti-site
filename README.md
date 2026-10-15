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

The `/progetti` page groups every project into a curated domain collection while
keeping technology filters available. Project metadata and collection order live
in `src/app/features/projects/data/projects.data.ts`; Italian and English copy
live in `public/assets/i18n`.

Every project has a dedicated, original SVG cover in `public/assets/images/projects`
(960 x 600). These are conceptual illustrations, not product screenshots or client
assets. When adding a project, set its category and cover URL, add both translations,
and provide a new cover. Covers are decorative next to the project title, have
explicit dimensions and are lazy-loaded except for the first visible card.

Role, full technology stack and tags remain available in each card's expandable
details. Demo and repository links retain their original destinations.

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
