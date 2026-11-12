// ============================================================
//  notFound.js  -  Middleware para rutas inexistentes (404)
// ============================================================
// Se ejecuta cuando ninguna ruta anterior coincidió con la
// petición. Responde siempre en JSON (no en HTML).
// ============================================================

const notFound = (req, res) => {
  res.status(404).json({
    ok: false,
    mensaje: `La ruta ${req.method} ${req.originalUrl} no existe en esta API`,
  });
};

module.exports = notFound;
