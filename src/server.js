// ============================================================
//  server.js  -  Punto de arranque del servidor
// ============================================================
// Carga las variables de entorno, comprueba la conexión con
// PostgreSQL e inicia el servidor Express.
// ============================================================

// Carga las variables definidas en el archivo .env
require('dotenv').config({ quiet: true });

const app = require('./app');
const pool = require('./config/db');

const PORT = process.env.PORT || 3000;

// ------------------------------------------------------------
//  Comprobación de la conexión a la base de datos
// ------------------------------------------------------------
// Se hace una consulta muy simple (SELECT NOW()) solo para
// confirmar que las credenciales y la base de datos son
// correctas ANTES de levantar el servidor.
// ------------------------------------------------------------
const comprobarConexion = async () => {
  try {
    const resultado = await pool.query('SELECT NOW()');
    console.log('✅ Conectado a PostgreSQL');
    console.log(`   Base de datos: ${process.env.DB_NAME}`);
    console.log(`   Hora del servidor: ${resultado.rows[0].now.toLocaleString()}`);
    return true;
  } catch (error) {
    console.error('❌ No se pudo conectar a PostgreSQL');
    console.error(`   Detalle: ${error.message}`);

    // Pistas según el tipo de error más común
    if (error.code === 'ECONNREFUSED') {
      console.error('   Posible causa: el servicio de PostgreSQL está apagado.');
    } else if (error.code === '28P01') {
      console.error('   Posible causa: usuario o contraseña incorrectos en el archivo .env.');
    } else if (error.code === '3D000') {
      console.error(`   Posible causa: la base de datos "${process.env.DB_NAME}" no existe.`);
      console.error('   Solución: ejecuta el script database/schema.sql.');
    }
    return false;
  }
};

// ------------------------------------------------------------
//  Arranque
// ------------------------------------------------------------
const iniciarServidor = async () => {
  await comprobarConexion();

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
};

iniciarServidor();
