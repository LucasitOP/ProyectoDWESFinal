package es.examen.proyectodwesfinal.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class TwilioService {

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String fromPhoneNumber;

    @PostConstruct
    public void init() {
        // Inicializa Twilio con las credenciales
        // Nota: Asegúrate de que las propiedades no sean nulas o placeholders antes de llamar a init() en producción
        if (accountSid != null && !accountSid.startsWith("YOUR") && authToken != null) {
            Twilio.init(accountSid, authToken);
        }
    }

    public void sendSms(String toPhoneNumber, String messageBody) {
        try {
            Message.creator(
                new PhoneNumber(toPhoneNumber),
                new PhoneNumber(fromPhoneNumber),
                messageBody
            ).create();
        } catch (Exception e) {
            // Manejo de errores (log, rethrow, etc.)
            System.err.println("Error enviando SMS: " + e.getMessage());
        }
    }
}
