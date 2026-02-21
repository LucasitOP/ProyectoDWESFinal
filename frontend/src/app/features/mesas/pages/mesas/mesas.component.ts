import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../core/services/notification.service';

interface Mesa {
  id: number;
  numero: number;
  tipo: 'cuadrada' | 'redonda' | 'larga';
  x: number;
  y: number;
}

@Component({
  selector: 'app-mesas',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mesas.component.html',
  styleUrl: './mesas.component.css'
})
export class MesasComponent {

  mesas: Mesa[] = [];
  mesaArrastrada: Mesa | null = null;
  tipoMesaArrastrada: string | null = null;

  constructor(private notificationService: NotificationService) {
    // Cargar mesas guardadas
    const mesasGuardadas = localStorage.getItem('mesas');
    if (mesasGuardadas) {
      this.mesas = JSON.parse(mesasGuardadas);
    }
  }

  // Arrastrar nueva mesa desde el panel
  onDragStart(event: DragEvent, tipo: string) {
    this.tipoMesaArrastrada = tipo;
    this.mesaArrastrada = null;
    event.dataTransfer?.setData('text/plain', tipo);
  }

  // Mover mesa existente en el plano
  onDragStartMesa(event: DragEvent, mesa: Mesa) {
    this.mesaArrastrada = mesa;
    this.tipoMesaArrastrada = null;
    event.dataTransfer?.setData('text/plain', 'mover');
  }

  onDragOver(event: DragEvent) {
    event.preventDefault(); // Necesario para permitir soltar
  }

  onDrop(event: DragEvent) {
    event.preventDefault();

    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
    const x = event.clientX - rect.left - 25; // Centrar (aprox)
    const y = event.clientY - rect.top - 25;

    if (this.tipoMesaArrastrada) {
      // Crear nueva mesa
      const nuevaMesa: Mesa = {
        id: Date.now(),
        numero: this.mesas.length + 1,
        tipo: this.tipoMesaArrastrada as any,
        x: Math.max(0, x),
        y: Math.max(0, y)
      };
      this.mesas.push(nuevaMesa);
    } else if (this.mesaArrastrada) {
      // Mover mesa existente
      this.mesaArrastrada.x = Math.max(0, x);
      this.mesaArrastrada.y = Math.max(0, y);
    }

    this.tipoMesaArrastrada = null;
    this.mesaArrastrada = null;
  }

  eliminarMesa(mesa: Mesa) {
    this.mesas = this.mesas.filter(m => m.id !== mesa.id);
  }

  guardarDistribucion() {
    localStorage.setItem('mesas', JSON.stringify(this.mesas));
    this.notificationService.showSuccess('Distribución de mesas guardada');
  }
}
