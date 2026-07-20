import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CONTACT_LINKS } from '../../../core/constants/contact-links';
import { SeoService } from '../../../core/services/seo.service';
import { SERVICE_CATEGORIES } from '../../services/data/services.data';

interface TextCard {
  readonly titleKey: string;
  readonly bodyKey?: string;
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
  private readonly seo = inject(SeoService);

  readonly whatsAppUrl = CONTACT_LINKS.whatsApp;

  readonly servicePreview = SERVICE_CATEGORIES;

  readonly skillHighlights: readonly TextCard[] = [
    { titleKey: 'home.skills.webPractical.title', bodyKey: 'home.skills.webPractical.body' },
    { titleKey: 'home.skills.digitalSupport.title', bodyKey: 'home.skills.digitalSupport.body' },
    { titleKey: 'home.skills.aiCloud.title', bodyKey: 'home.skills.aiCloud.body' },
    { titleKey: 'home.skills.architecture.title', bodyKey: 'home.skills.architecture.body' },
  ];

  readonly experiencePoints = [
    'home.experience.points.angular',
    'home.experience.points.websitesWordpress',
    'home.experience.points.digitalServices',
    'home.experience.points.backupEmailFormatting',
    'home.experience.points.aiCertification',
    'home.experience.points.microFrontend',
    'home.experience.points.maps',
  ] as const;

  readonly values = [
    'home.values.clarity',
    'home.values.reliability',
    'home.values.experience',
    'home.values.concreteSupport',
    'home.values.simpleSolutions',
  ] as const;

  constructor() {
    this.seo.update({
      title: 'Federico Croletti - Senior Software Engineer Angular',
      description:
        'Federico Croletti, Senior Software Engineer Angular e consulente per siti web, WordPress, assistenza informatica, SPID, PEC, firma digitale, backup, gestione email e AI.',
      path: '/',
    });
  }
}
