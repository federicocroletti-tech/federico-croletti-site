import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CONTACT_LINKS, SOCIAL_LINKS } from '../../core/constants/contact-links';
import { CookieConsentService } from '../../core/services/cookie-consent.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  private readonly cookieConsentService = inject(CookieConsentService);

  readonly currentYear = new Date().getFullYear();
  readonly contacts = CONTACT_LINKS;
  readonly socialLinks = SOCIAL_LINKS;

  openCookiePreferences(): void {
    this.cookieConsentService.openPreferences();
  }
}
