import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { environment } from '../../../../environments/environment';
import { ContactResponse } from '../models/contact-form.model';
import { ContactService } from './contact.service';

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

  it('should post a FormSubmit-compatible payload to the configured endpoint', () => {
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
    expect(body.get('name')).toBe('Federico Croletti');
    expect(body.get('email')).toBe('federico.croletti@gmail.com');
    expect(body.get('_replyto')).toBe('federico.croletti@gmail.com');
    expect(body.get('_subject')).toBe('Collaborazione Angular');
    expect(body.get('subject')).toBe('Collaborazione Angular');
    expect(body.get('requestType')).toBe('website');
    expect(body.get('message')).toBe(
      'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
    );
    expect(body.get('privacyAccepted')).toBe('yes');
    expect(body.get('_template')).toBe('table');
    expect(body.get('_captcha')).toBe('false');

    request.flush({ success: 'true', message: 'OK' });

    expect(result).toEqual({ success: true, message: 'OK' });
  });
});
