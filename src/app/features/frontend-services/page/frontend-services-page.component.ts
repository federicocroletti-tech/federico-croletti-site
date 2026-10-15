import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

import { AnalyticsService } from '../../../core/services/analytics.service';
import { SeoService } from '../../../core/services/seo.service';
import { FUNNEL_DEFINITIONS } from '../../conversion-funnels/data/conversion-funnels.data';

interface ServiceArea {
  readonly title: string;
  readonly description: string;
  readonly icon: string;
}

@Component({
  selector: 'app-frontend-services-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './frontend-services-page.component.html',
  styleUrl: './frontend-services-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FrontendServicesPageComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  readonly funnel = FUNNEL_DEFINITIONS[0];

  readonly serviceAreas: readonly ServiceArea[] = [
    {
      icon: 'architecture',
      title: 'Progettazione di applicazioni Angular',
      description: 'Struttura modulare, routing, componenti standalone, integrazione API REST e basi solide per prodotti frontend enterprise.',
    },
    {
      icon: 'device_hub',
      title: 'Architettura frontend e Micro Frontend',
      description: 'Valutazione e progettazione di shell, Module Federation, librerie condivise, contratti tra applicazioni e convenzioni tecniche.',
    },
    {
      icon: 'sync_alt',
      title: 'Evoluzione e refactoring',
      description: 'Supporto su applicazioni Angular esistenti, migrazioni, riduzione del debito tecnico e revisione di codice complesso.',
    },
    {
      icon: 'query_stats',
      title: 'Performance e qualita',
      description: 'Analisi di bundle, rendering, accessibilita, Core Web Vitals, gestione dello stato e ottimizzazione dei flussi critici.',
    },
    {
      icon: 'rule',
      title: 'Code review e best practice',
      description: 'Review tecniche, standard di progetto, pattern facade, separazione responsabilita, testabilita e manutenibilita.',
    },
    {
      icon: 'school',
      title: 'Mentoring e supporto ai team',
      description: 'Affiancamento tecnico, documentazione delle decisioni, crescita delle persone e coordinamento frontend pragmatico.',
    },
  ];

  readonly useCases = [
    'Il progetto Angular e difficile da mantenere o far evolvere.',
    'Serve introdurre o valutare Micro Frontend e Module Federation.',
    'Una migrazione Angular richiede una strategia tecnica chiara.',
    'Il codice frontend e poco standardizzato o fragile.',
    'Ci sono problemi di performance, bundle o rendering.',
    'Il team ha bisogno di mentoring, review o convenzioni condivise.',
  ] as const;

  constructor() {
    this.seo.update({
      title: 'Consulenza Angular e architettura frontend | Federico Croletti',
      description:
        'Consulenza Angular, architettura frontend, Micro Frontend, Module Federation, performance, code review e mentoring per team e applicazioni enterprise.',
      path: '/servizi-frontend',
      structuredData: [
        {
          '@context': 'https://schema.org',
          '@type': 'Service',
          name: 'Consulenza Angular e architettura frontend',
          provider: { '@type': 'Person', name: 'Federico Croletti' },
          serviceType: 'Frontend engineering consulting',
          areaServed: 'Italia',
        },
      ],
    });
  }

  trackCta(source: string): void {
    this.analytics.trackEvent('cta_click', {
      service: this.funnel.service,
      funnel: this.funnel.id,
      source,
      step: 'contact_intent',
    });
  }
}
