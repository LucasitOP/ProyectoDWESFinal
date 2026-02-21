import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plato } from '../../../shared/models/plato.model';

@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private apiUrl = '/api/platos'; // Usamos el proxy configurado

  constructor(private http: HttpClient) { }

  // Obtener todos los platos
  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }

  // Obtener platos por restaurante
  getPlatosByRestaurante(restaurantId: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/restaurante/${restaurantId}`);
  }

  // Crear un nuevo plato con imagen (para Cloudinary)
  createPlato(plato: Plato, imageFile?: File): Observable<Plato> {
    const formData = new FormData();
    formData.append('nombre', plato.nombre);
    formData.append('descripcion', plato.descripcion);
    formData.append('precio', plato.precio.toString());
    formData.append('restaurantId', plato.restaurantId);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.post<Plato>(this.apiUrl, formData);
  }

  // Eliminar un plato
  deletePlato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
