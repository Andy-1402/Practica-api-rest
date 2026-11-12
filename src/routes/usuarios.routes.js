// ============================================================
//  usuarios.routes.js  -  Rutas del recurso "usuarios"
// ============================================================
// Define QUÉ ruta responde a QUÉ controlador.
// Este router se monta en app.js bajo el prefijo /usuarios.
// ============================================================

const { Router } = require('express');
const {
  crearUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} = require('../controllers/usuarios.controller');

const router = Router();

router.post('/', crearUsuario);            // POST   /usuarios
router.get('/', obtenerUsuarios);          // GET    /usuarios
router.get('/:id', obtenerUsuarioPorId);   // GET    /usuarios/:id
router.put('/:id', actualizarUsuario);     // PUT    /usuarios/:id
router.delete('/:id', eliminarUsuario);    // DELETE /usuarios/:id

module.exports = router;
