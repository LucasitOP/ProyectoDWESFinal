package es.examen.proyectodwesfinal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entidad JPA que representa un plato del menú de un restaurante.
 *
 * Características:
 * - Nombre y precio obligatorios
 * - Descripción opcional del plato
 * - URL de imagen almacenada en Cloudinary (opcional)
 * - Asociación a restaurante mediante restaurantId (clave lógica)
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "platos")
public class Plato {

    /** Identificador único autogenerado del plato */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Nombre del plato (obligatorio) */
    @Column(nullable = false)
    private String nombre;

    /** Descripción detallada de ingredientes y preparación */
    private String descripcion;

    /** Precio del plato en euros (obligatorio) */
    @Column(nullable = false)
    private Double precio;

    /** URL de la imagen almacenada en Cloudinary (opcional) */
    private String imageUrl;

    /** Identificador del restaurante al que pertenece este plato */
    private String restaurantId;
}
