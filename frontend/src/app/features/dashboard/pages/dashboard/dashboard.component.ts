import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { RoleService } from '../../../../core/services/role.service';
import { Observable } from 'rxjs';

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

  ngOnInit(): void {
    // Obtener restaurante de query params o localStorage
    this.route.queryParams.subscribe(params => {
      if (params['restaurant']) {
        this.selectedRestaurant = params['restaurant'];
        if (this.selectedRestaurant) {
          localStorage.setItem('selectedRestaurant', this.selectedRestaurant);
        }
      } else {
        this.selectedRestaurant = localStorage.getItem('selectedRestaurant');
      }

      // Si es encargado y no hay selección, usar su restaurante
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

  updateRestaurantName(): void {
    if (this.selectedRestaurant) {
      this.restaurantName = this.restaurantes[this.selectedRestaurant] || 'Restaurante';
    }
  }

  changeRestaurant(): void {
    // Redirigir al selector
    this.router.navigate(['/admin/selector']);
  }
}
