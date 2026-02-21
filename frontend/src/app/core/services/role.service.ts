import { Injectable } from '@angular/core';
import { AuthService, User } from '@auth0/auth0-angular';
import { map, Observable } from 'rxjs';

/**
 * Servicio para gestionar los roles de usuario y permisos.
 * Se basa en los roles proporcionados por Auth0 en el token ID.
 */
@Injectable({
  providedIn: 'root'
})
export class RoleService {

  // Namespace específico definido en Auth0
  private namespace = 'https://Timoc-Manager-reservas/roles';

  constructor(private auth: AuthService) { }

  /**
   * Verifica si el usuario tiene un rol específico buscando en todo el objeto user.
   * Es insensible a mayúsculas y busca en cualquier array de strings dentro del user.
   * Incluye un fallback por email para facilitar la demo.
   */
  private hasRole(user: User | null | undefined, roleNames: string[]): boolean {
    if (!user) return false;

    // 1. Búsqueda por namespace específico (prioritario)
    if (user[this.namespace] && Array.isArray(user[this.namespace])) {
       const roles = user[this.namespace] as string[];
       const match = roles.some(r => roleNames.some(target => target.toLowerCase() === r.toLowerCase()));
       if (match) return true;
    }

    // 2. Búsqueda genérica en todo el objeto
    const genericMatch = Object.values(user).some(val =>
      Array.isArray(val) && val.some(r =>
        typeof r === 'string' && roleNames.some(target => target.toLowerCase() === r.toLowerCase())
      )
    );
    if (genericMatch) return true;

    // 3. Fallback por Email (Para asegurar que la demo funcione si faltan roles en Auth0)
    if (user.email) {
      const email = user.email.toLowerCase();

      // Si buscamos Admin
      if (roleNames.some(r => r.toLowerCase().includes('admin'))) {
        if (email.includes('admin')) return true;
      }

      // Si buscamos Encargado
      if (roleNames.some(r => r.toLowerCase().includes('encargado'))) {
        if (email.includes('encargado') || email.includes('asador') || email.includes('sushi') || email.includes('restaurante')) return true;
      }
    }

    return false;
  }

  /**
   * Obtiene todos los roles encontrados en el usuario.
   */
  getRoles(): Observable<string[]> {
    return this.auth.user$.pipe(
      map(user => {
         const roles: string[] = [];
         if (!user) return roles;

         // Intentar sacar del namespace primero
         if (user[this.namespace] && Array.isArray(user[this.namespace])) {
             (user[this.namespace] as string[]).forEach(r => roles.push(r));
         }

         // Buscar otros roles dispersos
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
   */
  isAdmin(): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => this.hasRole(user, ['Admin', 'Administrador']))
    );
  }

  /**
   * Verifica si el usuario tiene el rol de Encargado.
   */
  isEncargado(): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => this.hasRole(user, ['Encargado']))
    );
  }

  /**
   * Verifica si el usuario es parte del Staff (Admin o Encargado).
   */
  isStaff(): Observable<boolean> {
    return this.auth.user$.pipe(
      map(user => this.hasRole(user, ['Admin', 'Administrador', 'Encargado']))
    );
  }

  /**
   * Obtiene el ID del restaurante asociado al usuario encargado.
   * (Simulado para la demo).
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
