export type ProjectStatus = 'in-development' | 'prototype' | 'professional' | 'completed';
export type ProjectCategory = 'enterprise' | 'web' | 'maps' | 'automation' | 'finance' | 'creative';

export interface ProjectCollection {
  readonly id: ProjectCategory;
  readonly titleKey: string;
  readonly descriptionKey: string;
}

export interface ProjectItem {
  readonly id: string;
  readonly category: ProjectCategory;
  readonly coverUrl: string;
  readonly roleKey: string;
  readonly technologies: readonly string[];
  readonly status: ProjectStatus;
  readonly githubUrl?: string;
  readonly demoUrl?: string;
  readonly tags: readonly string[];
  readonly isPublic: boolean;
}

export interface ProjectPublication {
  readonly visible: boolean;
  readonly title: { readonly it: string; readonly en: string };
  readonly description: { readonly it: string; readonly en: string };
}

export type PublishedProjectItem = ProjectItem & ProjectPublication;

export interface ProjectFilter {
  readonly id: string;
  readonly labelKey: string;
}
