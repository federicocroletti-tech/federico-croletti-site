import { TestBed } from '@angular/core/testing';

import { CookieConsentService } from './cookie-consent.service';

describe('CookieConsentService', () => {
  let service: CookieConsentService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookieConsentService);
  });

  afterEach(() => {
    localStorage.clear();
    TestBed.resetTestingModule();
  });

  it('should reset the analytics draft when non-essential cookies are rejected', () => {
    service.acceptAll();
    service.openPreferences();

    expect(service.analyticsAccepted()).toBeTruthy();
    expect(service.analyticsDraft()).toBeTruthy();

    service.rejectNonNecessary();
    service.openPreferences();

    expect(service.analyticsAccepted()).toBeFalsy();
    expect(service.analyticsDraft()).toBeFalsy();
  });
});