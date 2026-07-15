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
        path: 'servizi',
        loadComponent: () =>
          import('./features/services/page/services-page.component').then(
            (m) => m.ServicesPageComponent,
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
        path: 'contatti',
        loadComponent: () =>
          import('./features/contact/page/contact-page.component').then(
            (m) => m.ContactPageComponent,
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
        path: '**',
        redirectTo: '',
      },
    ],
  },
];
