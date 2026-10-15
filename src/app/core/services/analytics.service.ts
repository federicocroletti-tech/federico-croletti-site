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
import {
  AnalyticsEventName,
  AnalyticsEventProps,
  ConversionService,
  ConversionDashboardSummary,
  LocalAnalyticsBucket,
} from '../models/conversion-analytics.model';
import { CookieConsentService } from './cookie-consent.service';

type PlausibleEvent = (eventName: string, options?: { props?: Record<string, string> }) => void;

interface AnalyticsWindow extends Window {
  plausible?: PlausibleEvent;
}

const PLAUSIBLE_SCRIPT_ID = 'plausible-analytics-script';
const LOCAL_ANALYTICS_STORAGE_KEY = 'federico-croletti-local-analytics-v1';

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

  trackEvent(eventName: AnalyticsEventName | string, props?: AnalyticsEventProps): void {
    if (!environment.analytics.enabled || !this.consentService.analyticsAccepted()) {
      return;
    }

    this.trackLocalAggregate(eventName, props);
    this.trackConfiguredProvider(eventName, props);
  }

  getDashboardSummary(): ConversionDashboardSummary {
    const buckets = this.readLocalBuckets();

    return {
      totalEvents: buckets.reduce((total, bucket) => total + bucket.count, 0),
      conversions: this.sumBuckets(buckets, 'conversion'),
      angularConversions:
        this.sumBuckets(buckets, 'conversion', 'angular-architecture') +
        this.sumBuckets(buckets, 'conversion', 'frontend-consulting'),
      localSupportConversions: this.sumBuckets(buckets, 'conversion', 'it-support'),
      buckets,
    };
  }

  private initializeRouterTracking(): void {
    if (this.routerTrackingInitialized) {
      return;
    }

    this.routerTrackingInitialized = true;
    this.router.events
      .pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd))
      .subscribe(() => {
        this.trackEvent('pageview');
      });
  }

  private loadAnalytics(): void {
    if (environment.analytics.provider !== 'plausible') {
      return;
    }

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

  private trackConfiguredProvider(
    eventName: AnalyticsEventName | string,
    props?: AnalyticsEventProps,
  ): void {
    if (environment.analytics.provider !== 'plausible') {
      return;
    }

    this.getWindow()?.plausible?.(
      eventName,
      props ? { props: this.stringifyProps(props) } : undefined,
    );
  }

  private trackLocalAggregate(eventName: AnalyticsEventName | string, props?: AnalyticsEventProps): void {
    if (!environment.analytics.collectLocalAggregates) {
      return;
    }

    const date = new Date().toISOString().slice(0, 10);
    const service: ConversionService | 'unknown' = props?.service ?? 'unknown';
    const source = props?.source ?? props?.path ?? 'unknown';
    const key = [date, eventName, service, source].join('|');
    const buckets = this.readLocalBuckets();
    const existingBucket = buckets.find((bucket) => bucket.key === key);
    const nextBuckets = existingBucket
      ? buckets.map((bucket) =>
          bucket.key === key ? { ...bucket, count: bucket.count + 1 } : bucket,
        )
      : [...buckets, { key, date, eventName, service, source, count: 1 }];

    this.writeLocalBuckets(nextBuckets);
  }

  private readLocalBuckets(): readonly LocalAnalyticsBucket[] {
    const storage = this.getWindow()?.localStorage;

    if (!storage) {
      return [];
    }

    try {
      const rawBuckets = storage.getItem(LOCAL_ANALYTICS_STORAGE_KEY);

      return rawBuckets ? (JSON.parse(rawBuckets) as readonly LocalAnalyticsBucket[]) : [];
    } catch {
      return [];
    }
  }

  private writeLocalBuckets(buckets: readonly LocalAnalyticsBucket[]): void {
    try {
      this.getWindow()?.localStorage.setItem(LOCAL_ANALYTICS_STORAGE_KEY, JSON.stringify(buckets));
    } catch {
      return;
    }
  }

  private stringifyProps(props: AnalyticsEventProps): Record<string, string> {
    return Object.fromEntries(
      Object.entries(props).filter((entry): entry is [string, string] => typeof entry[1] === 'string'),
    );
  }

  private sumBuckets(
    buckets: readonly LocalAnalyticsBucket[],
    eventName: string,
    service?: string,
  ): number {
    return buckets
      .filter((bucket) => bucket.eventName === eventName && (!service || bucket.service === service))
      .reduce((total, bucket) => total + bucket.count, 0);
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
