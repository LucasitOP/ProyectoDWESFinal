package es.examen.proyectodwesfinal.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryBean {
    @Bean
    public Cloudinary cloudinaryConfig() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "${cloudinary.cloud-name}",
                "api_key", "${cloudinary.api-key}",
                "api_secret", "${cloudinary.api-secret}"
        ));
    }
}