import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/pages/home/home.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { ReservaListComponent } from './features/reservas/pages/reserva-list/reserva-list.component';
import { ReservaCreateComponent } from './features/reservas/pages/reserva-create/reserva-create.component';
import { PlatoListComponent } from './features/platos/pages/plato-list/plato-list.component';
import { PlatoCreateComponent } from './features/platos/pages/plato-create/plato-create.component';
import { authGuard } from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'reservas',
    component: ReservaListComponent,
    canActivate: [authGuard]
  },
  {
    path: 'reservas/create',
    component: ReservaCreateComponent,
    canActivate: [authGuard]
  },
  {
    path: 'platos',
    component: PlatoListComponent
  },
  {
    path: 'platos/create',
    component: PlatoCreateComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
