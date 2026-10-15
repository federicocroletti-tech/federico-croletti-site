# Privacy Checklist

## Dati personali

- Non pubblicare indirizzo privato.
- Non pubblicare identificativi Google Business Profile amministrativi.
- Non pubblicare token, credenziali o link amministrativi.
- Centralizzare telefono, email e link in `src/app/core/constants/contact-links.ts`.
- Non duplicare numero di telefono in file di contenuto se non necessario.

## Form contatti

- Il form usa validazione lato client e consenso privacy.
- La validazione frontend non sostituisce controlli server-side.
- Raccogliere solo dati necessari: nome, email, oggetto, tipo richiesta, messaggio, consenso.
- Messaggi di errore devono essere accessibili e associati ai campi.
- Se il backend non e configurato, mostrare fallback email senza simulare invii riusciti.

## Analytics e cookie

- Analytics presente tramite astrazione e consenso cookie.
- Non installare strumenti che richiedono consenso senza gestione privacy.
- Eventi utili: contatto, telefono, chat, link social, visita landing locale, selezione tipo servizio, invio form.
- Documentare provider, finalita, conservazione e opt-out nella privacy policy.

## Immagini

- Non caricare screenshot con dati personali, documenti, seriali o informazioni cliente.
- Usare alt text descrittivi.
- Definire dimensioni immagini dove possibile per ridurre CLS.

## Recensioni

- Mostrare solo recensioni autentiche e autorizzate.
- Non copiare automaticamente contenuti da Google.
- Non usare `Review` o `AggregateRating` se non conforme e aggiornato.
- Non mostrare nomi completi senza base appropriata.

## Servizi esterni

- EmailJS: verificare che eventuali chiavi client siano pubbliche e limitate.
- Plausible: verificare configurazione dominio e consenso.
- Render: verificare variabili ambiente e assenza di log con dati personali.

## Placeholder aperti

- [TBD: criteri o fascia di prezzo interventi locali].
- [TBD: conferma email pubblica definitiva].
- [TBD: conferma telefono pubblico definitivo].
- [TBD: revisione legale privacy/cookie].
