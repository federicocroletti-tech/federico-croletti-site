import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { ARTICLES } from '../data/articles.data';

@Component({
  selector: 'app-articles-page',
  standalone: true,
  imports: [MatCardModule, RouterLink],
  templateUrl: './articles-page.component.html',
  styleUrl: './articles-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticlesPageComponent {
  private readonly seo = inject(SeoService);

  readonly articles = ARTICLES;
  readonly categories = ['Frontend', 'Assistenza informatica'] as const;

  constructor() {
    this.seo.update({
      title: 'Articoli frontend e assistenza informatica | Federico Croletti',
      description:
        'Articoli di Federico Croletti su Angular, architetture frontend, Micro Frontend, performance e supporto informatico pratico.',
      path: '/articoli',
    });
  }
}
