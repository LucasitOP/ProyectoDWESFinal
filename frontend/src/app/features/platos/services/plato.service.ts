import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Plato } from '../../../shared/models/plato.model';

/**
 * Servicio Angular para operaciones CRUD sobre platos.
 * Comunica con el backend Spring Boot a través de HttpClient.
 * Utiliza el proxy local configurado en proxy.conf.json para redirigir /api al backend.
 */
@Injectable({
  providedIn: 'root'
})
export class PlatoService {

  private apiUrl = '/api/platos'; // Usa proxy local

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el listado completo de todos los platos del sistema.
   * @return Observable con array de platos.
   */
  getPlatos(): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.apiUrl);
  }

  /**
   * Obtiene un plato específico por su ID.
   * @param id Identificador del plato.
   * @return Observable con el plato encontrado.
   */
  getPlato(id: number): Observable<Plato> {
    return this.http.get<Plato>(`${this.apiUrl}/${id}`);
  }

  /**
   * Filtra y obtiene platos de un restaurante específico.
   * @param restaurantId ID del restaurante.
   * @return Observable con array de platos del restaurante.
   */
  getPlatosByRestaurante(restaurantId: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(`${this.apiUrl}/restaurante/${restaurantId}`);
  }

  /**
   * Crea un nuevo plato en el sistema.
   * Soporta subida de imagen que se procesa en el backend y sube a Cloudinary.
   * @param plato Datos del plato (nombre, descripción, precio, restaurantId).
   * @param imageFile Archivo de imagen (opcional).
   * @return Observable con el plato creado.
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
   * Permite cambiar la imagen si se proporciona un archivo nuevo.
   * @param id Identificador del plato a actualizar.
   * @param plato Nuevos datos del plato.
   * @param imageFile Nueva imagen (opcional).
   * @return Observable con el plato actualizado.
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
   * @param id Identificador del plato a eliminar.
   * @return Observable vacío (completa cuando la petición termina).
   */
  deletePlato(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
