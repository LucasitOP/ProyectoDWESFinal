package es.examen.proyectodwesfinal;

import es.examen.proyectodwesfinal.controller.PlatoController;
import es.examen.proyectodwesfinal.controller.ReservaController;
import es.examen.proyectodwesfinal.service.CloudinaryService;
import es.examen.proyectodwesfinal.service.TwilioService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class ProyectoDwesFinalApplicationTests {

    @Autowired
    private ReservaController reservaController;

    @Autowired
    private PlatoController platoController;

    // Mockeamos los servicios externos para que el test no falle si no hay credenciales reales
    @MockBean
    private TwilioService twilioService;

    @MockBean
    private CloudinaryService cloudinaryService;

    @Test
    void contextLoads() {
        assertThat(reservaController).isNotNull();
        assertThat(platoController).isNotNull();
    }

}
