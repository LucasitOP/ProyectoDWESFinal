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
 * Las credenciales son opcionales; si no están configuradas, el servicio falla silenciosamente.
 */
@Service
public class CloudinaryService {

    private final Cloudinary cloudinary;
    private final boolean isConfigured;

    /**
     * Inicializa el cliente de Cloudinary con credenciales de application.properties.
     * Si las credenciales están vacías o son placeholders, marca el servicio como no configurado.
     * @param cloudName Nombre de la cuenta Cloudinary (variable de entorno CLOUDINARY_NAME).
     * @param apiKey Clave de API de Cloudinary (variable de entorno CLOUDINARY_KEY).
     * @param apiSecret Secreto de API de Cloudinary (variable de entorno CLOUDINARY_SECRET).
     */
    public CloudinaryService(
            @Value("${cloudinary.cloud-name:}") String cloudName,
            @Value("${cloudinary.api-key:}") String apiKey,
            @Value("${cloudinary.api-secret:}") String apiSecret) {

        // Validar si Cloudinary está correctamente configurado
        this.isConfigured = cloudName != null && !cloudName.isEmpty() && !cloudName.equals("YOUR_CLOUD_NAME")
                && apiKey != null && !apiKey.isEmpty() && !apiKey.equals("YOUR_API_KEY")
                && apiSecret != null && !apiSecret.isEmpty() && !apiSecret.equals("YOUR_API_SECRET");

        if (isConfigured) {
            this.cloudinary = new Cloudinary(ObjectUtils.asMap(
                    "cloud_name", cloudName,
                    "api_key", apiKey,
                    "api_secret", apiSecret));
        } else {
            this.cloudinary = null;
        }
    }

    /**
     * Sube una imagen a Cloudinary y retorna su URL accesible.
     * Si Cloudinary no está configurado, retorna null y el controlador maneja la falla gracefully.
     * Intenta obtener la URL segura (https) primero y recurre a URL estándar si no está disponible.
     * @param file Archivo MultipartFile con la imagen a subir.
     * @return URL accesible de la imagen en Cloudinary, o null si no está configurado o falla.
     * @throws IOException Si hay error durante la lectura del archivo.
     */
    public String uploadImage(MultipartFile file) throws IOException {
        if (!isConfigured || cloudinary == null) {
            System.err.println("ADVERTENCIA: Cloudinary no está configurado. Salta subida de imagen.");
            return null;
        }

        try {
            Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
            // Cloudinary devuelve la URL en 'secure_url' (HTTPS) preferentemente
            Object url = uploadResult.get("secure_url");
            if (url == null) url = uploadResult.get("url");
            return url != null ? url.toString() : null;
        } catch (Exception e) {
            System.err.println("Error subiendo imagen a Cloudinary: " + e.getMessage());
            return null;
        }
    }
}
