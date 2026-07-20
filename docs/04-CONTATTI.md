# Schermata Contatti

## Obiettivo della pagina

Permettere a recruiter, aziende, clienti e colleghi di contattare Federico in modo semplice.

## Titolo pagina

> Contatti

## Intro

> Vuoi parlare di un progetto, una collaborazione, un'opportunità lavorativa o una consulenza tecnica? Scrivimi: ti risponderò appena possibile.

## Dati pubblici consigliati

Mostrare solo dati adatti a un sito pubblico.

### Email

`federico.croletti@gmail.com`

CTA:

- `Scrivimi una mail`
- link: `mailto:federico.croletti@gmail.com`

### LinkedIn

`https://www.linkedin.com/in/federicocroletti/`

CTA:

- `Vai al profilo LinkedIn`

### GitHub

`https://github.com/fedecroletti/`

CTA:

- `Guarda il mio GitHub`

### Località

Milano.

Nota:

> Non mostrare indirizzo completo di casa nel sito pubblico. È sufficiente indicare Milano, Italia.

### Telefono

Telefono e WhatsApp non sono pubblicati finche non viene fornito un numero pubblico valido.

## Form contatti

Campi:

- Nome e cognome
- Email
- Oggetto
- Messaggio
- Checkbox privacy

Validazioni:

- nome obbligatorio, minimo 2 caratteri;
- email obbligatoria e valida;
- oggetto obbligatorio;
- messaggio obbligatorio, minimo 20 caratteri;
- checkbox privacy obbligatoria.

## Strategia senza backend

Per evitare backend nella prima versione, il form usa FormSubmit AJAX come servizio esterno per form statici.

Il sito mantiene email, LinkedIn e GitHub come canali pubblici alternativi.

## Invio form - comportamento UX

Quando l'utente invia:

- se integrato con servizio esterno: mostrare snackbar di successo/errore;
- se non configurato: mostrare messaggio chiaro di endpoint mancante;
- non salvare dati personali nel browser oltre il necessario.

## Privacy minima

Inserire frase sotto il form:

> I dati inseriti saranno usati solo per rispondere alla richiesta di contatto. Non saranno usati per newsletter o comunicazioni commerciali non richieste.

Creare anche rotta `/privacy` con contenuto minimo.

## Componenti Angular consigliati

- `ContactPageComponent`
- `ContactInfoComponent`
- `ContactFormComponent`
- `SocialLinksComponent`
- `LocationCardComponent`

## Modello TypeScript consigliato

```ts
export interface ContactFormValue {
  fullName: string;
  email: string;
  subject: string;
  message: string;
  privacyAccepted: boolean;
}
```

## Reactive Form

Usare Reactive Forms, non Template Driven Forms.

## Angular Material consigliato

- `mat-form-field`
- `mat-input`
- `mat-checkbox`
- `mat-button`
- `mat-card`
- `mat-snack-bar`

## Accessibilità

- Ogni input deve avere label visibile.
- Errori di validazione chiari.
- Il submit deve essere disabilitato se il form non è valido.
- Usare `aria-describedby` se serve per messaggi di errore.

## SEO

Title:

> Contatti - Federico Croletti

Description:

> Contatta Federico Croletti per opportunità lavorative, collaborazioni, consulenze Angular, front-end enterprise e progetti web.
