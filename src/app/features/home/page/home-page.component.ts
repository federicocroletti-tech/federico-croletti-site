import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { SeoService } from '../../../core/services/seo.service';
import { SERVICE_CATEGORIES } from '../../services/data/services.data';

interface TextCard {
  readonly titleKey: string;
  readonly bodyKey?: string;
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, TranslatePipe],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  private readonly seo = inject(SeoService);

  readonly servicePreview = SERVICE_CATEGORIES.slice(0, 3);

  readonly skillHighlights: readonly TextCard[] = [
    { titleKey: 'home.skills.frontend.title', bodyKey: 'home.skills.frontend.body' },
    { titleKey: 'home.skills.architecture.title', bodyKey: 'home.skills.architecture.body' },
    { titleKey: 'home.skills.leadership.title', bodyKey: 'home.skills.leadership.body' },
    { titleKey: 'home.skills.aiCloud.title', bodyKey: 'home.skills.aiCloud.body' },
  ];

  readonly experiencePoints = [
    'home.experience.points.angular',
    'home.experience.points.microFrontend',
    'home.experience.points.maps',
    'home.experience.points.auth',
    'home.experience.points.cicd',
    'home.experience.points.uiLibraries',
  ] as const;

  readonly values = [
    'home.values.clarity',
    'home.values.reliability',
    'home.values.experience',
    'home.values.concreteSupport',
    'home.values.simpleSolutions',
  ] as const;

  constructor() {
    this.seo.update({
      title: 'Federico Croletti - Senior Software Engineer Angular',
      description:
        'Federico Croletti, Senior Software Engineer Angular e consulente per sviluppo web, assistenza informatica, servizi digitali e automazioni AI.',
      path: '/',
    });
  }
}
