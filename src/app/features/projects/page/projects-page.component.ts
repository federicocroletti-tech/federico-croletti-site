import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { TranslatePipe } from '@ngx-translate/core';

import { SeoService } from '../../../core/services/seo.service';
import { PROJECT_FILTERS, PROJECTS } from '../data/projects.data';

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, TranslatePipe],
  templateUrl: './projects-page.component.html',
  styleUrl: './projects-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProjectsPageComponent {
  private readonly seo = inject(SeoService);

  readonly filters = PROJECT_FILTERS;
  readonly selectedFilter = signal('all');
  readonly projects = computed(() => {
    const selectedFilter = this.selectedFilter();

    if (selectedFilter === 'all') {
      return PROJECTS;
    }

    return PROJECTS.filter((project) => project.tags.includes(selectedFilter));
  });

  constructor() {
    this.seo.update({
      title: 'Progetti - Federico Croletti',
      description:
        'Portfolio progetti di Federico Croletti: Angular, Micro Frontend, mappe interattive, AI, cloud e applicazioni enterprise.',
      path: '/progetti',
    });
  }

  selectFilter(filterId: string): void {
    this.selectedFilter.set(filterId);
  }
}
