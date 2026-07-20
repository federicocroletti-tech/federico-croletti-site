import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable, InjectionToken } from '@angular/core';
import emailjs from '@emailjs/browser';
import { catchError, from, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ContactFormValue, ContactResponse } from '../models/contact-form.model';

export const CONTACT_ENDPOINT_NOT_CONFIGURED = 'CONTACT_ENDPOINT_NOT_CONFIGURED';
export const CONTACT_NETWORK_BLOCKED = 'CONTACT_NETWORK_BLOCKED';
export const CONTACT_PROVIDER_REJECTED = 'CONTACT_PROVIDER_REJECTED';
export const CONTACT_SEND_FAILED = 'CONTACT_SEND_FAILED';
export const CONTACT_EMAIL_NOT_CONFIGURED = 'CONTACT_EMAIL_NOT_CONFIGURED';

type FormServiceResponse = Partial<Omit<ContactResponse, 'success'>> & {
  success?: boolean | string;
};

type EmailJsSend = typeof emailjs.send;

export const EMAILJS_SEND = new InjectionToken<EmailJsSend>('EMAILJS_SEND', {
  providedIn: 'root',
  factory: () => emailjs.send,
});

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);
  private readonly emailJsSend = inject(EMAILJS_SEND);

  sendMessage(payload: ContactFormValue): Observable<ContactResponse> {
    const backendEndpoint = this.getConfiguredEndpoint(environment.contactEndpoint);
    const publicFallbackEndpoint = this.getConfiguredEndpoint(environment.contactFallbackEndpoint);

    if (!backendEndpoint && !publicFallbackEndpoint && !this.isEmailJsConfigured()) {
      return throwError(() => new Error(CONTACT_ENDPOINT_NOT_CONFIGURED));
    }

    if (!backendEndpoint) {
      return this.sendEmailJsOrFallback(payload, publicFallbackEndpoint);
    }

    return this.postMessage(backendEndpoint, payload).pipe(
      catchError((primaryError: unknown) => {
        return this.sendEmailJsOrFallback(payload, publicFallbackEndpoint, primaryError);
      }),
    );
  }

  private sendEmailJsOrFallback(
    payload: ContactFormValue,
    fallbackEndpoint?: string,
    originalError?: unknown,
  ): Observable<ContactResponse> {
    return this.sendEmailJsMessage(payload).pipe(
      catchError((emailJsError: unknown) => {
        if (!fallbackEndpoint) {
          return throwError(() => this.toContactPublicError(originalError ?? emailJsError));
        }

        return this.postMessage(fallbackEndpoint, payload).pipe(
          catchError((fallbackError: unknown) =>
            throwError(() => this.toContactPublicError(fallbackError)),
          ),
        );
      }),
    );
  }

  private sendEmailJsMessage(payload: ContactFormValue): Observable<ContactResponse> {
    if (!this.isEmailJsConfigured()) {
      return throwError(() => new Error(CONTACT_ENDPOINT_NOT_CONFIGURED));
    }

    return from(
      this.emailJsSend(
        environment.emailJs.serviceId,
        environment.emailJs.templateId,
        {
          fullName: payload.fullName,
          email: payload.email,
          replyTo: payload.email,
          subject: payload.subject,
          requestType: payload.requestType,
          message: payload.message,
          privacyAccepted: payload.privacyAccepted ? 'yes' : 'no',
          honeypot: payload.honeypot ?? '',
          toEmail: 'federico.croletti@gmail.com',
        },
        { publicKey: environment.emailJs.publicKey },
      ),
    ).pipe(map(() => ({ success: true, message: 'OK' })));
  }

  private postMessage(endpoint: string, payload: ContactFormValue): Observable<ContactResponse> {
    return this.http
      .post<FormServiceResponse>(endpoint, this.toFormSubmitPayload(payload), {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        map((response) => {
          const contactResponse = this.toContactResponse(response);

          if (!contactResponse.success) {
            throw new Error(CONTACT_PROVIDER_REJECTED);
          }

          return contactResponse;
        }),
      );
  }

  private getConfiguredEndpoint(endpoint: string): string | undefined {
    const trimmedEndpoint = endpoint.trim();

    return trimmedEndpoint.length > 0 && !trimmedEndpoint.includes('TODO')
      ? trimmedEndpoint
      : undefined;
  }

  private isEmailJsConfigured(): boolean {
    return Boolean(
      environment.emailJs.serviceId.trim() &&
      environment.emailJs.templateId.trim() &&
      environment.emailJs.publicKey.trim() &&
      !environment.emailJs.serviceId.includes('TODO') &&
      !environment.emailJs.templateId.includes('TODO') &&
      !environment.emailJs.publicKey.includes('TODO'),
    );
  }

  private toFormSubmitPayload(payload: ContactFormValue): string {
    return new HttpParams({
      fromObject: {
        fullName: payload.fullName,
        email: payload.email,
        subject: payload.subject,
        _subject: `[Sito] ${payload.subject}`,
        _replyto: payload.email,
        _template: 'table',
        _captcha: 'false',
        requestType: payload.requestType,
        message: payload.message,
        privacyAccepted: payload.privacyAccepted ? 'yes' : 'no',
        honeypot: payload.honeypot ?? '',
      },
    }).toString();
  }

  private toContactResponse(response: FormServiceResponse): ContactResponse {
    const success = this.isSuccessResponse(response.success);

    const contactResponse: ContactResponse = {
      success,
      message: success ? (response.message ?? 'OK') : CONTACT_PROVIDER_REJECTED,
    };

    return success ? contactResponse : { ...contactResponse, fallbackToEmail: true };
  }

  private isSuccessResponse(success: boolean | string | undefined): boolean {
    if (typeof success === 'string') {
      return success.toLowerCase() === 'true';
    }

    return success === true;
  }

  private toContactPublicError(error: unknown): Error {
    if (error instanceof HttpErrorResponse) {
      return new Error(this.toContactError(error));
    }

    if (error instanceof Error) {
      return error;
    }

    return new Error(CONTACT_SEND_FAILED);
  }

  private toContactError(error: HttpErrorResponse): string {
    if (error.error?.message === CONTACT_EMAIL_NOT_CONFIGURED) {
      return CONTACT_EMAIL_NOT_CONFIGURED;
    }

    if (error.status === 0) {
      return CONTACT_NETWORK_BLOCKED;
    }

    return CONTACT_SEND_FAILED;
  }
}
