import { computed, Injectable, signal } from '@angular/core';

export interface CookiePreferences {
  readonly necessary: true;
  readonly analytics: boolean;
  readonly marketing: boolean;
  readonly updatedAt: string;
  readonly version: number;
}

interface EditableCookiePreferences {
  readonly analytics: boolean;
  readonly marketing: boolean;
}

const CONSENT_STORAGE_KEY = 'federico-croletti-cookie-consent-v1';
const CONSENT_VERSION = 1;

@Injectable({ providedIn: 'root' })
export class CookieConsentService {
  readonly preferences = signal<CookiePreferences | null>(this.readStoredPreferences());
  readonly analyticsDraft = signal(this.preferences()?.analytics ?? false);
  readonly preferencesPanelOpen = signal(false);
  readonly hasDecision = computed(() => this.preferences() !== null);
  readonly analyticsAccepted = computed(() => this.preferences()?.analytics ?? false);

  openPreferences(): void {
    this.analyticsDraft.set(this.preferences()?.analytics ?? false);
    this.preferencesPanelOpen.set(true);
  }

  closePreferences(): void {
    this.preferencesPanelOpen.set(false);
  }

  acceptAll(): void {
    this.savePreferences({ analytics: true, marketing: false });
  }

  rejectNonNecessary(): void {
    this.savePreferences({ analytics: false, marketing: false });
  }

  savePreferences(preferences: EditableCookiePreferences): void {
    const nextPreferences: CookiePreferences = {
      necessary: true,
      analytics: preferences.analytics,
      marketing: false,
      updatedAt: new Date().toISOString(),
      version: CONSENT_VERSION,
    };

    this.preferences.set(nextPreferences);
    this.analyticsDraft.set(nextPreferences.analytics);
    this.preferencesPanelOpen.set(false);
    this.writeStoredPreferences(nextPreferences);
  }

  private readStoredPreferences(): CookiePreferences | null {
    try {
      const storedPreferences = localStorage.getItem(CONSENT_STORAGE_KEY);

      if (!storedPreferences) {
        return null;
      }

      const parsedPreferences = JSON.parse(storedPreferences) as CookiePreferences;

      if (parsedPreferences.version !== CONSENT_VERSION) {
        return null;
      }

      return {
        necessary: true,
        analytics: Boolean(parsedPreferences.analytics),
        marketing: false,
        updatedAt: parsedPreferences.updatedAt,
        version: CONSENT_VERSION,
      };
    } catch {
      return null;
    }
  }

  private writeStoredPreferences(preferences: CookiePreferences): void {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(preferences));
    } catch {
      this.preferences.set(preferences);
    }
  }
}
