import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { CONTACT_LINKS, WHATS_APP_LINKS } from '../../../core/constants/contact-links';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { SeoService } from '../../../core/services/seo.service';
import { FUNNEL_DEFINITIONS } from '../../conversion-funnels/data/conversion-funnels.data';

interface LocalServiceGroup {
  readonly title: string;
  readonly icon: string;
  readonly items: readonly string[];
}

interface FaqItem {
  readonly question: string;
  readonly answer: string;
}

@Component({
  selector: 'app-local-support-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './local-support-page.component.html',
  styleUrl: './local-support-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocalSupportPageComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  readonly contacts = CONTACT_LINKS;
  readonly whatsAppUrl = WHATS_APP_LINKS.localService('assistenza informatica a Milano');
  readonly funnel = FUNNEL_DEFINITIONS[1];

  readonly serviceGroups: readonly LocalServiceGroup[] = [
    {
      title: 'Computer',
      icon: 'computer',
      items: [
        'Configurazione di un nuovo computer',
        'Ottimizzazione di computer lenti',
        'Aggiornamenti software',
        'Installazione e configurazione di programmi',
        'Rimozione di software inutilizzati',
        'Trasferimento dei dati',
        'Supporto per problemi comuni',
        'Verifica preliminare del problema',
      ],
    },
    {
      title: 'Email e servizi digitali',
      icon: 'alternate_email',
      items: [
        'Configurazione email',
        'Configurazione PEC',
        'Supporto per firma digitale',
        'Supporto per SPID',
        'Supporto per account online',
        'Configurazione di strumenti digitali',
      ],
    },
    {
      title: 'Dispositivi e periferiche',
      icon: 'print',
      items: [
        'Configurazione di stampanti',
        'Collegamento di periferiche',
        'Supporto smartphone',
        'Configurazioni di base per reti e Wi-Fi',
        'Sincronizzazione tra dispositivi',
      ],
    },
    {
      title: 'Sicurezza e backup',
      icon: 'security',
      items: [
        'Configurazione di backup',
        'Trasferimento prudente dei dati',
        'Aggiornamenti di sicurezza',
        'Configurazione di autenticazione a piu fattori',
        'Educazione di base contro phishing e truffe online',
      ],
    },
    {
      title: 'Siti e piccoli strumenti digitali',
      icon: 'web',
      items: [
        'Landing page',
        'Portfolio',
        'Siti informativi',
        'Piccoli strumenti web',
        'Supporto digitale per professionisti e piccole attivita',
      ],
    },
  ];

  readonly steps = [
    'Il cliente descrive il problema.',
    'Viene effettuata una prima valutazione.',
    'Vengono chiariti modalita, tempi e costi.',
    'L\'intervento viene svolto in presenza o da remoto.',
    'Al termine vengono spiegate le operazioni effettuate.',
  ] as const;

  readonly faqs: readonly FaqItem[] = [
    {
      question: 'Quali problemi informatici puoi gestire?',
      answer: 'Problemi comuni su computer, email, PEC, stampanti, backup, account online, smartphone e strumenti digitali. I casi complessi vengono valutati prima di confermare l\'intervento.',
    },
    {
      question: 'Gli interventi vengono svolti a domicilio o da remoto?',
      answer: 'Possono essere svolti in presenza a Milano e nelle zone effettivamente servite, oppure da remoto quando il problema lo consente.',
    },
    {
      question: 'Quanto costa un intervento?',
      answer: '[TBD: indicare criteri o fascia di prezzo se si decide di pubblicarla]. Costi e modalita vanno chiariti prima dell\'intervento.',
    },
    {
      question: 'Effettui recupero dati?',
      answer: 'Posso aiutare con trasferimenti prudenti e backup di base. Il recupero dati da dispositivi danneggiati richiede valutazione specialistica e non puo essere garantito.',
    },
  ];

  trackLocalContact(source: string): void {
    this.analytics.trackEvent('cta_click', {
      service: this.funnel.service,
      funnel: this.funnel.id,
      source,
      step: 'contact_intent',
    });
  }

  constructor() {
    this.seo.update({
      title: 'Assistenza informatica a Milano | Federico Croletti',
      description:
        'Assistenza informatica e supporto digitale a Milano per privati, professionisti e piccole attivita. Supporto per PC, email, PEC, stampanti, backup e servizi digitali.',
      path: '/assistenza-informatica-milano',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'ProfessionalService',
          name: 'Federico Croletti',
          description: 'Assistenza informatica e consulenza digitale a Milano per privati, professionisti e piccole attivita.',
          areaServed: 'Milano e zone limitrofe effettivamente servite',
          url: 'https://federico-croletti-site.onrender.com/assistenza-informatica-milano',
        },
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Assistenza informatica a Milano',
          provider: { '@type': 'Person', name: 'Federico Croletti' },
          areaServed: 'Milano e zone limitrofe effettivamente servite',
          serviceType: 'Supporto informatico e consulenza digitale',
        },
      ],
    });
  }
}
