import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-selector',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-selector.component.html',
  styleUrl: './admin-selector.component.css'
})
export class AdminSelectorComponent {
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

  selectRestaurant(restaurantId: string): void {
    // Guardar en localStorage para mantener la selección
    localStorage.setItem('selectedRestaurant', restaurantId);

    // Redirigir al dashboard con el restaurante seleccionado
    this.router.navigate(['/dashboard'], { queryParams: { restaurant: restaurantId } });
  }
}

