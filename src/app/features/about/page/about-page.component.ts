import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

import { SeoService } from '../../../core/services/seo.service';

interface ExperienceItem {
  readonly roleKey: string;
  readonly periodKey?: string;
  readonly descriptionKey: string;
}

interface SkillGroup {
  readonly titleKey: string;
  readonly skills: readonly string[];
}

@Component({
  selector: 'app-about-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, TranslatePipe],
  templateUrl: './about-page.component.html',
  styleUrl: './about-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutPageComponent {
  private readonly seo = inject(SeoService);

  readonly profilePoints = [
    'about.profile.points.senior',
    'about.profile.points.leader',
    'about.profile.points.angular',
    'about.profile.points.enterprise',
    'about.profile.points.microFrontend',
    'about.profile.points.maps',
    'about.profile.points.quality',
    'about.profile.points.aws',
  ] as const;

  readonly timeline: readonly ExperienceItem[] = [
    {
      roleKey: 'about.timeline.peopleManager.role',
      periodKey: 'about.timeline.peopleManager.period',
      descriptionKey: 'about.timeline.peopleManager.description',
    },
    {
      roleKey: 'about.timeline.teamLeader.role',
      periodKey: 'about.timeline.teamLeader.period',
      descriptionKey: 'about.timeline.teamLeader.description',
    },
    { roleKey: 'about.timeline.esa.role', descriptionKey: 'about.timeline.esa.description' },
    {
      roleKey: 'about.timeline.findomestic.role',
      periodKey: 'about.timeline.findomestic.period',
      descriptionKey: 'about.timeline.findomestic.description',
    },
    {
      roleKey: 'about.timeline.genegis.role',
      periodKey: 'about.timeline.genegis.period',
      descriptionKey: 'about.timeline.genegis.description',
    },
    {
      roleKey: 'about.timeline.gesp.role',
      periodKey: 'about.timeline.gesp.period',
      descriptionKey: 'about.timeline.gesp.description',
    },
    {
      roleKey: 'about.timeline.miles.role',
      periodKey: 'about.timeline.miles.period',
      descriptionKey: 'about.timeline.miles.description',
    },
  ];

  readonly skillGroups: readonly SkillGroup[] = [
    {
      titleKey: 'about.skills.frontend',
      skills: [
        'Angular',
        'TypeScript',
        'JavaScript',
        'HTML',
        'CSS',
        'SCSS',
        'Angular Material',
        'Bootstrap',
        'Tailwind',
        'Kendo UI',
        'VueJS',
      ],
    },
    {
      titleKey: 'about.skills.architecture',
      skills: [
        'Micro Frontend',
        'Module Federation',
        'Librerie condivise',
        'Design system',
        'Routing federato',
        'Lazy loading',
        'Event bus',
        'i18n',
      ],
    },
    {
      titleKey: 'about.skills.reactive',
      skills: ['RxJS', 'NgRx', 'Facade pattern', 'Service layer', 'Component state'],
    },
    { titleKey: 'about.skills.maps', skills: ['Leaflet', 'WMS', 'MapServer', 'UX/UI geospaziale'] },
    {
      titleKey: 'about.skills.devops',
      skills: ['Git', 'GitLab CI/CD', 'Docker', 'Kubernetes', 'Render.com', 'Cloud-native mindset'],
    },
    {
      titleKey: 'about.skills.ai',
      skills: [
        'GitHub Copilot',
        'Prompt engineering',
        'AWS Certified AI Practitioner',
        'AI tooling enterprise',
      ],
    },
  ];

  constructor() {
    this.seo.update({
      title: 'Chi sono - Federico Croletti',
      description:
        'Scopri il percorso professionale di Federico Croletti, Senior Software Engineer specializzato in Angular, Micro Frontend, mappe interattive e leadership tecnica.',
      path: '/chi-sono',
    });
  }
}
