package es.examen.proyectodwesfinal.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "platos")
public class Plato {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nombre;

    private String descripcion;

    @Column(nullable = false)
    private Double precio;

    // Aquí guardaremos la URL que nos devuelve Cloudinary
    private String imageUrl;

    // ID del restaurante al que pertenece el plato (para filtrar después)
    private String restaurantId;
}
