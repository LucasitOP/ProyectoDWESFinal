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

/**
 * Controlador REST para gestionar operaciones CRUD de platos.
 * Maneja la subida de imágenes a Cloudinary y aplica restricciones de seguridad por rol.
 */
@RestController
@RequestMapping("/api/platos")
@RequiredArgsConstructor
public class PlatoController {

    private final PlatoService platoService;

    /**
     * Obtiene el listado completo de platos (público).
     * @return Lista de todos los platos disponibles en el sistema.
     */
    @GetMapping
    // Público: Cualquiera puede ver el menú
    public ResponseEntity<List<Plato>> getAllPlatos() {
        return ResponseEntity.ok(platoService.findAll());
    }

    /**
     * Obtiene los platos filtrados por ID de restaurante.
     * @param restaurantId ID del restaurante.
     * @return Lista de platos del restaurante especificado.
     */
    @GetMapping("/restaurante/{restaurantId}")
    public ResponseEntity<List<Plato>> getPlatosByRestaurante(@PathVariable String restaurantId) {
        return ResponseEntity.ok(platoService.findByRestaurantId(restaurantId));
    }

    /**
     * Obtiene un plato específico por su ID.
     * @param id ID del plato a recuperar.
     * @return Plato encontrado o 404 si no existe.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Plato> getPlatoById(@PathVariable Long id) {
        var opt = platoService.findById(id);
        if (opt.isPresent()) {
            return ResponseEntity.ok(opt.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /**
     * Crea un nuevo plato con subida opcional de imagen a Cloudinary.
     * Requiere rol de Encargado o Administrador.
     * @param nombre Nombre del plato.
     * @param descripcion Descripción del plato.
     * @param precio Precio del plato.
     * @param restaurantId ID del restaurante al que pertenece.
     * @param imageFile Archivo de imagen (opcional). Se sube a Cloudinary si se proporciona.
     * @return Plato creado con código 201 Created.
     */
    @PostMapping
    @PreAuthorize("hasAnyAuthority('Encargado', 'Administrador')")
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

    /**
     * Actualiza un plato existente, permitiendo cambiar imagen.
     * Requiere rol de Encargado o Administrador.
     * @param id ID del plato a actualizar.
     * @param nombre Nuevo nombre.
     * @param descripcion Nueva descripción.
     * @param precio Nuevo precio.
     * @param restaurantId ID del restaurante.
     * @param imageFile Nueva imagen (opcional).
     * @return Plato actualizado o 404 si no existe.
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasAnyAuthority('Encargado', 'Administrador')")
    public ResponseEntity<Plato> updatePlato(
            @PathVariable Long id,
            @RequestParam("nombre") String nombre,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("precio") Double precio,
            @RequestParam("restaurantId") String restaurantId,
            @RequestParam(value = "image", required = false) MultipartFile imageFile) {

        try {
            var opt = platoService.findById(id);
            if (opt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }
            Plato existing = opt.get();
            existing.setNombre(nombre);
            existing.setDescripcion(descripcion);
            existing.setPrecio(precio);
            existing.setRestaurantId(restaurantId);
            try {
                Plato updated = platoService.save(existing, imageFile);
                return ResponseEntity.ok(updated);
            } catch (IOException e) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Elimina un plato del sistema.
     * Solo Administradores pueden eliminar platos.
     * @param id ID del plato a eliminar.
     * @return 204 No Content si se eliminó correctamente, 404 si no existe.
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasAuthority('Administrador')")
    public ResponseEntity<Void> deletePlato(@PathVariable Long id) {
        if (platoService.findById(id).isPresent()) {
            platoService.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
