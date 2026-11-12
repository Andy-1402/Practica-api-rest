// ============================================================
//  errorHandler.js  -  Manejo centralizado de errores
// ============================================================
// Un middleware de error en Express se reconoce porque recibe
// CUATRO parámetros (err, req, res, next). Aquí llegan todos
// los errores enviados con next(error) y los que lanza Express.
//
// Traduce errores técnicos a respuestas JSON claras, SIN
// exponer detalles internos (stack trace) al cliente.
// ============================================================

const errorHandler = (err, req, res, next) => {
  // El detalle completo se registra solo en la consola del
  // servidor, que es donde el desarrollador puede verlo.
  console.error('Error capturado:', err.message);

  // --- JSON mal formado en el body -> 400 ---
  // express.json() lanza un SyntaxError cuando el body no es
  // un JSON válido (por ejemplo, una coma de más).
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      ok: false,
      mensaje: 'El JSON enviado en el body no es válido',
    });
  }

  // --- Violación de restricción UNIQUE -> 409 ---
  // PostgreSQL devuelve el código 23505 cuando se intenta
  // guardar un valor repetido en una columna UNIQUE (el email).
  if (err.code === '23505') {
    return res.status(409).json({
      ok: false,
      mensaje: 'El email ya está registrado',
    });
  }

  // --- Campo obligatorio nulo -> 400 ---
  if (err.code === '23502') {
    return res.status(400).json({
      ok: false,
      mensaje: 'Falta un campo obligatorio',
    });
  }

  // --- Cualquier otro error -> 500 ---
  res.status(500).json({
    ok: false,
    mensaje: 'Error interno del servidor',
  });
};

module.exports = errorHandler;
