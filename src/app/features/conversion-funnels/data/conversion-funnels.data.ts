import { ConversionFunnel, ConversionService } from '../../../core/models/conversion-analytics.model';

export interface FunnelDefinition {
  readonly id: ConversionFunnel;
  readonly service: ConversionService;
  readonly label: string;
  readonly title: string;
  readonly intro: string;
  readonly contactCta: string;
  readonly contactQueryParams: Record<string, string>;
}

export const FUNNEL_DEFINITIONS: readonly FunnelDefinition[] = [
  {
    id: 'angular',
    service: 'angular-architecture',
    label: 'Consulenza Angular',
    title: 'Consulenza Angular e architettura frontend',
    intro:
      'Percorso per aziende e team che devono evolvere applicazioni Angular, ridurre debito tecnico o progettare frontend scalabili.',
    contactCta: 'Richiedi una consulenza Angular',
    contactQueryParams: {
      service: 'angular-architecture',
      funnel: 'angular',
      source: 'angular_funnel',
    },
  },
  {
    id: 'local-support',
    service: 'it-support',
    label: 'Assistenza informatica Milano',
    title: 'Assistenza informatica a Milano',
    intro:
      'Percorso locale per problemi pratici su PC, email, backup, account, configurazioni e strumenti digitali.',
    contactCta: 'Richiedi assistenza a Milano',
    contactQueryParams: {
      service: 'it-support',
      funnel: 'local-support',
      source: 'local_support_funnel',
    },
  },
];

export const getFunnelByService = (service: string | null): FunnelDefinition | undefined =>
  FUNNEL_DEFINITIONS.find((funnel) => funnel.service === service);