import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PlatoService } from '../../services/plato.service';
import { Plato } from '../../../../shared/models/plato.model';
import { Observable, switchMap, of } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';
import { RoleService } from '../../../../core/services/role.service';

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
      this.platos$ = this.roleService.isStaff().pipe(
        switchMap(isStaff => {
          if (isStaff) {
            // Si es Staff, cargar SU restaurante
            return this.roleService.getMyRestaurantId().pipe(
              switchMap(myId => {
                this.restaurantId = myId;
                this.restaurantName = this.getRestaurantName(myId);
                return this.platoService.getPlatosByRestaurante(myId);
              })
            );
          } else {
            // Si es Cliente y entra aquí por error, no mostrar nada o redirigir
            // (Aunque el Guard debería haberlo parado antes)
            return of([]);
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
