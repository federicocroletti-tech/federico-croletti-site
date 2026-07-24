# Setup progetto e deploy Render.com

## Obiettivo

Creare, configurare e pubblicare il sito personale Angular su Render.com.

## Creazione progetto

Comando consigliato:

```bash
ng new federico-croletti-site --style=scss --routing=true
```

Entrare nella cartella:

```bash
cd federico-croletti-site
```

## Angular Material

Aggiungere Angular Material:

```bash
ng add @angular/material
```

Scegliere:

- tema custom o prebuilt temporaneo;
- typography sì;
- animations sì.

## i18n

Installare ngx-translate:

```bash
npm install @ngx-translate/core @ngx-translate/http-loader
```

## Struttura docs

Creare cartella:

```txt
docs/
```

Copiare dentro tutti i file markdown generati.

## CV

Copiare il CV in:

```txt
public/assets/documents/cv/Federico_Croletti_CV.pdf
```

## Script package.json consigliati

```json
{
  "scripts": {
    "start": "ng serve",
    "build": "ng build --configuration production",
    "test": "ng test",
    "lint": "ng lint"
  }
}
```

Se lint non è configurato, aggiungere ESLint per Angular.

## Render.com - Static Site

Tipo servizio:

```txt
Static Site
```

Build command:

```bash
npm install && npm run build
```

Publish directory:

```txt
dist/federico-croletti-site/browser
```

Se il nome progetto è diverso, aggiornare il path.

Configurazione Render consigliata per questo repository:

```txt
Root directory: lascia vuoto se Render e collegato al repository frontend; usa federico-croletti-site solo se pubblichi da una monorepo superiore
Build command: npm ci && npm run build
Publish directory: dist/federico-croletti-site/browser
Environment variables: nessuna obbligatoria per il frontend statico
```

## Redirect SPA

Per Angular serve redirect verso `index.html`.

Opzione con file `_redirects` se supportato:

```txt
/* /index.html 200
```

Oppure configurare rewrite dal pannello Render.

## Variabili ambiente

Per il frontend statico non servono variabili ambiente su Render: l'endpoint contatti e compilato in `src/environments/environment.prod.ts`.

Endpoint attuale:

```txt
https://federico-croletti-api.onrender.com/api/contact
```

Backend Render `Web Service`:

```txt
Root directory: lascia vuoto se Render e collegato al repository backend; usa federico-croletti-contact-backend solo se pubblichi da una monorepo superiore
Runtime: Node
Build command: npm ci && npm run build
Start command: npm run start
Health check path: /health
```

Variabili ambiente backend:

```txt
NODE_VERSION=22
CORS_ORIGINS=https://federico-croletti-site.onrender.com
CONTACT_TO_EMAIL=federico.croletti@gmail.com
CONTACT_DRY_RUN=false
SMTP_HOST=<host smtp>
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=<utente smtp>
SMTP_PASS=<password o app password smtp>
SMTP_FROM_EMAIL=<mittente verificato dal provider smtp>
SMTP_TIMEOUT_MS=10000
```

Note:

- porta `587`: di solito `SMTP_SECURE=false`;
- porta `465`: di solito `SMTP_SECURE=true`;
- `SMTP_FROM_EMAIL` deve essere autorizzato dal provider SMTP;
- nessuna secret key deve essere inserita nel frontend.

## Dominio custom

In futuro configurare:

- dominio personale;
- HTTPS automatico;
- redirect www/non-www;
- sitemap con dominio corretto.

## Checklist deploy

- `npm run build` OK in locale.
- CV presente negli asset.
- Tutte le route funzionano con refresh pagina.
- Link esterni aprono in nuova tab con `rel="noopener noreferrer"`.
- Meta title e description presenti.
- Nessun dato privato sensibile esposto inutilmente.
