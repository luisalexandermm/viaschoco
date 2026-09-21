// ============================================================
//  CONFIGURACION GENERAL
//  Direcciones que se usan en varios lugares de la aplicacion.
// ============================================================

// Detectamos si estamos trabajando en el computador local
var esLocal =
  window.location.hostname === "localhost" ||
  window.location.hostname === "127.0.0.1";

window.CONFIG = {
  // Direccion del backend. En local usa el puerto 3001,
  // y en internet usa el servidor publicado.
  API_BASE_URL: esLocal
    ? "http://localhost:3001"
    : "https://viaschoco-backend.onrender.com",

  // La clave se configura fuera del frontend publico.
  OPENWEATHER_API_KEY: "",
};
