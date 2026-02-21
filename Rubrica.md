# Proyecto Final

## Índice Rápido

* [Proyecto Final - Aplicación Web con Autenticación y Consumo de API](#proyecto-final---aplicación-web-con-autenticación-y-consumo-de-api)
    * [Índice Rápido](#índice-rápido)
    * [Resumen Ejecutivo](#resumen-ejecutivo)
    * [Descripción General](#descripción-general)
    * [Objetivos del Proyecto](#objetivos-del-proyecto)
    * [Importante!!!!](#importante)
    * [Stack Tecnológico](#stack-tecnológico)
        * [Frontend](#frontend)
        * [Servicios de Proveedores de servicios docker para frontend, para auth y backend API](#servicios-de-proveedores-de-servicios-docker-para-frontend-para-auth-y-backend-api)
            * [1. Render](#1-render)
            * [2. Railway](#2-railway)
            * [3. Fly.io](#3-flyio)
            * [4. Koyeb](#4-koyeb)
            * [5. Google Cloud Run](#5-google-cloud-run)
    * [Opciones de Backend y APIs](#opciones-de-backend-y-apis)
        * [Opción 1: Supabase](#opción-1-supabase)
        * [Opción 2: APIs Públicas con Token](#opción-2-apis-públicas-con-token)
        * [Opción 3: Backend Propio (Opcional Avanzado)](#opción-3-backend-propio-opcional-avanzado)
    * [Funcionalidades Requeridas - MVP Esencial (38 checks)](#funcionalidades-requeridas---mvp-esencial-38-checks)
        * [RA6. ACCESO A BD Y SEGURIDAD (15%) - 18 checks](#ra6-acceso-a-bd-y-seguridad-15---18-checks)
            * [1. Sistema de Autenticación (7 checks)](#1-sistema-de-autenticación-7-checks)
            * [2. Autorización y Protección de Rutas (4 checks)](#2-autorización-y-protección-de-rutas-4-checks)
            * [3. Operaciones CRUD Completas (7 checks)](#3-operaciones-crud-completas-7-checks)
        * [RA7. Documentación de APIs (5%) - 2 checks](#ra7-documentación-de-apis-5---2-checks)
        * [RA8. Frameworks avanzados, concurrencia y programación reactiva (15%) - 14 checks](#ra8-frameworks-avanzados-concurrencia-y-programación-reactiva-15---14-checks)
            * [4. Interfaz de Usuario (8 checks)](#4-interfaz-de-usuario-8-checks)
            * [5. Gestión de Estado y Servicios (6 checks)](#5-gestión-de-estado-y-servicios-6-checks)
        * [RA9. Despliegue de aplicaciones (5%) - 4 checks](#ra9-despliegue-de-aplicaciones-5---4-checks)
        * [Resumen de Checks por RA](#resumen-de-checks-por-ra)
    * [Estructura Base del Proyecto Propuesta como Base](#estructura-base-del-proyecto-propuesta-como-base)
    * [Criterios de Evaluación y Calificación](#criterios-de-evaluación-y-calificación)
        * [⚠️ CONDICIÓN OBLIGATORIA: DEFENSA TÉCNICA](#️-condición-obligatoria-defensa-técnica)
        * [FECHAS ENTREGA Y DEFENSA](#fechas-entrega-y-defensa)
        * [Entregables](#entregables)
        * [Distribución de la Calificación](#distribución-de-la-calificación)
        * [Cálculo de Calificación por RA](#cálculo-de-calificación-por-ra)
            * [Fórmula de Cálculo](#fórmula-de-cálculo)
        * [Criterios de Evaluación de Checks](#criterios-de-evaluación-de-checks)
        * [La Calificación Final del Curso](#la-calificación-final-del-curso)
        * [Condiciones Especiales](#condiciones-especiales)
    * [Recursos Adicionales](#recursos-adicionales)
        * [Documentación Oficial](#documentación-oficial)
        * [Tutoriales Recomendados](#tutoriales-recomendados)
        * [Tools](#tools)

***

* \[Ayudas]
    * [Apis Públicas](https://github.com/docenciait/DWES_2526/blob/main/TRIMESTRE%202/Proyecto%20Final/APIsP%C3%BAblicas.md)
    * [Ayuda al Desarrollo](https://github.com/docenciait/DWES_2526/blob/main/TRIMESTRE%202/Proyecto%20Final/AyudaDesarrollo.md)
    * [Documentación del github](https://github.com/docenciait/DWES_2526/blob/main/TRIMESTRE%202/Proyecto%20Final/DocGithub.md)

***

## Resumen Ejecutivo

**Objetivo**: Crear una aplicación web Angular 21 con autenticación JWT y operaciones CRUD completas.

**Duración Estimada**:

* **2 semanas**

**Tecnologías Principales**:

* Frontend: Angular 21 (Standalone Components)
* Backend: Supabase (recomendado) o API pública con token
* Autenticación: JWT
* Despliegue: Render, Railway, Vercel o Netlify

**Requisitos Mínimos**:

1. Sistema de autenticación completo (registro, login, logout)
2. Autorización por roles (usuario y administrador)
3. CRUD completo de al menos una entidad
4. Protección de rutas con guards
5. Aplicación desplegada en producción
6. Repositorio Git con README completo

***

## Descripción General

Desarrollar una aplicación web completa que integre un **frontend en Angular 21** con **autenticación/autorización mediante JWT**, consumiendo datos mediante **Supabase (recomendado)** o una **API pública con autenticación** para realizar operaciones CRUD. El frontend deberá ser desplegado en un servidor gratuito.

El proyecto simulará un sistema real donde los usuarios deben autenticarse para acceder a funcionalidades específicas, consumir datos de servicios externos o bases de datos, y gestionar información con permisos diferenciados según roles (usuario/administrador).

**Opciones de Backend**:

* **Opción 1 (Recomendada)**: Supabase - BaaS completo con autenticación JWT y PostgreSQL
* **Opción 2**: API pública con token + Auth0/Firebase para autenticación
* **Opción 3 (Opcional Avanzado)**: Backend propio con Spring Boot

***

## Objetivos del Proyecto

1. Implementar un sistema completo de **autenticación y autorización** con JWT
2. Desarrollar una SPA (Single Page Application) con **Angular 21** usando standalone components
3. Integrar **Supabase** (recomendado) o una **API pública con autenticación**
4. Implementar operaciones **CRUD completas** sobre al menos una entidad
5. Aplicar **guards** y **protección de rutas** en Angular
6. Gestionar **tokens JWT** en el cliente con interceptores
7. Implementar **autorización por roles** (usuario y administrador)
8. Desplegar el frontend en un **servicio gratuito** (Render, Railway, Vercel, Netlify)
9. Aplicar buenas prácticas de desarrollo y arquitectura Angular

***

## Importante!!!!

* **Cada alumno tendrá que decidir el API Pública, Backend o uso de Supabase/Firebase para autorización y backend**
* **El alumno debe decir que idea realizar y qué backend va a usar. Si no lo hace se le asignará POR DEFECTO EL BACKEND DE SUPABASE y deberá hacer el proyecto según los criterios descritos.**

## Stack Tecnológico

### Frontend

* **Framework**: Angular 21 (standalone components)
* **Lenguaje**: TypeScript 5.3+
* **Gestión de Estado**: Signals (Angular 21)
* **HTTP Client**: HttpClient de Angular
* **Routing**: Angular Router con guards
* **Estilos**: CSS/SCSS o TailwindCSS/Bootstrap/Angular Material (opcional)
* **Forms**: Reactive Forms con validaciones

### Servicios de Proveedores de servicios docker para frontend, para auth y backend API

#### 1. Render

* **URL**: <https://render.com/>

#### 2. Railway

* **URL**: <https://railway.app/>
* **Tier gratuito**:
    * $5 USD de crédito mensual (antes era ilimitado)
    * \~500 horas de contenedor pequeño
    * No se duerme
* **Ventajas**: UI excelente, muy fácil uso
* **Docker**: Deploy directo desde Dockerfile

#### 3. Fly.io

* **URL**: <https://fly.io/>
* **Tier gratuito**:
    * 3 máquinas compartidas 256MB RAM
    * 160GB bandwidth/mes
    * No requiere tarjeta (opcional)
* **Docker**: Optimizado para Docker
* **Ventaja**: Múltiples regiones geográficas

#### 4. Koyeb

* **URL**: <https://www.koyeb.com/>
* **Tier gratuito**:
    * 1 servicio web
    * No se duerme
    * SSL automático
* **Docker**: Soporta Docker Hub y GitHub

#### 5. Google Cloud Run

* **URL**: <https://cloud.google.com/run>
* **Tier gratuito**:
    * 2 millones requests/mes
    * 360,000 GB-segundos/mes
    * Scale to zero (solo pagas cuando se usa)
* **Docker**: Diseñado específicamente para containers
* **Ventaja**: Infraestructura de Google

***

## Opciones de Backend y APIs

### Opción 1: Supabase

**Supabase** es un Backend as a Service (BaaS) que proporciona todo lo necesario para el proyecto:

* **Autenticación completa**: Sistema de autenticación con JWT, OAuth, Magic Links
* **Base de datos PostgreSQL**: Base de datos real con API REST automática
* **CRUD completo**: Operaciones Create, Read, Update, Delete sin código backend
* **Real-time**: Subscripciones en tiempo real (opcional)
* **Storage**: Almacenamiento de archivos
* **Gratuito**: 500MB database, 1GB storage, 2GB bandwidth
* **Documentación**: Excelente documentación y SDK para Angular

**Ventajas de Supabase**:

* No necesitas crear tu propio backend
* Autenticación JWT ya implementada
* Gestión de roles integrada
* Panel de administración visual
* Ideal para aprendizaje y proyectos reales

### Opción 2: APIs Públicas con Token

Si prefieres usar una API pública existente (las proporcionadas en clase), puedes combinarla con:

* **Auth0** para autenticación
* **Firebase Authentication** para autenticación
* **Tu propio backend** con Spring Boot para autenticación

**APIs públicas disponibles**: Consulta la lista completa más abajo en la sección "APIs de Prueba con CRUD y Autenticación".

### Opción 3: Backend Propio (Opcional Avanzado)

Puedes crear tu propio backend con:

* **Spring Boot**: Backend Java con JWT
* **Node.js + Express**: Backend JavaScript
* **Django/FastAPI**: Backend Python

**Nota**: Esta opción requiere más tiempo de desarrollo y no es obligatoria para el proyecto.

***

## Funcionalidades Requeridas - MVP Esencial (38 checks)

* **Los porcentajes son los RAs del Módulo.**
* **Esta lista está optimizada para un MVP funcional en 2 semanas**

***

> **RECORDAD QUE LOS PORCENTAJES DE LOS RAs SON DEL TOTAL DEL MÓDULO**

### RA6. ACCESO A BD Y SEGURIDAD (15%) - 18 checks

#### 1. Sistema de Autenticación (7 checks)

**Registro de Usuarios**

* [ ] 1\. Formulario de registro con: nombre, email, contraseña, confirmar contraseña
* [ ] 2\. Validaciones básicas: email válido, contraseña mínimo 6 caracteres, contraseñas coinciden
* [ ] 3\. Registro exitoso genera JWT y redirige al dashboard

**Login de Usuarios**

* [ ] 4\. Formulario de login con email y contraseña
* [ ] 5\. Almacenamiento de JWT en LocalStorage

**Logout**

* [ ] 6\. Botón de logout visible cuando usuario autenticado
* [ ] 7\. Eliminar token y limpiar estado

***

#### 2. Autorización y Protección de Rutas (4 checks)

**Guards Implementados**

* [ ] 8\. **AuthGuard**: Protege rutas privadas (/dashboard, /lista)
* [ ] 9\. **AuthGuard**: Redirige a /login si usuario no autenticado
* [ ] 10\. **RoleGuard**: Diferencia permisos entre admin y usuario
    * Admin: puede editar y eliminar
    * Usuario: solo puede consultar y crear
* [ ] 11\. Página **404 Not Found** para rutas inexistentes

***

#### 3. Operaciones CRUD Completas (7 checks)

**Entidad a gestionar**: Elegir una entidad según tu API (ejemplos: productos, tareas, posts, películas, etc.)

**Read (Leer/Consultar)**

* [ ] 12\. **Listado completo**: Página con todos los registros
* [ ] 13\. **Vista de detalle**: Página individual de cada registro

**Create (Crear)**

* [ ] 14\. Formulario de creación con validaciones básicas
* [ ] 15\. Solo usuarios autenticados pueden crear

**Update (Actualizar)**

* [ ] 16\. Formulario de edición pre-rellenado (solo admin puede editar)

**Delete (Eliminar)**

* [ ] 17\. Solo administradores pueden eliminar
* [ ] 18\. Confirmación antes de eliminar

***

**Escala de calificación RA6 (porcentaje de checks cumplidos):**

| Puntuación | Checks Cumplidos | % Completado | Descripción                                             |
| ---------- | ---------------- | ------------ | ------------------------------------------------------- |
| **100**    | 18/18            | 100%         | Excelente. Autenticación, autorización y CRUD completos |
| **75**     | 14-17            | 78-94%       | Bien. Funcional con detalles menores pendientes         |
| **50**     | 9-13             | 50-72%       | Aceptable. MVP funciona pero incompleto                 |
| **25**     | 5-8              | 28-44%       | Deficiente. Muchas funcionalidades críticas faltan      |
| **0**      | 0-4              | 0-22%        | Muy deficiente. No funcional                            |

***

### RA7. Documentación de APIs (5%) - 2 checks

* [ ] 19\. **README completo** con:
    * Descripción del proyecto
    * Instrucciones de instalación (`npm install`, `ng serve`)
    * Variables de entorno necesarias
    * Cuentas de prueba (usuario y admin)
    * URL de despliegue
* [ ] 20\. **TSDoc** en servicios principales (AuthService, EntityService) y guards

***

**Escala de calificación RA7 (porcentaje de checks cumplidos):**

| Puntuación | Checks Cumplidos | % Completado | Descripción                                         |
| ---------- | ---------------- | ------------ | --------------------------------------------------- |
| **100**    | 2/2              | 100%         | Excelente. Documentación completa y clara           |
| **75**     | 2/2              | 100%         | Bien. README completo con pequeños detalles menores |
| **50**     | 1/2              | 50%          | Aceptable. README básico o TSDoc incompleto         |
| **25**     | 1/2              | 50%          | Deficiente. Documentación muy básica                |
| **0**      | 0/2              | 0%           | Muy deficiente. Sin documentación                   |

***

### RA8. Frameworks avanzados, concurrencia y programación reactiva (15%) - 14 checks

#### 4. Interfaz de Usuario (8 checks)

**Navegación**

* [ ] 21\. **Navbar** con navegación dinámica según estado de autenticación:
    * Logo/nombre de la aplicación
    * Enlaces públicos (Home)
    * Enlaces privados (Dashboard, Lista) si autenticado
    * Botón Login/Registro o Logout según estado

**Páginas Públicas**

* [ ] 22\. **Home**: Página de bienvenida
* [ ] 23\. **Login**: Formulario de acceso
* [ ] 24\. **Registro**: Formulario de registro

**Páginas Privadas**

* [ ] 25\. **Dashboard**: Panel principal (protegido por AuthGuard)
* [ ] 26\. **Listado**: Todos los registros de la entidad
* [ ] 27\. **Detalle**: Vista individual de un registro

**Páginas de Error**

* [ ] 28\. **404 Not Found**: Página para rutas inexistentes

***

#### 5. Gestión de Estado y Servicios (6 checks)

**Feedback Visual**

* [ ] 29\. **Loaders** durante peticiones HTTP (spinner o skeleton)
* [ ] 30\. **Mensajes de éxito/error** en operaciones CRUD

**Servicios Angular**

* [ ] 31\. **AuthService** con métodos: `login()`, `register()`, `logout()`, `isAuthenticated()`
* [ ] 32\. **\[Entidad]Service** con CRUD completo: `getAll()`, `getById()`, `create()`, `update()`, `delete()`

**Interceptores**

* [ ] 33\. **AuthInterceptor**: Añade token JWT automáticamente a todas las peticiones HTTP

**Estado Reactivo**

* [ ] 34\. **Estado de autenticación reactivo** con Signals o Observables (navbar se actualiza automáticamente)

***

**Escala de calificación RA8 (porcentaje de checks cumplidos):**

| Puntuación | Checks Cumplidos | % Completado | Descripción                                             |
| ---------- | ---------------- | ------------ | ------------------------------------------------------- |
| **100**    | 14/14            | 100%         | Excelente. UI completa, funcional y bien diseñada       |
| **75**     | 11-13            | 79-93%       | Bien. UI completa con pequeños detalles menores         |
| **50**     | 7-10             | 50-71%       | Aceptable. UI funcional con algunos problemas de diseño |
| **25**     | 4-6              | 29-43%       | Deficiente. UI incompleta o con errores significativos  |
| **0**      | 0-3              | 0-21%        | Muy deficiente. UI no funcional                         |

***

### RA9. Despliegue de aplicaciones (5%) - 4 checks

*Recordad que se evalúa 5% ahora y el resto (10%) se evalúa después de la FFE*

* [ ] 35\. **Deploy funcional** en Vercel, Netlify, Render o Railway
* [ ] 36\. **Variables de entorno** configuradas correctamente
* [ ] 37\. **Aplicación accesible** vía URL pública (HTTPS)
* [ ] 38\. **Credenciales de prueba** en README (usuario normal + admin)

***

**Escala de calificación RA9 (porcentaje de checks cumplidos):**

| Puntuación | Checks Cumplidos | % Completado | Descripción                                 |
| ---------- | ---------------- | ------------ | ------------------------------------------- |
| **100**    | 4/4              | 100%         | Excelente. Deploy completo y accesible      |
| **75**     | 3/4              | 75%          | Bien. Deploy funcional con detalles menores |
| **50**     | 2/4              | 50%          | Aceptable. Deploy básico funciona           |
| **25**     | 1/4              | 25%          | Deficiente. Deploy con problemas            |
| **0**      | 0/4              | 0%           | Muy deficiente. No desplegado o no funciona |

***

### Resumen de Checks por RA

| RA        | Checks | Peso    | Descripción                        |
| --------- | ------ | ------- | ---------------------------------- |
| **RA6**   | 18     | 15%     | Autenticación, autorización y CRUD |
| **RA7**   | 2      | 5%      | Documentación                      |
| **RA8**   | 14     | 15%     | UI, servicios y estado reactivo    |
| **RA9**   | 4      | 5%      | Despliegue                         |
| **TOTAL** | **38** | **40%** | MVP Esencial                       |

***

## Estructura Base del Proyecto Propuesta como Base

* Se puede ampliar y modificar.

```
proyecto-angular/
│
├── src/
│   ├── app/
│   │   ├── core/                      # Módulo core (singleton services)
│   │   │   ├── guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── role.guard.ts
│   │   │   ├── interceptors/
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── error.interceptor.ts
│   │   │   └── services/
│   │   │       ├── auth.service.ts
│   │   │       └── storage.service.ts
│   │   │
│   │   ├── shared/                    # Componentes compartidos
│   │   │   ├── components/
│   │   │   │   ├── navbar/
│   │   │   │   ├── footer/
│   │   │   │   └── loader/
│   │   │   └── models/
│   │   │       ├── user.model.ts
│   │   │       └── jwt-response.model.ts
│   │   │
│   │   ├── features/                  # Funcionalidades por módulos
│   │   │   ├── auth/
│   │   │   │   ├── pages/
│   │   │   │   │   ├── login/
│   │   │   │   │   └── register/
│   │   │   │   └── auth.routes.ts
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │   ├── pages/
│   │   │   │   │   └── dashboard/
│   │   │   │   └── dashboard.routes.ts
│   │   │   │
│   │   │   └── [entidad]/             # Ejemplo: movies, weather, pokemons
│   │   │       ├── components/
│   │   │       ├── pages/
│   │   │       │   ├── list/
│   │   │       │   ├── detail/
│   │   │       │   ├── create/
│   │   │       │   └── edit/
│   │   │       ├── services/
│   │   │       │   └── [entidad].service.ts
│   │   │       ├── models/
│   │   │       │   └── [entidad].model.ts
│   │   │       └── [entidad].routes.ts
│   │   │
│   │   ├── app.component.ts
│   │   ├── app.config.ts
│   │   └── app.routes.ts
│   │
│   ├── environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

***

## Criterios de Evaluación y Calificación

### ⚠️ CONDICIÓN OBLIGATORIA: DEFENSA TÉCNICA

**La defensa técnica con 5 preguntas es OBLIGATORIA y ELIMINATORIA**

* El alumno debe responder correctamente **al menos 3 de las 5 preguntas** técnicas
* Si no responde correctamente al menos 3 preguntas → **NOTA MÁXIMA: 4 (SUSPENSO)**
* La defensa evalúa la comprensión real del código implementado
* **No presentarse a la defensa = 0 en el proyecto completo y en todos los RAs**
* **No hacer la entrega del proyecto = 0 en el proyecto completo y en todos los RAs**

### FECHAS ENTREGA Y DEFENSA

* Fecha entrega final de proyectos será el 20 de Febrero 2026.
* Y las defensas pueden ser ya entre el 20 y 23 de Febrero de 2026
* **Nota**: En caso que el alumno quiera presentar antes no hay problema y se priorizará su defensa.

### Entregables

1. **Código Fuente** (Obligatorio)
    * Repositorio Git público (GitHub/GitLab/Bitbucket)
    * README.md con:
        * Descripción del proyecto
        * Tecnologías utilizadas
        * Instrucciones de instalación
        * Credenciales de prueba
        * Capturas de pantalla
    * **Commits descriptivos (mínimo 10 commits)**
    * .gitignore configurado

***

### Distribución de la Calificación

| Componente                                | Checks      | Porcentaje | Puntos sobre 10 |
| ----------------------------------------- | ----------- | ---------- | --------------- |
| **RA6. Acceso a BD y Seguridad**          | 18          | 15%        | de 0 a 10       |
| **RA7. Documentación de APIs**            | 2           | 5%         | de 0 a 10       |
| **RA8. Frameworks, UI y Estado Reactivo** | 14          | 15%        | de 0 a 10       |
| **RA9. Despliegue de Aplicaciones**       | 4           | 5%         | de 0 a 10       |
| **TOTAL**                                 | **38**      | **40%**    | -               |
| **Defensa Técnica (OBLIGATORIA)**         | 5 preguntas | -          | APTO/NO APTO    |

***

### Cálculo de Calificación por RA

Cada RA se califica según el **porcentaje de checks completados correctamente**. Los checks deben:

* ✅ Estar **implementados correctamente**
* ✅ Estar **funcionando sin errores**
* ✅ Estar **integrados con el resto de la aplicación**

#### Fórmula de Cálculo

Para cada RA, se usa la tabla de escala (0, 25, 50, 75, 100) según el % de checks cumplidos:

```
Nota_RA = Puntuación_Escala / 10
```

***

### Criterios de Evaluación de Checks

Un check se considera **COMPLETADO** solo si cumple:

1. **Funcionalidad Correcta**: El código hace lo que debe hacer
2. **Sin Errores Críticos**: No lanza errores en consola o runtime
3. **Integración Completa**: Funciona con el resto de componentes
4. **UX Básica**: Tiene feedback mínimo para el usuario (loaders, mensajes)

Un check **NO se cuenta** si:

* ❌ Está implementado pero no funciona
* ❌ Funciona solo a veces o en ciertos casos
* ❌ Genera errores en consola
* ❌ No está integrado con la aplicación
* ❌ Es un placeholder o mock sin funcionalidad real

***

### La Calificación Final del Curso

* **Media Ponderada Informativa** si NO se han superado todos los RAs
* **Nota Ponderada Final** si TODOS los RAs están superados
* **RA9 completo (10%)** se evaluará después de la FFE (Formación en Centros de Trabajo)

***

### Condiciones Especiales

1. **Defensa Técnica NO SUPERADA** (< 3/5 preguntas correctas):
    * **Nota máxima = 4 (SUSPENSO)** independientemente de los checks completados
2. **No entrega o no presentación a defensa**:
    * **Nota = 0** en TODOS los RAs del proyecto
3. **Plagio detectado**:
    * **Nota = 0** + apertura de expediente académico
    * Se considera plagio: copiar código de compañeros, de internet sin atribución, o usar código sin comprenderlo
4. **Entrega fuera de plazo**:
    * No se acepta la entrega: Calificación 0

***

## Recursos Adicionales

### Documentación Oficial

* [Angular Documentation](https://angular.dev/)
* [Angular Router](https://angular.dev/guide/routing)
* [RxJS Documentation](https://rxjs.dev/)
* [JWT.io](https://jwt.io/)

### Tutoriales Recomendados

* [Angular Authentication Tutorial](https://angular.dev/tutorials)
* [JWT Best Practices](https://auth0.com/blog/jwt-handbook/)
* [Angular Signals](https://angular.dev/guide/signals)

### Tools

* [Postman](https://www.postman.com/) - Testing de APIs
* [JSON Formatter](https://jsonformatter.org/) - Visualizar responses
* [Angular DevTools](https://angular.dev/tools/devtools) - Debugging