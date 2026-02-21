package es.examen.proyectodwesfinal.service;

import es.examen.proyectodwesfinal.model.Plato;
import es.examen.proyectodwesfinal.repository.PlatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

/**
 * Servicio de negocio para la gestión de platos.
 * Coordina la persistencia en BD y la subida de imágenes a Cloudinary.
 */
@Service
@RequiredArgsConstructor
public class PlatoService {

    private final PlatoRepository platoRepository;
    private final CloudinaryService cloudinaryService;

    /**
     * Obtiene todos los platos registrados en el sistema.
     * @return Lista de platos.
     */
    public List<Plato> findAll() {
        return platoRepository.findAll();
    }

    /**
     * Filtra platos por identificador de restaurante.
     * @param restaurantId Identificador único del restaurante.
     * @return Lista de platos pertenecientes al restaurante.
     */
    public List<Plato> findByRestaurantId(String restaurantId) {
        return platoRepository.findByRestaurantId(restaurantId);
    }

    /**
     * Busca un plato por su ID.
     * @param id Identificador del plato.
     * @return Optional con el plato si existe, vacío en caso contrario.
     */
    public Optional<Plato> findById(Long id) {
        return platoRepository.findById(id);
    }

    /**
     * Persiste un plato nuevo o actualizado, subiendo imagen a Cloudinary si se proporciona.
     * @param plato Entidad de plato con datos a guardar.
     * @param imageFile Archivo de imagen (opcional). Si no es nulo, se sube a Cloudinary.
     * @return Plato guardado con URL de imagen asignada.
     * @throws IOException Si hay error al procesar la imagen.
     */
    public Plato save(Plato plato, MultipartFile imageFile) throws IOException {
        // Si se proporciona una imagen, subirla a Cloudinary y asignar URL
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(imageFile);
            plato.setImageUrl(imageUrl);
        }
        return platoRepository.save(plato);
    }

    /**
     * Elimina un plato del sistema.
     * @param id Identificador del plato a eliminar.
     */
    public void deleteById(Long id) {
        platoRepository.deleteById(id);
    }
}
