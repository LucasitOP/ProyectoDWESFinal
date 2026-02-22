import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ReservaService } from '../../services/reserva.service';
import { RoleService } from '../../../../core/services/role.service';
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
  isStaff = false;

  restaurantes = [
    { id: 'restaurante-1', nombre: 'Restaurante Italiano' },
    { id: 'restaurante-2', nombre: 'Asador Argentino' },
    { id: 'restaurante-3', nombre: 'Sushi Bar' }
  ];

  constructor(
    private fb: FormBuilder,
    private reservaService: ReservaService,
    private roleService: RoleService,
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

  /**
   * Inicializa el componente y detecta el contexto de uso.
   *
   * Contextos:
   * - Con :id en URL → Cliente público reservando en restaurante específico (campo bloqueado)
   * - Sin :id en URL → Staff creando reserva (selector de restaurante visible)
   */
  ngOnInit(): void {
    // Detectar si el usuario es staff
    this.roleService.isStaff().subscribe(staff => {
      this.isStaff = staff;
    });

    this.restaurantId = this.route.snapshot.paramMap.get('id');

    if (this.restaurantId) {
      // Vista pública: restaurante pre-seleccionado y bloqueado
      this.reservaForm.patchValue({ restaurantId: this.restaurantId });
      this.reservaForm.get('restaurantId')?.disable();
      this.restaurantName = this.getRestaurantName(this.restaurantId);
    } else {
      // Vista staff: restaurante seleccionable
      this.reservaForm.patchValue({ restaurantId: 'restaurante-1' });
      this.restaurantName = this.getRestaurantName('restaurante-1');
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
    return names[id] || 'Restaurante Seleccionado';
  }

  /**
   * Procesa el envío del formulario de reserva.
   * Formatea la fecha al formato ISO esperado por el backend (añade segundos).
   * Intenta enviar SMS de confirmación si Twilio está configurado (backend).
   */
  onSubmit(): void {
    if (this.reservaForm.valid) {
      // getRawValue() incluye campos deshabilitados
      const rawValue = this.reservaForm.getRawValue();

      // Formatear fecha de datetime-local a ISO con segundos
      let fechaHora = rawValue.fechaHora;
      if (fechaHora && fechaHora.length === 16) {
        fechaHora = fechaHora + ':00';
      }

      // Actualizar nombre para mostrar en mensaje de confirmación
      this.restaurantName = this.getRestaurantName(rawValue.restaurantId);

      const reservaData = {
        nombreCliente: rawValue.nombreCliente,
        telefono: rawValue.telefono,
        fechaHora: fechaHora,
        numeroPersonas: rawValue.numeroPersonas,
        restaurantId: rawValue.restaurantId
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
