package es.examen.proyectodwesfinal.controller;

import es.examen.proyectodwesfinal.model.Plato;
import es.examen.proyectodwesfinal.service.PlatoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/platos")
@RequiredArgsConstructor
public class PlatoController {

    private final PlatoService platoService;

    @GetMapping
    public ResponseEntity<List<Plato>> getAllPlatos() {
        return ResponseEntity.ok(platoService.findAll());
    }

    @GetMapping("/restaurante/{restaurantId}")
    public ResponseEntity<List<Plato>> getPlatosByRestaurante(@PathVariable String restaurantId) {
        return ResponseEntity.ok(platoService.findByRestaurantId(restaurantId));
    }

    @PostMapping
    @PreAuthorize("hasAuthority('SCOPE_write:platos')") // Solo restaurantes pueden crear platos
    public ResponseEntity<Plato> createPlato(
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("restaurantId") String restaurantId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {
        
        try {
            Plato plato = new Plato();
            plato.setNombre(nombre);
            plato.setDescripcion(descripcion);
            plato.setPrecio(precio);
            plato.setRestaurantId(restaurantId);

            Plato savedPlato = platoService.save(plato, imageFile);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedPlato);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('SCOPE_write:platos')")
    public ResponseEntity<Void> deletePlato(@PathVariable Long id) {
        if (platoService.findById(id).isPresent()) {
            platoService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
