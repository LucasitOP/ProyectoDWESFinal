package es.examen.proyectodwesfinal.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Servicio de notificaciones SMS mediante Twilio.
 * Envía mensajes de texto para confirmaciones y alertas del sistema.
 */
@Service
public class TwilioService {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String fromPhoneNumber;

    /**
     * Inicializa las credenciales de Twilio al arrancar la aplicación.
     * Solo ejecuta si las credenciales están configuradas correctamente en properties.
     */
    @PostConstruct
    public void init() {
        // Inicializa Twilio con las credenciales desde application.properties
        // Validamos que no sean placeholders o valores nulos antes de iniciar
        if (accountSid != null && !accountSid.startsWith("YOUR") && authToken != null) {
            Twilio.init(accountSid, authToken);
        }
    }

    /**
     * Envía un mensaje SMS a un número de teléfono.
     * Si Twilio no está inicializado, el envío falla silenciosamente sin lanzar excepciones.
     * @param toPhoneNumber Número de teléfono destino en formato internacional (ej: +34612345678).
     * @param messageBody Contenido del mensaje SMS (máximo 160 caracteres para evitar fragmentación).
     */
    public void sendSms(String toPhoneNumber, String messageBody) {
        try {
            Message.creator(
                new PhoneNumber(toPhoneNumber),
                new PhoneNumber(fromPhoneNumber),
                messageBody
            ).create();
        } catch (Exception e) {
            // Manejo silencioso de errores (logging en producción)
            System.err.println("Error enviando SMS: " + e.getMessage());
        }
    }
}
