// ============================================================
//  errorHandler.js  -  Manejo centralizado de errores
// ============================================================
// Un middleware de error en Express se reconoce porque recibe
// CUATRO parámetros (err, req, res, next). Aquí llegan todos
// los errores enviados con next(error).
// ============================================================

const errorHandler = (err, req, res, next) => {
  // Se registra el error completo en la consola del servidor
  // (útil para depurar), pero NO se envía al cliente.
  console.error('Error no controlado:', err);

  res.status(500).json({
    ok: false,
    mensaje: 'Error interno del servidor',
  });
};

module.exports = errorHandler;
