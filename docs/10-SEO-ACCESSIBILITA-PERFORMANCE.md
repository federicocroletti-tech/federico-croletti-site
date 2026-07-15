# SEO, accessibilità e performance

## Obiettivo
Rendere il sito personale professionale anche dal punto di vista tecnico: trovabile, veloce, leggibile e accessibile.

## SEO base
Ogni pagina deve avere:
- title specifico;
- meta description;
- URL parlante;
- heading H1 unico;
- contenuti testuali chiari;
- link interni coerenti.

## Title consigliati
- Home: `Federico Croletti - Senior Software Engineer Angular`
- Chi sono: `Chi sono - Federico Croletti`
- Progetti: `Progetti - Federico Croletti`
- Contatti: `Contatti - Federico Croletti`

## Meta description consigliate
### Home
> Sito personale di Federico Croletti, Senior Software Engineer specializzato in Angular, Micro Frontend, architetture enterprise, i18n e leadership tecnica.

### Chi sono
> Scopri il percorso professionale di Federico Croletti, Senior Software Engineer specializzato in Angular, Micro Frontend, mappe interattive e leadership tecnica.

### Progetti
> Portfolio progetti di Federico Croletti: Angular, Micro Frontend, mappe interattive, AI, cloud e applicazioni enterprise.

### Contatti
> Contatta Federico Croletti per opportunità lavorative, collaborazioni, consulenze Angular, front-end enterprise e progetti web.

## Open Graph
Aggiungere meta tag:
- `og:title`
- `og:description`
- `og:type`
- `og:url`
- `og:image`

Immagine consigliata:
```txt
assets/images/og/federico-croletti-og.webp
```

## Sitemap e robots
Creare:
```txt
public/sitemap.xml
public/robots.txt
```

Robots base:
```txt
User-agent: *
Allow: /
Sitemap: https://TUO-DOMINIO/sitemap.xml
```

## Accessibilità
Regole:
- Un solo H1 per pagina.
- Bottoni con testo chiaro.
- Link distinguibili.
- Contrasto colore adeguato.
- Navigazione da tastiera.
- Focus visibile.
- Alt text sulle immagini informative.
- Non usare solo colore per comunicare stati.
- Label visibili nei form.

## Performance
- Usare immagini WebP.
- Ottimizzare dimensione immagini.
- Lazy loading immagini non critiche.
- Lazy loading route Angular.
- Evitare dipendenze non necessarie.
- Build production.
- Controllare bundle size.

## Angular best practice
- `ChangeDetectionStrategy.OnPush` dove utile.
- TrackBy o `@for track` per liste.
- Dati statici fuori dai componenti.
- Service/facade per logica condivisa.
- Nessuna logica pesante nel template.

## Privacy
Creare pagina `/privacy` semplice.
Contenuti minimi:
- titolare del sito;
- dati raccolti tramite form;
- finalità: risposta alla richiesta;
- nessuna newsletter senza consenso;
- contatto email per richieste privacy;
- eventuali servizi terzi usati per form o analytics.

## Analytics
Per la prima versione evitare analytics o usare soluzioni privacy-friendly.
Se si usa Google Analytics, aggiungere cookie/privacy adeguata.

## Checklist finale
- Build ok.
- Lighthouse almeno buono su performance, SEO, accessibility e best practices.
- Link CV funzionante.
- Link LinkedIn funzionante.
- Link GitHub aggiornato.
- Form contatti funzionante o fallback mailto.
- Redirect SPA configurato su Render.
