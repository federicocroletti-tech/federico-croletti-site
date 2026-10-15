import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { SeoService } from '../../../core/services/seo.service';

interface SkillGroup {
  readonly title: string;
  readonly items: readonly string[];
}

@Component({
  selector: 'app-skills-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './skills-page.component.html',
  styleUrl: './skills-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsPageComponent {
  private readonly seo = inject(SeoService);

  readonly groups: readonly SkillGroup[] = [
    { title: 'Angular e TypeScript', items: ['Angular', 'TypeScript', 'RxJS', 'Angular Signals', 'Reactive Forms', 'Angular Material'] },
    { title: 'Architettura frontend', items: ['Micro Frontend', 'Module Federation', 'Lazy loading', 'Design system', 'Librerie condivise', 'i18n'] },
    { title: 'State management', items: ['NgRx', 'Facade pattern', 'Service layer', 'Component state', 'Flussi reattivi'] },
    { title: 'Qualita', items: ['Code review', 'Refactoring', 'Accessibilita', 'Performance frontend', 'Testing', 'Convenzioni tecniche'] },
    { title: 'Leadership tecnica', items: ['Mentoring', 'Coordinamento frontend', 'Collaborazione con stakeholder', 'Documentazione decisionale'] },
    { title: 'Integrazione e tooling', items: ['API REST', 'Git', 'CI/CD', 'Docker', 'Render.com', 'Automazioni leggere'] },
  ];

  constructor() {
    this.seo.update({
      title: 'Competenze Angular e frontend | Federico Croletti',
      description:
        'Competenze di Federico Croletti: Angular, TypeScript, RxJS, Signals, Micro Frontend, Module Federation, NgRx, performance e leadership tecnica.',
      path: '/competenze',
    });
  }
}
