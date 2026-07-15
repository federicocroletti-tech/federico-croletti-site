import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CONTACT_LINKS } from '../../../core/constants/contact-links';
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
  private readonly seo = inject(SeoService);

  readonly contacts = CONTACT_LINKS;

  constructor() {
    this.seo.update({
      title: 'Contatti - Federico Croletti',
      description:
        'Contatta Federico Croletti per opportunita lavorative, collaborazioni, consulenze Angular, front-end enterprise e progetti web.',
      path: '/contatti',
    });
  }
}
