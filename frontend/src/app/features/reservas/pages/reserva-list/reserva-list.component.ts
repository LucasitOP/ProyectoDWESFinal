import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';
import { RoleService } from '../../../../core/services/role.service';
import { Reserva } from '../../../../shared/models/reserva.model';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../../core/services/notification.service';

/**
 * Componente para listar y gestionar reservas.
 *
 * Funcionalidades:
 * - Muestra todas las reservas del usuario/restaurante
 * - Permite cancelar reservas
 * - Staff puede crear nuevas reservas con botón "Nueva Reserva"
 * - Muestra información simplificada: Restaurante, Fecha, Personas, Estado
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reserva-list.component.html',
  styleUrl: './reserva-list.component.css'
})
export class ReservaListComponent implements OnInit {

  reservas$: Observable<Reserva[]> | undefined;
  isStaff$: Observable<boolean>;

  constructor(
    private reservaService: ReservaService,
    private roleService: RoleService,
    private notificationService: NotificationService
  ) {
    this.isStaff$ = this.roleService.isStaff();
  }

  /**
   * Inicializa el componente y carga la lista de reservas.
   */
  ngOnInit(): void {
    this.reservas$ = this.reservaService.getReservas();
  }

  /**
   * Cancela una reserva solicitando confirmación previa.
   * Recarga la lista de reservas después de la eliminación.
   * @param id Identificador de la reserva a cancelar
   */
  deleteReserva(id: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.reservaService.deleteReserva(id).subscribe(() => {
        this.notificationService.showSuccess('Reserva cancelada correctamente');
        this.reservas$ = this.reservaService.getReservas();
      });
    }
  }

  /**
   * Obtiene el nombre legible de un restaurante.
   * @param id Identificador del restaurante
   * @returns Nombre del restaurante
   */
  getRestaurantName(id: string): string {
    const names: { [key: string]: string } = {
      'restaurante-1': 'Restaurante Italiano',
      'restaurante-2': 'Asador Argentino',
      'restaurante-3': 'Sushi Bar'
    };
    return names[id] || id;
  }
}
