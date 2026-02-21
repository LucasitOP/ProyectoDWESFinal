import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth0: Auth0Service) { }

  // Iniciar sesión (redirige a Auth0)
  login(): void {
    this.auth0.loginWithRedirect();
  }

  // Cerrar sesión
  logout(): void {
    this.auth0.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  // Obtener estado de autenticación (Observable<boolean>)
  isAuthenticated(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }

  // Obtener perfil del usuario
  getUser(): Observable<any> {
    return this.auth0.user$;
  }

  // Obtener token JWT (útil para debug o casos especiales)
  getToken(): Observable<string> {
    return this.auth0.getAccessTokenSilently();
  }
}
