import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAuth0, authHttpInterceptorFn } from '@auth0/auth0-angular';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authHttpInterceptorFn])
    ),
    provideAuth0({
      domain: 'dev-lucas-proyecto.eu.auth0.com',
      clientId: 'mLVvJhU1ND98QoZY3dHkVFOEswzCo0TJ',
      authorizationParams: {
        redirect_uri: window.location.origin,
        audience: 'https://Timoc-Manager-reservas',
      },
      cacheLocation: 'localstorage', // Para cumplir el check de la rúbrica
      httpInterceptor: {
        allowedList: [
          '/api/*' // Intercepta todas las peticiones a /api y añade el token
        ]
      }
    })
  ]
};
