export interface ServiceItem {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly icon: string;
}

export interface ServiceCategory {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly icon: string;
  readonly services: readonly ServiceItem[];
}
