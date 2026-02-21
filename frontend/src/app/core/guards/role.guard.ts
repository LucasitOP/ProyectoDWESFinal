import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { RoleService } from '../services/role.service';
import { map, tap } from 'rxjs/operators';

/**
 * Guard de rutas que protege rutas de personal (staff).
 * Verifica si el usuario tiene rol de Admin o Encargado.
 * Si no tiene estos roles, redirige a la página de inicio.
 *
 * Uso: Añadir a rutas de administración/gestión
 *   path: 'platos', component: PlatoListComponent, canActivate: [staffGuard]
 */
export const staffGuard: CanActivateFn = () => {
  const roleService = inject(RoleService);
  const router = inject(Router);

  return roleService.isStaff().pipe(
    tap(isStaff => {
      if (!isStaff) {
        // Usuario sin rol de staff: redirigir a home
        router.navigate(['/']);
      }
    })
  );
};
