// ============================================================
//  APLICACION PRINCIPAL DE VIAS CHOCO
//  Es un sitio PUBLICO de reportes: cualquiera puede entrar y ver
//  o crear reportes, sin necesidad de cuenta. El panel de
//  administrador esta escondido en un punto del pie de pagina.
// ============================================================

function App() {
  // ---------- Estados ----------
  // Al abrir mostramos la pantalla de bienvenida. Si ya entramos
  // en esta sesion del navegador, vamos directo a la app.
  var yaEntro = false;
  try { yaEntro = sessionStorage.getItem("entro") === "1"; } catch (e) {}

  var [vista, setVista] = React.useState(yaEntro ? "main" : "bienvenida");
  var [reportes, setReportes] = React.useState([]);
  var [alertas, setAlertas] = React.useState([]);
  var [admin, setAdmin] = React.useState(null); // administrador con sesion iniciada

  var [verMenu, setVerMenu] = React.useState(false);
  var [verReporte, setVerReporte] = React.useState(false);
  var [verLoginAdmin, setVerLoginAdmin] = React.useState(false);
  var [detalle, setDetalle] = React.useState(null);
  var [servidorOk, setServidorOk] = React.useState(false); // ¿el backend responde?
  var [clima, setClima] = React.useState({}); // clima en vivo de algunas vías

  var vias = window.DATOS.vias;
  var noticias = window.DATOS.noticias;

  // ---------- Al cargar ----------
  React.useEffect(function () {
    window.Api.inicializar();
    cargarDatos();
    cargarClima();
    // Revisar si el backend está encendido (para el indicador del panel)
    window.Api.hayServidor().then(function (ok) { setServidorOk(ok); });
  }, []);

  async function cargarDatos() {
    setReportes(await window.Api.listarReportes());
    setAlertas(await window.Api.listarAlertas());
  }

  // Traer el clima de las dos vías principales usando OpenWeather
  async function cargarClima() {
    if (!window.CONFIG || !window.CONFIG.OPENWEATHER_API_KEY) {
      setClima({});
      return;
    }

    var idsVias = [1, 2]; // Quibdó-Medellín y Quibdó-Pereira
    var resultado = {};
    for (var i = 0; i < idsVias.length; i++) {
      var via = vias.find(function (v) { return v.id === idsVias[i]; });
      if (!via) continue;
      try {
        var url =
          "https://api.openweathermap.org/data/2.5/weather?lat=" + via.lat +
          "&lon=" + via.lng + "&units=metric&lang=es&appid=" + window.CONFIG.OPENWEATHER_API_KEY;
        var res = await fetch(url);
        if (res.ok) resultado[via.id] = await res.json();
      } catch (e) {}
    }
    setClima(resultado);
  }

  // Color del vidrio según el clima
  function claseClima(w) {
    if (!w || !w.weather || !w.weather[0]) return "clima-neutral";
    var m = w.weather[0].main;
    if (m === "Rain" || m === "Drizzle" || m === "Thunderstorm") return "clima-lluvia";
    if (m === "Clear") return "clima-sol";
    if (m === "Clouds" || m === "Mist" || m === "Fog" || m === "Haze") return "clima-nubes";
    return "clima-neutral";
  }

  // Volver a cargar datos y revisar el servidor (botón "Actualizar" del panel)
  async function refrescar() {
    setServidorOk(await window.Api.hayServidor());
    await cargarDatos();
  }

  // ---------- Entrar a la app ----------
  function entrar() {
    try { sessionStorage.setItem("entro", "1"); } catch (e) {}
    setVista("main");
    window.scrollTo(0, 0);
  }

  // ---------- Navegacion ----------
  function navegar(seccion) {
    setVerMenu(false);

    // El punto del footer abre el acceso de administrador
    if (seccion === "acceso-admin") {
      abrirAdmin();
      return;
    }

    var vistasCompletas = ["legal", "terminos", "cookies", "reporte-abuso"];
    if (vistasCompletas.indexOf(seccion) !== -1) {
      setVista(seccion);
      window.scrollTo(0, 0);
      return;
    }

    // Bajar a una seccion dentro de la vista principal
    setVista("main");
    setTimeout(function () {
      var el = document.getElementById(seccion);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  }

  // ---------- Administrador ----------
  function abrirAdmin() {
    if (admin) {
      setVista("admin"); // ya inicio sesion antes
      window.scrollTo(0, 0);
    } else {
      // Volvemos a la vista principal para que se pueda mostrar el
      // modal de acceso (aunque estemos en una pagina legal).
      setVista("main");
      setVerLoginAdmin(true);
    }
  }

  async function loginAdmin(email, clave) {
    var resultado = await window.Api.login(email, clave);
    if (!resultado.ok) return resultado.mensaje;
    if (resultado.usuario.rol !== "admin") {
      return "Esta cuenta no tiene permisos de administrador.";
    }
    setAdmin(resultado.usuario);
    setVerLoginAdmin(false);
    setVista("admin");
    return true;
  }

  function salirPanel() {
    setAdmin(null); // cerramos la sesion del admin
    setVista("main");
    window.scrollTo(0, 0);
  }

  // ---------- Reportes ----------
  async function crearReporte(datos) {
    var nuevo = Object.assign({}, datos, {
      id: Date.now(),
      aprobado: true, // se muestra al instante
      fecha: new Date().toISOString(),
    });
    await window.Api.crearReporte(nuevo);
    setReportes(function (lista) { return [nuevo].concat(lista); });
    setVerReporte(false);
    alert("¡Gracias! Tu reporte fue publicado.");
  }

  async function aprobarReporte(id) {
    setReportes(await window.Api.actualizarReporte(id, { aprobado: true }));
  }

  async function eliminarReporte(id) {
    setReportes(await window.Api.eliminarReporte(id));
  }

  // ---------- Calculos ----------
  // Aplicamos los reportes aprobados para actualizar el estado de las vias
  function calcularVias() {
    return vias.map(function (via) {
      var deEstaVia = reportes.filter(function (r) { return r.titulo === via.titulo && r.aprobado; });
      if (deEstaVia.length === 0) return via;
      var peor = via.estado;
      deEstaVia.forEach(function (r) {
        if (r.estado === "Cerrada") peor = "Cerrada";
        else if (r.estado === "Mala" && peor !== "Cerrada") peor = "Mala";
        else if (r.estado === "Regular" && peor !== "Cerrada" && peor !== "Mala") peor = "Regular";
      });
      return Object.assign({}, via, { estado: peor });
    });
  }
  var viasActualizadas = calcularVias();

  function contar(estado) {
    var total = 0;
    viasActualizadas.forEach(function (v) { if (v.estado === estado) total++; });
    return total;
  }
  var conteo = { Buena: contar("Buena"), Regular: contar("Regular"), Mala: contar("Mala"), Cerrada: contar("Cerrada") };

  function riesgoGeneral() {
    var malas = conteo.Mala + conteo.Cerrada;
    if (malas >= 2) return { texto: "Riesgo alto", clase: "badge-cerrada" };
    if (malas === 1 || conteo.Regular >= 3) return { texto: "Riesgo medio", clase: "badge-regular" };
    return { texto: "Riesgo bajo", clase: "badge-buena" };
  }
  var riesgo = riesgoGeneral();

  var reportesRecientes = reportes.filter(function (r) { return r.aprobado; }).slice(0, 6);
  var alertasRecientes = alertas.slice(0, 3);

  // Devuelve la clase del badge segun el estado (se usa en varias tarjetas)
  function claseBadge(estado) {
    if (estado === "Regular") return "badge badge-regular";
    if (estado === "Mala") return "badge badge-mala";
    if (estado === "Cerrada") return "badge badge-cerrada";
    return "badge badge-buena";
  }

  // Devuelve la clase de la tarjeta oscura con resplandor segun el estado
  function claseCard(estado) {
    if (estado === "Regular") return "card-estado est-regular";
    if (estado === "Mala") return "card-estado est-mala";
    if (estado === "Cerrada") return "card-estado est-cerrada";
    return "card-estado est-buena";
  }

  // ============================================================
  //  PANTALLA DE BIENVENIDA (entrada publica)
  // ============================================================
  if (vista === "bienvenida") {
    return (
      <div className="entrada">
        <div className="entrada-fondo" style={{ backgroundImage: "url('img/logo.jpeg')" }}></div>
        <div className="entrada-velo"></div>

        <div className="relative z-10 w-full max-w-6xl mx-auto px-5 grid gap-10 lg:grid-cols-2 items-center">
          {/* Izquierda: bienvenida */}
          <div className="entrada-contenido aparece text-center lg:text-left">
            <img src="img/logoviaa.png" alt="Vías Chocó" className="entrada-logo lg:mx-0" />
            <h1>Vías del <span>Chocó</span></h1>
            <p className="lg:mx-0">Consulta y reporta el estado de las carreteras del Chocó en tiempo real. Sin registros: entra y participa.</p>

            <div className="entrada-chips lg:justify-start">
              <span className="chip">🛣️ {vias.length} vías monitoreadas</span>
              <span className="chip">📍 {reportes.length} reportes</span>
              <span className="chip">⚠️ {alertas.length} alertas activas</span>
            </div>

            <window.DeslizarEntrar onEntrar={entrar} />
          </div>

          {/* Derecha: plugin del clima (vidrio con color según el tiempo) */}
          <div className="w-full max-w-md mx-auto lg:mx-0 aparece">
            <div className="mb-4 text-center lg:text-left">
              <p className="text-xs uppercase tracking-widest text-white/70">Clima en tiempo real</p>
              <h2 className="text-xl font-bold text-white">Estado de rutas clave</h2>
            </div>
            <div className="space-y-4">
              {[1, 2].map(function (id) {
                var via = vias.find(function (v) { return v.id === id; });
                var w = clima[id];
                return (
                  <div key={id} className={"clima-card " + claseClima(w)}>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-widest text-slate-500">{via.desde} → {via.hasta}</p>
                        <h3 className="font-bold text-carbon-900 mt-1">{via.titulo}</h3>
                        <p className="text-sm text-slate-500 mt-1 capitalize">{w ? w.weather[0].description : "Datos locales"}</p>
                      </div>
                      <p className="text-4xl font-extrabold text-carbon-900">{w ? Math.round(w.main.temp) + "°" : via.temperatura + "°"}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2 mt-4">
                      <div className="mini-clima"><p className="text-xs font-semibold text-carbon-900">💧 Humedad</p><p className="text-xs text-slate-500 mt-1">{w ? w.main.humidity : via.humedad}%</p></div>
                      <div className="mini-clima"><p className="text-xs font-semibold text-carbon-900">💨 Viento</p><p className="text-xs text-slate-500 mt-1">{w ? w.wind.speed + " m/s" : "—"}</p></div>
                      <div className="mini-clima"><p className="text-xs font-semibold text-carbon-900">🌡️ Presión</p><p className="text-xs text-slate-500 mt-1">{w ? w.main.pressure : "—"}</p></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============================================================
  //  PANEL DE ADMINISTRADOR
  // ============================================================
  if (vista === "admin" && admin) {
    return (
      <window.AdminPanel
        reportes={reportes}
        vias={viasActualizadas}
        alertas={alertas}
        adminName={admin.nombre}
        servidorOk={servidorOk}
        onRefrescar={refrescar}
        onClose={salirPanel}
        onAprobarReporte={aprobarReporte}
        onEliminarReporte={eliminarReporte}
      />
    );
  }

  // ============================================================
  //  PAGINAS LEGALES
  // ============================================================
  if (vista === "legal") return <window.LegalPage onNavigate={navegar} />;
  if (vista === "terminos") return <window.TerminosCondicionesPage onNavigate={navegar} />;
  if (vista === "cookies") return <window.CookiesPage onNavigate={navegar} />;
  if (vista === "reporte-abuso") return <window.ReporteAbusoPage onNavigate={navegar} />;

  // ============================================================
  //  VISTA PRINCIPAL (app publica de reportes)
  // ============================================================
  return (
    <div className="min-h-screen">
      <window.Header
        showMenu={verMenu}
        setShowMenu={setVerMenu}
        onNavigate={navegar}
        onReportar={function () { setVerReporte(true); }}
      />

      <main id="inicio-seccion" className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-16 space-y-24">
        {/* ---------- PANORAMA (estado general, ancho completo) ---------- */}
        <section className="scroll-mt full-bleed">
          <div className="full-bleed-inner">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <span className="etiqueta-seccion">Estado general</span>
              <h2 className="titulo-seccion mt-3">Panorama de las vías hoy</h2>
            </div>
            <span className={"badge " + riesgo.clase + " text-sm px-4 py-2"}>Nivel: {riesgo.texto}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <div className="card-estado est-buena">
              <div className="flex items-center gap-2"><span className="punto punto-buena"></span><p className="text-sm text-slate-500">Vías buenas</p></div>
              <p className="numero-grande text-selva-700 mt-3">{conteo.Buena}</p>
              <p className="text-xs text-slate-400 mt-2">Seguras para circular</p>
            </div>
            <div className="card-estado est-regular">
              <div className="flex items-center gap-2"><span className="punto punto-regular"></span><p className="text-sm text-slate-500">Vías regulares</p></div>
              <p className="numero-grande mt-3" style={{ color: "#b45309" }}>{conteo.Regular}</p>
              <p className="text-xs text-slate-400 mt-2">Circular con precaución</p>
            </div>
            <div className="card-estado est-mala">
              <div className="flex items-center gap-2"><span className="punto punto-mala"></span><p className="text-sm text-slate-500">Vías malas</p></div>
              <p className="numero-grande mt-3" style={{ color: "#c2410c" }}>{conteo.Mala}</p>
              <p className="text-xs text-slate-400 mt-2">Alto riesgo</p>
            </div>
            <div className="card-estado est-cerrada">
              <div className="flex items-center gap-2"><span className="punto punto-cerrada"></span><p className="text-sm text-slate-500">Vías cerradas</p></div>
              <p className="numero-grande mt-3" style={{ color: "#b91c1c" }}>{conteo.Cerrada}</p>
              <p className="text-xs text-slate-400 mt-2">No disponibles</p>
            </div>
          </div>
          </div>
        </section>

        {/* ---------- MAPA + NOTICIAS + ALERTAS ---------- */}
        <section id="seccion-mapa" className="scroll-mt full-bleed">
          <div className="full-bleed-inner">
          <div className="text-center mb-10">
            <span className="etiqueta-seccion">En tiempo real</span>
            <h2 className="titulo-seccion mt-3">Mapa del estado de las vías</h2>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto">Reportes de la comunidad y alertas de sensores en todo el Chocó.</p>
          </div>

          {/* Banda ancha con paneles de vidrio */}
          <div className="mapa-zona">
            <div className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)_340px]">
              {/* Noticias de Facebook */}
              <div className="panel-vidrio p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2"><span>📰</span> Noticias</h3>
                <div className="space-y-3 max-h-[520px] overflow-y-auto scroll-suave pr-1">
                  {noticias.map(function (n) {
                    return (
                      <a key={n.id} href={n.enlace} target="_blank" rel="noreferrer" className="noticia">
                        <p className="text-xs uppercase tracking-widest text-selva-600 font-semibold mb-1">{n.fuente}</p>
                        <p className="font-semibold text-carbon-900 text-sm leading-snug">{n.titulo}</p>
                        <p className="text-xs text-slate-500 mt-1">{n.resumen}</p>
                        <p className="text-xs text-slate-400 mt-2">{n.tiempo}</p>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Mapa + leyenda */}
              <div className="space-y-5">
                <div className="panel-vidrio p-2">
                  <div className="marco-mapa">
                    <window.MapComponent reportes={reportes} alertas={alertas} />
                  </div>
                </div>
                <div className="panel-vidrio p-5">
                  <h3 className="font-bold mb-3">Leyenda</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2"><span className="punto punto-buena"></span> Vía buena</div>
                    <div className="flex items-center gap-2"><span className="punto punto-regular"></span> Vía regular</div>
                    <div className="flex items-center gap-2"><span className="punto punto-mala"></span> Vía mala</div>
                    <div className="flex items-center gap-2"><span className="punto punto-cerrada"></span> Cerrada / Alerta</div>
                  </div>
                </div>
              </div>

              {/* Alertas GeoSentinel */}
              <div className="panel-vidrio p-5">
                <h3 className="font-bold mb-4 flex items-center gap-2"><span>⚠️</span> Alertas GeoSentinel</h3>
                <div className="space-y-3 max-h-[520px] overflow-y-auto scroll-suave pr-1">
                  {alertasRecientes.length === 0 && (
                    <div className="noticia text-sm text-slate-500 text-center">Sin alertas por ahora.</div>
                  )}
                  {alertasRecientes.map(function (a) {
                    return (
                      <button key={a.id} onClick={function () { setDetalle(a); }} className="alerta-item">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-semibold text-carbon-900 text-sm">{a.ubicacion}</p>
                          <span className="badge badge-cerrada">{a.estado}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">{a.resumen}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          </div>
        </section>

        {/* ---------- REPORTES ---------- */}
        <section id="seccion-reportes" className="scroll-mt">
          <div className="text-center mb-10">
            <span className="etiqueta-seccion">Reportes de la comunidad</span>
            <h2 className="titulo-seccion mt-3">Últimos reportes</h2>
          </div>

          <div className="flex justify-center mb-10">
            <button onClick={function () { setVerReporte(true); }} className="boton-primario text-base">+ Hacer un reporte</button>
          </div>

          {reportesRecientes.length === 0 ? (
            <div className="tarjeta p-10 text-center text-slate-500">Todavía no hay reportes. ¡Sé el primero en publicar uno!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportesRecientes.map(function (reporte) {
                return (
                  <button key={reporte.id} onClick={function () { setDetalle(reporte); }} className={claseCard(reporte.estado) + " w-full text-left"}>
                    <div className="flex items-center justify-between mb-4">
                      <span className={claseBadge(reporte.estado)}>{reporte.estado}</span>
                      <span className="text-xs text-slate-500">{reporte.autor}</span>
                    </div>
                    <h3 className="font-bold text-carbon-900 mb-1">{reporte.titulo}</h3>
                    <p className="text-sm text-slate-500 mb-3">📍 {reporte.ubicacion || "Sin ubicación"}</p>
                    <p className="text-sm text-slate-600 line-clamp-2">{reporte.descripcion}</p>
                  </button>
                );
              })}
            </div>
          )}
        </section>

        {/* ---------- ESTADO DE LAS VIAS ---------- */}
        <section id="seccion-vias" className="scroll-mt">
          <div className="text-center mb-10">
            <span className="etiqueta-seccion">Monitoreo vial</span>
            <h2 className="titulo-seccion mt-3">Estado de las vías</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {viasActualizadas.map(function (via) {
              return (
                <div key={via.id} className={claseCard(via.estado)}>
                  <div className="flex items-start justify-between gap-3 mb-5">
                    <div>
                      <h3 className="font-bold text-carbon-900 leading-snug">{via.titulo}</h3>
                      <p className="text-xs text-slate-400 mt-1">{via.desde} → {via.hasta} · {via.km}</p>
                    </div>
                    <span className={claseBadge(via.estado)}>{via.estado}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="mini-dato"><p className="t">💧 Humedad</p><p className="v">{via.humedad}%</p></div>
                    <div className="mini-dato"><p className="t">🌡️ Temp.</p><p className="v">{via.temperatura}°C</p></div>
                    <div className="mini-dato"><p className="t">🌧️ Lluvia</p><p className="v">{via.precipitacion}%</p></div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- FUNCIONES ---------- */}
        <section id="seccion-funciones" className="scroll-mt">
          <div className="text-center mb-12">
            <span className="etiqueta-seccion">Características</span>
            <h2 className="titulo-seccion mt-3">¿Qué hace Vías Chocó?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icono: "🛰️", titulo: "Información en tiempo real", texto: "El estado de las carreteras con reportes de la comunidad." },
              { icono: "🤝", titulo: "Reportes sin cuenta", texto: "Cualquiera puede reportar en segundos, sin registrarse." },
              { icono: "🗺️", titulo: "Mapa interactivo", texto: "Todas las alertas y reportes en un mapa del Chocó." },
              { icono: "🔔", titulo: "Alertas de sensores", texto: "Avisos de riesgo por humedad e inclinación del terreno." },
              { icono: "📰", titulo: "Noticias viales", texto: "Novedades de redes sociales sobre las vías de la región." },
              { icono: "🌿", titulo: "Hecho para el Chocó", texto: "Pensado para la realidad del Pacífico colombiano." },
            ].map(function (f) {
              return (
                <div key={f.titulo} className="vidrio-claro vidrio-hover vidrio-glow p-8 text-center">
                  <div className="text-4xl mb-4">{f.icono}</div>
                  <h3 className="font-bold text-carbon-900 mb-2">{f.titulo}</h3>
                  <p className="text-sm text-slate-500">{f.texto}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------- SOBRE NOSOTROS + EQUIPO ---------- */}
        <window.AboutSection />
      </main>

      <window.Footer onNavigate={navegar} />

      {/* Ventanas emergentes */}
      {verReporte && (
        <window.ReporteModal
          vias={vias}
          onClose={function () { setVerReporte(false); }}
          onCrear={crearReporte}
        />
      )}
      {verLoginAdmin && (
        <window.LoginModal
          onClose={function () { setVerLoginAdmin(false); }}
          onLogin={loginAdmin}
        />
      )}
      {detalle && <window.ReportDetailsModal dato={detalle} onClose={function () { setDetalle(null); }} />}
    </div>
  );
}

// Dibujar la aplicacion en la pagina
ReactDOM.createRoot(document.getElementById("aplicacion")).render(<App />);
