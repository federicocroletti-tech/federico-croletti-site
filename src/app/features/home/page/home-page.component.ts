import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CONTACT_LINKS } from '../../../core/constants/contact-links';
import { SeoService } from '../../../core/services/seo.service';

interface TextCard {
  readonly titleKey: string;
  readonly bodyKey: string;
}

interface WorkSample {
  readonly titleKey: string;
  readonly bodyKey: string;
  readonly ctaKey: string;
  readonly route: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);

  readonly contacts = CONTACT_LINKS;
  readonly profileHighlights = [
    'home.hero.highlights.engineering',
    'home.hero.highlights.leadership',
    'home.hero.highlights.delivery',
  ] as const;

  readonly engineeringCapabilities: readonly TextCard[] = [
    {
      titleKey: 'home.engineering.capabilities.frontend.title',
      bodyKey: 'home.engineering.capabilities.frontend.body',
    },
    {
      titleKey: 'home.engineering.capabilities.architecture.title',
      bodyKey: 'home.engineering.capabilities.architecture.body',
    },
    {
      titleKey: 'home.engineering.capabilities.leadership.title',
      bodyKey: 'home.engineering.capabilities.leadership.body',
    },
  ];

  readonly workSamples: readonly WorkSample[] = [
    {
      titleKey: 'home.work.samples.enterprise.title',
      bodyKey: 'home.work.samples.enterprise.body',
      ctaKey: 'home.work.samples.enterprise.cta',
      route: '/chi-sono',
    },
    {
      titleKey: 'home.work.samples.maps.title',
      bodyKey: 'home.work.samples.maps.body',
      ctaKey: 'home.work.samples.maps.cta',
      route: '/chi-sono',
    },
    {
      titleKey: 'home.work.samples.simulator.title',
      bodyKey: 'home.work.samples.simulator.body',
      ctaKey: 'home.work.samples.simulator.cta',
      route: '/simulatore-colloquio/',
    },
  ];

  readonly googleReviewSummary = {
    rating: '5,0',
    reviewCountLabelKey: 'home.googleReviews.reviewCountLabel',
  } as const;

  constructor() {
    this.seo.update({
      title: 'Federico Croletti | Senior Software Engineer e Frontend Tech Lead',
      description:
        'Senior Software Engineer e Frontend Tech Lead con esperienza in Angular, Micro Frontend, architetture enterprise e people management. Progetti, competenze e contatti.',
      path: '/',
    });
  }
}
