# API REST de Usuarios — Node.js, Express y PostgreSQL

API REST que permite gestionar un listado de usuarios mediante operaciones **CRUD** (crear, consultar, actualizar y eliminar). Los datos se almacenan en una base de datos **PostgreSQL** y todos los endpoints responden en formato **JSON** con los códigos HTTP correspondientes.

Proyecto desarrollado para la **Unidad 3 — Lenguaje del lado del servidor (Back-End)**.

---

## Tecnologías utilizadas

| Tecnología | Uso en el proyecto |
|---|---|
| **Node.js** | Entorno de ejecución de JavaScript en el servidor |
| **Express** | Framework para crear la API REST y manejar rutas |
| **PostgreSQL** | Base de datos relacional donde se guardan los usuarios |
| **pg (node-postgres)** | Driver que conecta Node.js con PostgreSQL |
| **dotenv** | Carga las credenciales desde el archivo `.env` |
| **cors** | Permite que la API sea consumida desde otros orígenes |
| **nodemon** | Reinicia el servidor automáticamente durante el desarrollo |
| **Postman** | Pruebas de los endpoints |

Sistema de módulos: **CommonJS** (`require` / `module.exports`).

---

## Funcionalidades implementadas

| Método | Ruta | Descripción |
|---|---|---|
| `GET` | `/` | Mensaje de bienvenida con la lista de endpoints disponibles |
| `POST` | `/usuarios` | Registra un usuario nuevo |
| `GET` | `/usuarios` | Devuelve todos los usuarios ordenados por `id` |
| `GET` | `/usuarios/:id` | Devuelve un usuario concreto |
| `PUT` | `/usuarios/:id` | Actualiza los datos de un usuario existente |
| `DELETE` | `/usuarios/:id` | Elimina un usuario |

Además:

- ✅ Validación de campos obligatorios y del formato del email.
- ✅ Validación de que el `id` de la URL sea un número entero positivo.
- ✅ Control de emails duplicados (restricción `UNIQUE` en la base de datos).
- ✅ Manejo centralizado de errores y respuesta 404 en JSON para rutas inexistentes.
- ✅ **Consultas parametrizadas** (`$1`, `$2`, …) en todas las sentencias SQL para prevenir inyección SQL.

---

## Requisitos previos

- [Node.js](https://nodejs.org/) (versión LTS o superior) y npm
- [PostgreSQL](https://www.postgresql.org/download/) 14 o superior
- [Postman](https://www.postman.com/downloads/) (para probar los endpoints)

---

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/<usuario>/<repositorio>.git
cd <repositorio>
```

### 2. Instalar las dependencias

```bash
npm install
```

### 3. Configurar las variables de entorno

Copia el archivo de ejemplo y completa tus datos reales:

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

Contenido de `.env`:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=db_usuarios
```

> ⚠️ El archivo `.env` está incluido en `.gitignore`, por lo que **nunca se sube al repositorio**. El que sí se sube es `.env.example`, que sirve de plantilla.

### 4. Crear la base de datos y la tabla

```bash
# 1) Crear la base de datos
psql -U postgres -c "CREATE DATABASE db_usuarios;"

# 2) Crear la tabla e insertar los datos de ejemplo
psql -U postgres -d db_usuarios -f database/schema.sql
```

También puedes abrir **pgAdmin**, conectarte a `db_usuarios` y pegar el contenido de `database/schema.sql` en el *Query Tool*.

> En Windows, si el comando `psql` no se reconoce, usa la ruta completa:
> `"C:\Program Files\PostgreSQL\18\bin\psql.exe"`

### 5. Arrancar el servidor

```bash
npm run dev     # modo desarrollo, con reinicio automático (nodemon)
npm start       # modo normal
```

Si todo está bien, en la consola aparecerá:

```
✅ Conectado a PostgreSQL
   Base de datos: db_usuarios
Servidor corriendo en http://localhost:3000
```

---

## Modelo de datos

Tabla `usuarios`:

| Columna | Tipo | Restricciones |
|---|---|---|
| `id` | `SERIAL` | `PRIMARY KEY` (autoincremental) |
| `nombre` | `VARCHAR(100)` | `NOT NULL` |
| `apellido` | `VARCHAR(100)` | `NOT NULL` |
| `email` | `VARCHAR(150)` | `NOT NULL`, `UNIQUE` |
| `telefono` | `VARCHAR(20)` | opcional |
| `fecha_creacion` | `TIMESTAMP` | `NOT NULL`, por defecto la fecha actual |

---

## Ejemplos de petición y respuesta

Todas las respuestas comparten el mismo formato: un campo `ok` que indica si la operación tuvo éxito, un `mensaje` legible y, cuando corresponde, los datos en `data`.

### Crear un usuario — `POST /usuarios`

**Petición**

```json
{
    "nombre": "Carlos",
    "apellido": "Vera",
    "email": "carlos.vera@ejemplo.com",
    "telefono": "0966777888"
}
```

**Respuesta — `201 Created`**

```json
{
    "ok": true,
    "mensaje": "Usuario creado correctamente",
    "data": {
        "id": 4,
        "nombre": "Carlos",
        "apellido": "Vera",
        "email": "carlos.vera@ejemplo.com",
        "telefono": "0966777888",
        "fecha_creacion": "2026-11-12T04:37:46.176Z"
    }
}
```

### Listar usuarios — `GET /usuarios`

**Respuesta — `200 OK`**

```json
{
    "ok": true,
    "mensaje": "Se encontraron 3 usuario(s)",
    "data": [
        {
            "id": 1,
            "nombre": "Ana",
            "apellido": "Pérez",
            "email": "ana.perez@ejemplo.com",
            "telefono": "0999111222",
            "fecha_creacion": "2026-11-12T04:32:16.241Z"
        }
    ]
}
```

### Actualizar un usuario — `PUT /usuarios/1`

**Petición**

```json
{
    "nombre": "Ana",
    "apellido": "Pérez",
    "email": "ana.perez@ejemplo.com",
    "telefono": "0999000111"
}
```

**Respuesta — `200 OK`**

```json
{
    "ok": true,
    "mensaje": "Usuario actualizado correctamente",
    "data": {
        "id": 1,
        "nombre": "Ana",
        "apellido": "Pérez",
        "email": "ana.perez@ejemplo.com",
        "telefono": "0999000111",
        "fecha_creacion": "2026-11-12T04:32:16.241Z"
    }
}
```

### Ejemplo de error — `GET /usuarios/9999`

**Respuesta — `404 Not Found`**

```json
{
    "ok": false,
    "mensaje": "No existe un usuario con el id 9999"
}
```

---

## Códigos HTTP utilizados

| Código | Situación |
|---|---|
| `200 OK` | Consulta, actualización o eliminación exitosa |
| `201 Created` | Usuario registrado correctamente (`POST`) |
| `400 Bad Request` | Faltan campos obligatorios, el email tiene formato inválido, el `id` no es numérico o el JSON está mal formado |
| `404 Not Found` | El usuario no existe, o la ruta solicitada no está definida |
| `409 Conflict` | El email ya está registrado (código `23505` de PostgreSQL) |
| `500 Internal Server Error` | Error inesperado del servidor |

> Los errores internos se registran en la consola del servidor, pero **nunca se envía el detalle técnico al cliente**.

---

## Pruebas con Postman

La colección completa está incluida en el repositorio: `postman/API_Usuarios.postman_collection.json`

**Cómo importarla:**

1. Abre Postman.
2. Pulsa **Import** (arriba a la izquierda).
3. Arrastra el archivo `postman/API_Usuarios.postman_collection.json` o búscalo con *Upload Files*.
4. La colección aparecerá como **API Usuarios**, con la variable `baseUrl` ya configurada en `http://localhost:3000`.
5. Con el servidor corriendo (`npm run dev`), ejecuta cada petición.

La colección incluye los 5 endpoints CRUD y los casos de error (400, 404 y 409), cada uno con un test que comprueba el código de estado esperado.

---

## Estructura del proyecto

```
.
├── database/
│   └── schema.sql                            # Creación de la tabla y datos de ejemplo
├── postman/
│   └── API_Usuarios.postman_collection.json  # Colección de pruebas
├── src/
│   ├── config/
│   │   └── db.js                             # Pool de conexión a PostgreSQL
│   ├── controllers/
│   │   └── usuarios.controller.js            # Lógica de cada endpoint
│   ├── routes/
│   │   └── usuarios.routes.js                # Definición de las rutas
│   ├── middlewares/
│   │   ├── notFound.js                       # 404 para rutas inexistentes
│   │   └── errorHandler.js                   # Manejo centralizado de errores
│   ├── app.js                                # Configuración de Express
│   └── server.js                             # Arranque del servidor
├── .env                                      # Credenciales (NO se sube a GitHub)
├── .env.example                              # Plantilla de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

**¿Por qué `app.js` y `server.js` están separados?**
`app.js` se encarga de *armar* la aplicación (middlewares y rutas) y `server.js` de *encenderla*. Esta separación mantiene el código ordenado y permite reutilizar la app, por ejemplo para pruebas automatizadas.

---

## Autor

**Andy Chafla**
Unidad 3 — Lenguaje del lado del servidor (Back-End)
