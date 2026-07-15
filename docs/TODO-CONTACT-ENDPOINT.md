# TODO endpoint form contatti

Scegliere un servizio esterno compatibile con siti statici, ad esempio:

- Formspree
- Web3Forms
- Getform
- Basin

Poi aggiornare:

```ts
// src/environments/environment.ts
contactEndpoint: 'URL_ENDPOINT_REALE';

// src/environments/environment.prod.ts
contactEndpoint: 'URL_ENDPOINT_REALE';
```

Non inserire nel frontend secret key, credenziali SMTP o token privati.

Aggiornare anche la sezione privacy `privacy.sections.formProvider` indicando il servizio effettivamente scelto e il link alla sua privacy policy.
