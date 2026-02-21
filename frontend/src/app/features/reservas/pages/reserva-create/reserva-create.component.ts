import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './reserva-create.component.html',
  styleUrl: './reserva-create.component.css'
})
export class ReservaCreateComponent implements OnInit {

  reservaForm: FormGroup;
  restaurantId: string | null = null;
  restaurantName: string = 'Restaurante';

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.reservaForm = this.fb.group({
      nombreCliente: ['', [Validators.required, Validators.minLength(3)]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      fechaHora: ['', Validators.required],
      numeroPersonas: [2, [Validators.required, Validators.min(1), Validators.max(20)]],
      restaurantId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Obtener el ID del restaurante de la URL
    this.restaurantId = this.route.snapshot.paramMap.get('id');

    if (this.restaurantId) {
      // Si venimos de una página de restaurante, pre-seleccionar y deshabilitar el campo
      this.reservaForm.patchValue({ restaurantId: this.restaurantId });
      this.reservaForm.get('restaurantId')?.disable(); // El usuario no puede cambiarlo
      this.restaurantName = this.getRestaurantName(this.restaurantId);
    } else {
      // Si es una reserva manual desde el dashboard, permitir seleccionar
      this.reservaForm.patchValue({ restaurantId: 'restaurante-1' }); // Valor por defecto
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

  onSubmit(): void {
    if (this.reservaForm.valid) {
      // Si el campo está deshabilitado, Angular no lo incluye en .value, así que lo añadimos manualmente
      const rawValue = this.reservaForm.getRawValue();

      // Formatear la fecha para que Java la entienda (añadir :00 segundos)
      let fechaHora = rawValue.fechaHora;
      if (fechaHora && fechaHora.length === 16) {
        fechaHora = fechaHora + ':00';
      }

      // Estructurar el objeto para que coincida con el DTO del backend
      // El backend espera un objeto restaurante anidado: { restaurante: { id: "..." } }
      const reservaData = {
        nombreCliente: rawValue.nombreCliente,
        telefono: rawValue.telefono,
        fechaHora: fechaHora,
        numeroPersonas: rawValue.numeroPersonas,
        restaurante: {
            id: rawValue.restaurantId
        }
      };

      this.reservaService.createReserva(reservaData).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: '¡Reserva Confirmada!',
            text: `Te esperamos en ${this.restaurantName}. Hemos enviado un SMS a tu móvil.`,
            confirmButtonColor: '#0d6efd'
          }).then(() => {
            // Redirigir al menú del restaurante o al dashboard si está logueado
            if (this.restaurantId) {
              this.router.navigate(['/restaurante', this.restaurantId, 'menu']);
            } else {
              this.router.navigate(['/reservas']);
            }
          });
        },
        error: (err) => {
          console.error('Error al crear reserva:', err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema al procesar tu reserva. Por favor, inténtalo de nuevo.',
            confirmButtonColor: '#dc3545'
          });
        }
      });
    } else {
      this.reservaForm.markAllAsTouched();
    }
  }
}
