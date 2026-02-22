import { Routes, Router, CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { map, take, filter, switchMap } from 'rxjs/operators';
import { RoleService } from './core/services/role.service';
import { HomeComponent } from './features/home/pages/home/home.component';
import { ReservaListComponent } from './features/reservas/pages/reserva-list/reserva-list.component';
import { ReservaCreateComponent } from './features/reservas/pages/reserva-create/reserva-create.component';
import { PlatoListComponent } from './features/platos/pages/plato-list/plato-list.component';
import { PlatoCreateComponent } from './features/platos/pages/plato-create/plato-create.component';
import { PlatoDetailComponent } from './features/platos/pages/plato-detail/plato-detail.component';
import { DashboardComponent } from './features/dashboard/pages/dashboard/dashboard.component';
import { MesasComponent } from './features/mesas/pages/mesas/mesas.component';
import { NotFoundComponent } from './shared/pages/not-found/not-found.component';
import { authGuardFn, AuthService } from '@auth0/auth0-angular';
import { staffGuard } from './core/guards/role.guard';
import { of } from 'rxjs';

// Guard especial: Si eres Staff y vas al Home, te manda al Dashboard
const staffHomeRedirectGuard: CanActivateFn = () => {
  const roleService = inject(RoleService);
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.isLoading$.pipe(
    filter(isLoading => !isLoading), // Esperar a que Auth0 termine de cargar
    take(1),
    switchMap(() => auth.isAuthenticated$), // Verificar si está autenticado primero
    switchMap(isAuthenticated => {
        if (!isAuthenticated) return of(false); // Si no está logueado, no es staff
        return roleService.isStaff();
    }),
    map(isStaff => {
      if (isStaff) {
        return router.createUrlTree(['/dashboard']);
      }
      return true;
    })
  );
};

export const routes: Routes = [
  // Aplicamos el guard aquí para expulsar al Encargado de la vista Cliente
  { path: '', component: HomeComponent, canActivate: [staffHomeRedirectGuard] },

  // Rutas Públicas de Restaurantes (Vista Cliente)
  {
    path: 'restaurante/:id/menu',
    component: PlatoListComponent
  },
  {
    path: 'restaurante/:id/reservar',
    component: ReservaCreateComponent
  },
  {
    path: 'platos/:id', // Detalle de plato
    component: PlatoDetailComponent
  },

  // Rutas Privadas de Gestión (Vista Dueño/Admin)
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuardFn, staffGuard] // Solo Staff
  },
  {
    path: 'reservas', // Mis reservas (como cliente) o Gestión (como admin)
    component: ReservaListComponent,
    canActivate: [authGuardFn] // Accesible para todos los logueados (la lógica interna filtra)
  },
  {
    path: 'reservas/create', // Crear nueva reserva (staff)
    component: ReservaCreateComponent,
    canActivate: [authGuardFn, staffGuard] // Solo Staff
  },
  {
    path: 'platos/create', // Solo para gestores (DEBE IR ANTES que /platos)
    component: PlatoCreateComponent,
    canActivate: [authGuardFn, staffGuard] // Solo Staff
  },
  {
    path: 'platos/edit/:id', // Editar plato
    component: PlatoCreateComponent,
    canActivate: [authGuardFn, staffGuard] // Solo Staff
  },
  {
    path: 'platos', // Gestión de menú (lista propia del encargado)
    component: PlatoListComponent,
    canActivate: [authGuardFn, staffGuard]
  },
  {
    path: 'mesas', // Solo para gestores
    component: MesasComponent,
    canActivate: [authGuardFn, staffGuard] // Solo Staff
  },

  // Página 404
  { path: '**', component: NotFoundComponent }
];
