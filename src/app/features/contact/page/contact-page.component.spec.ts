import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

import { ContactFormComponent } from '../components/contact-form/contact-form.component';
import { ContactService } from '../services/contact.service';

describe('ContactFormComponent', () => {
  let component: ContactFormComponent;
  let fixture: ComponentFixture<ContactFormComponent>;
  let contactService: { sendMessage: ReturnType<typeof createSendMessageSpy> };

  beforeEach(async () => {
    contactService = {
      sendMessage: createSendMessageSpy(),
    };

    await TestBed.configureTestingModule({
      imports: [ContactFormComponent],
      providers: [
        provideRouter([]),
        { provide: ContactService, useValue: contactService },
        ...provideTranslateService({ fallbackLang: 'it', lang: 'it' }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactFormComponent);
    component = fixture.componentInstance;
  });

  it('should require a valid contact form', () => {
    expect(component.contactForm.valid).toBeFalsy();

    component.contactForm.setValue({
      fullName: 'Federico Croletti',
      email: 'federico.croletti@gmail.com',
      subject: 'Collaborazione Angular',
      requestType: 'website',
      message: 'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
      privacyAccepted: true,
      honeypot: '',
    });

    expect(component.contactForm.valid).toBeTruthy();
  });

  it('should block honeypot submissions before calling the service', () => {
    component.contactForm.setValue({
      fullName: 'Federico Croletti',
      email: 'federico.croletti@gmail.com',
      subject: 'Collaborazione Angular',
      requestType: 'website',
      message: 'Vorrei parlare di una possibile collaborazione su un progetto Angular enterprise.',
      privacyAccepted: true,
      honeypot: 'spam',
    });

    component.submitForm();

    expect(contactService.sendMessage).not.toHaveBeenCalled();
  });
});

function createSendMessageSpy() {
  const testGlobal = globalThis as typeof globalThis & {
    vi?: { fn: (implementation: () => unknown) => unknown };
    jasmine?: {
      createSpy: (name: string) => { and: { returnValue: (value: unknown) => unknown } };
    };
  };

  if (testGlobal.vi) {
    return testGlobal.vi.fn(() => of({ success: true, message: 'OK' }));
  }

  const spy = testGlobal.jasmine?.createSpy('sendMessage');
  spy?.and.returnValue(of({ success: true, message: 'OK' }));
  return spy;
}
