import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../../environments/environment';
import { ContactFormValue, ContactResponse } from '../models/contact-form.model';
import {
  CONTACT_EMAIL_NOT_CONFIGURED,
  CONTACT_NETWORK_BLOCKED,
  CONTACT_PROVIDER_REJECTED,
  CONTACT_SEND_FAILED,
  ContactService,
  EMAILJS_SEND,
} from './contact.service';

describe('ContactService', () => {
  let httpMock: HttpTestingController;
  let service: ContactService;
  let emailJsSend: TestSpy;
  const configuredFallbackEndpoint = 'https://forms.example.test/contact';
  const originalContactEndpoint = environment.contactEndpoint;
  const originalFallbackEndpoint = environment.contactFallbackEndpoint;
  const originalEmailJsConfig = { ...environment.emailJs };

  beforeEach(() => {
    emailJsSend = createEmailJsSendSpy();
    TestBed.configureTestingModule({
      providers: [
        ContactService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: EMAILJS_SEND, useValue: emailJsSend },
      ],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactService);
  });

  afterEach(() => {
    httpMock.verify();
    environment.contactEndpoint = originalContactEndpoint;
    environment.contactFallbackEndpoint = originalFallbackEndpoint;
    environment.emailJs.serviceId = originalEmailJsConfig.serviceId;
    environment.emailJs.templateId = originalEmailJsConfig.templateId;
    environment.emailJs.publicKey = originalEmailJsConfig.publicKey;
  });

  it('should send through EmailJS when the backend is disabled', async () => {
    configureEmailJs();
    resolveSpy(emailJsSend, { status: 200, text: 'OK' });
    let result: ContactResponse | undefined;

    service.sendMessage(createPayload()).subscribe((response) => {
      result = response;
    });

    await Promise.resolve();

    expect(emailJsSend).toHaveBeenCalledWith(
      'service_test',
      'template_53z902r',
      objectContaining({
        fullName: 'Federico Croletti',
        email: 'federico.croletti@gmail.com',
        replyTo: 'federico.croletti@gmail.com',
        subject: 'Collaborazione Angular',
        toEmail: 'federico.croletti@gmail.com',
      }),
      { publicKey: '_iLOaTnT9EoMQQvSn' },
    );
    expect(result).toEqual({ success: true, message: 'OK' });
  });

  it('should send through the public fallback when explicitly configured and EmailJS is not fully configured', () => {
    configureFallback();
    environment.emailJs.serviceId = '';
    let result: ContactResponse | undefined;

    service.sendMessage(createPayload()).subscribe((response) => {
      result = response;
    });

    const request = httpMock.expectOne(environment.contactFallbackEndpoint);
    expectUrlEncodedPayload(request.request.body);
    request.flush({ success: 'true', message: 'OK' });

    expect(result).toEqual({ success: true, message: 'OK' });
  });

  it('should use the backend before EmailJS when a backend endpoint is configured', () => {
    environment.contactEndpoint = 'https://backend.test/api/contact';
    configureEmailJs();
    let result: ContactResponse | undefined;

    service.sendMessage(createPayload()).subscribe((response) => {
      result = response;
    });

    const request = httpMock.expectOne(environment.contactEndpoint);
    expect(request.request.method).toBe('POST');
    expectUrlEncodedPayload(request.request.body);
    request.flush({ success: 'true', message: 'OK' });

    expect(emailJsSend).not.toHaveBeenCalled();
    expect(result).toEqual({ success: true, message: 'OK' });
  });

  it('should send through EmailJS when the backend fails', async () => {
    environment.contactEndpoint = 'https://backend.test/api/contact';
    configureEmailJs();
    resolveSpy(emailJsSend, { status: 200, text: 'OK' });
    let result: ContactResponse | undefined;

    service.sendMessage(createPayload()).subscribe((response) => {
      result = response;
    });

    httpMock
      .expectOne(environment.contactEndpoint)
      .flush(
        { success: false, message: CONTACT_SEND_FAILED },
        { status: 502, statusText: 'Bad Gateway' },
      );
    await Promise.resolve();

    expect(emailJsSend).toHaveBeenCalled();
    expect(result).toEqual({ success: true, message: 'OK' });
  });

  it('should send through the public fallback when explicitly configured and backend and EmailJS fail', async () => {
    configureFallback();
    environment.contactEndpoint = 'https://backend.test/api/contact';
    configureEmailJs();
    rejectSpy(emailJsSend, new Error(CONTACT_SEND_FAILED));
    let result: ContactResponse | undefined;

    service.sendMessage(createPayload()).subscribe((response) => {
      result = response;
    });

    httpMock
      .expectOne(environment.contactEndpoint)
      .flush(
        { success: false, message: CONTACT_SEND_FAILED },
        { status: 502, statusText: 'Bad Gateway' },
      );
    await Promise.resolve();

    const fallbackRequest = httpMock.expectOne(environment.contactFallbackEndpoint);
    expectUrlEncodedPayload(fallbackRequest.request.body);
    fallbackRequest.flush({ success: 'true', message: 'OK' });

    expect(result).toEqual({ success: true, message: 'OK' });
  });

  it('should not treat a fallback response without explicit success as sent', () => {
    configureFallback();
    environment.emailJs.serviceId = '';
    let errorMessage: string | undefined;

    service.sendMessage(createPayload()).subscribe({
      error: (error: Error) => {
        errorMessage = error.message;
      },
    });

    httpMock.expectOne(environment.contactFallbackEndpoint).flush({ message: 'OK' });

    expect(errorMessage).toBe(CONTACT_PROVIDER_REJECTED);
  });

  it('should expose a network-blocked error when the public fallback is blocked', () => {
    configureFallback();
    environment.emailJs.serviceId = '';
    let errorMessage: string | undefined;

    service.sendMessage(createPayload()).subscribe({
      error: (error: Error) => {
        errorMessage = error.message;
      },
    });

    httpMock
      .expectOne(environment.contactFallbackEndpoint)
      .error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });

    expect(errorMessage).toBe(CONTACT_NETWORK_BLOCKED);
  });

  it('should use the public fallback for backend email configuration errors', () => {
    configureFallback();
    environment.contactEndpoint = 'https://backend.test/api/contact';
    environment.emailJs.serviceId = '';
    let result: ContactResponse | undefined;

    service.sendMessage(createPayload()).subscribe((response) => {
      result = response;
    });

    httpMock
      .expectOne(environment.contactEndpoint)
      .flush(
        { success: false, message: CONTACT_EMAIL_NOT_CONFIGURED },
        { status: 503, statusText: 'Service Unavailable' },
      );

    httpMock
      .expectOne(environment.contactFallbackEndpoint)
      .flush({ success: 'true', message: 'OK' });

    expect(result).toEqual({ success: true, message: 'OK' });
  });
});

type TestSpy = ((...args: unknown[]) => unknown) & {
  mockRejectedValue?: (value: unknown) => unknown;
  mockResolvedValue?: (value: unknown) => unknown;
  and?: {
    rejectWith?: (value: unknown) => unknown;
    resolveTo?: (value: unknown) => unknown;
  };
};

function configureEmailJs(): void {
  environment.emailJs.serviceId = 'service_test';
  environment.emailJs.templateId = 'template_53z902r';
  environment.emailJs.publicKey = '_iLOaTnT9EoMQQvSn';
}

function configureFallback(): void {
  environment.contactFallbackEndpoint = 'https://forms.example.test/contact';
}

function objectContaining<T extends Record<string, unknown>>(value: T): unknown {
  const testGlobal = globalThis as typeof globalThis & {
    expect?: { objectContaining?: (value: T) => unknown };
    jasmine?: { objectContaining?: (value: T) => unknown };
  };

  return (
    testGlobal.expect?.objectContaining?.(value) ??
    testGlobal.jasmine?.objectContaining?.(value) ??
    value
  );
}

function createPayload(): ContactFormValue {
  return {
    fullName: 'Federico Croletti',
    email: 'federico.croletti@gmail.com',
    subject: 'Collaborazione Angular',
    requestType: 'website',
    message: 'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
    privacyAccepted: true,
    honeypot: '',
  };
}

function expectUrlEncodedPayload(requestBody: string): void {
  const body = new URLSearchParams(requestBody);
  expect(body.get('fullName')).toBe('Federico Croletti');
  expect(body.get('email')).toBe('federico.croletti@gmail.com');
  expect(body.get('subject')).toBe('Collaborazione Angular');
  expect(body.get('_subject')).toBe('[Sito] Collaborazione Angular');
  expect(body.get('_replyto')).toBe('federico.croletti@gmail.com');
  expect(body.get('_template')).toBe('table');
  expect(body.get('_captcha')).toBe('false');
  expect(body.get('requestType')).toBe('website');
  expect(body.get('message')).toBe(
    'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
  );
  expect(body.get('privacyAccepted')).toBe('yes');
  expect(body.get('honeypot')).toBe('');
}

function createEmailJsSendSpy(): TestSpy {
  const testGlobal = globalThis as typeof globalThis & {
    vi?: { fn: () => TestSpy };
    jasmine?: { createSpy: (name: string) => TestSpy };
  };

  return testGlobal.vi?.fn() ?? testGlobal.jasmine?.createSpy('emailJsSend') ?? (() => undefined);
}

function resolveSpy(spy: TestSpy, value: unknown): void {
  if (spy.mockResolvedValue) {
    spy.mockResolvedValue(value);
    return;
  }

  spy.and?.resolveTo?.(value);
}

function rejectSpy(spy: TestSpy, value: unknown): void {
  if (spy.mockRejectedValue) {
    spy.mockRejectedValue(value);
    return;
  }

  spy.and?.rejectWith?.(value);
}
