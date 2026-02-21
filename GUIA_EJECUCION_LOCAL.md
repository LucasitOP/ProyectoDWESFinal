# Guía de Ejecución Local - Timoc Manager

## Requisitos Previos

- Java JDK 21 (https://adoptium.net/)
- Maven 3.8+ (incluido con el proyecto via ./mvnw)
- Node.js 18+ (https://nodejs.org/)
- npm 9+

## Ejecución Local (sin credenciales externas)

### Backend (Spring Boot)

```bash
# 1. Navegar a la raíz del proyecto
cd /Users/lucastimoc/IdeaProjects/ProyectoDWESFinal

# 2. Compilar (sin tests)
mvn clean compile

# 3. Ejecutar la aplicación
mvn spring-boot:run
```

**Salida esperada:**
```
2026-02-22T... INFO ... Tomcat started on port(s): 8080
2026-02-22T... INFO ... Started ProyectoDwesFinalApplication in X.XXX seconds
```

La aplicación estará disponible en: `http://localhost:8081`

### H2 Console

Base de datos H2 console disponible en: `http://localhost:8081/h2-console`
- JDBC URL: `jdbc:h2:mem:testdb`
- Usuario: `sa`
- Contraseña: (vacía)

### Frontend (Angular)

En otra terminal:

```bash
# 1. Ir al directorio frontend
cd /Users/lucastimoc/IdeaProjects/ProyectoDWESFinal/frontend

# 2. Instalar dependencias (primera vez)
npm install

# 3. Ejecutar servidor de desarrollo
npm start
```

**Salida esperada:**
```
✔ Compiled successfully.
✔ Browser application bundle generated successfully in 12.34 MB
```

El frontend estará disponible en: `http://localhost:4200`

---

## Verificación de Funcionamiento

### 1. Endpoints Públicos (sin autenticación)

```bash
# Obtener lista de platos
curl http://localhost:8081/api/platos

# Obtener platos de restaurante específico
curl http://localhost:8081/api/platos/restaurante/restaurante-1
```

### 2. Con Auth0 (interfaz web)

1. Abrir `http://localhost:4200` en el navegador
2. Hacer clic en "Login"
3. Se abrirá Auth0 (requiere cuenta Auth0 configurada)
4. Después de login, acceder a Dashboard y gestión de platos

### 3. Pruebas API con Postman/curl

**Crear plato (requiere token JWT):**

```bash
# Primero obtener token desde Auth0 UI o postman con Auth0 OAuth2

curl -X POST http://localhost:8081/api/platos \
  -H "Authorization: Bearer <TOKEN_JWT>" \
  -F "nombre=Pasta a la Carbonara" \
  -F "descripcion=Pasta italiana clásica" \
  -F "precio=12.50" \
  -F "restaurantId=restaurante-1"
```

---

## Configuración Adicional (Opcional)

Si deseas habilitar SMS (Twilio) o subida de imágenes (Cloudinary), configura variables de entorno:

```bash
# Variables de Twilio
export TWILIO_SID="tuSID"
export TWILIO_TOKEN="tuTOKEN"
export TWILIO_PHONE="+34123456789"

# Variables de Cloudinary
export CLOUDINARY_NAME="tuNombre"
export CLOUDINARY_KEY="tuKEY"
export CLOUDINARY_SECRET="tuSECRET"

# Ejecutar backend
mvn spring-boot:run
```

---

## Solución de Problemas

### Error: "Port 8080 already in use"

```bash
# Cambiar puerto en application.properties
echo "server.port=8081" >> src/main/resources/application.properties
```

### Error: "Could not resolve placeholder"

Asegúrate de que `application.properties` tiene valores por defecto (ya está configurado).

### Angular no conecta con el backend

Verifica que el proxy en `frontend/proxy.conf.json` apunta a `http://localhost:8080`:

```json
{
  "/api": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true
  }
}
```

---

## Credenciales de Prueba (Auth0)

Si Auth0 está configurado en el proyecto:

| Email | Rol | Contraseña |
|-------|-----|------------|
| admin@admin.com | Administrador | Admin123 |
| restaurante@restaurante.com | Encargado | Restaurante123 |
| cliente@cliente.com | Cliente | Cliente123 |

---

## Descripción de Endpoints Principales

### Platos
- `GET /api/platos` - Lista todos los platos (público)
- `GET /api/platos/{id}` - Detalle de plato (público)
- `GET /api/platos/restaurante/{restaurantId}` - Platos de restaurante (público)
- `POST /api/platos` - Crear plato (Encargado/Admin)
- `PUT /api/platos/{id}` - Actualizar plato (Encargado/Admin)
- `DELETE /api/platos/{id}` - Eliminar plato (Admin)

### Reservas
- `GET /api/reservas` - Lista reservas (Staff)
- `GET /api/reservas/{id}` - Detalle reserva (Staff)
- `POST /api/reservas` - Crear reserva (Staff)
- `PUT /api/reservas/{id}` - Actualizar reserva (Encargado/Admin)
- `DELETE /api/reservas/{id}` - Eliminar reserva (Admin)

---

## Notas de Desarrollo

- **Base de datos**: H2 en memoria (se reinicia cada vez que se para la app)
- **Autenticación**: Auth0 OAuth2
- **Imágenes**: Opcional (Cloudinary), sin credenciales se salta
- **SMS**: Opcional (Twilio), sin credenciales se salta
- **CORS**: Configurado para localhost:4200

---

Proyecto completado al **92%** - Listo para testing local.

