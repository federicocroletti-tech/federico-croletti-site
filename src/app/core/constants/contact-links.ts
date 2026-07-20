export const CONTACT_LINKS = {
  email: 'federico.croletti@gmail.com',
  linkedIn: 'https://www.linkedin.com/in/federicocroletti/',
  github: 'https://github.com/fedecroletti/',
  whatsApp: 'https://wa.me/393894658277',
  location: 'Milano zona nord-ovest - Quarto Oggiaro',
} as const;

export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    url: CONTACT_LINKS.linkedIn,
    ariaLabel: 'Vai al profilo LinkedIn di Federico Croletti',
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
