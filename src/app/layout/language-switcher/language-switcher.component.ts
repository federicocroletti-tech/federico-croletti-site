import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { TranslatePipe } from '@ngx-translate/core';

import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-language-switcher',
  standalone: true,
  imports: [MatButtonToggleModule, TranslatePipe],
  templateUrl: './language-switcher.component.html',
  styleUrl: './language-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent {
  private readonly languageService = inject(LanguageService);

  readonly currentLanguage = this.languageService.currentLanguage;

  switchLanguage(language: string): void {
    if (this.languageService.isSupportedLanguage(language)) {
      this.languageService.setLanguage(language);
    }
  }
}
