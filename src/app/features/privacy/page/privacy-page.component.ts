import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-privacy-page',
  standalone: true,
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './privacy-page.component.html',
  styleUrl: './privacy-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrivacyPageComponent {
  private readonly seo = inject(SeoService);

  readonly sections = [
    'privacy.sections.owner',
    'privacy.sections.purpose',
    'privacy.sections.data',
    'privacy.sections.mandatory',
    'privacy.sections.legalBasis',
    'privacy.sections.processing',
    'privacy.sections.formProvider',
    'privacy.sections.hosting',
    'privacy.sections.retention',
    'privacy.sections.recipients',
    'privacy.sections.transfers',
    'privacy.sections.newsletter',
    'privacy.sections.cookiesAnalytics',
    'privacy.sections.thirdParties',
    'privacy.sections.security',
    'privacy.sections.rights',
    'privacy.sections.contact',
    'privacy.sections.updates',
    'privacy.sections.legalReview',
  ] as const;

  constructor() {
    this.seo.update({
      title: 'Privacy - Federico Croletti',
      description:
        'Informativa privacy del sito personale di Federico Croletti e del form contatti.',
      path: '/privacy',
    });
  }
}
