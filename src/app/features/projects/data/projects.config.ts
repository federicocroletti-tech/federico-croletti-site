import type { ProjectPublication } from '../models/project-item.model';

// Edit titles, descriptions and visibility here. Changes take effect after deployment.
export const PROJECT_CONFIG = {
  'personal-site': {
    visible: true,
    title: {
      it: 'Sito personale Federico Croletti',
      en: 'Federico Croletti personal site',
    },
    description: {
      it: 'Sito personale sviluppato con Angular, Angular Material, SCSS e i18n, pensato per presentare profilo professionale, progetti, CV e contatti.',
      en: 'Personal site built with Angular, Angular Material, SCSS and i18n to present profile, projects, CV and contact channels.',
    },
  },
  'content-cockpit': {
    visible: true,
    title: {
      it: 'Content Cockpit',
      en: 'Content Cockpit',
    },
    description: {
      it: 'Assistente editoriale personale per organizzare profili, idee, fonti, verifiche e carico di lavoro dei miei progetti Instagram.',
      en: 'Personal editorial assistant for organizing profiles, ideas, sources, verification work and workload across my Instagram projects.',
    },
  },
  'ai-certification-study-lab': {
    visible: true,
    title: {
      it: 'AI Certification Study Lab',
      en: 'AI Certification Study Lab',
    },
    description: {
      it: "Prototipo indipendente e non commerciale di percorso didattico pratico sull'uso responsabile dell'AI. Il riferimento iniziale a Claude Certified Associate – Foundations (CCAO-F) non è stato verificato dalle fonti ufficiali; non è un simulatore o corso ufficiale e il simulatore resta disattivato.",
      en: 'Independent, non-commercial prototype of a practical learning path for responsible AI use. Its initial reference to Claude Certified Associate – Foundations (CCAO-F) has not been verified by official sources; this is not an official course or exam simulator, and the simulator remains disabled.',
    },
  },
  'moto-smart': {
    visible: true,
    title: {
      it: 'Moto Smart / Officina Moto Smart',
      en: 'Moto Smart / Officina Moto Smart',
    },
    description: {
      it: 'Demo e futuro MVP per aiutare officine moto a gestire richieste clienti, interventi, contatti WhatsApp, chiamate e primo livello di supporto tramite bot AI.',
      en: 'Demo and future MVP to help motorcycle workshops manage client requests, interventions, WhatsApp contacts, calls and first-level support through an AI bot.',
    },
  },
  'fit-coach-pro-website': {
    visible: true,
    title: {
      it: 'Fit Coach Pro Website',
      en: 'Fit Coach Pro Website',
    },
    description: {
      it: 'Sito web moderno per personal trainer con landing page, servizi, metodo, testimonianze, form di prenotazione, consenso privacy e gestione cookie granulare.',
      en: 'Modern personal trainer website with landing page, services, method, testimonials, booking form, privacy consent and granular cookie preferences.',
    },
  },
  'daniel-pantuso-giardiniere-site': {
    visible: true,
    title: {
      it: 'Daniel Pantuso Giardiniere - Sito vetrina',
      en: 'Daniel Pantuso Gardener - Showcase Website',
    },
    description: {
      it: 'Sito vetrina professionale per attivita di giardinaggio a Milano, con contenuti SEO, contatto rapido e form che apre WhatsApp con messaggio precompilato.',
      en: 'Professional showcase website for gardening services in Milan, with SEO-focused content, quick contact options and a form that opens WhatsApp with a prefilled message.',
    },
  },
  'menu-smart-qr': {
    visible: true,
    title: {
      it: 'Menu Smart QR',
      en: 'Menu Smart QR',
    },
    description: {
      it: 'Applicazione web per digitalizzare menu e cataloghi tramite QR code, con consultazione veloce da smartphone.',
      en: 'Web app to digitize menus and catalogs through QR codes, with fast mobile consultation.',
    },
  },
  'moto-route-planner': {
    visible: true,
    title: {
      it: 'MotoRoute Planner',
      en: 'MotoRoute Planner',
    },
    description: {
      it: 'Applicazione SPA in Vue 3 per pianificare itinerari moto, visualizzare percorsi su mappa Leaflet e gestire dashboard, mock data, i18n e feature flag.',
      en: 'Vue 3 SPA for planning motorcycle itineraries, visualizing routes on Leaflet maps and managing dashboard views, mock data, i18n and feature flags.',
    },
  },
  'etf-dip-alert': {
    visible: true,
    title: {
      it: 'ETF Tracker / Dip Alert',
      en: 'ETF Tracker / Dip Alert',
    },
    description: {
      it: 'Sistema Python per monitorare una lista di ETF, scaricare i prezzi con yfinance, calcolare variazioni e drawdown su più orizzonti temporali e inviare alert email tramite Brevo quando le soglie configurate vengono superate.',
      en: 'Python system that monitors a list of ETFs, downloads prices with yfinance, calculates daily changes and drawdowns across multiple time windows, and sends email alerts through Brevo when configured thresholds are met.',
    },
  },
  'taxi-opportunity-radar': {
    visible: true,
    title: {
      it: 'Taxi Opportunity Radar',
      en: 'Taxi Opportunity Radar',
    },
    description: {
      it: 'Prodotto data-driven per tassisti e NCC che combina meteo e segnali eventi dal web per suggerire aree con maggiore domanda potenziale, con report giornaliero automatico via email.',
      en: 'Data-driven product for taxi and private-hire drivers that combines weather and web event signals to suggest areas with higher potential demand, with automatic daily email reports.',
    },
  },
  'it-lead-radar': {
    visible: true,
    title: {
      it: 'IT Lead Radar',
      en: 'IT Lead Radar',
    },
    description: {
      it: 'Monitor automatico Node.js + TypeScript che analizza fonti pubbliche per individuare lead IT e inviare alert email via Brevo con deduplica persistente.',
      en: 'Automated Node.js + TypeScript monitor that scans public sources to identify IT leads and sends Brevo email alerts with persistent deduplication.',
    },
  },
  'send-mail-promotore': {
    visible: true,
    title: {
      it: 'Mail Promotore',
      en: 'Mail Promotore',
    },
    description: {
      it: 'Applicazione full-stack per gestire liste di destinatari, template email, storico invii, esclusioni e invio SMTP controllato con blocco automatico dei doppioni per campagna.',
      en: 'Full-stack application for managing recipient lists, email templates, send history, exclusions and controlled SMTP delivery with automatic duplicate blocking per campaign.',
    },
  },
  'airmap-italia-gis': {
    visible: true,
    title: {
      it: "AIRMAP ITALIA - WebGIS qualità dell'aria",
      en: 'AIRMAP ITALIA - Air quality WebGIS',
    },
    description: {
      it: "Piattaforma WebGIS in Angular per visualizzare qualità dell'aria e inquinamento urbano su mappa Leaflet, con poligoni GeoJSON, layer ambientali, dashboard e dati mock modificabili.",
      en: 'Angular WebGIS platform for visualizing urban air quality and pollution on a Leaflet map, with GeoJSON polygons, environmental layers, dashboard views and editable mock data.',
    },
  },
  'radici-san-giovanni-lipioni': {
    visible: true,
    title: {
      it: 'Radici San Giovanni Lipioni',
      en: 'Radici San Giovanni Lipioni',
    },
    description: {
      it: 'Guida digitale interattiva per esplorare il borgo con mappa, itinerari lenti, racconti dimostrativi, dati JSON e un chatbot basato su contenuti controllati.',
      en: 'Interactive digital guide to explore the village through a map, slow itineraries, demo stories, JSON data and a chatbot based on controlled content.',
    },
  },
  'regali-vicini': {
    visible: true,
    title: {
      it: 'Regali Vicini - Catalogo Facebook',
      en: 'Regali Vicini - Facebook Catalog',
    },
    description: {
      it: "Applicazione locale per organizzare annunci Facebook di oggetti gratuiti: importa link e testo forniti dall'utente, riconosce parole chiave, elimina duplicati, gestisce stati e salva il catalogo in locale.",
      en: 'Local application for organizing Facebook posts offering free items: it imports links and text supplied by the user, recognizes keywords, removes duplicates, manages states and stores the catalog locally.',
    },
  },
  'personal-investment-radar': {
    visible: true,
    title: {
      it: 'Personal Investment Radar',
      en: 'Personal Investment Radar',
    },
    description: {
      it: 'Applicazione full-stack per monitorare portafogli personali, analizzare rischio, drawdown e scenari, importare snapshot Fineco e gestire watchlist e alert tecnici con dati tracciabili.',
      en: 'Full-stack application for tracking personal portfolios, analyzing risk, drawdown and scenarios, importing Fineco snapshots, and managing watchlists and technical alerts with traceable data.',
    },
  },
  'crypto-deep-alert': {
    visible: true,
    title: {
      it: 'Crypto Deep Alert',
      en: 'Crypto Deep Alert',
    },
    description: {
      it: 'Sistema Python che monitora criptovalute, calcola drawdown, rialzi, volatilita, volume e momentum su piu orizzonti temporali e invia report email con alert quantitativi.',
      en: 'Python system that monitors cryptocurrencies, calculates drawdown, rallies, volatility, volume and momentum across multiple time frames, and sends email reports with quantitative alerts.',
    },
  },
  'stock-deep-alert': {
    visible: true,
    title: {
      it: 'Financial Instruments Daily Monitor',
      en: 'Financial Instruments Daily Monitor',
    },
    description: {
      it: 'Sistema Python per il monitoraggio quotidiano di azioni e obbligazioni, con analisi di prezzi, fondamentali, rendimento, rischio, drawdown e report email automatici.',
      en: 'Python system for daily monitoring of stocks and bonds, with price, fundamentals, yield, risk and drawdown analysis plus automated email reports.',
    },
  },
  'bank-transactions-dashboard': {
    visible: true,
    title: {
      it: 'Bank Transactions Dashboard',
      en: 'Bank Transactions Dashboard',
    },
    description: {
      it: 'Dashboard Angular per consultare e gestire transazioni simulate di un conto corrente, con saldi, filtri, ordinamento, paginazione, dettaglio e inserimento operazioni.',
      en: 'Angular dashboard for browsing and managing simulated bank account transactions, with balances, filters, sorting, pagination, detail views and new transaction entry.',
    },
  },
  'fineco-portfolio-importer': {
    visible: true,
    title: {
      it: 'Fineco Portfolio Importer',
      en: 'Fineco Portfolio Importer',
    },
    description: {
      it: 'Utility Python che legge esportazioni Fineco, normalizza posizioni e movimenti, genera JSON per asset allocation, analisi fiscale e opportunita di recupero minusvalenze.',
      en: 'Python utility that reads Fineco exports, normalizes positions and movements, and generates JSON files for asset allocation, tax analysis and tax-loss recovery opportunities.',
    },
  },
  'local-demand-radar': {
    visible: true,
    title: {
      it: 'Local Demand Radar',
      en: 'Local Demand Radar',
    },
    description: {
      it: 'Applicazione data-driven per piccole attivita locali che combina meteo, eventi, aree e clienti inattivi per generare score di domanda, opportunita e report email.',
      en: 'Data-driven application for local businesses that combines weather, events, areas and inactive customers to generate demand scores, opportunities and email reports.',
    },
  },
  'federico-it-support': {
    visible: true,
    title: {
      it: 'Federico IT Support',
      en: 'Federico IT Support',
    },
    description: {
      it: 'Progetto web dedicato a servizi di supporto informatico e servizi digitali italiani per expat e residenti in Italia.',
      en: 'Web project dedicated to IT support and Italian digital services for expats and residents in Italy.',
    },
  },
  'milano-catering-wedding-chatbot': {
    visible: true,
    title: {
      it: 'Milano Catering Wedding - Chatbot consulenza',
      en: 'Milano Catering Wedding - Consulting Chatbot',
    },
    description: {
      it: 'Base progettuale per un assistente di prima consulenza sul sito Milano Catering Wedding, pensato per qualificare lead senza inventare menu, prezzi o disponibilita.',
      en: 'Project base for a first-consultation assistant on the Milano Catering Wedding website, designed to qualify leads without inventing menus, prices or availability.',
    },
  },
  'whatsapp-bot': {
    visible: true,
    title: {
      it: 'WhatsApp Bot con API Meta',
      en: 'WhatsApp Bot with Meta API',
    },
    description: {
      it: 'Backend Node.js per bot WhatsApp basato su API ufficiali Meta, Express e integrazione OpenAI per risposte automatiche controllate.',
      en: 'Node.js backend for a WhatsApp bot based on official Meta APIs, Express and OpenAI integration for controlled automated replies.',
    },
  },
  'whatsapp-chat-fe': {
    visible: true,
    title: {
      it: 'WhatsApp Chat Frontend',
      en: 'WhatsApp Chat Frontend',
    },
    description: {
      it: 'Frontend Angular per sperimentare una chat WhatsApp-like, pensata come interfaccia di supporto per integrazioni conversazionali e bot.',
      en: 'Angular frontend for experimenting with a WhatsApp-like chat interface, designed as a support UI for conversational integrations and bots.',
    },
  },
  'argo-studio-music': {
    visible: true,
    title: {
      it: 'Argo Studio Music',
      en: 'Argo Studio Music',
    },
    description: {
      it: 'Applicazione web Vue/Vuetify per un progetto musicale, con routing, internazionalizzazione e componenti UI riutilizzabili.',
      en: 'Vue/Vuetify web application for a music project, with routing, internationalization and reusable UI components.',
    },
  },
  'progetto-multimedia': {
    visible: true,
    title: {
      it: 'Progetto Multimedia',
      en: 'Progetto Multimedia',
    },
    description: {
      it: 'Progetto Vue 3 con routing, Vuex e Bootstrap nato come applicazione multimediale e percorso di studio su architettura SPA.',
      en: 'Vue 3 project with routing, Vuex and Bootstrap, built as a multimedia application and SPA architecture learning path.',
    },
  },
  'smart-sales-cart': {
    visible: true,
    title: {
      it: 'Smart Sales - Micro Frontend Cart',
      en: 'Smart Sales - Micro Frontend Cart',
    },
    description: {
      it: 'Micro Frontend dedicato alla gestione del carrello in un ecosistema Angular con shell applicativa e architettura a moduli federati.',
      en: 'Micro Frontend dedicated to cart management in an Angular ecosystem with application shell and federated module architecture.',
    },
  },
  'esa-map': {
    visible: true,
    title: {
      it: 'ESA - Mappa interattiva WMS',
      en: 'ESA - Interactive WMS map',
    },
    description: {
      it: 'Applicazione web con mappa interattiva basata su Leaflet e servizi WMS/MapServer, usata per visualizzare e gestire dati geospaziali.',
      en: 'Web application with interactive map based on Leaflet and WMS/MapServer services, used to visualize and manage geospatial data.',
    },
  },
  'micro-frontend-architecture': {
    visible: true,
    title: {
      it: 'Architettura Micro Frontend Angular',
      en: 'Angular Micro Frontend Architecture',
    },
    description: {
      it: 'Architettura enterprise basata su shell principale, micro frontend caricati dinamicamente, libreria condivisa, i18n centralizzato, event bus e routing federato.',
      en: 'Enterprise architecture based on a main shell, dynamically loaded micro frontends, shared library, centralized i18n, event bus and federated routing.',
    },
  },
  'ai-chatbot': {
    visible: true,
    title: {
      it: 'Chatbot AI con backend Node e frontend Angular',
      en: 'AI chatbot with Node backend and Angular frontend',
    },
    description: {
      it: 'Prototipo di chatbot AI con backend Node e frontend Angular, pensato per integrazioni con canali come WhatsApp e servizi esterni.',
      en: 'AI chatbot prototype with Node backend and Angular frontend, designed for integrations with channels such as WhatsApp and external services.',
    },
  },
} satisfies Record<string, ProjectPublication>;
