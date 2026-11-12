// ============================================================
//  db.js  -  Conexión a PostgreSQL
// ============================================================
// Se usa un Pool (grupo de conexiones) en lugar de abrir y
// cerrar una conexión en cada consulta. El Pool las reutiliza,
// lo que es más rápido y es la práctica recomendada por pg.
//
// Los datos de conexión NO están escritos en el código: se leen
// del archivo .env, que está ignorado por Git.
// ============================================================

const { Pool } = require('pg');

const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

module.exports = pool;
