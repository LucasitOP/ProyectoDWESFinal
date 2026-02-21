import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservaService } from '../../services/reserva.service';
import { Reserva } from '../../../../shared/models/reserva.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reserva-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './reserva-list.component.html',
  styleUrl: './reserva-list.component.css'
})
export class ReservaListComponent implements OnInit {

  reservas$: Observable<Reserva[]> | undefined;

  constructor(private reservaService: ReservaService) { }

  ngOnInit(): void {
    this.reservas$ = this.reservaService.getReservas();
  }

  deleteReserva(id: number): void {
    if (confirm('¿Estás seguro de que quieres cancelar esta reserva?')) {
      this.reservaService.deleteReserva(id).subscribe(() => {
        // Recargar la lista después de eliminar
        this.reservas$ = this.reservaService.getReservas();
      });
    }
  }
}
