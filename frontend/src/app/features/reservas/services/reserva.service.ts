import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Reserva } from '../../../shared/models/reserva.model';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private apiUrl = '/api/reservas'; // Usamos el proxy configurado

  constructor(private http: HttpClient) { }

  // Obtener todas las reservas
  getReservas(): Observable<Reserva[]> {
    return this.http.get<Reserva[]>(this.apiUrl);
  }

  // Obtener una reserva por ID
  getReserva(id: number): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.apiUrl}/${id}`);
  }

  // Crear una nueva reserva
  createReserva(reserva: Reserva): Observable<Reserva> {
    return this.http.post<Reserva>(this.apiUrl, reserva);
  }

  // Actualizar una reserva existente
  updateReserva(id: number, reserva: Reserva): Observable<Reserva> {
    return this.http.put<Reserva>(`${this.apiUrl}/${id}`, reserva);
  }

  // Eliminar una reserva
  deleteReserva(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
