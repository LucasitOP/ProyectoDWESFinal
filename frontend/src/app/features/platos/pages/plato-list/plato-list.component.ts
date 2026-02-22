import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlatoService } from '../../services/plato.service';
import { Plato } from '../../../../shared/models/plato.model';
import { Observable, switchMap, of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { RoleService } from '../../../../core/services/role.service';

/**
 * Componente para listar platos del menú.
 *
 * Tiene dos modos de funcionamiento:
 * 1. Vista pública (/restaurante/:id/menu): Muestra menú de un restaurante específico con botón de reservar
 * 2. Vista staff (/platos): Muestra menú del restaurante gestionado por el usuario
 *
 * Para Admins en vista staff:
 * - Usa el restaurante seleccionado del localStorage
 *
 * Para Encargados en vista staff:
 * - Usa su restaurante asignado automáticamente
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Component({
  selector: 'app-plato-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './plato-list.component.html',
  styleUrl: './plato-list.component.css'
})
export class PlatoListComponent implements OnInit {

  platos$: Observable<Plato[]> | undefined;
  restaurantId: string | null = null;
  restaurantName: string = 'Menú del Restaurante';
  isStaff$: Observable<boolean>;

  constructor(
    private platoService: PlatoService,
    private route: ActivatedRoute,
    public auth: AuthService,
    private roleService: RoleService
  ) {
    this.isStaff$ = this.roleService.isStaff();
  }

  ngOnInit(): void {
    // Obtener el ID del restaurante de la URL
    this.restaurantId = this.route.snapshot.paramMap.get('id');

    if (this.restaurantId) {
      // Si hay ID en la URL, es una vista pública de un restaurante
      this.platos$ = this.platoService.getPlatosByRestaurante(this.restaurantId);
      this.restaurantName = this.getRestaurantName(this.restaurantId);
    } else {
      // Si no hay ID en la URL, estamos en /platos (gestión propia)
      this.platos$ = this.roleService.isAdmin().pipe(
        switchMap(isAdmin => {
          if (isAdmin) {
            // Admin: usar restaurante seleccionado del localStorage
            const selectedRestaurant = localStorage.getItem('selectedRestaurant') || 'restaurante-1';
            this.restaurantId = selectedRestaurant;
            this.restaurantName = this.getRestaurantName(selectedRestaurant);
            return this.platoService.getPlatosByRestaurante(selectedRestaurant);
          } else {
            // Encargado: usar su restaurante asignado
            return this.roleService.getMyRestaurantId().pipe(
              switchMap(myId => {
                this.restaurantId = myId;
                this.restaurantName = this.getRestaurantName(myId);
                return this.platoService.getPlatosByRestaurante(myId);
              })
            );
          }
        })
      );
    }
  }

  getRestaurantName(id: string): string {
    const names: { [key: string]: string } = {
      'restaurante-1': 'Restaurante Italiano',
      'restaurante-2': 'Asador Argentino',
      'restaurante-3': 'Sushi Bar'
    };
    return names[id] || 'Restaurante Seleccionado';
  }
}
