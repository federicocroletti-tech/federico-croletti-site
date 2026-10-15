import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AnalyticsService } from './analytics.service';
import { CookieConsentService } from './cookie-consent.service';

describe('AnalyticsService', () => {
  let analytics: AnalyticsService;
  let consent: CookieConsentService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [provideRouter([])],
    });

    analytics = TestBed.inject(AnalyticsService);
    consent = TestBed.inject(CookieConsentService);
  });

  afterEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('stores only aggregate conversion counters after analytics consent', () => {
    consent.acceptAll();

    analytics.trackEvent('conversion', {
      service: 'angular-architecture',
      funnel: 'angular',
      source: 'unit_test',
      step: 'contact_form_sent',
    });
    analytics.trackEvent('conversion', {
      service: 'angular-architecture',
      funnel: 'angular',
      source: 'unit_test',
      step: 'contact_form_sent',
    });

    const summary = analytics.getDashboardSummary();

    expect(summary.conversions).toBe(2);
    expect(summary.angularConversions).toBe(2);
    expect(summary.localSupportConversions).toBe(0);
    expect(summary.buckets[0].eventName).toBe('conversion');
    expect(summary.buckets[0].service).toBe('angular-architecture');
    expect(summary.buckets[0].source).toBe('unit_test');
    expect(summary.buckets[0].count).toBe(2);
  });

  it('does not store local analytics before consent', () => {
    analytics.trackEvent('conversion', {
      service: 'it-support',
      funnel: 'local-support',
      source: 'unit_test',
    });

    expect(analytics.getDashboardSummary().totalEvents).toBe(0);
  });
});