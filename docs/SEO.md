# SEO tecnico

## Architettura delle pagine

- `/`: homepage professionale, focus Senior Frontend Engineer Angular.
- `/servizi-frontend`: consulenza Angular e architettura frontend per aziende.
- `/assistenza-informatica-milano`: landing local SEO distinta per assistenza informatica.
- `/articoli` e `/articoli/:slug`: contenuti editoriali frontend e supporto informatico.
- `/contatti`, `/privacy`, `/cookie-policy`: pagine di supporto.

## Title e description

Ogni pagina aggiorna title e meta description tramite `SeoService`. Le description devono essere univoche, naturali e senza keyword stuffing.

Esempi principali:

- Home: `Federico Croletti | Senior Frontend Engineer Angular`.
- Landing locale: `Assistenza informatica a Milano | Federico Croletti`.
- Servizi frontend: `Consulenza Angular e architettura frontend | Federico Croletti`.

## Canonical

`SeoService` genera il canonical usando `environment.siteUrl` e il path della pagina. Verificare `siteUrl` prima del deploy definitivo se il dominio cambia.

## Sitemap e robots

- Sitemap: `public/sitemap.xml`.
- Robots: `public/robots.txt`.

La produzione e indicizzabile. Ambienti preview o test dovrebbero usare header `X-Robots-Tag: noindex, nofollow` o un robots separato senza modificare la produzione.

## Dati strutturati

JSON-LD gestito da `SeoService`:

- Home: `Person`, `WebSite`.
- Servizi frontend: `Service`.
- Landing locale: `ProfessionalService`, `Service` con area servita generica.
- Articoli: `BlogPosting`, `BreadcrumbList`.

Regole operative:

- Non inserire indirizzi privati.
- Non inserire coordinate geografiche inventate.
- Non usare `AggregateRating` senza dati conformi e aggiornati.
- Non dichiarare recensioni o certificazioni non verificate.

## Keyword strategy

Priorita professionale:

- Senior Frontend Engineer Angular
- consulenza Angular
- architettura frontend
- Micro Frontend
- Module Federation
- TypeScript
- RxJS
- NgRx
- performance frontend

Priorita locale:

- assistenza informatica Milano
- supporto informatico Milano
- consulente informatico Milano
- assistenza PC Milano
- configurazione computer
- assistenza informatica da remoto
- supporto digitale per professionisti

Usare sinonimi e sezioni informative. Evitare ripetizioni artificiali.

## Monitoraggio

KPI SEO e performance:

- Query professionali e locali.
- Click organici verso homepage e landing locale.
- Visite alla landing locale.
- Conversioni da contatti, chat e telefono.
- Lighthouse e Core Web Vitals.
- Errori Search Console e copertura sitemap.

Baseline Google Business Profile settembre 2026:

- 126 visualizzazioni profilo.
- 57 ricerche.
- 1 interazione.
- 1 clic chat.
- 0 chiamate.
- 0 visite al sito dal profilo.

Obiettivi indicativi a 90 giorni, non garantiti:

- 180-250 visualizzazioni profilo.
- 80-120 ricerche.
- 5-10 interazioni.
- 3-8 clic al sito.
- 3-6 chiamate o chat qualificate.
- 4-6 query pertinenti non legate al nome.
- 3-6 nuove recensioni autentiche.
