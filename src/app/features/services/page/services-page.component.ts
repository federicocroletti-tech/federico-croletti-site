import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

import { SeoService } from '../../../core/services/seo.service';
import { SERVICE_CATEGORIES } from '../data/services.data';

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink, TranslatePipe],
  templateUrl: './services-page.component.html',
  styleUrl: './services-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ServicesPageComponent {
  private readonly seo = inject(SeoService);

  readonly serviceCategories = SERVICE_CATEGORIES;
  readonly expandedCategoryId = signal(this.serviceCategories[0]?.id ?? '');

  constructor() {
    this.seo.update({
      title: 'Servizi informatici - Federico Croletti',
      description:
        'Servizi informatici pratici: siti web, WordPress, assistenza PC, backup, formattazione, gestione email, PEC, SPID, firma digitale, automazioni AI e consulenza tecnica.',
      path: '/servizi',
    });
  }

  isCategoryExpanded(categoryId: string): boolean {
    return this.expandedCategoryId() === categoryId;
  }

  toggleCategory(categoryId: string): void {
    this.expandedCategoryId.update((currentCategoryId) =>
      currentCategoryId === categoryId ? '' : categoryId,
    );
  }
}
