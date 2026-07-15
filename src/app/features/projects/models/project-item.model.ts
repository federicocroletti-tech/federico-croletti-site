export type ProjectStatus = 'in-development' | 'prototype' | 'professional' | 'completed';

export interface ProjectItem {
  readonly id: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly roleKey: string;
  readonly technologies: readonly string[];
  readonly status: ProjectStatus;
  readonly githubUrl?: string;
  readonly demoUrl?: string;
  readonly tags: readonly string[];
  readonly isPublic: boolean;
}

export interface ProjectFilter {
  readonly id: string;
  readonly labelKey: string;
}
