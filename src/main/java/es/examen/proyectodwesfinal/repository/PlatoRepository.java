package es.examen.proyectodwesfinal.repository;

import es.examen.proyectodwesfinal.model.Plato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlatoRepository extends JpaRepository<Plato, Long> {
    // Método para buscar platos por restaurante
    List<Plato> findByRestaurantId(String restaurantId);
}
