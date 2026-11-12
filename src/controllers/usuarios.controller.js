// ============================================================
//  usuarios.controller.js  -  Lógica de cada endpoint
// ============================================================
// NOTA (Fase 3): por ahora los datos son TEMPORALES (un arreglo
// en memoria) para validar que el flujo ruta -> controlador
// funcione. En la Fase 6 se reemplazan por consultas reales a
// PostgreSQL.
// ============================================================

// Datos temporales de prueba
const usuarios = [
  { id: 1, nombre: 'Ana', apellido: 'Pérez', email: 'ana@ejemplo.com', telefono: '0999111222' },
  { id: 2, nombre: 'Luis', apellido: 'Gómez', email: 'luis@ejemplo.com', telefono: '0988333444' },
];

// POST /usuarios  ->  Crear un usuario
const crearUsuario = (req, res, next) => {
  try {
    const { nombre, apellido, email, telefono } = req.body;

    const nuevoUsuario = {
      id: usuarios.length + 1,
      nombre,
      apellido,
      email,
      telefono,
    };
    usuarios.push(nuevoUsuario);

    res.status(201).json({
      ok: true,
      mensaje: 'Usuario creado correctamente (datos temporales)',
      data: nuevoUsuario,
    });
  } catch (error) {
    next(error);
  }
};

// GET /usuarios  ->  Listar todos los usuarios
const obtenerUsuarios = (req, res, next) => {
  try {
    res.status(200).json({
      ok: true,
      mensaje: 'Lista de usuarios (datos temporales)',
      data: usuarios,
    });
  } catch (error) {
    next(error);
  }
};

// GET /usuarios/:id  ->  Obtener un usuario por su id
const obtenerUsuarioPorId = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: `No existe un usuario con el id ${req.params.id}`,
      });
    }

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario encontrado (datos temporales)',
      data: usuario,
    });
  } catch (error) {
    next(error);
  }
};

// PUT /usuarios/:id  ->  Actualizar un usuario
const actualizarUsuario = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const usuario = usuarios.find((u) => u.id === id);

    if (!usuario) {
      return res.status(404).json({
        ok: false,
        mensaje: `No existe un usuario con el id ${req.params.id}`,
      });
    }

    const { nombre, apellido, email, telefono } = req.body;
    usuario.nombre = nombre ?? usuario.nombre;
    usuario.apellido = apellido ?? usuario.apellido;
    usuario.email = email ?? usuario.email;
    usuario.telefono = telefono ?? usuario.telefono;

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario actualizado correctamente (datos temporales)',
      data: usuario,
    });
  } catch (error) {
    next(error);
  }
};

// DELETE /usuarios/:id  ->  Eliminar un usuario
const eliminarUsuario = (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const indice = usuarios.findIndex((u) => u.id === id);

    if (indice === -1) {
      return res.status(404).json({
        ok: false,
        mensaje: `No existe un usuario con el id ${req.params.id}`,
      });
    }

    const [eliminado] = usuarios.splice(indice, 1);

    res.status(200).json({
      ok: true,
      mensaje: 'Usuario eliminado correctamente (datos temporales)',
      data: eliminado,
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
