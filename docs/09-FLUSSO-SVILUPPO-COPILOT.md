# Flusso di sviluppo con GitHub Copilot

## Obiettivo
Definire un flusso operativo da seguire in VS Code usando GitHub Copilot.

Copilot deve leggere il file markdown della schermata o dell'area tecnica interessata, generare il codice richiesto, aggiornare un file di log, controllare le modifiche Git e proporre commit/push chiedendo autorizzazione a Federico.

## Regola importante
Copilot non deve fare commit o push senza autorizzazione esplicita.

## File di log sviluppo
Creare e aggiornare questo file:
```txt
DEVELOPMENT_LOG.md
```

Ogni attività deve aggiungere una sezione:
```md
## YYYY-MM-DD - Nome attività

### File markdown letto
- `docs/01-HOME.md`

### Cosa è stato fatto
- ...

### File creati/modificati
- ...

### Note tecniche
- ...

### Stato
- completato / parziale / da rivedere
```

## Flusso standard per ogni schermata

### 1. Lettura requisito
Leggi il file markdown interessato, ad esempio:
```txt
docs/01-HOME.md
```

Estrai:
- obiettivo pagina;
- testi;
- componenti richiesti;
- modelli dati;
- requisiti SEO;
- requisiti accessibilità;
- note responsive.

### 2. Analisi impatto
Prima di scrivere codice, valuta:
- componenti da creare;
- servizi o modelli necessari;
- file SCSS da aggiornare;
- routing da modificare;
- traduzioni i18n da aggiungere;
- test da inserire.

### 3. Produzione codice
Genera codice Angular seguendo queste regole:
- usare componenti standalone;
- usare TypeScript tipizzato;
- evitare `any`;
- usare Angular Material dove indicato;
- usare SCSS scoped;
- usare i18n per testi visibili;
- mantenere HTML semantico;
- rispettare accessibilità e responsive design.

### 4. Aggiornamento log
Aggiorna `DEVELOPMENT_LOG.md` con:
- file markdown letto;
- cosa è stato realizzato;
- file creati/modificati;
- eventuali TODO;
- eventuali decisioni tecniche.

### 5. Controllo qualità locale
Esegui:
```bash
npm run lint
npm run test
npm run build
```

Se uno script non esiste, segnalarlo nel log e proporre creazione script adeguato.

### 6. Controllo modifiche Git
Esegui:
```bash
git status
git diff --stat
```

Poi mostra a Federico:
- file modificati;
- riepilogo changes;
- eventuali rischi;
- messaggio commit consigliato.

### 7. Richiesta autorizzazione
Chiedi esplicitamente:
> Vuoi che proceda con add, commit e push?

Mostra comando proposto:
```bash
git add .
git commit -m "feat: crea schermata home"
git push
```

Non procedere senza risposta positiva di Federico.

### 8. Commit e push
Solo dopo autorizzazione, esegui:
```bash
git add .
git commit -m "MESSAGGIO_CONCORDATO"
git push
```

### 9. Aggiornamento finale log
Dopo push, aggiorna `DEVELOPMENT_LOG.md` con:
- hash commit;
- esito push;
- eventuali note.

## Convenzione messaggi commit
Usare Conventional Commits.

Esempi:
```txt
feat: crea struttura base sito personale
feat: crea schermata home
feat: aggiunge pagina chi sono e download cv
feat: aggiunge portfolio progetti
feat: aggiunge pagina contatti
feat: configura i18n italiano inglese
style: migliora tema material e layout responsive
fix: corregge validazione form contatti
chore: configura deploy render
```

## Ordine consigliato di sviluppo
1. Setup progetto Angular.
2. Configurazione Angular Material.
3. Struttura cartelle e routing.
4. Layout base header/footer/shell.
5. i18n.
6. Home.
7. Chi sono + CV scaricabile.
8. Progetti.
9. Contatti.
10. Privacy.
11. SEO/accessibilità/performance.
12. Deploy Render.com.

## Prompt operativo per Copilot
Usa questo prompt in VS Code:

```txt
Leggi il file markdown indicato in docs/<NOME_FILE>.md e implementa la funzionalità richiesta nel progetto Angular.

Regole:
- usa componenti standalone;
- usa Angular Material dove utile;
- usa TypeScript tipizzato senza any;
- separa componenti pagina, componenti presentazionali, modelli, servizi e dati statici;
- usa SCSS mobile-first;
- usa i18n per tutti i testi visibili;
- rispetta accessibilità e SEO indicati nel markdown;
- aggiorna DEVELOPMENT_LOG.md con cosa hai fatto;
- poi mostra git status, diff stat e un messaggio commit consigliato;
- chiedimi autorizzazione prima di eseguire git add, commit e push.
```

## Definition of Done
Una schermata è completata quando:
- route funzionante;
- responsive desktop/mobile;
- testi i18n presenti;
- componenti tipizzati;
- nessun errore build;
- accessibilità base rispettata;
- log aggiornato;
- commit proposto e approvato prima del push.
