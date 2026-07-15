import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

import { environment } from '../../../../environments/environment';
import { ContactFormValue, ContactResponse } from '../models/contact-form.model';

export const CONTACT_ENDPOINT_NOT_CONFIGURED = 'CONTACT_ENDPOINT_NOT_CONFIGURED';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly http = inject(HttpClient);

  sendMessage(payload: ContactFormValue): Observable<ContactResponse> {
    const endpoint = environment.contactEndpoint.trim();

    if (!this.isEndpointConfigured(endpoint)) {
      return throwError(() => new Error(CONTACT_ENDPOINT_NOT_CONFIGURED));
    }

    return this.http.post<Partial<ContactResponse>>(endpoint, payload).pipe(
      map((response) => ({
        success: response.success ?? true,
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
}
