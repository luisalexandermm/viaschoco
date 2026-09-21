// ============================================================
//  BASE DE DATOS EN ARCHIVO JSON
//  Aqui guardamos y leemos la informacion en un archivo llamado
//  db.json. No usamos ningun motor de base de datos externo para
//  que el proyecto sea facil de correr en cualquier computador.
// ============================================================

const fs = require("fs");
const path = require("path");

// Ruta del archivo donde se guarda todo
const rutaArchivo = path.join(__dirname, "data", "db.json");

// Si por alguna razon el archivo no existe, empezamos con datos vacios
const datosPorDefecto = {
  usuarios: [],
  reportes: [],
  alertas: [],
};

// --- Leer toda la base de datos ---
function leerBaseDeDatos() {
  try {
    const contenido = fs.readFileSync(rutaArchivo, "utf8");
    return JSON.parse(contenido);
  } catch (error) {
    console.log("No se pudo leer db.json, se usan datos vacios.");
    return datosPorDefecto;
  }
}

// --- Guardar toda la base de datos ---
function guardarBaseDeDatos(datos) {
  try {
    // El "null, 2" es solo para que el archivo quede ordenado y facil de leer
    fs.writeFileSync(rutaArchivo, JSON.stringify(datos, null, 2), "utf8");
    return true;
  } catch (error) {
    console.log("Error al guardar en db.json:", error.message);
    return false;
  }
}

// Exportamos las dos funciones para usarlas en server.js
module.exports = {
  leerBaseDeDatos,
  guardarBaseDeDatos,
};
