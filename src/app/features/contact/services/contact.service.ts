import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ContactFormValue, ContactResponse } from '../models/contact-form.model';

export const CONTACT_ENDPOINT_NOT_CONFIGURED = 'CONTACT_ENDPOINT_NOT_CONFIGURED';

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
        map((response) => ({
          success: this.isSuccessResponse(response.success),
          message: response.message ?? 'OK',
        })),
        catchError((error: HttpErrorResponse) =>
          throwError(() => new Error(error.message || 'CONTACT_SEND_FAILED')),
        ),
      );
  }

  private isEndpointConfigured(endpoint: string): boolean {
    return endpoint.length > 0 && !endpoint.includes('TODO');
  }

  private toFormSubmitPayload(payload: ContactFormValue): string {
    return new HttpParams({
      fromObject: {
        name: payload.fullName,
        email: payload.email,
        _replyto: payload.email,
        _subject: payload.subject,
        subject: payload.subject,
        requestType: payload.requestType,
        message: payload.message,
        privacyAccepted: payload.privacyAccepted ? 'yes' : 'no',
        _template: 'table',
        _captcha: 'false',
      },
    }).toString();
  }

  private isSuccessResponse(success: boolean | string | undefined): boolean {
    if (typeof success === 'string') {
      return success.toLowerCase() === 'true';
    }

    return success ?? true;
  }
}
