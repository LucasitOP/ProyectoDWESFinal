import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reserva-create.component.html',
  styleUrl: './reserva-create.component.css'
})
export class ReservaCreateComponent {

  reservaForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private router: Router
  ) {
    this.reservaForm = this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]], // Validación simple para España
      fechaHora: ['', Validators.required],
      numeroPersonas: [2, [Validators.required, Validators.min(1), Validators.max(20)]],
      restaurantId: ['restaurante-1', Validators.required] // Por ahora hardcodeado, luego lo seleccionaremos
    });
  }

  onSubmit(): void {
    if (this.reservaForm.valid) {
      this.reservaService.createReserva(this.reservaForm.value).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Reserva creada!',
            text: 'Te hemos enviado un SMS de confirmación.',
            confirmButtonColor: '#0d6efd'
          }).then(() => {
            this.router.navigate(['/reservas']);
          });
        },
        error: (err) => {
          console.error('Error al crear reserva:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema al crear tu reserva. Inténtalo de nuevo.',
            confirmButtonColor: '#dc3545'
          });
        }
      });
    } else {
      this.reservaForm.markAllAsTouched();
    }
  }
}
