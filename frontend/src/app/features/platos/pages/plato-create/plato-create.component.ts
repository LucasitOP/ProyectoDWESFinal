import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlatoService } from '../../services/plato.service';
import { RoleService } from '../../../../core/services/role.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

/**
 * Componente para crear y editar platos del menú.
 *
 * Funcionalidades:
 * - Modo creación: Formulario vacío para nuevo plato
 * - Modo edición: Carga datos del plato existente
 * - Admins: Pueden seleccionar el restaurante desde un dropdown
 * - Encargados: Restaurante asignado automáticamente
 * - Subida opcional de imágenes a Cloudinary
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Component({
  selector: 'app-plato-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './plato-create.component.html',
  styleUrl: './plato-create.component.css'
})
export class PlatoCreateComponent implements OnInit {

  platoForm: FormGroup;
  selectedFile: File | undefined;
  isEditMode = false;
  platoId: number | null = null;
  isAdmin = false;
  isLoading = true;

  /** Lista de restaurantes disponibles para admins */
  restaurantes = [
    { id: 'restaurante-1', nombre: 'Restaurante Italiano' },
    { id: 'restaurante-2', nombre: 'Asador Argentino' },
    { id: 'restaurante-3', nombre: 'Sushi Bar' }
  ];

  constructor(
    private fb: FormBuilder,
    private platoService: PlatoService,
    private roleService: RoleService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.platoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      precio: [0, [Validators.required, Validators.min(0.1)]],
      restaurantId: ['restaurante-1', Validators.required]
    });
  }

  /**
   * Inicializa el componente.
   * Detecta si es modo edición (ID en URL) o creación (sin ID).
   * En modo creación, determina el restaurante según el rol:
   * - Admin: usa el restaurante seleccionado del localStorage
   * - Encargado: obtiene su restaurante asignado automáticamente
   */
  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    // FLUJO 1: Modo Edición - Cargar plato existente
    if (id) {
      this.isEditMode = true;
      this.platoId = Number(id);
      this.loadPlato(this.platoId);
      return;
    }

    // FLUJO 2: Modo Creación - Detectar rol y asignar restaurante
    this.roleService.isAdmin().subscribe({
      next: (admin) => {
        this.isAdmin = admin;

        if (admin) {
          // Administrador: recuperar restaurante seleccionado en el selector
          const selectedRestaurant = localStorage.getItem('selectedRestaurant') || 'restaurante-1';
          this.platoForm.patchValue({ restaurantId: selectedRestaurant });
          this.isLoading = false;
        } else {
          // Encargado: obtener su restaurante asignado por rol
          this.roleService.getMyRestaurantId().subscribe({
            next: (myRestaurantId) => {
              this.platoForm.patchValue({ restaurantId: myRestaurantId });
              this.isLoading = false;
            },
            error: () => {
              console.error('Error obteniendo restaurante del encargado');
              this.isLoading = false;
            }
          });
        }
      },
      error: () => {
        console.error('Error verificando si es admin');
        this.isLoading = false;
      }
    });
  }

  /**
   * Carga los datos de un plato existente para edición.
   * Después de cargar, detecta si el usuario es admin para mostrar u ocultar el selector de restaurante.
   * @param id Identificador del plato a cargar
   */
  loadPlato(id: number): void {
    this.platoService.getPlato(id).subscribe({
      next: (plato) => {
        this.platoForm.patchValue({
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          restaurantId: plato.restaurantId
        });

        // Detectar rol para mostrar/ocultar selector de restaurante
        this.roleService.isAdmin().subscribe({
          next: (admin) => {
            this.isAdmin = admin;
            this.isLoading = false;
          },
          error: () => {
            this.isLoading = false;
          }
        });
      },
      error: (err) => {
        console.error('Error cargando plato:', err);
        this.isLoading = false;
        this.router.navigate(['/platos']);
      }
    });
  }

  /**
   * Maneja la selección de archivo de imagen.
   * @param event Evento del input file
   */
  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  /**
   * Procesa el envío del formulario.
   * Determina si debe crear o actualizar según el modo.
   */
  onSubmit(): void {
    if (this.platoForm.valid) {
      if (this.isEditMode && this.platoId) {
        this.updatePlato();
      } else {
        this.createPlato();
      }
    } else {
      this.platoForm.markAllAsTouched();
    }
  }

  /**
   * Crea un nuevo plato en el sistema.
   * Convierte el precio a número, crea FormData con los campos y la imagen (si existe).
   * Muestra notificación de éxito/error usando SweetAlert2.
   */
  createPlato(): void {
    const formValue = this.platoForm.value;
    formValue.precio = Number(formValue.precio);

    this.platoService.createPlato(formValue, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Plato creado!',
          text: 'El plato se ha añadido al menú correctamente.',
          confirmButtonColor: '#0d6efd'
        }).then(() => {
          this.router.navigate(['/platos']);
        });
      },
      error: (err) => {
        console.error('Error al crear plato:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un problema al crear el plato. Inténtalo de nuevo.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }

  /**
   * Actualiza un plato existente en el sistema.
   * Permite cambiar datos y opcionalmente reemplazar la imagen.
   */
  updatePlato(): void {
    if (!this.platoId) return;

    const formValue = this.platoForm.value;
    formValue.precio = Number(formValue.precio);

    this.platoService.updatePlato(this.platoId, formValue, this.selectedFile).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: '¡Plato actualizado!',
          text: 'Los cambios se han guardado correctamente.',
          confirmButtonColor: '#0d6efd'
        }).then(() => {
          this.router.navigate(['/platos']);
        });
      },
      error: (err) => {
        console.error('Error al actualizar plato:', err);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Hubo un problema al actualizar el plato. Inténtalo de nuevo.',
          confirmButtonColor: '#dc3545'
        });
      }
    });
  }
}
