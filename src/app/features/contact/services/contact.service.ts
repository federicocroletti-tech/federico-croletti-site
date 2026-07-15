import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  sendMessage(payload: ContactFormValue): Observable<ContactResponse> {
    const endpoint = environment.contactEndpoint.trim();

    if (!this.isEndpointConfigured(endpoint)) {
      return throwError(() => new Error(CONTACT_ENDPOINT_NOT_CONFIGURED));
    }

    return this.http
      .post<FormServiceResponse>(endpoint, this.toFormSubmitPayload(payload), {
        headers: new HttpHeaders({
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        map((response) => this.toContactResponse(response)),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(this.toContactError(error))),
        ),
      );
  }

  private isEndpointConfigured(endpoint: string): boolean {
    return endpoint.length > 0 && !endpoint.includes('TODO');
  }

  private toFormSubmitPayload(payload: ContactFormValue): string {
    return new HttpParams({
      fromObject: {
        fullName: payload.fullName,
        email: payload.email,
        subject: payload.subject,
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
