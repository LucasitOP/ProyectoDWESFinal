import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { map, tap } from 'rxjs/operators';

/**
 * Guard de rutas que protege componentes privados.
 * Verifica si el usuario está autenticado mediante Auth0.
 * Si no está autenticado, redirige al login de Auth0.
 *
 * Uso: Añadir a la definición de rutas protegidas
 *   path: 'dashboard', component: DashboardComponent, canActivate: [authGuard]
 */
export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isAuthenticated$.pipe(
    tap(isAuthenticated => {
      if (!isAuthenticated) {
        // Usuario no autenticado: redirigir a login de Auth0
        auth.loginWithRedirect({
          appState: { target: state.url }
        });
      }
    }),
    map(isAuthenticated => isAuthenticated)
  );
};
