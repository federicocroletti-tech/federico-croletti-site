import { Routes } from '@angular/router';

import { AppShellComponent } from './layout/shell/app-shell.component';

export const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/home/page/home-page.component').then((m) => m.HomePageComponent),
      },
      {
        path: 'chi-sono',
        loadComponent: () =>
          import('./features/about/page/about-page.component').then((m) => m.AboutPageComponent),
      },
      {
        path: 'esperienza',
        loadComponent: () =>
          import('./features/experience/page/experience-page.component').then(
            (m) => m.ExperiencePageComponent,
          ),
      },
      {
        path: 'competenze',
        loadComponent: () =>
          import('./features/skills/page/skills-page.component').then(
            (m) => m.SkillsPageComponent,
          ),
      },
      {
        path: 'servizi-frontend',
        loadComponent: () =>
          import('./features/frontend-services/page/frontend-services-page.component').then(
            (m) => m.FrontendServicesPageComponent,
          ),
      },
      {
        path: 'servizi',
        redirectTo: 'assistenza-informatica-milano',
        pathMatch: 'full',
      },
      {
        path: 'assistenza-informatica-milano',
        loadComponent: () =>
          import('./features/local-support/page/local-support-page.component').then(
            (m) => m.LocalSupportPageComponent,
          ),
      },
      {
        path: 'progetti',
        loadComponent: () =>
          import('./features/projects/page/projects-page.component').then(
            (m) => m.ProjectsPageComponent,
          ),
      },
      {
        path: 'portfolio',
        redirectTo: 'progetti',
        pathMatch: 'full',
      },
      {
        path: 'articoli',
        loadComponent: () =>
          import('./features/articles/page/articles-page.component').then(
            (m) => m.ArticlesPageComponent,
          ),
      },
      {
        path: 'articoli/:slug',
        loadComponent: () =>
          import('./features/articles/detail/article-detail-page.component').then(
            (m) => m.ArticleDetailPageComponent,
          ),
      },
      {
        path: 'contatti',
        loadComponent: () =>
          import('./features/contact/page/contact-page.component').then(
            (m) => m.ContactPageComponent,
          ),
      },
      {
        path: 'grazie',
        loadComponent: () =>
          import('./features/thank-you/page/thank-you-page.component').then(
            (m) => m.ThankYouPageComponent,
          ),
      },
      {
        path: 'dashboard-conversioni',
        loadComponent: () =>
          import('./features/conversion-dashboard/page/conversion-dashboard-page.component').then(
            (m) => m.ConversionDashboardPageComponent,
          ),
      },
      {
        path: 'privacy',
        loadComponent: () =>
          import('./features/privacy/page/privacy-page.component').then(
            (m) => m.PrivacyPageComponent,
          ),
      },
      {
        path: 'cookie-policy',
        loadComponent: () =>
          import('./features/cookie-policy/page/cookie-policy-page.component').then(
            (m) => m.CookiePolicyPageComponent,
          ),
      },
      {
        path: 'cookie',
        redirectTo: 'cookie-policy',
        pathMatch: 'full',
      },
      {
        path: '404',
        loadComponent: () =>
          import('./features/not-found/page/not-found-page.component').then(
            (m) => m.NotFoundPageComponent,
          ),
      },
      {
        path: '**',
        redirectTo: '404',
      },
    ],
  },
];
