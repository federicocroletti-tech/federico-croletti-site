# Endpoint form contatti

Servizio scelto: FormSubmit endpoint AJAX.

Endpoint configurato:

```txt
https://formsubmit.co/ajax/federico.croletti@gmail.com
```

File aggiornati:

```ts
// src/environments/environment.ts
contactEndpoint: 'https://formsubmit.co/ajax/federico.croletti@gmail.com';

// src/environments/environment.prod.ts
contactEndpoint: 'https://formsubmit.co/ajax/federico.croletti@gmail.com';
```

Non inserire nel frontend secret key, credenziali SMTP o token privati.

La sezione privacy `privacy.sections.formProvider` indica il servizio scelto e il link alla privacy policy.

Nota operativa: FormSubmit puo richiedere la conferma via email alla prima submission ricevuta per attivare l'indirizzo destinatario.
