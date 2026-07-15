# Architettura Front-end Angular

## Obiettivo
Definire una base Angular professionale, mantenibile e scalabile per il sito personale.

## Principi
- Sito semplice, ma sviluppato come progetto professionale.
- Architettura chiara anche se il dominio è piccolo.
- Separazione tra UI, stato, servizi e dati statici.
- Componenti standalone.
- Lazy loading per le pagine.
- i18n predisposto fin dall'inizio.
- Nessun backend obbligatorio nella prima versione.

## Struttura cartelle consigliata
```txt
src/
  app/
    core/
      config/
      constants/
      models/
      services/
    shared/
      components/
      pipes/
      directives/
      ui/
    features/
      home/
      about/
      projects/
      contact/
      privacy/
    layout/
      header/
      footer/
      shell/
    i18n/
  assets/
    documents/
    images/
    i18n/
  styles/
    _variables.scss
    _mixins.scss
    _layout.scss
    _typography.scss
    _material-theme.scss
    styles.scss
```

## Routing
Usare lazy loading delle route.

Route previste:
- `/`
- `/chi-sono`
- `/progetti`
- `/contatti`
- `/privacy`
- `**` redirect o NotFound.

## Layout
Componenti globali:
- `AppShellComponent`
- `HeaderComponent`
- `FooterComponent`
- `LanguageSwitcherComponent`
- `ThemeToggleComponent` opzionale.

## Pattern consigliato
Per ogni feature:
```txt
feature-name/
  page/
  components/
  models/
  services/
  data/
```

Esempio progetti:
```txt
projects/
  page/projects-page.component.ts
  components/project-card/project-card.component.ts
  components/project-filter/project-filter.component.ts
  models/project-item.model.ts
  data/projects.data.ts
```

## Stato applicativo
Per la prima versione non serve NgRx globale.
Usare:
- signal Angular o service con BehaviorSubject per stato leggero;
- dati statici in file `.data.ts`;
- facade solo dove utile.

NgRx va considerato solo se in futuro aumentano:
- dati remoti;
- autenticazione;
- dashboard admin;
- blog dinamico;
- gestione form avanzata.

## SCSS
Approccio:
- mobile-first;
- variabili SCSS per colori, spacing e breakpoints;
- classi globali minime;
- stili component-scoped;
- tema Angular Material centralizzato.

Palette suggerita:
- primary: blu scuro professionale;
- accent: azzurro o cyan;
- background: grigio molto chiaro;
- text: grigio antracite;
- surface: bianco.

## Best practice TypeScript
- Usare `interface` per modelli dati.
- Evitare `any`.
- Usare `readonly` dove possibile.
- Creare costanti per link social e dati di contatto.
- Separare contenuti statici da logica component.

## Performance
- Lazy loading route.
- Immagini WebP.
- `loading="lazy"` sulle immagini non hero.
- Evitare librerie pesanti non necessarie.
- Usare trackBy o `@for (...; track ...)`.
- Prevedere meta tag e sitemap.

## Testing minimo
Creare test base per:
- rendering componenti principali;
- validazione form contatti;
- presenza dei link principali;
- dati progetto renderizzati correttamente.

## Deploy Render.com
Build command:
```bash
npm install && npm run build
```

Publish directory:
```txt
dist/<nome-app>/browser
```

Rewrite per Angular SPA:
```txt
/* /index.html 200
```

Se Render richiede configurazione specifica, creare `static.json` o configurare rewrite dal pannello.
