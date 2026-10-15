import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import { AnalyticsService } from '../../../core/services/analytics.service';
import { SeoService } from '../../../core/services/seo.service';

@Component({
  selector: 'app-conversion-dashboard-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './conversion-dashboard-page.component.html',
  styleUrl: './conversion-dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversionDashboardPageComponent {
  private readonly analytics = inject(AnalyticsService);
  private readonly seo = inject(SeoService);

  readonly summary = signal(this.analytics.getDashboardSummary());
  readonly topBuckets = computed(() =>
    [...this.summary().buckets].sort((left, right) => right.count - left.count).slice(0, 12),
  );

  constructor() {
    this.seo.update({
      title: 'Dashboard conversioni locale - Federico Croletti',
      description:
        'Dashboard locale con dati aggregati e privacy-preserving sugli eventi di conversione del sito.',
      path: '/dashboard-conversioni',
    });
  }
}