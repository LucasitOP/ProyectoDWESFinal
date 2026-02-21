import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../../../shared/models/reserva.model';

/**
 * Servicio Angular para operaciones CRUD sobre reservas.
 * Comunica con el backend Spring Boot para gestionar reservas de restaurante.
 * Incluye notificaciones SMS automáticas via Twilio en el backend.
 */
@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = '/api/reservas'; // Usa proxy local

  constructor(private http: HttpClient) { }

  /**
   * Obtiene el listado completo de todas las reservas.
   * Solo accesible para personal autorizado (staff).
   * @return Observable con array de reservas.
   */
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  /**
   * Obtiene una reserva específica por su ID.
   * @param id Identificador de la reserva.
   * @return Observable con la reserva encontrada.
   */
  getReserva(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crea una nueva reserva en el sistema.
   * El backend intenta enviar confirmación SMS si Twilio está configurado.
   * @param reserva Datos de la reserva (nombre, teléfono, personas, fecha, restaurante).
   * @return Observable con la reserva creada.
   */
  createReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  /**
   * Actualiza una reserva existente.
   * @param id Identificador de la reserva a actualizar.
   * @param reserva Nuevos datos de la reserva.
   * @return Observable con la reserva actualizada.
   */
  updateReserva(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva);
  }

  /**
   * Elimina una reserva del sistema.
   * Solo administradores pueden eliminar reservas.
   * @param id Identificador de la reserva a eliminar.
   * @return Observable vacío (completa cuando la petición termina).
   */
  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
