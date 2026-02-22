package es.examen.proyectodwesfinal.config;

import es.examen.proyectodwesfinal.model.Plato;
import es.examen.proyectodwesfinal.repository.PlatoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

/**
 * Inicializador de datos de muestra para desarrollo y demostración.
 *
 * Se ejecuta automáticamente al arrancar la aplicación Spring Boot.
 * Carga un menú completo de platos italianos típicos en el restaurante-1
 * si la base de datos está vacía (útil con H2 en memoria).
 *
 * Platos incluidos:
 * - Pizza Margarita (€12.50)
 * - Pasta Carbonara (€14.00)
 * - Lasagna alla Bolognese (€15.50)
 * - Risotto ai Funghi (€16.00)
 * - Tiramisù (€6.50)
 * - Panna Cotta (€5.50)
 *
 * @author Lucas Timoc
 * @version 1.0
 */
@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final PlatoRepository platoRepository;

    /**
     * Se ejecuta al iniciar la aplicación.
     * Verifica si la BD está vacía y carga datos de muestra.
     *
     * @param args Argumentos de línea de comandos (no utilizados)
     */
    @Override
    public void run(String... args) {
        if (platoRepository.count() == 0) {
            initRestauranteItaliano();
        }
    }

    /**
     * Crea y persiste 6 platos típicos de cocina italiana para el restaurante-1.
     * Utiliza URLs de imagen de demostración de Cloudinary.
     */
    private void initRestauranteItaliano() {
        // Pizza Margarita
        Plato pizza = new Plato();
        pizza.setNombre("Pizza Margarita");
        pizza.setDescripcion("Clásica pizza italiana con tomate, mozzarella fresca y albahaca");
        pizza.setPrecio(12.50);
        pizza.setRestaurantId("restaurante-1");
        pizza.setImageUrl("https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg");
        platoRepository.save(pizza);

        // Pasta Carbonara
        Plato carbonara = new Plato();
        carbonara.setNombre("Pasta Carbonara");
        carbonara.setDescripcion("Spaghetti con huevo, guanciale, queso pecorino y pimienta negra");
        carbonara.setPrecio(14.00);
        carbonara.setRestaurantId("restaurante-1");
        carbonara.setImageUrl("https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg");
        platoRepository.save(carbonara);

        // Lasagna alla Bolognese
        Plato lasagna = new Plato();
        lasagna.setNombre("Lasagna alla Bolognese");
        lasagna.setDescripcion("Capas de pasta con ragú de carne, bechamel y queso parmesano gratinado");
        lasagna.setPrecio(15.50);
        lasagna.setRestaurantId("restaurante-1");
        lasagna.setImageUrl("https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg");
        platoRepository.save(lasagna);

        // Risotto ai Funghi
        Plato risotto = new Plato();
        risotto.setNombre("Risotto ai Funghi");
        risotto.setDescripcion("Arroz cremoso italiano con setas porcini, mantequilla y parmesano");
        risotto.setPrecio(16.00);
        risotto.setRestaurantId("restaurante-1");
        risotto.setImageUrl("https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg");
        platoRepository.save(risotto);

        // Tiramisu
        Plato tiramisu = new Plato();
        tiramisu.setNombre("Tiramisù");
        tiramisu.setDescripcion("Postre tradicional con bizcochos, café, mascarpone y cacao");
        tiramisu.setPrecio(6.50);
        tiramisu.setRestaurantId("restaurante-1");
        tiramisu.setImageUrl("https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg");
        platoRepository.save(tiramisu);

        // Panna Cotta
        Plato pannaCotta = new Plato();
        pannaCotta.setNombre("Panna Cotta");
        pannaCotta.setDescripcion("Crema de nata italiana con coulis de frutos rojos");
        pannaCotta.setPrecio(5.50);
        pannaCotta.setRestaurantId("restaurante-1");
        pannaCotta.setImageUrl("https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg");
        platoRepository.save(pannaCotta);

        System.out.println("✅ Base de datos inicializada con 6 platos italianos para restaurante-1");
    }
}

