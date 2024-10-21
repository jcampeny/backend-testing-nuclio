# Backend Testing Project

Este proyecto está diseñado para enseñar a los estudiantes a realizar pruebas unitarias e integrales en una API REST usando Node.js, Express, Mongoose y Vitest. El proyecto incluye una arquitectura básica con controladores, rutas, esquemas, middlewares y modelos, además de pruebas de integración usando Supertest y pruebas unitarias para los servicios.

## Instrucciones para Ejecutar el Proyecto

1. Clonar el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd backend-testing-nuclio
   ```

2. Instalar las dependencias:

   ```bash
   npm install
   ```

3. Configurar las variables de entorno:

   Crear un archivo `.env` en la raíz del proyecto con el siguiente contenido:

   ```env
   PORT=3000
   MONGODB_URI=<uri-de-mongodb-para-produccion>
   ```

4. Iniciar el servidor en modo desarrollo:

   ```bash
   npm run dev
   ```

5. Ejecutar las pruebas:

   Para ejecutar todas las pruebas:

   ```bash
   npm test
   ```

   Para ejecutar solo las pruebas unitarias:

   ```bash
   npm run test:unit
   ```
   
## Estructura del Proyecto

```bash
backend-testing-nuclio/
│
├── app.js                 # Configuración principal de la aplicación Express
├── server.js              # Punto de entrada para iniciar el servidor
├── package.json           # Dependencias y scripts del proyecto
├── src/
│   └── user/              # Módulo de usuarios
│       ├── controllers.js # Lógica de los endpoints (controladores)
│       ├── middlewares.js # Middlewares de autenticación y validación
│       ├── model.js       # Modelo de usuario usando Mongoose
│       ├── routes.js      # Definición de rutas y middlewares asociados
│       ├── schemas.js     # Esquemas de validación con Joi
│       └── services.js    # Lógica de negocio (servicios)
├── tests/
│   ├── integration/       # Pruebas de integración
│   └── unit/              # Pruebas unitarias
```

### Capa de Controladores (`controllers.js`)

Los controladores son funciones que gestionan las solicitudes a los endpoints y llaman a los servicios correspondientes para realizar la lógica de negocio. En este proyecto, los controladores manejan el registro, inicio de sesión, obtención de perfil y subida de imágenes.

### Capa de Servicios (`services.js`)

Los servicios encapsulan la lógica de negocio, como la interacción con la base de datos. Aquí es donde puedes separar la lógica de negocio de los controladores, facilitando las pruebas unitarias. Los servicios son funciones que realizan tareas específicas como crear un usuario, validar credenciales, etc.

### Capa de Middlewares (`middlewares.js`)

Los middlewares son funciones que se ejecutan antes de que las solicitudes lleguen a los controladores. En este caso, tenemos middlewares para autenticar usuarios y validar el payload de las solicitudes usando los esquemas definidos con Joi.

### Capa de Esquemas (`schemas.js`)

Los esquemas definen la estructura y validación de los datos de entrada mediante Joi. En este proyecto se incluyen esquemas para el registro de usuarios, inicio de sesión y subida de imágenes.

### Rutas (`routes.js`)

Las rutas definen los endpoints de la API y asignan middlewares y controladores a cada uno. Ejemplo de los endpoints:

- `POST /api/users/register`: Registro de usuario
- `POST /api/users/login`: Inicio de sesión
- `POST /api/users/logout`: Cierre de sesión
- `GET /api/users/me`: Obtener perfil de usuario
- `POST /api/users/upload`: Subida de imagen de perfil

### Modelo de Usuario (`model.js`)

El modelo define la estructura de los documentos en la base de datos MongoDB usando Mongoose. Este proyecto utiliza MongoMemoryServer para la base de datos en entornos de desarrollo y testing, lo que facilita pruebas aisladas sin la necesidad de una base de datos externa.

## Tests

El proyecto incluye tests de integración y pruebas unitarias para asegurar que tanto los endpoints como la lógica de negocio funcionan correctamente.

### Tests de Integración

Los tests de integración verifican la funcionalidad de los endpoints completos utilizando `supertest`. Esto simula solicitudes HTTP a la API y verifica que las respuestas sean las esperadas.

Ubicadas en `tests/integration/`, estas pruebas cubren los endpoints de registro, inicio de sesión, obtención de perfil, y subida de imágenes.

### Tests Unitarios

Los tests unitarios se centran en los servicios, verificando que cada función de negocio individual funcione correctamente, independientemente de otros componentes. Estas pruebas no interactúan con la base de datos ni con otros módulos.

Ubicadas en `tests/unit/`, estas pruebas aseguran que la lógica de los servicios es correcta.

## Scripts

Estos son los scripts disponibles en el proyecto:

- `npm start`: Inicia el servidor en modo de producción.
- `npm run dev`: Inicia el servidor en modo de desarrollo usando `nodemon` para recargar automáticamente.
- `npm test`: Ejecuta todas las pruebas usando `vitest`.
- `npm run test:watch`: Ejecuta las pruebas en modo observación.
- `npm run test:unit`: Ejecuta solo las pruebas unitarias.

## Dependencias

- **bcryptjs**: Para el hashing de contraseñas.
- **cookie-parser**: Para el manejo de cookies en las solicitudes.
- **dotenv**: Para la gestión de variables de entorno.
- **express**: Framework de Node.js para crear APIs.
- **joi**: Para la validación de datos.
- **jsonwebtoken**: Para la autenticación basada en tokens JWT.
- **mongoose**: ODM para MongoDB.

### Dependencias de desarrollo

- **mongodb-memory-server**: Base de datos MongoDB en memoria para facilitar el testing.
- **nodemon**: Recarga el servidor automáticamente en modo desarrollo.
- **supertest**: Para realizar pruebas de integración enviando solicitudes HTTP.
- **vitest**: Framework para escribir y ejecutar pruebas.
