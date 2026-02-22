package es.examen.proyectodwesfinal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * Entidad JPA que representa una reserva de mesa en un restaurante.
 *
 * Características:
 * - Datos del cliente (nombre y teléfono) obligatorios
 * - Fecha/hora y número de personas obligatorios
 * - Estado de la reserva (PENDIENTE, CONFIRMADA, CANCELADA)
 * - Asociación a restaurante mediante restaurantId
 * - El backend intenta enviar SMS de confirmación si Twilio está configurado
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "reservas")
public class Reserva {

    /** Identificador único autogenerado de la reserva */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre completo del cliente que realiza la reserva */
    @Column(nullable = false)
    private String nombreCliente;

    /** Teléfono de contacto del cliente (formato: 9 dígitos) */
    @Column(nullable = false)
    private String telefono;

    /** Fecha y hora de la reserva */
    @Column(nullable = false)
    private LocalDateTime fechaHora;

    /** Número de comensales para la reserva */
    @Column(nullable = false)
    private Integer numeroPersonas;

    /** Estado actual de la reserva */
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private EstadoReserva estado;

    /** Identificador del restaurante donde se realiza la reserva */
    @Column(nullable = false)
    private String restaurantId;

    /**
     * Estados posibles de una reserva.
     * - PENDIENTE: Reserva recién creada, esperando confirmación
     * - CONFIRMADA: Reserva aceptada por el restaurante
     * - CANCELADA: Reserva cancelada por cliente o restaurante
     */
    public enum EstadoReserva {
        PENDIENTE, CONFIRMADA, CANCELADA
    }
}
