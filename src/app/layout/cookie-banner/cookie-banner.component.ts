import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CookieConsentService } from '../../core/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './cookie-banner.component.html',
  styleUrl: './cookie-banner.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieBannerComponent {
  readonly consentService = inject(CookieConsentService);

  acceptAll(): void {
    this.consentService.acceptAll();
  }

  rejectNonNecessary(): void {
    this.consentService.rejectNonNecessary();
  }

  openPreferences(): void {
    this.consentService.openPreferences();
  }
}
