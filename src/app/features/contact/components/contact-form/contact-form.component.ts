import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { finalize } from 'rxjs';

import { ContactFormValue, ContactResponse } from '../../models/contact-form.model';
import { CONTACT_ENDPOINT_NOT_CONFIGURED, ContactService } from '../../services/contact.service';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSnackBarModule,
    ReactiveFormsModule,
    RouterLink,
    TranslatePipe,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactFormComponent {
  private readonly destroyRef = inject(DestroyRef);
  private readonly formBuilder = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly translateService = inject(TranslateService);

  readonly isSubmitting = signal(false);
  readonly statusMessage = signal<ContactResponse | null>(null);

  readonly requestTypes = [
    { value: 'website', labelKey: 'contact.form.requestTypes.website' },
    { value: 'it-support', labelKey: 'contact.form.requestTypes.itSupport' },
    { value: 'digital-identity', labelKey: 'contact.form.requestTypes.digitalIdentity' },
    { value: 'ai-automation', labelKey: 'contact.form.requestTypes.aiAutomation' },
    { value: 'technical-consulting', labelKey: 'contact.form.requestTypes.technicalConsulting' },
    { value: 'job-opportunity', labelKey: 'contact.form.requestTypes.jobOpportunity' },
    { value: 'other', labelKey: 'contact.form.requestTypes.other' },
  ] as const;

  readonly contactForm = this.formBuilder.nonNullable.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required]],
    requestType: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(20)]],
    privacyAccepted: [false, [Validators.requiredTrue]],
    honeypot: [''],
  });

  submitForm(): void {
    this.statusMessage.set(null);

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    const payload: ContactFormValue = this.contactForm.getRawValue();

    if (payload.honeypot?.trim()) {
      this.resetForm();
      return;
    }

    this.isSubmitting.set(true);
    this.contactService
      .sendMessage(payload)
      .pipe(
        finalize(() => this.isSubmitting.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => this.handleSuccess(response),
        error: (error: unknown) => this.handleError(error),
      });
  }

  private handleSuccess(response: ContactResponse): void {
    if (!response.success) {
      this.showMessage({
        success: false,
        message: this.translateService.instant('contact.form.error'),
      });
      return;
    }

    const message = this.translateService.instant('contact.form.success');
    this.showMessage({ success: true, message });
    this.resetForm();
  }

  private handleError(error: unknown): void {
    const message =
      error instanceof Error && error.message === CONTACT_ENDPOINT_NOT_CONFIGURED
        ? this.translateService.instant('contact.form.endpointMissing')
        : this.translateService.instant('contact.form.error');

    this.showMessage({ success: false, message });
  }

  private showMessage(response: ContactResponse): void {
    this.statusMessage.set(response);
    this.snackBar.open(response.message, undefined, { duration: response.success ? 5000 : 7000 });
  }

  private resetForm(): void {
    this.contactForm.reset({
      fullName: '',
      email: '',
      subject: '',
      requestType: '',
      message: '',
      privacyAccepted: false,
      honeypot: '',
    });
  }
}
