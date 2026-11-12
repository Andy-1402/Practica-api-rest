-- ============================================================
--  schema.sql  -  Base de datos y tabla de la API Usuarios
-- ============================================================
--  Cómo ejecutarlo (desde la raíz del proyecto):
--
--    1) Crear la base de datos (se ejecuta FUERA de ella):
--       psql -U postgres -c "CREATE DATABASE db_usuarios;"
--
--    2) Ejecutar este script dentro de la base creada:
--       psql -U postgres -d db_usuarios -f database/schema.sql
--
--  También puede pegarse este contenido en el Query Tool de
--  pgAdmin, estando conectado a la base db_usuarios.
-- ============================================================

-- NOTA: la siguiente línea NO se ejecuta aquí porque PostgreSQL
-- no permite crear una base de datos desde dentro de otra.
-- Queda documentada como referencia (ver paso 1 de arriba).
--
-- CREATE DATABASE db_usuarios;


-- ------------------------------------------------------------
--  Tabla: usuarios
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS usuarios (
    id              SERIAL PRIMARY KEY,
    nombre          VARCHAR(100) NOT NULL,
    apellido        VARCHAR(100) NOT NULL,
    email           VARCHAR(150) NOT NULL UNIQUE,
    telefono        VARCHAR(20),
    fecha_creacion  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ------------------------------------------------------------
--  Datos de ejemplo
-- ------------------------------------------------------------
--  ON CONFLICT DO NOTHING evita errores de email duplicado
--  si el script se ejecuta más de una vez.
-- ------------------------------------------------------------
INSERT INTO usuarios (nombre, apellido, email, telefono) VALUES
    ('Ana',   'Pérez',    'ana.perez@ejemplo.com',    '0999111222'),
    ('Luis',  'Gómez',    'luis.gomez@ejemplo.com',   '0988333444'),
    ('Marta', 'Rodríguez','marta.rodriguez@ejemplo.com', '0977555666')
ON CONFLICT (email) DO NOTHING;

-- ------------------------------------------------------------
--  Verificación
-- ------------------------------------------------------------
SELECT * FROM usuarios ORDER BY id;
