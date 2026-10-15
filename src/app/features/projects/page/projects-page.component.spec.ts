import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { LanguageService } from '../../../core/services/language.service';
import {
  configureProjects,
  PROJECT_COLLECTIONS,
  PROJECT_FILTERS,
  PROJECTS,
} from '../data/projects.data';
import { PROJECT_CONFIG } from '../data/projects.config';
import { ProjectsPageComponent } from './projects-page.component';

const VISIBLE_PROJECTS = PROJECTS.filter((project) => project.visible);

describe('ProjectsPageComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsPageComponent],
      providers: [...provideTranslateService({ fallbackLang: 'it', lang: 'it' })],
    }).compileComponents();
  });

  it('assigns every project to exactly one collection without losing projects', () => {
    const page = TestBed.createComponent(ProjectsPageComponent).componentInstance;
    const groupedProjects = page.collections().flatMap((collection) => collection.projects);
    const groupedIds = groupedProjects.map((project) => project.id);

    expect(groupedProjects.length).toBe(VISIBLE_PROJECTS.length);
    expect(new Set(groupedIds).size).toBe(VISIBLE_PROJECTS.length);
    expect([...groupedIds].sort()).toEqual(VISIBLE_PROJECTS.map((project) => project.id).sort());
    expect(page.collections().map((collection) => collection.id)).toEqual(
      PROJECT_COLLECTIONS.filter((collection) =>
        VISIBLE_PROJECTS.some((project) => project.category === collection.id),
      ).map((collection) => collection.id),
    );
  });

  it('provides a dedicated cover for every project', () => {
    expect(new Set(PROJECTS.map((project) => project.coverUrl)).size).toBe(PROJECTS.length);
    for (const project of PROJECTS) {
      expect(project.coverUrl).toBe(`/assets/images/projects/${project.id}.svg`);
    }
  });

  it('preserves every tag filter and excludes empty collections', () => {
    const page = TestBed.createComponent(ProjectsPageComponent).componentInstance;

    for (const filter of PROJECT_FILTERS.filter((filter) => filter.id !== 'all')) {
      page.selectFilter(filter.id);
      const expectedProjects = VISIBLE_PROJECTS.filter((project) =>
        project.tags.includes(filter.id),
      );

      expect(page.projects()).toEqual(expectedProjects);
      expect(page.collections().flatMap((collection) => collection.projects).length).toBe(
        expectedProjects.length,
      );
      expect(page.collections().every((collection) => collection.projects.length > 0)).toBe(true);
    }
  });

  it('restores all projects after clearing a filter', () => {
    const page = TestBed.createComponent(ProjectsPageComponent).componentInstance;
    page.selectFilter('AI');
    page.selectFilter('all');

    expect(page.projects()).toEqual(VISIBLE_PROJECTS);
    expect(page.collections().flatMap((collection) => collection.projects).length).toBe(
      VISIBLE_PROJECTS.length,
    );
  });

  it('renders all covers with dimensions and only one eager image', () => {
    const fixture = TestBed.createComponent(ProjectsPageComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const images = element.querySelectorAll<HTMLImageElement>('.project-cover img');

    expect(images.length).toBe(VISIBLE_PROJECTS.length);
    expect(element.querySelectorAll('img[loading="eager"]').length).toBe(
      Math.min(1, VISIBLE_PROJECTS.length),
    );
    expect(element.querySelectorAll('img[loading="lazy"]').length).toBe(
      Math.max(0, VISIBLE_PROJECTS.length - 1),
    );
    for (const image of images) {
      expect(image.getAttribute('width')).toBe('960');
      expect(image.getAttribute('height')).toBe('600');
      expect(image.getAttribute('alt')).toBe('');
    }
  });

  it('retains every demo and repository destination and all project details', () => {
    const fixture = TestBed.createComponent(ProjectsPageComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;

    for (const project of VISIBLE_PROJECTS) {
      const card = element.querySelector(`#project-${project.id}`)?.closest('article');
      expect(card).toBeTruthy();
      expect(card?.querySelector('details')?.hasAttribute('open')).toBe(false);
      expect(card?.querySelector('.project-role')?.textContent).toContain(project.roleKey);
      expect(card?.querySelectorAll('.project-details .pill').length).toBe(
        project.technologies.length,
      );
      const links = Array.from(card?.querySelectorAll('a') ?? []);
      const expectedHrefs = [project.demoUrl, project.githubUrl].filter(
        (href): href is string => typeof href === 'string' && href.length > 0,
      );
      expect(links.map((link) => link.getAttribute('href'))).toEqual(expectedHrefs);
      for (const link of links) {
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
        expect(link.getAttribute('aria-label')).toContain(
          project.title[fixture.componentInstance.language()],
        );
      }
    }
  });

  it('updates the rendered cards and pressed button when a filter is clicked', () => {
    const fixture = TestBed.createComponent(ProjectsPageComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const buttons = element.querySelectorAll<HTMLButtonElement>('.project-filters button');
    const index = PROJECT_FILTERS.findIndex((filter) => filter.id === 'Finance');
    buttons[index].click();
    fixture.detectChanges();

    expect(element.querySelectorAll('.project-entry').length).toBe(
      VISIBLE_PROJECTS.filter((project) => project.tags.includes('Finance')).length,
    );
    expect(element.querySelectorAll('.project-collection').length).toBe(
      new Set(
        VISIBLE_PROJECTS.filter((project) => project.tags.includes('Finance')).map(
          (project) => project.category,
        ),
      ).size,
    );
    expect(buttons[index].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
    expect(element.querySelector('[role="status"]')).toBeTruthy();
  });

  it('uses configured copy in both languages, including accessible link labels', () => {
    const fixture = TestBed.createComponent(ProjectsPageComponent);
    const languageService = TestBed.inject(LanguageService);
    const originalLanguage = languageService.currentLanguage();
    try {
      for (const language of ['it', 'en'] as const) {
        languageService.setLanguage(language);
        fixture.detectChanges();
        const element: HTMLElement = fixture.nativeElement;
        for (const project of VISIBLE_PROJECTS) {
          const card = element.querySelector(`#project-${project.id}`)?.closest('article');
          expect(card?.querySelector('h3')?.textContent).toBe(project.title[language]);
          expect(card?.querySelector('.project-description')?.textContent).toBe(
            project.description[language],
          );
          for (const link of Array.from(card?.querySelectorAll('a') ?? [])) {
            expect(link.getAttribute('aria-label')).toContain(project.title[language]);
          }
        }
      }
    } finally {
      languageService.setLanguage(originalLanguage);
    }
  });

  it('excludes hidden projects from all filters, collections and rendered cards', () => {
    const project = PROJECTS[0];
    const originalVisible = project.visible;
    Object.defineProperty(project, 'visible', { value: false, configurable: true });
    try {
      const fixture = TestBed.createComponent(ProjectsPageComponent);
      for (const filter of PROJECT_FILTERS) {
        fixture.componentInstance.selectFilter(filter.id);
        fixture.detectChanges();
        expect(fixture.componentInstance.projects().some((item) => item.id === project.id)).toBe(
          false,
        );
        expect(
          fixture.componentInstance
            .collections()
            .flatMap((collection) => collection.projects)
            .some((item) => item.id === project.id),
        ).toBe(false);
        const element: HTMLElement = fixture.nativeElement;
        expect(element.querySelector(`#project-${project.id}`)).toBeNull();
      }
    } finally {
      Object.defineProperty(project, 'visible', { value: originalVisible, configurable: true });
    }
  });

  it('renders an empty state with zero counts when every project is hidden', () => {
    const visibility = PROJECTS.map((project) => project.visible);
    try {
      for (const project of PROJECTS) {
        Object.defineProperty(project, 'visible', { value: false, configurable: true });
      }
      const fixture = TestBed.createComponent(ProjectsPageComponent);
      fixture.detectChanges();
      expect(fixture.componentInstance.projects().length).toBe(0);
      expect(fixture.componentInstance.collections().length).toBe(0);
      const element: HTMLElement = fixture.nativeElement;
      expect(element.querySelectorAll('.project-entry').length).toBe(0);
      expect(element.textContent).toContain('projects.empty');
    } finally {
      PROJECTS.forEach((project, index) => {
        Object.defineProperty(project, 'visible', { value: visibility[index], configurable: true });
      });
    }
  });

  it('rejects missing, unknown and incomplete configuration instead of silently hiding mistakes', () => {
    expect(() => configureProjects(PROJECTS, {})).toThrowError(/Missing or invalid/);
    expect(() =>
      configureProjects(PROJECTS, { ...PROJECT_CONFIG, typo: PROJECT_CONFIG['personal-site'] }),
    ).toThrowError(/Unknown project/);
    expect(() =>
      configureProjects(PROJECTS, {
        ...PROJECT_CONFIG,
        'personal-site': { ...PROJECT_CONFIG['personal-site'], title: { it: ' ', en: 'Title' } },
      }),
    ).toThrowError(/Missing title or description/);
  });
});
