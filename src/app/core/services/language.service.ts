import { DOCUMENT } from '@angular/common';
import { inject, Injectable, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

export const SUPPORTED_LANGUAGES = ['it', 'en'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly translateService = inject(TranslateService);
  private readonly document = inject(DOCUMENT);

  readonly currentLanguage = signal<SupportedLanguage>(this.resolveInitialLanguage());

  constructor() {
    this.translateService.addLangs([...SUPPORTED_LANGUAGES]);
    this.translateService.setFallbackLang('it');
    this.applyLanguage(this.currentLanguage());
  }

  setLanguage(language: SupportedLanguage): void {
    this.currentLanguage.set(language);
    this.applyLanguage(language);
    this.persistLanguage(language);
  }

  isSupportedLanguage(language: string): language is SupportedLanguage {
    return SUPPORTED_LANGUAGES.includes(language as SupportedLanguage);
  }

  private applyLanguage(language: SupportedLanguage): void {
    this.document.documentElement.lang = language;
    this.translateService.use(language).subscribe();
  }

  private resolveInitialLanguage(): SupportedLanguage {
    const storedLanguage = this.readStoredLanguage();

    if (storedLanguage && this.isSupportedLanguage(storedLanguage)) {
      return storedLanguage;
    }

    const browserLanguage = this.translateService.getBrowserLang();
    return browserLanguage && this.isSupportedLanguage(browserLanguage) ? browserLanguage : 'it';
  }

  private readStoredLanguage(): string | null {
    try {
      return globalThis.localStorage?.getItem('preferred-language') ?? null;
    } catch {
      return null;
    }
  }

  private persistLanguage(language: SupportedLanguage): void {
    try {
      globalThis.localStorage?.setItem('preferred-language', language);
    } catch {
      return;
    }
  }
}
