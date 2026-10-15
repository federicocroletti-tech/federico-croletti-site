import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { SeoService } from '../../../core/services/seo.service';
import { ARTICLES } from '../data/articles.data';

@Component({
  selector: 'app-article-detail-page',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './article-detail-page.component.html',
  styleUrl: './article-detail-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleDetailPageComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly seo = inject(SeoService);

  readonly article = ARTICLES.find((item) => item.slug === this.route.snapshot.paramMap.get('slug'));

  constructor() {
    const article = this.article;

    this.seo.update({
      title: article ? `${article.title} | Federico Croletti` : 'Articolo non trovato | Federico Croletti',
      description: article?.description ?? 'Articolo non trovato nel sito di Federico Croletti.',
      path: article ? `/articoli/${article.slug}` : '/articoli',
      type: article ? 'article' : 'website',
      structuredData: article
        ? [
            {
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: article.title,
              description: article.description,
              datePublished: article.date,
              author: { '@type': 'Person', name: 'Federico Croletti' },
              inLanguage: 'it-IT',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'BreadcrumbList',
              itemListElement: [
                { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://federico-croletti-site.onrender.com/' },
                { '@type': 'ListItem', position: 2, name: 'Articoli', item: 'https://federico-croletti-site.onrender.com/articoli' },
                { '@type': 'ListItem', position: 3, name: article.title },
              ],
            },
          ]
        : [],
    });
  }
}
