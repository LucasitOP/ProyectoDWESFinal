package es.examen.proyectodwesfinal.service;

import es.examen.proyectodwesfinal.model.Plato;
import es.examen.proyectodwesfinal.repository.PlatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PlatoService {

    private final PlatoRepository platoRepository;
    private final CloudinaryService cloudinaryService;

    public List<Plato> findAll() {
        return platoRepository.findAll();
    }

    public List<Plato> findByRestaurantId(String restaurantId) {
        return platoRepository.findByRestaurantId(restaurantId);
    }

    public Optional<Plato> findById(Long id) {
        return platoRepository.findById(id);
    }

    public Plato save(Plato plato, MultipartFile imageFile) throws IOException {
        // Si se proporciona una imagen, subirla a Cloudinary
        if (imageFile != null && !imageFile.isEmpty()) {
            String imageUrl = cloudinaryService.uploadImage(imageFile);
            plato.setImageUrl(imageUrl);
        }
        return platoRepository.save(plato);
    }

    public void deleteById(Long id) {
        platoRepository.deleteById(id);
    }
}
