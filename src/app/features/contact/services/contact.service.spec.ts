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
    expect(request.request.body).toEqual({
      name: 'Federico Croletti',
      email: 'federico.croletti@gmail.com',
      _replyto: 'federico.croletti@gmail.com',
      _subject: 'Collaborazione Angular',
      subject: 'Collaborazione Angular',
      requestType: 'website',
      message: 'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
      privacyAccepted: 'yes',
      _template: 'table',
      _captcha: 'false',
    });

    request.flush({ success: 'true', message: 'OK' });

    expect(result).toEqual({ success: true, message: 'OK' });
  });
});
