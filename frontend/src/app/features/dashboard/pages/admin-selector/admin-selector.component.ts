import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

/**
 * Componente selector de restaurante para administradores.
 *
 * Permite a los administradores elegir qué restaurante desean gestionar.
 * La selección se guarda en localStorage para mantener persistencia entre sesiones.
 *
 * Características:
 * - Interfaz visual con tarjetas para cada restaurante
 * - Persistencia de selección en localStorage
 * - Redirección automática al dashboard con el restaurante elegido
 * - Solo accesible para usuarios con rol de Administrador
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Component({
  selector: 'app-admin-selector',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-selector.component.html',
  styleUrl: './admin-selector.component.css'
})
export class AdminSelectorComponent {

  /** Lista de restaurantes disponibles en el sistema */
  restaurantes = [
    {
      id: 'restaurante-1',
      nombre: 'Restaurante Italiano',
      descripcion: 'Auténtica cocina italiana con pastas frescas y pizzas artesanales',
      icono: '🍝'
    },
    {
      id: 'restaurante-2',
      nombre: 'Asador Argentino',
      descripcion: 'Carnes premium a la parrilla con estilo argentino',
      icono: '🥩'
    },
    {
      id: 'restaurante-3',
      nombre: 'Sushi Bar',
      descripcion: 'Sushi fresco y cocina japonesa tradicional',
      icono: '🍣'
    }
  ];

  constructor(private router: Router) {}

  /**
   * Selecciona un restaurante para gestionar.
   * Guarda la selección en localStorage y redirige al dashboard con query params.
   * @param restaurantId Identificador del restaurante seleccionado
   */
  selectRestaurant(restaurantId: string): void {
    localStorage.setItem('selectedRestaurant', restaurantId);
    this.router.navigate(['/dashboard'], { queryParams: { restaurant: restaurantId } });
  }
}

