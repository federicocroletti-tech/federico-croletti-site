import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-cookie-policy-page',
  standalone: true,
  imports: [MatCardModule, TranslatePipe],
  templateUrl: './cookie-policy-page.component.html',
  styleUrl: './cookie-policy-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiePolicyPageComponent {
  private readonly seo = inject(SeoService);

  readonly sections = [
    'cookiePolicy.sections.what',
    'cookiePolicy.sections.technical',
    'cookiePolicy.sections.preferences',
    'cookiePolicy.sections.analytics',
    'cookiePolicy.sections.marketing',
    'cookiePolicy.sections.thirdParties',
    'cookiePolicy.sections.manage',
    'cookiePolicy.sections.browser',
    'cookiePolicy.sections.updates',
    'cookiePolicy.sections.legalReview',
  ] as const;

  constructor() {
    this.seo.update({
      title: 'Cookie Policy - Federico Croletti',
      description:
        'Cookie policy del sito personale di Federico Croletti: cookie tecnici, preferenze, analytics e gestione del consenso.',
      path: '/cookie-policy',
    });
  }
}
