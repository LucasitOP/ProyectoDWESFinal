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

@RestController
@RequestMapping("/api/reservas")
@RequiredArgsConstructor
public class ReservaController {

    private final ReservaService reservaService;
    private final TwilioService twilioService;

    @GetMapping
    @PreAuthorize("hasAuthority('SCOPE_read:reservas')")
    public ResponseEntity<List<Reserva>> getAllReservas() {
        return ResponseEntity.ok(reservaService.findAll());
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Reserva> createReserva(@RequestBody Reserva reserva) {
        if (reserva.getEstado() == null) {
            reserva.setEstado(Reserva.EstadoReserva.PENDIENTE);
        }
        
        Reserva savedReserva = reservaService.save(reserva);

        // Enviar SMS de confirmación
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

    @PutMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write:reservas')")
    public ResponseEntity<Reserva> updateReserva(@PathVariable Long id, @RequestBody Reserva reserva) {
        return reservaService.findById(id)
                .map(existingReserva -> {
                    existingReserva.setNombreCliente(reserva.getNombreCliente());
                    existingReserva.setTelefono(reserva.getTelefono()); // Actualizar teléfono
                    existingReserva.setFechaHora(reserva.getFechaHora());
                    existingReserva.setNumeroPersonas(reserva.getNumeroPersonas());
                    existingReserva.setEstado(reserva.getEstado());
                    existingReserva.setRestaurantId(reserva.getRestaurantId());
                    return ResponseEntity.ok(reservaService.save(existingReserva));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write:reservas')")
    public ResponseEntity<Void> deleteReserva(@PathVariable Long id) {
        if (reservaService.findById(id).isPresent()) {
            reservaService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
