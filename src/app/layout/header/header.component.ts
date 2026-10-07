import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    LanguageSwitcherComponent,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly navigationItems = [
    { labelKey: 'navigation.home', path: '/' },
    { labelKey: 'navigation.about', path: '/chi-sono' },
    { labelKey: 'navigation.services', path: '/servizi' },
    { labelKey: 'navigation.projects', path: '/progetti' },
    { labelKey: 'navigation.contact', path: '/contatti' },
  ] as const;
}
