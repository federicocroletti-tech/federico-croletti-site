# Schermata Progetti

## Obiettivo della pagina
Mostrare i progetti professionali e personali di Federico, con collegamento a GitHub quando disponibile.

La pagina deve valorizzare:
- capacità architetturale;
- esperienza Angular;
- attenzione alla qualità;
- capacità di guidare progetti;
- sperimentazione AI e cloud.

## Titolo pagina
> Progetti

## Intro
> In questa sezione trovi una selezione di progetti professionali, personali e sperimentali. Alcuni nascono da contesti enterprise, altri da idee personali o attività di studio e prototipazione.

## Struttura card progetto
Ogni card deve contenere:
- nome progetto;
- descrizione breve;
- ruolo;
- tecnologie;
- stato;
- link GitHub se pubblico;
- link demo se disponibile;
- tag tecnici.

## Progetti da inserire

### Sito personale Federico Croletti
Descrizione:
> Sito personale sviluppato con Angular, Angular Material, SCSS e i18n, pensato per presentare profilo professionale, progetti, CV e contatti.

Ruolo:
> Ideazione, UX, sviluppo front-end, architettura e deploy.

Tecnologie:
Angular, Angular Material, TypeScript, SCSS, i18n, Render.com.

Stato:
In sviluppo.

Link GitHub:
`TODO: inserire URL repository`

### Moto Smart / Officina Moto Smart
Descrizione:
> Demo e futuro MVP per aiutare officine moto a gestire richieste clienti, interventi, contatti WhatsApp, chiamate e primo livello di supporto tramite bot AI.

Ruolo:
> Ideazione prodotto, analisi funzionale, architettura front-end, prototipazione Angular e definizione roadmap MVP.

Tecnologie:
Angular, TypeScript, SCSS, eventuale backend Node, WhatsApp API, AI bot.

Stato:
Demo commerciale / validazione.

Link GitHub:
`TODO: inserire URL repository frontend`
`TODO: inserire URL repository backend se pubblico`

### Smart Sales - Micro Frontend Cart
Descrizione:
> Micro Frontend dedicato alla gestione del carrello in un ecosistema Angular con shell applicativa e architettura a moduli federati.

Ruolo:
> Sviluppo componente carrello, integrazione con shell, gestione stato e definizione pattern front-end.

Tecnologie:
Angular, Module Federation, SCSS, TypeScript, Micro Frontend.

Stato:
Progetto tecnico / enterprise.

Link GitHub:
`TODO: se repository pubblico, inserire URL. Se privato, mostrare solo descrizione.`

### ESA - Mappa interattiva WMS
Descrizione:
> Applicazione web con mappa interattiva basata su Leaflet e servizi WMS/MapServer, usata per visualizzare e gestire dati geospaziali.

Ruolo:
> Team coordination, sviluppo front-end, ottimizzazione UX/UI e integrazione mappe.

Tecnologie:
Angular, Leaflet, WMS, MapServer, RxJS, NgRx, Docker, Kubernetes, Keycloak.

Stato:
Esperienza professionale.

Link GitHub:
Non disponibile se progetto aziendale privato.

### Architettura Micro Frontend Angular
Descrizione:
> Architettura enterprise basata su shell principale, micro frontend caricati dinamicamente, libreria condivisa, i18n centralizzato, event bus e routing federato.

Ruolo:
> Team Leader & Senior Consultant, sviluppo pattern architetturali, supporto al team e standardizzazione best practice.

Tecnologie:
Angular, Webpack Module Federation, i18n, Event Bus, GitLab CI/CD, SCSS.

Stato:
Esperienza professionale.

Link GitHub:
Non disponibile se progetto aziendale privato.

### Chatbot AI con backend Node e frontend Angular
Descrizione:
> Prototipo di chatbot AI con backend Node e frontend Angular, pensato per integrazioni con canali come WhatsApp e servizi esterni.

Ruolo:
> Sviluppo full-stack, configurazione repository, deploy e integrazione API.

Tecnologie:
Angular, Node.js, API, Render.com, WhatsApp API.

Stato:
Prototipo.

Link GitHub:
`TODO: inserire URL frontend`
`TODO: inserire URL backend`

## Filtri consigliati
Filtri per categoria:
- Tutti
- Angular
- Micro Frontend
- AI
- Mappe
- Prodotto personale
- Enterprise

## Componenti Angular consigliati
- `ProjectsPageComponent`
- `ProjectCardComponent`
- `ProjectFilterComponent`
- `ProjectTagsComponent`

## Modello TypeScript consigliato
```ts
export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  role: string;
  technologies: string[];
  status: 'in-development' | 'prototype' | 'professional' | 'completed';
  githubUrl?: string;
  demoUrl?: string;
  tags: string[];
  isPublic: boolean;
}
```

## UX
- Card responsive a griglia.
- Su mobile una colonna.
- Evidenziare i progetti pubblici con bottone GitHub.
- Per progetti aziendali privati mostrare descrizione senza link.

## SEO
Title:
> Progetti - Federico Croletti

Description:
> Portfolio progetti di Federico Croletti: Angular, Micro Frontend, mappe interattive, AI, cloud e applicazioni enterprise.
