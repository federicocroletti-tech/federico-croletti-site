import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../../environments/environment';
import { ContactResponse } from '../models/contact-form.model';
import {
  CONTACT_EMAIL_NOT_CONFIGURED,
  CONTACT_NETWORK_BLOCKED,
  CONTACT_PROVIDER_REJECTED,
  CONTACT_SEND_FAILED,
  ContactService,
} from './contact.service';

describe('ContactService', () => {
  let httpMock: HttpTestingController;
  let service: ContactService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ContactService, provideHttpClient(), provideHttpClientTesting()],
    });

    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ContactService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should post a backend-compatible payload to the configured endpoint', () => {
    let result: ContactResponse | undefined;

    service
      .sendMessage({
        fullName: 'Federico Croletti',
        email: 'federico.croletti@gmail.com',
        subject: 'Collaborazione Angular',
        requestType: 'website',
        message:
          'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
        privacyAccepted: true,
        honeypot: '',
      })
      .subscribe((response) => {
        result = response;
      });

    const request = httpMock.expectOne(environment.contactEndpoint);
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('Accept')).toBe('application/json');
    expect(request.request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');

    const body = new URLSearchParams(request.request.body);
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

    request.flush({ success: 'true', message: 'OK' });

    expect(result).toEqual({ success: true, message: 'OK' });
  });

  it('should send through the public fallback when the backend fails', () => {
    let result: ContactResponse | undefined;

    service
      .sendMessage({
        fullName: 'Federico Croletti',
        email: 'federico.croletti@gmail.com',
        subject: 'Collaborazione Angular',
        requestType: 'website',
        message:
          'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
        privacyAccepted: true,
        honeypot: '',
      })
      .subscribe((response) => {
        result = response;
      });

    httpMock
      .expectOne(environment.contactEndpoint)
      .flush(
        { success: false, message: CONTACT_SEND_FAILED },
        { status: 502, statusText: 'Bad Gateway' },
      );

    const fallbackRequest = httpMock.expectOne(environment.contactFallbackEndpoint);
    expect(fallbackRequest.request.method).toBe('POST');
    expect(fallbackRequest.request.headers.get('Content-Type')).toBe(
      'application/x-www-form-urlencoded',
    );

    const fallbackBody = new URLSearchParams(fallbackRequest.request.body);
    expect(fallbackBody.get('fullName')).toBe('Federico Croletti');
    expect(fallbackBody.get('_subject')).toBe('[Sito] Collaborazione Angular');
    expect(fallbackBody.get('_replyto')).toBe('federico.croletti@gmail.com');

    fallbackRequest.flush({ success: 'true', message: 'OK' });

    expect(result).toEqual({ success: true, message: 'OK' });
  });

  it('should not treat a response without explicit success as sent', () => {
    let errorMessage: string | undefined;

    service
      .sendMessage({
        fullName: 'Federico Croletti',
        email: 'federico.croletti@gmail.com',
        subject: 'Collaborazione Angular',
        requestType: 'website',
        message:
          'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
        privacyAccepted: true,
        honeypot: '',
      })
      .subscribe({
        error: (error: Error) => {
          errorMessage = error.message;
        },
      });

    httpMock.expectOne(environment.contactEndpoint).flush({ message: 'OK' });
    httpMock.expectOne(environment.contactFallbackEndpoint).flush({ message: 'OK' });

    expect(errorMessage).toBe(CONTACT_PROVIDER_REJECTED);
  });

  it('should expose a network-blocked error when both endpoints are blocked', () => {
    let errorMessage: string | undefined;

    service
      .sendMessage({
        fullName: 'Federico Croletti',
        email: 'federico.croletti@gmail.com',
        subject: 'Collaborazione Angular',
        requestType: 'website',
        message:
          'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
        privacyAccepted: true,
        honeypot: '',
      })
      .subscribe({
        error: (error: Error) => {
          errorMessage = error.message;
        },
      });

    httpMock
      .expectOne(environment.contactEndpoint)
      .error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });
    httpMock
      .expectOne(environment.contactFallbackEndpoint)
      .error(new ProgressEvent('error'), { status: 0, statusText: 'Unknown Error' });

    expect(errorMessage).toBe(CONTACT_NETWORK_BLOCKED);
  });

  it('should use the public fallback for backend email configuration errors', () => {
    let result: ContactResponse | undefined;

    service
      .sendMessage({
        fullName: 'Federico Croletti',
        email: 'federico.croletti@gmail.com',
        subject: 'Collaborazione Angular',
        requestType: 'website',
        message:
          'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
        privacyAccepted: true,
        honeypot: '',
      })
      .subscribe((response) => {
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
