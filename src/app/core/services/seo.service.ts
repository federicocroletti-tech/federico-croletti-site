import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SeoPageConfig {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly image?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly siteUrl = 'https://federico-croletti-site.onrender.com';
  private readonly fallbackImage = '/assets/images/og/federico-croletti-og.png';

  update(config: SeoPageConfig): void {
    const image = config.image ?? this.fallbackImage;
    const url = `${this.siteUrl}${config.path}`;

    this.titleService.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
  }
}
