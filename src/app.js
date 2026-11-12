// ============================================================
//  app.js  -  Configuración de la aplicación Express
// ============================================================
// Aquí se arma la aplicación: middlewares, rutas y manejo de
// errores. NO se levanta el servidor aquí (eso es server.js),
// así la app queda reutilizable y fácil de probar.
// ============================================================

const express = require('express');
const cors = require('cors');

const app = express();

// ---------- Middlewares globales ----------

// Permite que la API sea consumida desde otros orígenes
// (por ejemplo, un front-end en otro puerto).
app.use(cors());

// Permite leer el body de las peticiones en formato JSON
// y lo deja disponible en req.body.
app.use(express.json());

// ---------- Ruta de bienvenida ----------

app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    nombre: 'API Usuarios',
    version: '1.0.0',
    descripcion: 'API REST para gestionar usuarios (Node.js + Express + PostgreSQL)',
    endpoints: {
      'POST   /usuarios': 'Crear un usuario',
      'GET    /usuarios': 'Listar todos los usuarios',
      'GET    /usuarios/:id': 'Obtener un usuario por su id',
      'PUT    /usuarios/:id': 'Actualizar un usuario',
      'DELETE /usuarios/:id': 'Eliminar un usuario',
    },
  });
});

module.exports = app;
