export interface Reserva {
  id?: number;
  nombreCliente: string;
  telefono: string;
  fechaHora: string; // ISO string (YYYY-MM-DDTHH:mm:ss)
  numeroPersonas: number;
  estado?: 'PENDIENTE' | 'CONFIRMADA' | 'CANCELADA';
  restaurantId: string;
}
