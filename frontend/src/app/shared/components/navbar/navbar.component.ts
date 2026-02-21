import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService, User } from '@auth0/auth0-angular';
import { AsyncPipe, NgIf } from '@angular/common';
import { RoleService } from '../../../core/services/role.service';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  // ViewModel: Combina toda la info necesaria para el HTML en un solo objeto
  vm$: Observable<{
    isAuthenticated: boolean;
    isStaff: boolean;
    isCustomer: boolean;
    isAdmin: boolean;
  }>;

  constructor(public auth: AuthService, private roleService: RoleService) {
    this.vm$ = combineLatest({
      isAuthenticated: this.auth.isAuthenticated$,
      isStaff: this.roleService.isStaff(),
      isAdmin: this.roleService.isAdmin(),
      user: this.auth.user$
    }).pipe(
      map(({ isAuthenticated, isStaff, isAdmin, user }) => {
        return {
          isAuthenticated,
          isStaff,
          isAdmin,
          isCustomer: isAuthenticated && !isStaff && !isAdmin
        };
      })
    );
  }

  login(): void {
    this.auth.loginWithRedirect();
  }

  logout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }
}
