import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { SeoService } from '../../../core/services/seo.service';

interface CareerCard {
  readonly icon: string;
  readonly titleKey: string;
  readonly bodyKey: string;
}

interface CareerRole {
  readonly titleKey: string;
  readonly bodyKey: string;
}

@Component({
  selector: 'app-career-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, TranslatePipe],
  templateUrl: './career-page.component.html',
  styleUrl: './career-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CareerPageComponent {
  private readonly seo = inject(SeoService);

  readonly targetRoles: readonly CareerRole[] = [
    { titleKey: 'career.roles.frontendLead.title', bodyKey: 'career.roles.frontendLead.body' },
    { titleKey: 'career.roles.angularLead.title', bodyKey: 'career.roles.angularLead.body' },
    { titleKey: 'career.roles.aiLead.title', bodyKey: 'career.roles.aiLead.body' },
    { titleKey: 'career.roles.manager.title', bodyKey: 'career.roles.manager.body' },
  ];

  readonly positioningCards: readonly CareerCard[] = [
    {
      icon: 'architecture',
      titleKey: 'career.positioning.architecture.title',
      bodyKey: 'career.positioning.architecture.body',
    },
    {
      icon: 'groups',
      titleKey: 'career.positioning.leadership.title',
      bodyKey: 'career.positioning.leadership.body',
    },
    {
      icon: 'smart_toy',
      titleKey: 'career.positioning.ai.title',
      bodyKey: 'career.positioning.ai.body',
    },
    {
      icon: 'trending_up',
      titleKey: 'career.positioning.growth.title',
      bodyKey: 'career.positioning.growth.body',
    },
  ];

  readonly proofPoints = [
    'career.proof.points.enterpriseAngular',
    'career.proof.points.microFrontend',
    'career.proof.points.teamLeadership',
    'career.proof.points.peopleManagement',
    'career.proof.points.aiCertification',
    'career.proof.points.delivery',
  ] as const;

  readonly searchCriteria = [
    'career.criteria.salary',
    'career.criteria.location',
    'career.criteria.contract',
    'career.criteria.direction',
  ] as const;

  constructor() {
    this.seo.update({
      title: 'Federico Croletti - Frontend Tech Lead e Angular Architect a Milano',
      description:
        'Frontend Tech Lead e Angular Architect a Milano, con esperienza enterprise, Micro Frontend, Module Federation, team leadership, People Management e focus AI.',
      path: '/carriera',
    });
  }
}
