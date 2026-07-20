export const environment = {
  production: false,
  siteUrl: 'https://federico-croletti-site.onrender.com',
  contactEndpoint: 'https://federico-croletti-api.onrender.com/api/contact',
  contactFallbackEndpoint: 'https://formsubmit.co/ajax/federico.croletti@gmail.com',
  emailJs: {
    serviceId: '',
    templateId: '',
    publicKey: '',
  },
  analytics: {
    enabled: true,
    provider: 'Plausible',
    domain: 'federico-croletti-site.onrender.com',
    scriptUrl: 'https://plausible.io/js/script.js',
  },
};
