import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CookieBannerComponent } from '../cookie-banner/cookie-banner.component';
import { CookiePreferencesComponent } from '../cookie-preferences/cookie-preferences.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CONTACT_LINKS } from '../../core/constants/contact-links';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [
    CookieBannerComponent,
    CookiePreferencesComponent,
    FooterComponent,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './app-shell.component.html',
  styleUrl: './app-shell.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppShellComponent {
  readonly whatsAppUrl = CONTACT_LINKS.whatsApp;
}
