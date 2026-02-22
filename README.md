# Timoc Manager - Sistema de Gestión de Restaurantes

![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)
![Auth0](https://img.shields.io/badge/Auth0-EB5424?style=for-the-badge&logo=auth0&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white)

## 📋 Descripción del Proyecto

**Timoc Manager** es una plataforma integral para la gestión de restaurantes, inspirada en soluciones como CoverManager. Permite a los clientes descubrir restaurantes, consultar menús digitales y realizar reservas en tiempo real. Para los dueños de restaurantes, ofrece un panel de control completo para gestionar reservas, editar el menú y organizar el plano de mesas del salón.

### Funcionalidades Principales

*   **Autenticación y Autorización:** Sistema robusto basado en roles (Cliente, Encargado, Administrador) utilizando Auth0.
*   **Gestión de Reservas:** CRUD completo de reservas con notificaciones SMS (integración Twilio).
*   **Menú Digital:** Gestión de platos con subida de imágenes a la nube (Cloudinary).
*   **Plano de Mesas Interactivo:** Editor visual Drag & Drop para organizar la distribución del salón.
*   **Dashboard:** Panel de control con estadísticas y accesos rápidos para el personal.

## 🚀 Tecnologías Utilizadas

### Frontend
*   **Angular 19:** Framework principal con Standalone Components.
*   **RxJS:** Programación reactiva para gestión de estado y peticiones HTTP.
*   **Bootstrap 5:** Diseño responsive y componentes UI.
*   **SweetAlert2:** Notificaciones y modales atractivos.
*   **Auth0 Angular SDK:** Gestión de identidad segura.

### Backend (Spring Boot)
*   **Spring Security:** Protección de endpoints y validación de JWT.
*   **Spring Data JPA:** Acceso a datos.
*   **H2 Database:** Base de datos en memoria para desarrollo.
*   **Twilio SDK:** Envío de SMS transaccionales.
*   **Cloudinary SDK:** Almacenamiento de imágenes.

## 🛠️ Instalación y Ejecución

### Prerrequisitos
*   Node.js (v18+)
*   Java JDK 21
*   Maven

### Pasos para ejecutar el Frontend

1.  Clonar el repositorio:
    ```bash
    git clone https://github.com/tu-usuario/timoc-manager.git
    cd timoc-manager/frontend
    ```

2.  Instalar dependencias:
    ```bash
    npm install
    ```

3.  Iniciar el servidor de desarrollo:
    ```bash
    ng serve
    ```
4.  Abrir `http://localhost:4200` en el navegador.

### Pasos para ejecutar el Backend

1.  Navegar a la raíz del proyecto Java:
    ```bash
    cd timoc-manager
    ```

2.  Configurar variables de entorno en `src/main/resources/application.properties` (o usar las por defecto para H2):
    *   `twilio.account-sid`
    *   `twilio.auth-token`
    *   `cloudinary.cloud-name`
    *   `cloudinary.api-key`
    *   `cloudinary.api-secret`

3.  Ejecutar con Maven:
    ```bash
    ./mvnw spring-boot:run
    ```

## 🔑 Credenciales de Prueba

Para probar los diferentes roles, puedes usar las siguientes cuentas (o registrarte con una nueva):

| Rol | Email                         | Contraseña       | Descripción |
| :--- |:------------------------------|:-----------------| :--- |
| **Administrador** | `admin@admin.com`             | `Admin123`       | Acceso total al sistema. |
| **Encargado** | `restaurante@restaurante.com` | `Restaurante123` | Gestión de su restaurante. |
| **Cliente** | `cliente@cliente.com`         | `Cliente123`     | Reserva y consulta. |

## 🌍 Despliegue

**Frontend (Vercel):** https://proyecto-dwes-final.vercel.app

**Backend (Render):** https://proyectodwesfinal.onrender.com

## 📝 Autor

Desarrollado por **Lucas Timoc** para el módulo de Desarrollo Web en Entorno Servidor.
