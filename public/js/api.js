// ============================================================
//  API (conexion con el backend)
//  Estas funciones piden y guardan datos en el servidor.
//  Si el servidor no responde (o tarda mucho), usamos
//  localStorage (memoria del navegador) para que la aplicacion
//  siga funcionando igual de rapido.
// ============================================================

window.Api = (function () {
  var base = window.CONFIG.API_BASE_URL;

  // ---------- fetch con tiempo limite ----------
  // Si el servidor tarda mas de "ms" milisegundos, cancelamos y
  // usamos los datos locales. Asi la pagina nunca se queda pegada.
  function fetchConTiempo(url, opciones, ms) {
    opciones = opciones || {};
    ms = ms || 3500;
    var control = new AbortController();
    var id = setTimeout(function () { control.abort(); }, ms);
    var config = Object.assign({}, opciones, { signal: control.signal });
    return fetch(url, config).finally(function () { clearTimeout(id); });
  }

  // ---------- Ayudas para localStorage ----------
  function leerLocal(clave, porDefecto) {
    try {
      var texto = localStorage.getItem(clave);
      if (texto) return JSON.parse(texto);
    } catch (e) {}
    return porDefecto;
  }

  function guardarLocal(clave, valor) {
    try {
      localStorage.setItem(clave, JSON.stringify(valor));
    } catch (e) {}
  }

  // La primera vez sembramos los datos demo en localStorage
  function inicializar() {
    if (!localStorage.getItem("usuarios")) guardarLocal("usuarios", window.DATOS.usuariosDemo);
    if (!localStorage.getItem("reportes")) guardarLocal("reportes", window.DATOS.reportesDemo);
    if (!localStorage.getItem("alertas")) guardarLocal("alertas", window.DATOS.alertasDemo);
  }

  // ---------- Saber si el servidor esta encendido ----------
  async function hayServidor() {
    try {
      var respuesta = await fetchConTiempo(base + "/api/salud", {}, 2500);
      return respuesta.ok;
    } catch (e) {
      return false;
    }
  }

  // ---------- REPORTES ----------
  async function listarReportes() {
    try {
      var respuesta = await fetchConTiempo(base + "/api/reportes");
      if (respuesta.ok) {
        var lista = await respuesta.json();
        guardarLocal("reportes", lista);
        return lista;
      }
    } catch (e) {}
    return leerLocal("reportes", []);
  }

  async function crearReporte(reporte) {
    var locales = leerLocal("reportes", []);
    locales.unshift(reporte);
    guardarLocal("reportes", locales);
    try {
      await fetchConTiempo(base + "/api/reportes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reporte),
      });
    } catch (e) {}
    return reporte;
  }

  async function actualizarReporte(id, cambios) {
    var locales = leerLocal("reportes", []);
    locales = locales.map(function (r) {
      if (r.id === id) return Object.assign({}, r, cambios);
      return r;
    });
    guardarLocal("reportes", locales);
    try {
      await fetchConTiempo(base + "/api/reportes/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cambios),
      });
    } catch (e) {}
    return locales;
  }

  async function eliminarReporte(id) {
    var locales = leerLocal("reportes", []);
    locales = locales.filter(function (r) { return r.id !== id; });
    guardarLocal("reportes", locales);
    try {
      await fetchConTiempo(base + "/api/reportes/" + id, { method: "DELETE" });
    } catch (e) {}
    return locales;
  }

  // ---------- ALERTAS (sensores) ----------
  async function listarAlertas() {
    try {
      var respuesta = await fetchConTiempo(base + "/api/alertas");
      if (respuesta.ok) {
        var lista = await respuesta.json();
        guardarLocal("alertas", lista);
        return lista;
      }
    } catch (e) {}
    return leerLocal("alertas", []);
  }

  // ---------- USUARIOS ----------
  function listarUsuarios() {
    return leerLocal("usuarios", []);
  }

  async function login(email, clave) {
    email = String(email || "").toLowerCase();
    // Intentamos primero con el servidor
    try {
      var respuesta = await fetchConTiempo(base + "/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, clave: clave }),
      });
      if (respuesta.ok) {
        return { ok: true, usuario: await respuesta.json() };
      }
    } catch (e) {}

    // Si no hay servidor, revisamos los usuarios locales
    var usuarios = leerLocal("usuarios", []);
    var encontrado = usuarios.find(function (u) {
      return String(u.email).toLowerCase() === email;
    });
    if (!encontrado) return { ok: false, mensaje: "Correo no registrado. Regístrate primero." };
    if (encontrado.bloqueado) return { ok: false, mensaje: "Esta cuenta está bloqueada." };
    if (encontrado.clave !== clave) return { ok: false, mensaje: "Contraseña incorrecta." };
    return { ok: true, usuario: { nombre: encontrado.nombre, email: encontrado.email, rol: encontrado.rol } };
  }

  async function registrar(nombre, email, clave) {
    email = String(email || "").toLowerCase();
    var usuarios = leerLocal("usuarios", []);

    var yaExiste = usuarios.find(function (u) {
      return String(u.email).toLowerCase() === email;
    });
    if (yaExiste) return { ok: false, mensaje: "Ese correo ya está registrado." };

    // Si el correo termina en .admin lo hacemos administrador
    var rol = email.endsWith(".admin") ? "admin" : "usuario";
    var nuevo = { nombre: nombre, email: email, clave: clave, rol: rol, bloqueado: false };

    usuarios.push(nuevo);
    guardarLocal("usuarios", usuarios);

    try {
      await fetchConTiempo(base + "/api/usuarios/registro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre, email: email, clave: clave }),
      });
    } catch (e) {}

    return { ok: true, usuario: { nombre: nombre, email: email, rol: rol } };
  }

  async function actualizarUsuario(email, cambios) {
    email = String(email || "").toLowerCase();
    var usuarios = leerLocal("usuarios", []);
    usuarios = usuarios.map(function (u) {
      if (String(u.email).toLowerCase() === email) return Object.assign({}, u, cambios);
      return u;
    });
    guardarLocal("usuarios", usuarios);
    try {
      await fetchConTiempo(base + "/api/usuarios/" + email, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cambios),
      });
    } catch (e) {}
    return usuarios;
  }

  async function eliminarUsuario(email) {
    email = String(email || "").toLowerCase();
    var usuarios = leerLocal("usuarios", []);
    usuarios = usuarios.filter(function (u) {
      return String(u.email).toLowerCase() !== email;
    });
    guardarLocal("usuarios", usuarios);
    try {
      await fetchConTiempo(base + "/api/usuarios/" + email, { method: "DELETE" });
    } catch (e) {}
    return usuarios;
  }

  return {
    inicializar: inicializar,
    hayServidor: hayServidor,
    listarReportes: listarReportes,
    crearReporte: crearReporte,
    actualizarReporte: actualizarReporte,
    eliminarReporte: eliminarReporte,
    listarAlertas: listarAlertas,
    listarUsuarios: listarUsuarios,
    login: login,
    registrar: registrar,
    actualizarUsuario: actualizarUsuario,
    eliminarUsuario: eliminarUsuario,
  };
})();
