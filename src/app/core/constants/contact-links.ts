export const CONTACT_LINKS = {
  email: 'federico.croletti@gmail.com',
  phone: '3894658277',
  phoneDisplay: '389 465 8277',
  linkedIn: 'https://www.linkedin.com/in/federicocroletti/',
  facebook: 'https://www.facebook.com/federico.croletti',
  github: 'https://github.com/fcrolett/',
  whatsApp: 'https://wa.me/393894658277',
  googleBusiness:
    'https://www.google.com/search?q=Federico+Croletti+-+Supporto+Informatico+e+Consulenza+Digitale+Milano',
  googleReviews:
    'https://www.google.com/search?q=Federico+Croletti+-+Supporto+Informatico+e+Consulenza+Digitale+Milano',
  location: 'Milano (MI)',
  areaServed: ['Milano', 'Quarto Oggiaro', 'Certosa', 'Bovisa', 'Portello', 'Baranzate', 'Bollate'],
} as const;

export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: CONTACT_LINKS.linkedIn,
    ariaLabel: 'Vai al profilo LinkedIn di Federico Croletti',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    url: CONTACT_LINKS.facebook,
    ariaLabel: 'Vai al profilo Facebook di Federico Croletti',
  },
  {
    id: 'google-business',
    label: 'Google Business',
    url: CONTACT_LINKS.googleBusiness,
    ariaLabel: 'Apri il profilo Google Business di Federico Croletti',
  },
  {
    id: 'google-reviews',
    label: 'Recensioni Google',
    url: CONTACT_LINKS.googleReviews,
    ariaLabel: 'Leggi le recensioni Google di Federico Croletti',
  },
  {
    id: 'github',
    label: 'GitHub',
    url: CONTACT_LINKS.github,
    ariaLabel: 'Vai al profilo GitHub di Federico Croletti',
  },
  ...(CONTACT_LINKS.whatsApp
    ? [
        {
          id: 'whatsapp',
          label: 'WhatsApp',
          url: CONTACT_LINKS.whatsApp,
          ariaLabel: 'Scrivi a Federico Croletti su WhatsApp',
        },
      ]
    : []),
] as const;
