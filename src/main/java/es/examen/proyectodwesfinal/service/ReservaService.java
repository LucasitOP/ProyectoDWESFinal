package es.examen.proyectodwesfinal.service;

import es.examen.proyectodwesfinal.model.Reserva;
import es.examen.proyectodwesfinal.repository.ReservaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Servicio de negocio para la gestión de reservas.
 * Encapsula la lógica de persistencia y validaciones de reservas de restaurante.
 */
@Service
@RequiredArgsConstructor
public class ReservaService {

    private final ReservaRepository reservaRepository;

    /**
     * Obtiene todas las reservas registradas en el sistema.
     * @return Lista de todas las reservas.
     */
    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    /**
     * Busca una reserva específica por su ID.
     * @param id Identificador de la reserva.
     * @return Optional con la reserva si existe, vacío en caso contrario.
     */
    public Optional<Reserva> findById(Long id) {
        return reservaRepository.findById(id);
    }

    /**
     * Persiste una reserva nueva o actualizada en la base de datos.
     * @param reserva Entidad de reserva con datos a guardar.
     * @return Reserva guardada con ID asignado (si es nueva).
     */
    public Reserva save(Reserva reserva) {
        return reservaRepository.save(reserva);
    }

    /**
     * Elimina una reserva del sistema.
     * @param id Identificador de la reserva a eliminar.
     */
    public void deleteById(Long id) {
        reservaRepository.deleteById(id);
    }
}
