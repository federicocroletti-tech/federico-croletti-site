import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';

import { PROJECT_COLLECTIONS, PROJECT_FILTERS, PROJECTS } from '../data/projects.data';
import { ProjectsPageComponent } from './projects-page.component';

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

    expect(groupedProjects.length).toBe(PROJECTS.length);
    expect(new Set(groupedIds).size).toBe(PROJECTS.length);
    expect([...groupedIds].sort()).toEqual(PROJECTS.map((project) => project.id).sort());
    expect(page.collections().map((collection) => collection.id)).toEqual(
      PROJECT_COLLECTIONS.map((collection) => collection.id),
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
      const expectedProjects = PROJECTS.filter((project) => project.tags.includes(filter.id));

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

    expect(page.projects()).toEqual(PROJECTS);
    expect(page.collections().length).toBe(PROJECT_COLLECTIONS.length);
  });

  it('renders all covers with dimensions and only one eager image', () => {
    const fixture = TestBed.createComponent(ProjectsPageComponent);
    fixture.detectChanges();
    const element: HTMLElement = fixture.nativeElement;
    const images = element.querySelectorAll<HTMLImageElement>('.project-cover img');

    expect(images.length).toBe(PROJECTS.length);
    expect(element.querySelectorAll('img[loading="eager"]').length).toBe(1);
    expect(element.querySelectorAll('img[loading="lazy"]').length).toBe(PROJECTS.length - 1);
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

    for (const project of PROJECTS) {
      const card = element.querySelector(`#project-${project.id}`)?.closest('article');
      expect(card).toBeTruthy();
      expect(card?.querySelector('details')?.hasAttribute('open')).toBe(false);
      expect(card?.querySelector('.project-role')?.textContent).toContain(project.roleKey);
      expect(card?.querySelectorAll('.project-details .pill').length).toBe(project.technologies.length);
      const links = Array.from(card?.querySelectorAll('a') ?? []);
      const expectedHrefs = [project.demoUrl, project.githubUrl].filter(
        (href): href is string => typeof href === 'string' && href.length > 0,
      );
      expect(links.map((link) => link.getAttribute('href'))).toEqual(expectedHrefs);
      for (const link of links) {
        expect(link.getAttribute('rel')).toBe('noopener noreferrer');
        expect(link.getAttribute('aria-label')).toContain(project.titleKey);
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
      PROJECTS.filter((project) => project.tags.includes('Finance')).length,
    );
    expect(element.querySelectorAll('.project-collection').length).toBe(1);
    expect(buttons[index].getAttribute('aria-pressed')).toBe('true');
    expect(buttons[0].getAttribute('aria-pressed')).toBe('false');
    expect(element.querySelector('[role="status"]')).toBeTruthy();
  });
});
