import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CONTACT_LINKS, WHATS_APP_LINKS } from '../../../core/constants/contact-links';
import { AnalyticsService } from '../../../core/services/analytics.service';
import { SeoService } from '../../../core/services/seo.service';
import { ContactFormComponent } from '../components/contact-form/contact-form.component';

@Component({
  selector: 'app-contact-page',
  standalone: true,
  imports: [ContactFormComponent, MatButtonModule, MatCardModule, RouterLink, TranslatePipe],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactPageComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  readonly contacts = CONTACT_LINKS;
  readonly whatsAppUrl = WHATS_APP_LINKS.contactPage;

  trackWhatsAppClick(): void {
    this.analytics.trackEvent('WhatsApp Click', { source: 'contact_page' });
  }

  constructor() {
    this.seo.update({
      title: 'Contatti e recensioni Google - Federico Croletti',
      description:
        'Contatta Federico Croletti, tecnico informatico a Milano. Telefono, WhatsApp, email, sito web ufficiale, profilo Google Business e recensioni Google.',
      path: '/contatti',
    });
  }
}
