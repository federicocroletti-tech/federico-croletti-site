const WHATS_APP_PHONE = '393894658277';

const createWhatsAppUrl = (message: string): string =>
  `https://wa.me/${WHATS_APP_PHONE}?text=${encodeURIComponent(message)}`;

export const WHATS_APP_LINKS = {
  homeHero: createWhatsAppUrl(
    'Ciao Federico, ti contatto dal sito per assistenza informatica o consulenza digitale a Milano.',
  ),
  contactPage: createWhatsAppUrl(
    'Ciao Federico, ti contatto dalla pagina Contatti del sito. Vorrei parlarti di una richiesta.',
  ),
  floating: createWhatsAppUrl(
    'Ciao Federico, ti contatto dal sito. Ho bisogno di supporto informatico o consulenza digitale.',
  ),
  footer: createWhatsAppUrl(
    'Ciao Federico, ho trovato i tuoi contatti sul sito e vorrei chiederti alcune informazioni.',
  ),
  localService: (serviceTitle: string): string =>
    createWhatsAppUrl(`Ciao Federico, ti contatto dal sito per informazioni su: ${serviceTitle}.`),
} as const;

export const CONTACT_LINKS = {
  email: 'federico.croletti@gmail.com',
  phone: '3894658277',
  phoneDisplay: '389 465 8277',
  linkedIn: 'https://www.linkedin.com/in/federicocroletti/',
  facebook: 'https://www.facebook.com/federico.croletti',
  github: 'https://github.com/federicocroletti-tech',
  whatsApp: WHATS_APP_LINKS.floating,
  googleBusiness: 'https://www.google.com/search?q=Federico+Croletti+azienda+informatica+Milano',
  googleReviews: 'https://g.page/r/CVUvo9RO_7A1EBM/review',
  location: 'Milano (MI)',
  areaServed: ['Milano', 'Quarto Oggiaro', 'Certosa', 'Bovisa', 'Portello', 'Baranzate', 'Bollate'],
} as const;

export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    labelKey: 'social.linkedin.label',
    url: CONTACT_LINKS.linkedIn,
    ariaLabelKey: 'social.linkedin.ariaLabel',
  },
  {
    id: 'facebook',
    labelKey: 'social.facebook.label',
    url: CONTACT_LINKS.facebook,
    ariaLabelKey: 'social.facebook.ariaLabel',
  },
  {
    id: 'google-business',
    labelKey: 'social.googleBusiness.label',
    url: CONTACT_LINKS.googleBusiness,
    ariaLabelKey: 'social.googleBusiness.ariaLabel',
  },
  {
    id: 'google-reviews',
    labelKey: 'social.googleReviews.label',
    url: CONTACT_LINKS.googleReviews,
    ariaLabelKey: 'social.googleReviews.ariaLabel',
  },
  {
    id: 'github',
    labelKey: 'social.github.label',
    url: CONTACT_LINKS.github,
    ariaLabelKey: 'social.github.ariaLabel',
  },
  ...(CONTACT_LINKS.whatsApp
    ? [
        {
          id: 'whatsapp',
          labelKey: 'social.whatsapp.label',
          url: WHATS_APP_LINKS.footer,
          ariaLabelKey: 'social.whatsapp.ariaLabel',
        },
      ]
    : []),
] as const;
