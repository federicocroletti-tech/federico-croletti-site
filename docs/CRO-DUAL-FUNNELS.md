# CRO dual funnel notes

## Obiettivi

- Separare il percorso `Consulenza Angular` dal percorso `Assistenza informatica Milano`.
- Portare le CTA contestuali al form con `service`, `funnel` e `source` in query string.
- Misurare eventi e conversioni senza salvare dati personali nel browser.

## Funnel

| Funnel | Entry page | Form service | Conversion |
| --- | --- | --- | --- |
| Angular | `/servizi-frontend` | `angular-architecture` | Invio form riuscito e redirect a `/grazie` |
| Assistenza Milano | `/assistenza-informatica-milano` | `it-support` | Invio form riuscito e redirect a `/grazie` |

## Analytics e consenso

Il sito non introduce nuovi strumenti analytics. La configurazione resta astratta in `environment.analytics` e attualmente supporta Plausible solo dopo consenso alla categoria Analytics.

Gli aggregati locali sono salvati in `localStorage` solo dopo consenso analytics e contengono esclusivamente:

- data;
- nome evento;
- servizio;
- sorgente;
- conteggio.

Non vengono salvati nome, email, oggetto, messaggio, IP, user agent o identificatori utente. La dashboard locale e disponibile in `/dashboard-conversioni` e legge solo questi aggregati dal browser corrente.

## Eventi

- `cta_click`: click su CTA contestuali.
- `form_submit_attempt`: tentativo di invio form valido.
- `form_submit_error`: validazione o provider non riuscito.
- `conversion`: invio confermato dal provider e redirect a `/grazie`.

## Validazione

- Build: `npm run build`
- Unit test: `npm test`
- Cypress: `npm run test:cypress`
- Accessibilita statica locale: `npm run accessibility:check`

Prima di collegare strumenti analytics diversi da Plausible va aggiornata questa nota con analisi cookie, consenso, dati trattati e provider coinvolti.