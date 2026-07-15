import { DOCUMENT } from '@angular/common';
import {
  effect,
  EffectRef,
  inject,
  Injectable,
  Injector,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

import { environment } from '../../../environments/environment';
import { CookieConsentService } from './cookie-consent.service';

type PlausibleEvent = (eventName: string) => void;

interface AnalyticsWindow extends Window {
  plausible?: PlausibleEvent;
}

const PLAUSIBLE_SCRIPT_ID = 'plausible-analytics-script';

@Injectable({ providedIn: 'root' })
export class AnalyticsService {
  private readonly consentService = inject(CookieConsentService);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly renderer: Renderer2 = inject(RendererFactory2).createRenderer(null, null);
  private readonly router = inject(Router);

  private consentEffect?: EffectRef;
  private routerTrackingInitialized = false;

  initialize(): void {
    if (this.consentEffect) {
      return;
    }

    this.consentEffect = effect(
      () => {
        if (environment.analytics.enabled && this.consentService.analyticsAccepted()) {
          this.loadAnalytics();
          return;
        }

        this.removeAnalytics();
      },
      { injector: this.injector },
    );

    this.initializeRouterTracking();
  }

  private initializeRouterTracking(): void {
    if (this.routerTrackingInitialized) {
      return;
    }

    this.routerTrackingInitialized = true;
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.consentService.analyticsAccepted()) {
          this.getWindow()?.plausible?.('pageview');
        }
      });
  }

  private loadAnalytics(): void {
    if (this.document.getElementById(PLAUSIBLE_SCRIPT_ID)) {
      return;
    }

    const script = this.renderer.createElement('script') as HTMLScriptElement;
    script.id = PLAUSIBLE_SCRIPT_ID;
    script.defer = true;
    script.src = environment.analytics.scriptUrl;
    script.setAttribute('data-domain', environment.analytics.domain);
    this.renderer.appendChild(this.document.head, script);
  }

  private removeAnalytics(): void {
    const script = this.document.getElementById(PLAUSIBLE_SCRIPT_ID);

    if (script) {
      this.renderer.removeChild(this.document.head, script);
    }
  }

  private getWindow(): AnalyticsWindow | null {
    return this.document.defaultView as AnalyticsWindow | null;
  }
}
