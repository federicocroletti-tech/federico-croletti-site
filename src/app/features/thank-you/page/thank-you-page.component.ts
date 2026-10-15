import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { getFunnelByService } from '../../conversion-funnels/data/conversion-funnels.data';

@Component({
  selector: 'app-thank-you-page',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './thank-you-page.component.html',
  styleUrl: './thank-you-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThankYouPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly funnel = getFunnelByService(this.route.snapshot.queryParamMap.get('service'));

  constructor() {
    this.seo.update({
      title: 'Grazie per la richiesta - Federico Croletti',
      description: 'Conferma invio richiesta dal sito personale di Federico Croletti.',
      path: '/grazie',
    });
  }
}