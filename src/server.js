// ============================================================
//  server.js  -  Punto de arranque del servidor
// ============================================================
// Carga las variables de entorno, importa la app de Express
// y la pone a escuchar en el puerto configurado.
// ============================================================

// Carga las variables definidas en el archivo .env
require('dotenv').config({ quiet: true });

const app = require('./app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
