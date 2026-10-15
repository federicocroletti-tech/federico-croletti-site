import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { LanguageSwitcherComponent } from '../language-switcher/language-switcher.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [LanguageSwitcherComponent, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {
  readonly navigationItems = [
    { label: 'Home', path: '/' },
    { label: 'Esperienza', path: '/esperienza' },
    { label: 'Competenze', path: '/competenze' },
    { label: 'Servizi frontend', path: '/servizi-frontend' },
    { label: 'Progetti', path: '/progetti' },
    { label: 'Assistenza Milano', path: '/assistenza-informatica-milano' },
    { label: 'Contatti', path: '/contatti' },
  ] as const;
}
