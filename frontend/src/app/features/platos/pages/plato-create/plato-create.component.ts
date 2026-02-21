import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { PlatoService } from '../../services/plato.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-plato-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './plato-create.component.html',
  styleUrl: './plato-create.component.css'
})
export class PlatoCreateComponent {

  platoForm: FormGroup;
  selectedFile: File | undefined;

  constructor(
    private fb: FormBuilder,
    private platoService: PlatoService,
    private router: Router
  ) {
    this.platoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required, Validators.maxLength(255)]],
      precio: [0, [Validators.required, Validators.min(0.1)]],
      restaurantId: ['restaurante-1', Validators.required] // Por ahora hardcodeado
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.platoForm.valid) {
      this.platoService.createPlato(this.platoForm.value, this.selectedFile).subscribe({
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
    } else {
      this.platoForm.markAllAsTouched();
    }
  }
}
