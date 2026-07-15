import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { CONTACT_LINKS } from '../../core/constants/contact-links';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [MatButtonModule, RouterLink, TranslatePipe],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  readonly currentYear = new Date().getFullYear();
  readonly contacts = CONTACT_LINKS;
}
