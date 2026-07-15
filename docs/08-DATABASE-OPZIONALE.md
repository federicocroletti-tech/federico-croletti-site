# Database opzionale

## Serve un database?
Per la prima versione del sito personale: no, non serve un database.

Tutti i contenuti possono stare in:
- file TypeScript statici;
- file JSON i18n;
- asset locali;
- markdown interni se in futuro si vuole gestire un blog statico.

## Quando NON serve DB
Non serve per:
- pagine statiche;
- elenco progetti scritto nel codice;
- CV scaricabile;
- contatti via email;
- form inviato tramite servizio esterno.

## Quando può servire DB in futuro
Valutare un DB se vuoi:
- salvare messaggi dal form;
- avere blog dinamico;
- avere area admin;
- gestire progetti da pannello;
- raccogliere lead o richieste consulenza;
- creare chatbot con storico conversazioni;
- fare analytics personalizzati.

## DB consigliato se necessario
Per semplicità:
- PostgreSQL su Render.com;
- oppure Supabase se vuoi DB + API + auth gestiti;
- oppure MongoDB solo se il modello dati diventa molto documentale.

## Modello minimo tabella contact_requests
```sql
CREATE TABLE contact_requests (
  id UUID PRIMARY KEY,
  full_name VARCHAR(120) NOT NULL,
  email VARCHAR(180) NOT NULL,
  subject VARCHAR(180) NOT NULL,
  message TEXT NOT NULL,
  privacy_accepted BOOLEAN NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(40) NOT NULL DEFAULT 'new'
);
```

## Privacy
Se salvi dati personali, devi gestire:
- privacy policy più completa;
- tempi di conservazione;
- cancellazione su richiesta;
- accesso protetto ai dati;
- backup sicuri;
- minimizzazione dati.

## Raccomandazione finale
Non usare database nella prima versione. Se il sito cresce, aggiungere PostgreSQL solo insieme a un backend vero e a una privacy policy adeguata.
