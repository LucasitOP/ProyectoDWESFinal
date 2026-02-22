package es.examen.proyectodwesfinal.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

/**
 * Configuración de seguridad de Spring Security para la aplicación.
 *
 * Características:
 * - Integración con Auth0 como Resource Server OAuth2
 * - Validación de tokens JWT en cada request
 * - Extracción de roles desde claim personalizado de Auth0
 * - Configuración de endpoints públicos y protegidos
 * - CSRF deshabilitado (API REST stateless)
 *
 * Endpoints públicos:
 * - GET /api/platos/** (consultar menú)
 *
 * Endpoints protegidos:
 * - POST/PUT/DELETE /api/platos/** (gestión de platos)
 * - /api/reservas/** (gestión de reservas)
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    /**
     * Configura la cadena de filtros de seguridad HTTP.
     * Define qué endpoints son públicos y cuáles requieren autenticación.
     *
     * @param http Builder de configuración de seguridad HTTP
     * @return Cadena de filtros configurada
     * @throws Exception Si hay error en la configuración
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(authorize -> authorize
                // Endpoints públicos
                .requestMatchers("/api/public/**").permitAll()
                .requestMatchers(HttpMethod.GET, "/api/platos/**").permitAll()

                // Endpoints protegidos (requieren autenticación)
                .requestMatchers("/api/reservas/**").authenticated()
                .requestMatchers(HttpMethod.POST, "/api/platos/**").authenticated()
                .requestMatchers(HttpMethod.DELETE, "/api/platos/**").authenticated()

                .anyRequest().authenticated()
            )
            .oauth2ResourceServer(oauth2 -> oauth2
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
            );
        return http.build();
    }

    /**
     * Configura el convertidor de JWT a autenticación de Spring.
     * Extrae los roles desde el claim personalizado de Auth0 y los mapea a authorities.
     *
     * @return Convertidor configurado para leer roles de Auth0
     */
    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

        // Claim personalizado donde Auth0 almacena los roles (configurado en Auth0 Actions)
        grantedAuthoritiesConverter.setAuthoritiesClaimName("https://Timoc-Manager-reservas/roles");

        // Eliminar prefijo SCOPE_ para usar roles directamente (Admin, Encargado, etc.)
        grantedAuthoritiesConverter.setAuthorityPrefix("");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);
        return jwtAuthenticationConverter;
    }
}
