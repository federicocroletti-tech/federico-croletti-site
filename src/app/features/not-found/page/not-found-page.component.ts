import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-not-found-page',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './not-found-page.component.html',
  styleUrl: './not-found-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotFoundPageComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.update({
      title: 'Pagina non trovata | Federico Croletti',
      description: 'La pagina richiesta non e disponibile sul sito di Federico Croletti.',
      path: '/404',
    });
  }
}
