// ============================================================
//  SERVIDOR DE VIAS CHOCO
//  Servidor sencillo hecho con Express.
//  Guarda usuarios, reportes y alertas en un archivo JSON.
//  Para correrlo:   npm install   y luego   npm start
// ============================================================

const express = require("express");
const cors = require("cors");
const path = require("path");
const { leerBaseDeDatos, guardarBaseDeDatos } = require("./basededatos");

const app = express();
const PUERTO = process.env.PORT || 3001;

// --- Middlewares (configuracion basica) ---
app.use(cors()); // permite que el frontend pueda pedir datos
app.use(express.json({ limit: "25mb" })); // 25mb para que quepan fotos/videos

// Tambien servimos el frontend (la carpeta public) desde el mismo servidor
app.use(express.static(path.join(__dirname, "..", "public")));

// Funcion pequena para crear un id nuevo (numero unico)
function crearId() {
  return Date.now();
}

// ============================================================
//  RUTA DE SALUD (para saber si el servidor esta encendido)
// ============================================================
app.get("/api/salud", function (req, res) {
  res.json({ estado: "ok", mensaje: "Servidor de Vias Choco funcionando" });
});

// ============================================================
//  REPORTES
// ============================================================

// Listar todos los reportes
app.get("/api/reportes", function (req, res) {
  const datos = leerBaseDeDatos();
  res.json(datos.reportes);
});

// Crear un reporte nuevo
app.post("/api/reportes", function (req, res) {
  const datos = leerBaseDeDatos();

  const nuevoReporte = {
    id: crearId(),
    via: req.body.via || "",
    titulo: req.body.titulo || "Reporte",
    estado: req.body.estado || "Regular",
    zona: req.body.zona || "",
    ubicacion: req.body.ubicacion || "",
    descripcion: req.body.descripcion || "",
    recomendacion: req.body.recomendacion || "",
    autor: req.body.autor || "Usuario",
    archivos: req.body.archivos || [],
    lat: req.body.lat || null,
    lng: req.body.lng || null,
    // El frontend envia el reporte ya aprobado para que se vea al instante.
    // Si algun dia se quiere moderar, basta con cambiar esto a false.
    aprobado: req.body.aprobado === true,
    fecha: new Date().toISOString(),
  };

  datos.reportes.unshift(nuevoReporte); // lo agregamos al inicio de la lista
  guardarBaseDeDatos(datos);
  res.status(201).json(nuevoReporte);
});

// Actualizar un reporte (por ejemplo aprobarlo)
app.put("/api/reportes/:id", function (req, res) {
  const datos = leerBaseDeDatos();
  const id = Number(req.params.id);

  let encontrado = null;
  datos.reportes = datos.reportes.map(function (reporte) {
    if (reporte.id === id) {
      encontrado = Object.assign(reporte, req.body); // mezclamos los cambios
      return encontrado;
    }
    return reporte;
  });

  if (!encontrado) {
    return res.status(404).json({ mensaje: "Reporte no encontrado" });
  }

  guardarBaseDeDatos(datos);
  res.json(encontrado);
});

// Eliminar un reporte
app.delete("/api/reportes/:id", function (req, res) {
  const datos = leerBaseDeDatos();
  const id = Number(req.params.id);

  const cantidadAntes = datos.reportes.length;
  datos.reportes = datos.reportes.filter(function (reporte) {
    return reporte.id !== id;
  });

  if (datos.reportes.length === cantidadAntes) {
    return res.status(404).json({ mensaje: "Reporte no encontrado" });
  }

  guardarBaseDeDatos(datos);
  res.json({ mensaje: "Reporte eliminado" });
});

// ============================================================
//  USUARIOS
// ============================================================

// Listar usuarios (sin mostrar la contrasena)
app.get("/api/usuarios", function (req, res) {
  const datos = leerBaseDeDatos();
  const usuariosSinClave = datos.usuarios.map(function (usuario) {
    return {
      nombre: usuario.nombre,
      email: usuario.email,
      rol: usuario.rol,
      bloqueado: usuario.bloqueado,
    };
  });
  res.json(usuariosSinClave);
});

// Registrar un usuario nuevo
app.post("/api/usuarios/registro", function (req, res) {
  const datos = leerBaseDeDatos();
  const email = String(req.body.email || "").toLowerCase();
  const nombre = req.body.nombre || "";
  const clave = req.body.clave || "";

  if (!nombre || !email || !clave) {
    return res.status(400).json({ mensaje: "Faltan datos" });
  }

  // Revisar que el correo no este repetido
  const yaExiste = datos.usuarios.find(function (usuario) {
    return usuario.email === email;
  });
  if (yaExiste) {
    return res.status(400).json({ mensaje: "Ese correo ya esta registrado" });
  }

  // Si el correo termina en .admin lo marcamos como administrador
  const esAdmin = email.endsWith(".admin");

  const nuevoUsuario = {
    nombre: nombre,
    email: email,
    clave: clave,
    rol: esAdmin ? "admin" : "usuario",
    bloqueado: false,
  };

  datos.usuarios.push(nuevoUsuario);
  guardarBaseDeDatos(datos);

  res.status(201).json({
    nombre: nuevoUsuario.nombre,
    email: nuevoUsuario.email,
    rol: nuevoUsuario.rol,
  });
});

// Iniciar sesion
app.post("/api/usuarios/login", function (req, res) {
  const datos = leerBaseDeDatos();
  const email = String(req.body.email || "").toLowerCase();
  const clave = req.body.clave || "";

  const usuario = datos.usuarios.find(function (u) {
    return u.email === email;
  });

  if (!usuario) {
    return res.status(404).json({ mensaje: "Correo no registrado" });
  }
  if (usuario.bloqueado) {
    return res.status(403).json({ mensaje: "Esta cuenta esta bloqueada" });
  }
  if (usuario.clave !== clave) {
    return res.status(401).json({ mensaje: "Contrasena incorrecta" });
  }

  res.json({
    nombre: usuario.nombre,
    email: usuario.email,
    rol: usuario.rol,
  });
});

// Actualizar un usuario (bloquear o desbloquear)
app.put("/api/usuarios/:email", function (req, res) {
  const datos = leerBaseDeDatos();
  const email = String(req.params.email || "").toLowerCase();

  let encontrado = null;
  datos.usuarios = datos.usuarios.map(function (usuario) {
    if (usuario.email === email) {
      encontrado = Object.assign(usuario, req.body);
      return encontrado;
    }
    return usuario;
  });

  if (!encontrado) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  guardarBaseDeDatos(datos);
  res.json({ nombre: encontrado.nombre, email: encontrado.email, bloqueado: encontrado.bloqueado });
});

// Eliminar un usuario
app.delete("/api/usuarios/:email", function (req, res) {
  const datos = leerBaseDeDatos();
  const email = String(req.params.email || "").toLowerCase();

  const cantidadAntes = datos.usuarios.length;
  datos.usuarios = datos.usuarios.filter(function (usuario) {
    return usuario.email !== email;
  });

  if (datos.usuarios.length === cantidadAntes) {
    return res.status(404).json({ mensaje: "Usuario no encontrado" });
  }

  guardarBaseDeDatos(datos);
  res.json({ mensaje: "Usuario eliminado" });
});

// ============================================================
//  ALERTAS (sensores / GeoSentinel)
// ============================================================
app.get("/api/alertas", function (req, res) {
  const datos = leerBaseDeDatos();
  res.json(datos.alertas || []);
});

// ============================================================
//  ENCENDER EL SERVIDOR
// ============================================================
app.listen(PUERTO, function () {
  console.log("====================================");
  console.log("  Servidor de Vias Choco encendido");
  console.log("  http://localhost:" + PUERTO);
  console.log("====================================");
});
