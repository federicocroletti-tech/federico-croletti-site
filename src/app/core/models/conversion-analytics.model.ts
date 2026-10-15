export type ConversionService = 'angular-architecture' | 'frontend-consulting' | 'it-support' | 'general';

export type ConversionFunnel = 'angular' | 'local-support' | 'general';

export type AnalyticsEventName =
  | 'pageview'
  | 'cta_click'
  | 'form_start'
  | 'form_submit_attempt'
  | 'form_submit_error'
  | 'conversion'
  | 'whatsapp_click';

export interface AnalyticsEventProps {
  readonly service?: ConversionService;
  readonly funnel?: ConversionFunnel;
  readonly step?: string;
  readonly source?: string;
  readonly path?: string;
}

export interface LocalAnalyticsBucket {
  readonly key: string;
  readonly date: string;
  readonly eventName: AnalyticsEventName | string;
  readonly service: ConversionService | 'unknown';
  readonly source: string;
  readonly count: number;
}

export interface ConversionDashboardSummary {
  readonly totalEvents: number;
  readonly conversions: number;
  readonly angularConversions: number;
  readonly localSupportConversions: number;
  readonly buckets: readonly LocalAnalyticsBucket[];
}