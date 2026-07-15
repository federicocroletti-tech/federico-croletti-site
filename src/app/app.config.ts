import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { provideTranslateLoader, provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(),
    provideRouter(
      routes,
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'top',
      }),
    ),
    provideAnimationsAsync(),
    ...provideTranslateHttpLoader({ prefix: '/assets/i18n/', suffix: '.json' }),
    ...provideTranslateService({
      fallbackLang: 'it',
      lang: 'it',
      loader: provideTranslateLoader(TranslateHttpLoader),
    }),
  ],
};
