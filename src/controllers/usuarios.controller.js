// ============================================================
//  usuarios.controller.js  -  Lógica de cada endpoint
// ============================================================
// Cada función recibe la petición, valida los datos, consulta
// la base de datos y devuelve una respuesta JSON con el código
// HTTP adecuado.
//
// SEGURIDAD: todas las consultas usan parámetros ($1, $2, ...)
// en lugar de concatenar texto. Así PostgreSQL trata los datos
// como valores y NO como código SQL, evitando la inyección SQL.
// ============================================================

const pool = require('../config/db');

// ------------------------------------------------------------
//  Funciones auxiliares de validación
// ------------------------------------------------------------

// Comprueba que el id de la URL sea un número entero positivo.
const esIdValido = (id) => /^[1-9]\d*$/.test(id);

// Validación simple de formato de email (algo@algo.algo).
const esEmailValido = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Valida los campos del body al crear o actualizar un usuario.
// Devuelve un mensaje de error, o null si todo está correcto.
const validarDatosUsuario = ({ nombre, apellido, email }) => {
  if (!nombre || !apellido || !email) {
    return 'Los campos nombre, apellido y email son obligatorios';
  }
  if (!esEmailValido(email)) {
    return 'El formato del email no es válido';
  }
  return null;
};

// ------------------------------------------------------------
//  POST /usuarios  ->  Crear un usuario
// ------------------------------------------------------------
const crearUsuario = async (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono } = req.body;

    const error = validarDatosUsuario({ nombre, apellido, email });
    if (error) {
      return res.status(400).json({ ok: false, mensaje: error });
    }

    const { rows } = await pool.query(
      `INSERT INTO usuarios (nombre, apellido, email, telefono)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [nombre, apellido, email, telefono || null]
    );

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario creado correctamente',
      data: rows[0],
    });
  } catch (error) {
    // Lo atiende errorHandler.js (por ejemplo, email duplicado -> 409)
    next(error);
  }
};

// ------------------------------------------------------------
//  GET /usuarios  ->  Listar todos los usuarios
// ------------------------------------------------------------
const obtenerUsuarios = async (req, res, next) => {
  try {
    const { rows } = await pool.query('SELECT * FROM usuarios ORDER BY id');

    res.status(200).json({
      ok: true,
      mensaje: `Se encontraron ${rows.length} usuario(s)`,
      // Puede ser un arreglo vacío, y eso también es un 200
      data: rows,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------------
//  GET /usuarios/:id  ->  Obtener un usuario por su id
// ------------------------------------------------------------
const obtenerUsuarioPorId = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El id debe ser un número entero positivo',
      });
    }

    const { rows } = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);

    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: `No existe un usuario con el id ${id}`,
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario encontrado',
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------------
//  PUT /usuarios/:id  ->  Actualizar un usuario
// ------------------------------------------------------------
const actualizarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El id debe ser un número entero positivo',
      });
    }

    const { nombre, apellido, email, telefono } = req.body;

    const error = validarDatosUsuario({ nombre, apellido, email });
    if (error) {
      return res.status(400).json({ ok: false, mensaje: error });
    }

    const { rows } = await pool.query(
      `UPDATE usuarios
          SET nombre = $2, apellido = $3, email = $4, telefono = $5
        WHERE id = $1
        RETURNING *`,
      [id, nombre, apellido, email, telefono || null]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: `No existe un usuario con el id ${id}`,
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario actualizado correctamente',
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

// ------------------------------------------------------------
//  DELETE /usuarios/:id  ->  Eliminar un usuario
// ------------------------------------------------------------
const eliminarUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!esIdValido(id)) {
      return res.status(400).json({
        ok: false,
        mensaje: 'El id debe ser un número entero positivo',
      });
    }

    const { rows } = await pool.query(
      'DELETE FROM usuarios WHERE id = $1 RETURNING *',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({
        ok: false,
        mensaje: `No existe un usuario con el id ${id}`,
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario eliminado correctamente',
      data: rows[0],
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
};
