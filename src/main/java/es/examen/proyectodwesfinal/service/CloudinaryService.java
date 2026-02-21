package es.examen.proyectodwesfinal.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

/**
 * Servicio de almacenamiento de imágenes en Cloudinary.
 * Gestiona la subida de archivos multimedia a la plataforma en la nube.
 */
@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;

    /**
     * Inicializa el cliente de Cloudinary con credenciales de aplicación.properties.
     * @param cloudName Nombre de la cuenta Cloudinary (variable de entorno CLOUDINARY_NAME).
     * @param apiKey Clave de API de Cloudinary (variable de entorno CLOUDINARY_KEY).
     * @param apiSecret Secreto de API de Cloudinary (variable de entorno CLOUDINARY_SECRET).
     */
    public CloudinaryService(
            @Value("${cloudinary.cloud-name}") String cloudName,
            @Value("${cloudinary.api-key}") String apiKey,
            @Value("${cloudinary.api-secret}") String apiSecret) {
        
        this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", cloudName,
                "api_key", apiKey,
                "api_secret", apiSecret));
    }

    /**
     * Sube una imagen a Cloudinary y retorna su URL accesible.
     * Intenta obtener la URL segura (https) primero y recurre a URL estándar si no está disponible.
     * @param file Archivo MultipartFile con la imagen a subir.
     * @return URL accesible de la imagen en Cloudinary, o null si la subida falla.
     * @throws IOException Si hay error durante la lectura del archivo.
     */
    public String uploadImage(MultipartFile file) throws IOException {
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        // Cloudinary devuelve la URL en 'secure_url' (HTTPS) preferentemente
        Object url = uploadResult.get("secure_url");
        if (url == null) url = uploadResult.get("url");
        return url != null ? url.toString() : null;
    }
}
