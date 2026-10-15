import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { environment } from '../../../environments/environment';

interface SeoPageConfig {
  readonly title: string;
  readonly description: string;
  readonly path: string;
  readonly image?: string;
  readonly type?: 'website' | 'article' | 'profile';
  readonly structuredData?: readonly Record<string, unknown>[];
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly titleService = inject(Title);
  private readonly meta = inject(Meta);
  private readonly siteUrl = environment.siteUrl;
  private readonly fallbackImage = '/assets/images/og/federico-croletti-og.png';

  update(config: SeoPageConfig): void {
    const image = this.toAbsoluteUrl(config.image ?? this.fallbackImage);
    const url = `${this.siteUrl}${config.path}`;

    this.titleService.setTitle(config.title);
    this.meta.updateTag({ name: 'description', content: config.description });
    this.meta.updateTag({ name: 'robots', content: 'index, follow, max-image-preview:large' });
    this.meta.updateTag({ name: 'author', content: 'Federico Croletti' });
    this.meta.updateTag({ name: 'geo.region', content: 'IT-MI' });
    this.meta.updateTag({ name: 'geo.placename', content: 'Milano' });
    this.meta.updateTag({ property: 'og:title', content: config.title });
    this.meta.updateTag({ property: 'og:description', content: config.description });
    this.meta.updateTag({ property: 'og:type', content: config.type === 'article' ? 'article' : 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Federico Croletti' });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: image });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: config.title });
    this.meta.updateTag({ name: 'twitter:description', content: config.description });
    this.meta.updateTag({ name: 'twitter:image', content: image });
    this.updateCanonical(url);
    this.updateStructuredData(config.structuredData ?? []);
  }

  private toAbsoluteUrl(url: string): string {
    return url.startsWith('http') ? url : `${this.siteUrl}${url}`;
  }

  private updateCanonical(url: string): void {
    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      this.document.head.appendChild(canonical);
    }

    canonical.setAttribute('href', url);
  }

  private updateStructuredData(items: readonly Record<string, unknown>[]): void {
    this.document
      .querySelectorAll<HTMLScriptElement>('script[data-managed-json-ld="true"]')
      .forEach((script) => script.remove());

    items.forEach((item) => {
      const script = this.document.createElement('script');
      script.type = 'application/ld+json';
      script.dataset['managedJsonLd'] = 'true';
      script.text = JSON.stringify(item);
      this.document.head.appendChild(script);
    });
  }
}
