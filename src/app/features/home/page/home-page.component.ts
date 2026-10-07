import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CONTACT_LINKS, WHATS_APP_LINKS } from '../../../core/constants/contact-links';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { SeoService } from '../../../core/services/seo.service';
import { SERVICE_CATEGORIES } from '../../services/data/services.data';

interface TextCard {
  readonly titleKey: string;
  readonly bodyKey?: string;
}

interface LocalServiceSection {
  readonly id: string;
  readonly icon: string;
  readonly titleKey: string;
  readonly bodyKey: string;
  readonly areaTextKey: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  readonly contacts = CONTACT_LINKS;
  readonly whatsAppLinks = WHATS_APP_LINKS;
  readonly servicePreview = SERVICE_CATEGORIES;

  readonly localServiceSections: readonly LocalServiceSection[] = [
    {
      id: 'assistenza-pc-notebook',
      icon: 'computer',
      titleKey: 'home.localServices.items.pc.title',
      bodyKey: 'home.localServices.items.pc.body',
      areaTextKey: 'home.localServices.items.pc.areaText',
    },
    {
      id: 'configurazione-email-pec',
      icon: 'mark_email_read',
      titleKey: 'home.localServices.items.email.title',
      bodyKey: 'home.localServices.items.email.body',
      areaTextKey: 'home.localServices.items.email.areaText',
    },
    {
      id: 'spid-firma-digitale',
      icon: 'verified_user',
      titleKey: 'home.localServices.items.digitalIdentity.title',
      bodyKey: 'home.localServices.items.digitalIdentity.body',
      areaTextKey: 'home.localServices.items.digitalIdentity.areaText',
    },
    {
      id: 'supporto-smartphone',
      icon: 'smartphone',
      titleKey: 'home.localServices.items.smartphone.title',
      bodyKey: 'home.localServices.items.smartphone.body',
      areaTextKey: 'home.localServices.items.smartphone.areaText',
    },
    {
      id: 'sicurezza-informatica',
      icon: 'security',
      titleKey: 'home.localServices.items.security.title',
      bodyKey: 'home.localServices.items.security.body',
      areaTextKey: 'home.localServices.items.security.areaText',
    },
    {
      id: 'sviluppo-software-siti-web',
      icon: 'code',
      titleKey: 'home.localServices.items.software.title',
      bodyKey: 'home.localServices.items.software.body',
      areaTextKey: 'home.localServices.items.software.areaText',
    },
    {
      id: 'consulenza-it-professionisti-imprese',
      icon: 'business_center',
      titleKey: 'home.localServices.items.consulting.title',
      bodyKey: 'home.localServices.items.consulting.body',
      areaTextKey: 'home.localServices.items.consulting.areaText',
    },
  ];

  readonly googleReviewSummary = {
    rating: '5,0',
    reviewCountLabelKey: 'home.googleReviews.reviewCountLabel',
  } as const;

  readonly skillHighlights: readonly TextCard[] = [
    { titleKey: 'home.skills.webPractical.title', bodyKey: 'home.skills.webPractical.body' },
    { titleKey: 'home.skills.digitalSupport.title', bodyKey: 'home.skills.digitalSupport.body' },
    { titleKey: 'home.skills.aiCloud.title', bodyKey: 'home.skills.aiCloud.body' },
    { titleKey: 'home.skills.architecture.title', bodyKey: 'home.skills.architecture.body' },
  ];

  readonly experiencePoints = [
    'home.experience.points.angular',
    'home.experience.points.aiCertification',
    'home.experience.points.maps',
  ] as const;

  readonly values = [
    'home.values.clarity',
    'home.values.reliability',
    'home.values.experience',
    'home.values.concreteSupport',
    'home.values.simpleSolutions',
  ] as const;

  trackWhatsAppClick(source: string): void {
    this.analytics.trackEvent('WhatsApp Click', { source });
  }

  constructor() {
    this.seo.update({
      title: 'Federico Croletti - Supporto Informatico e Consulenza Digitale a Milano',
      description:
        'Federico Croletti, tecnico informatico a Milano. Assistenza PC, configurazione email, PEC, SPID, sicurezza informatica, consulenza IT, recensioni Google e sito web ufficiale.',
      path: '/',
    });
  }
}
