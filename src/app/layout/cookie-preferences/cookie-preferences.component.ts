import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TranslatePipe } from '@ngx-translate/core';

import { environment } from '../../../environments/environment';
import { CookieConsentService } from '../../core/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-preferences',
  standalone: true,
  imports: [MatButtonModule, TranslatePipe],
  templateUrl: './cookie-preferences.component.html',
  styleUrl: './cookie-preferences.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookiePreferencesComponent {
  private readonly consentService = inject(CookieConsentService);

  readonly analyticsAvailable = environment.analytics.enabled;
  readonly analyticsAccepted = this.consentService.analyticsDraft;
  readonly isOpen = this.consentService.preferencesPanelOpen;

  acceptAll(): void {
    this.consentService.acceptAll();
  }

  rejectNonNecessary(): void {
    this.consentService.rejectNonNecessary();
  }

  save(): void {
    this.consentService.savePreferences({
      analytics: this.analyticsAvailable && this.analyticsAccepted(),
      marketing: false,
    });
  }

  close(): void {
    this.consentService.closePreferences();
  }

  updateAnalytics(event: Event): void {
    this.analyticsAccepted.set((event.target as HTMLInputElement).checked);
  }
}
