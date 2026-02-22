import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { RoleService } from '../../../../core/services/role.service';
import { Observable } from 'rxjs';

/**
 * Componente del dashboard principal para staff (Encargados y Administradores).
 *
 * Funcionalidades:
 * - Muestra KPIs y estadísticas del restaurante
 * - Accesos rápidos a gestión de reservas, platos y mesas
 * - Para Admins: Muestra botón "Cambiar Restaurante" para cambiar contexto
 * - Para Encargados: Muestra solo su restaurante asignado
 *
 * El restaurante actual se determina por:
 * 1. Query param ?restaurant=X (cuando viene del selector)
 * 2. localStorage 'selectedRestaurant' (persistencia)
 * 3. Restaurante asignado al encargado (si no es admin)
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isAdmin$: Observable<boolean>;
  selectedRestaurant: string | null = null;
  restaurantName: string = '';

  /** Mapeo de IDs a nombres de restaurantes */
  restaurantes: { [key: string]: string } = {
    'restaurante-1': 'Restaurante Italiano',
    'restaurante-2': 'Asador Argentino',
    'restaurante-3': 'Sushi Bar'
  };

  constructor(
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.isAdmin$ = this.roleService.isAdmin();
  }

  /**
   * Inicializa el componente y determina el restaurante activo.
   * Prioriza query params sobre localStorage, y si no hay ninguno,
   * obtiene el restaurante asignado al encargado.
   */
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['restaurant']) {
        // Restaurante viene del selector (admin)
        this.selectedRestaurant = params['restaurant'];
        if (this.selectedRestaurant) {
          localStorage.setItem('selectedRestaurant', this.selectedRestaurant);
        }
      } else {
        // Intentar recuperar de localStorage
        this.selectedRestaurant = localStorage.getItem('selectedRestaurant');
      }

      // Fallback para encargados sin selección previa
      if (!this.selectedRestaurant) {
        this.roleService.isAdmin().subscribe(isAdmin => {
          if (!isAdmin) {
            this.roleService.getMyRestaurantId().subscribe(restaurantId => {
              this.selectedRestaurant = restaurantId;
              if (restaurantId) {
                localStorage.setItem('selectedRestaurant', restaurantId);
              }
              this.updateRestaurantName();
            });
          }
        });
      } else {
        this.updateRestaurantName();
      }
    });
  }

  /**
   * Actualiza el nombre del restaurante mostrado en el header.
   */
  updateRestaurantName(): void {
    if (this.selectedRestaurant) {
      this.restaurantName = this.restaurantes[this.selectedRestaurant] || 'Restaurante';
    }
  }

  /**
   * Redirige al selector de restaurantes (solo para admins).
   */
  changeRestaurant(): void {
    this.router.navigate(['/admin/selector']);
  }
}
