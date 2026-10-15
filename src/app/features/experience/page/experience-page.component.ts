import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { SeoService } from '../../../core/services/seo.service';

interface ExperienceItem {
  readonly role: string;
  readonly period?: string;
  readonly description: string;
}

@Component({
  selector: 'app-experience-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './experience-page.component.html',
  styleUrl: './experience-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperiencePageComponent {
  private readonly seo = inject(SeoService);

  readonly experiences: readonly ExperienceItem[] = [
    {
      role: 'People Manager',
      period: '02/2025 - Attuale',
      description: 'Supporto alla crescita professionale, feedback, percorsi formativi e collaborazione sulle valutazioni annuali.',
    },
    {
      role: 'Team Leader & Senior Consultant',
      period: '11/2024 - Attuale',
      description: 'Sviluppo e coordinamento su piattaforme enterprise Angular, Micro Frontend, Module Federation, i18n e librerie condivise.',
    },
    {
      role: 'Senior Consultant frontend',
      period: '03/2024 - 12/2024',
      description: 'Sviluppo frontend su applicazioni enterprise in ambito finanziario e post-vendita.',
    },
    {
      role: 'Software Developer',
      period: '09/2017 - 03/2024',
      description: 'Sviluppo full-stack con focus frontend, Angular, VueJS, Kendo UI, Java, database Oracle e progetti geospaziali.',
    },
  ];

  readonly resultAreas = [
    'Architetture Angular enterprise e componenti riutilizzabili.',
    'Micro Frontend, Module Federation e shell applicative.',
    'Mappe interattive e interfacce geospaziali basate su Leaflet/WMS.',
    'Mentoring, code review e supporto alla crescita tecnica dei team.',
  ] as const;

  constructor() {
    this.seo.update({
      title: 'Esperienza professionale | Federico Croletti',
      description:
        'Esperienza di Federico Croletti su Angular, Micro Frontend, applicazioni enterprise, mappe interattive, leadership tecnica e mentoring.',
      path: '/esperienza',
    });
  }
}
