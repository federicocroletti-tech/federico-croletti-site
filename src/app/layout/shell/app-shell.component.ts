import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter, map } from 'rxjs';

import { CookieBannerComponent } from '../cookie-banner/cookie-banner.component';
import { CookiePreferencesComponent } from '../cookie-preferences/cookie-preferences.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { WHATS_APP_LINKS } from '../../core/constants/contact-links';
import { AnalyticsService } from '../../core/services/analytics.service';

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
  private readonly analytics = inject(AnalyticsService);
  private readonly router = inject(Router);
  private readonly currentUrl = toSignal(
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd),
      map((event) => event.urlAfterRedirects),
    ),
    { initialValue: this.router.url },
  );

  readonly whatsAppUrl = WHATS_APP_LINKS.floating;
  readonly showWhatsAppFloatingButton = computed(() => !this.currentUrl().startsWith('/contatti'));

  trackWhatsAppClick(): void {
    this.analytics.trackEvent('WhatsApp Click', { source: 'floating_button' });
  }
}
