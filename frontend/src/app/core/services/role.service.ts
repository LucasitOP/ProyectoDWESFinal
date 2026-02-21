import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';

/**
 * Servicio para gestionar los roles de usuario y permisos.
 * Lee roles del token JWT de Auth0 y proporciona métodos para verificar autorización.
 * Soporta fallback por email para facilitar testing en ambiente de desarrollo.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // Namespace personalizado en Auth0 donde se almacenan los roles
  private namespace = 'https://Timoc-Manager-reservas/roles';

  constructor(private auth: AuthService) { }

  /**
   * Verifica si un usuario posee alguno de los roles especificados.
   * Busca en el namespace personalizado de Auth0 y en todo el objeto user.
   * Como fallback de desarrollo, verifica el email del usuario.
   * @param user Objeto user de Auth0.
   * @param roleNames Array de nombres de rol a buscar (case-insensitive).
   * @return true si el usuario tiene al menos uno de los roles.
   */
  private hasRole(user: User | null | undefined, roleNames: string[]): boolean {
    if (!user) return false;

    // 1. Búsqueda prioritaria en namespace personalizado
    if (user[this.namespace] && Array.isArray(user[this.namespace])) {
       const roles = user[this.namespace] as string[];
       const match = roles.some(r => roleNames.some(target => target.toLowerCase() === r.toLowerCase()));
       if (match) return true;
    }

    // 2. Búsqueda genérica en arrays de strings del objeto
    const genericMatch = Object.values(user).some(val =>
      Array.isArray(val) && val.some(r =>
        typeof r === 'string' && roleNames.some(target => target.toLowerCase() === r.toLowerCase())
      )
    );
    if (genericMatch) return true;

    // 3. Fallback por email (desarrollo/testing)
    if (user.email) {
      const email = user.email.toLowerCase();
      if (roleNames.some(r => r.toLowerCase().includes('admin'))) {
        if (email.includes('admin')) return true;
      }
      if (roleNames.some(r => r.toLowerCase().includes('encargado'))) {
        if (email.includes('encargado') || email.includes('asador') || email.includes('sushi') || email.includes('restaurante')) return true;
      }
    }

    return false;
  }

  /**
   * Obtiene todos los roles del usuario encontrados en el token.
   * @return Observable<string[]> Array de nombres de rol.
   */
  getRoles(): Observable<string[]> {
    return this.auth.user$.pipe(
      map(user => {
         const roles: string[] = [];
         if (!user) return roles;

         // Extraer roles del namespace personalizado primero
         if (user[this.namespace] && Array.isArray(user[this.namespace])) {
             (user[this.namespace] as string[]).forEach(r => roles.push(r));
         }

         // Buscar roles adicionales en otros campos
         Object.values(user).forEach(val => {
            if (Array.isArray(val)) {
                val.forEach(r => {
                    if (typeof r === 'string' && !roles.includes(r)) roles.push(r);
                });
            }
         });
         return roles;
      })
    );
  }

  /**
   * Verifica si el usuario tiene el rol de Administrador.
   * @return Observable<boolean> true si es admin.
   */
  isAdmin(): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => this.hasRole(user, ['Admin', 'Administrador']))
    );
  }

  /**
   * Verifica si el usuario tiene el rol de Encargado de restaurante.
   * @return Observable<boolean> true si es encargado.
   */
  isEncargado(): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => this.hasRole(user, ['Encargado']))
    );
  }

  /**
   * Verifica si el usuario es personal (Admin o Encargado).
   * @return Observable<boolean> true si pertenece al staff.
   */
  isStaff(): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => this.hasRole(user, ['Admin', 'Administrador', 'Encargado']))
    );
  }

  /**
   * Obtiene el ID del restaurante asignado al usuario encargado.
   * En desarrollo, simula IDs según el email.
   * @return Observable<string> ID del restaurante.
   */
  getMyRestaurantId(): Observable<string> {
    return this.auth.user$.pipe(
      map(user => {
        if (user?.email?.includes('asador')) return 'restaurante-2';
        if (user?.email?.includes('sushi')) return 'restaurante-3';
        return 'restaurante-1';
      })
    );
  }
}
