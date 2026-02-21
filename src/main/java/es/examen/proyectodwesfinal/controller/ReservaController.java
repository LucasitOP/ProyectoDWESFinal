package es.examen.proyectodwesfinal.controller;

import es.examen.proyectodwesfinal.model.Reserva;
import es.examen.proyectodwesfinal.service.ReservaService;
import es.examen.proyectodwesfinal.service.TwilioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para la gestión de reservas.
 * Integra notificaciones SMS mediante Twilio y aplica control de acceso basado en roles.
 */
@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;
    private final TwilioService twilioService;

    /**
     * Obtiene el listado completo de reservas.
     * Solo accesible por personal autorizado (Empleado, Encargado, Administrador).
     * @return Lista de todas las reservas en el sistema.
     */
    @GetMapping
    @PreAuthorize("hasAnyAuthority('Empleado', 'Encargado', 'Administrador')")
    public ResponseEntity<List<Reserva>> getAllReservas() {
        return ResponseEntity.ok(reservaService.findAll());
    }

    /**
     * Obtiene una reserva específica por su ID.
     * @param id ID de la reserva a recuperar.
     * @return Reserva encontrada o 404 si no existe.
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('Empleado', 'Encargado', 'Administrador')")
    public ResponseEntity<Reserva> getReservaById(@PathVariable Long id) {
        var opt = reservaService.findById(id);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        }
        return ResponseEntity.notFound().build();
    }

    /**
     * Crea una nueva reserva e intenta enviar confirmación por SMS.
     * Si el teléfono está vacío o las credenciales de Twilio faltan, se continúa sin error.
     * @param reserva Datos de la reserva (nombre, teléfono, cantidad de personas, fecha/hora, restaurante).
     * @return Reserva creada con código 201 Created.
     */
    @PostMapping
    @PreAuthorize("hasAnyAuthority('Empleado', 'Encargado', 'Administrador')")
    public ResponseEntity<Reserva> createReserva(@RequestBody Reserva reserva) {
        if (reserva.getEstado() == null) {
            reserva.setEstado(Reserva.EstadoReserva.PENDIENTE);
        }
        
        Reserva savedReserva = reservaService.save(reserva);

        // Intenta enviar confirmación por SMS (falla silenciosamente si Twilio no está configurado)
        if (reserva.getTelefono() != null && !reserva.getTelefono().isEmpty()) {
            String mensaje = String.format("Hola %s, tu reserva para %d personas el %s ha sido recibida. Estado: %s",
                    reserva.getNombreCliente(),
                    reserva.getNumeroPersonas(),
                    reserva.getFechaHora().toString(),
                    reserva.getEstado());
            
            twilioService.sendSms(reserva.getTelefono(), mensaje);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body(savedReserva);
    }

    /**
     * Actualiza una reserva existente.
     * Solo Encargado y Administrador pueden modificar reservas.
     * @param id ID de la reserva a actualizar.
     * @param reserva Nuevos datos de la reserva.
     * @return Reserva actualizada o 404 si no existe.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('Encargado', 'Administrador')")
    public ResponseEntity<Reserva> updateReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        return reservaService.findById(id)
                .map(existingReserva -> {
                    existingReserva.setNombreCliente(reserva.getNombreCliente());
                    existingReserva.setTelefono(reserva.getTelefono());
                    existingReserva.setFechaHora(reserva.getFechaHora());
                    existingReserva.setNumeroPersonas(reserva.getNumeroPersonas());
                    existingReserva.setEstado(reserva.getEstado());
                    existingReserva.setRestaurantId(reserva.getRestaurantId());
                    return ResponseEntity.ok(reservaService.save(existingReserva));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Elimina una reserva del sistema.
     * Solo Administradores pueden eliminar reservas.
     * @param id ID de la reserva a eliminar.
     * @return 204 No Content si se eliminó correctamente, 404 si no existe.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Administrador')")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        if (reservaService.findById(id).isPresent()) {
            reservaService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
