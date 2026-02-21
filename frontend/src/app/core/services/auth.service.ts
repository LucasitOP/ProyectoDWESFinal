import { Injectable } from '@angular/core';
import { AuthService as Auth0Service } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Servicio de autenticación wrapper sobre Auth0.
 * Encapsula la lógica de login, logout y obtención de token JWT.
 * Proporciona métodos para gestionar la sesión del usuario.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth0: Auth0Service) { }

  /**
   * Inicia sesión redirigiendo al formulario de Auth0.
   */
  login(): void {
    this.auth0.loginWithRedirect();
  }

  /**
   * Cierra sesión y redirige a la página de inicio.
   */
  logout(): void {
    this.auth0.logout({
      logoutParams: {
        returnTo: window.location.origin
      }
    });
  }

  /**
   * Observable que emite true si el usuario está autenticado, false en caso contrario.
   * @return Observable<boolean> Estado de autenticación del usuario.
   */
  isAuthenticated(): Observable<boolean> {
    return this.auth0.isAuthenticated$;
  }

  /**
   * Observable con el perfil del usuario autenticado.
   * Contiene información como email, nombre, roles desde Auth0.
   * @return Observable con datos del usuario.
   */
  getUser(): Observable<any> {
    return this.auth0.user$;
  }

  /**
   * Obtiene el token JWT del usuario para acceder a APIs protegidas.
   * Útil para debugging o casos especiales donde se necesite el token manualmente.
   * @return Observable<string> Token JWT de acceso.
   */
  getToken(): Observable<string> {
    return this.auth0.getAccessTokenSilently();
  }
}
