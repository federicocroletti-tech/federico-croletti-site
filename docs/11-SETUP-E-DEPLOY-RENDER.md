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

## Redirect SPA

Per Angular serve redirect verso `index.html`.

Opzione con file `_redirects` se supportato:

```txt
/* /index.html 200
```

Oppure configurare rewrite dal pannello Render.

## Variabili ambiente

Per prima versione statica non servono.

Se in futuro si usa servizio form:

- endpoint servizio contatti;
- eventuale public key;
- nessuna secret key nel frontend.

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
