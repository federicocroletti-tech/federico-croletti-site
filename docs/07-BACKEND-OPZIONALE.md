# Backend opzionale

## Serve un backend?
Per la prima versione del sito personale: no, non serve un backend.

Il sito può essere completamente statico Angular e deployato su Render.com.

## Quando NON serve backend
Non serve se il sito contiene:
- home;
- chi sono;
- CV scaricabile;
- progetti statici;
- link GitHub/LinkedIn;
- contatti con mailto;
- form gestito da servizio esterno.

## Soluzione consigliata per MVP
Usare sito statico Angular + uno tra:
- mailto precompilato;
- Formspree;
- Getform;
- Basin;
- altro servizio form esterno.

Vantaggi:
- meno manutenzione;
- meno costi;
- nessun DB;
- meno problemi privacy;
- deploy più semplice.

## Quando può servire backend in futuro
Valutare un backend se vuoi:
- salvare richieste contatto;
- avere dashboard admin;
- gestire blog dinamico;
- pubblicare progetti da pannello admin;
- inviare email da dominio personalizzato;
- integrare AI chatbot;
- tracciare analytics custom;
- gestire autenticazione.

## Stack backend consigliato se necessario
- Node.js
- Express oppure NestJS
- TypeScript
- Nodemailer o provider email tipo SendGrid/Mailgun/Resend
- Rate limiting
- Validazione input con Zod
- CORS configurato solo sul dominio del sito
- Logging minimo

## Endpoint minimo possibile
```txt
POST /api/contact
```

Payload:
```json
{
  "fullName": "Mario Rossi",
  "email": "mario@example.com",
  "subject": "Richiesta collaborazione",
  "message": "Ciao Federico...",
  "privacyAccepted": true
}
```

## Sicurezza minima
- Validare tutti i campi.
- Sanitizzare input.
- Limitare numero richieste per IP.
- Non loggare dati personali in chiaro se non necessario.
- Usare variabili ambiente per credenziali email.
- Configurare CORS.
- Aggiungere honeypot anti-spam.
- Non esporre stack trace.

## Deploy Render.com backend
Se in futuro serve:
- creare Web Service separato;
- collegarlo al repository backend;
- impostare variabili ambiente;
- configurare dominio API.

## Raccomandazione finale
Partire senza backend. Aggiungerlo solo se il form contatti o funzionalità dinamiche diventano davvero necessarie.
