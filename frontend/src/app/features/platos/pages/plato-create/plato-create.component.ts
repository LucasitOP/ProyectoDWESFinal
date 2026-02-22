import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PlatoService } from '../../services/plato.service';
import { RoleService } from '../../../../core/services/role.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

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

  ngOnInit(): void {
    // Verificar si es administrador
    this.roleService.isAdmin().subscribe(admin => {
      this.isAdmin = admin;

      // Si NO es admin, establecer su restaurante automáticamente
      if (!admin) {
        this.roleService.getMyRestaurantId().subscribe(myRestaurantId => {
          this.platoForm.patchValue({ restaurantId: myRestaurantId });
        });
      }
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.platoId = Number(id);
      this.loadPlato(this.platoId);
    }
  }

  loadPlato(id: number): void {
    this.platoService.getPlato(id).subscribe({
      next: (plato) => {
        this.platoForm.patchValue({
          nombre: plato.nombre,
          descripcion: plato.descripcion,
          precio: plato.precio,
          restaurantId: plato.restaurantId
        });
      },
      error: (err) => {
        console.error('Error cargando plato:', err);
        this.router.navigate(['/platos']);
      }
    });
  }

  onFileSelected(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

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

  createPlato(): void {
    // Asegurarnos de que el precio sea un número
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

  updatePlato(): void {
    if (!this.platoId) return;

    // Asegurarnos de que el precio sea un número
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
