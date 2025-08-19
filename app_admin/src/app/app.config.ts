// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptProvider } from './utils/jwt-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule), // shows as deprecated, but okay in older templates
    authInterceptProvider
  ]
};

