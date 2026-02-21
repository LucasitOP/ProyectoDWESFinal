import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plato } from '../../../shared/models/plato.model';

/**
 * Servicio para gestionar las operaciones CRUD de Platos.
 * Interactúa con el backend Spring Boot y Cloudinary para imágenes.
 */
@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private apiUrl = '/api/platos'; // Usamos el proxy configurado

  constructor(private http: HttpClient) { }

  /**
   * Obtiene todos los platos disponibles en el sistema.
   * @returns Observable con la lista de platos.
   */
  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }

  /**
   * Obtiene un plato específico por su ID.
   * @param id ID del plato.
   * @returns Observable con el plato encontrado.
   */
  getPlato(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  /**
   * Obtiene los platos filtrados por restaurante.
   * @param restaurantId ID del restaurante (string).
   * @returns Observable con la lista de platos del restaurante.
   */
  getPlatosByRestaurante(restaurantId: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/restaurante/${restaurantId}`);
  }

  /**
   * Crea un nuevo plato en el sistema.
   * Si se proporciona una imagen, se sube a Cloudinary a través del backend.
   * @param plato Objeto Plato con los datos.
   * @param imageFile Archivo de imagen opcional.
   * @returns Observable con el plato creado.
   */
  createPlato(plato: any, imageFile?: File): Observable<Plato> {
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

  /**
   * Actualiza un plato existente.
   * @param id ID del plato a actualizar.
   * @param plato Nuevos datos del plato.
   * @param imageFile Nueva imagen opcional.
   * @returns Observable con el plato actualizado.
   */
  updatePlato(id: number, plato: any, imageFile?: File): Observable<Plato> {
    const formData = new FormData();
    formData.append('nombre', plato.nombre);
    formData.append('descripcion', plato.descripcion);
    formData.append('precio', plato.precio.toString());
    formData.append('restaurantId', plato.restaurantId);

    if (imageFile) {
      formData.append('image', imageFile);
    }

    return this.http.put<Plato>(`${this.apiUrl}/${id}`, formData);
  }

  /**
   * Elimina un plato del sistema.
   * @param id ID del plato a eliminar.
   * @returns Observable vacío.
   */
  deletePlato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
