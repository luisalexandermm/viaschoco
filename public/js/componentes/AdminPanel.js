// ============================================================
//  PANEL DE ADMINISTRACION  (rediseño con barra lateral + gráficas)
//  Todo se conecta al backend a través de window.Api:
//    - los datos (reportes, vías, alertas) llegan como props
//    - aprobar/eliminar guardan en el servidor y en el navegador
//  Las gráficas están hechas con SVG puro (sin librerías externas).
// ============================================================

// ---- Gráfica de dona: aprobados vs pendientes ----
function GraficaDona(props) {
  var aprobados = props.aprobados || 0;
  var pendientes = props.pendientes || 0;
  var total = aprobados + pendientes;

  var r = 54;
  var C = 2 * Math.PI * r;               // circunferencia
  var largoAprob = total ? (aprobados / total) * C : 0;
  var largoPend = total ? (pendientes / total) * C : 0;

  return (
    <div className="flex items-center gap-6">
      <svg viewBox="0 0 140 140" className="w-36 h-36 flex-shrink-0">
        <circle cx="70" cy="70" r={r} fill="none" stroke="#eae7df" strokeWidth="16" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#16a34a" strokeWidth="16" strokeLinecap="round"
          strokeDasharray={largoAprob + " " + (C - largoAprob)} transform="rotate(-90 70 70)" />
        <circle cx="70" cy="70" r={r} fill="none" stroke="#f59e0b" strokeWidth="16" strokeLinecap="round"
          strokeDasharray={largoPend + " " + (C - largoPend)} strokeDashoffset={-largoAprob} transform="rotate(-90 70 70)" />
        <text x="70" y="66" textAnchor="middle" fontSize="26" fontWeight="800" fill="#16201a">{total}</text>
        <text x="70" y="86" textAnchor="middle" fontSize="11" fill="#5c6b61">reportes</text>
      </svg>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm"><span className="punto punto-buena"></span> Aprobados <b className="ml-1 text-carbon-900">{aprobados}</b></div>
        <div className="flex items-center gap-2 text-sm"><span className="punto punto-regular"></span> Pendientes <b className="ml-1 text-carbon-900">{pendientes}</b></div>
      </div>
    </div>
  );
}

// ---- Gráfica de barras verticales: vías por estado ----
function GraficaBarras(props) {
  var datos = props.datos; // [{texto, cantidad, color}]
  var maximo = 1;
  datos.forEach(function (d) { if (d.cantidad > maximo) maximo = d.cantidad; });

  return (
    <svg viewBox="0 0 320 170" className="w-full h-44">
      {/* lineas guía */}
      {[0, 1, 2, 3].map(function (i) {
        var y = 20 + i * 33;
        return <line key={i} x1="10" y1={y} x2="310" y2={y} stroke="#eae7df" strokeWidth="1" />;
      })}
      {datos.map(function (d, i) {
        var x = 35 + i * 72;
        var alto = (d.cantidad / maximo) * 110;
        var y = 130 - alto;
        return (
          <g key={d.texto}>
            <rect x={x} y={y} width="44" height={alto} rx="8" fill={d.color} />
            <text x={x + 22} y={y - 6} textAnchor="middle" fontSize="14" fontWeight="800" fill="#16201a">{d.cantidad}</text>
            <text x={x + 22} y="150" textAnchor="middle" fontSize="11" fill="#5c6b61">{d.texto}</text>
          </g>
        );
      })}
    </svg>
  );
}

// ---- Gráfica de barras horizontales: reportes por estado ----
function GraficaBarrasH(props) {
  var datos = props.datos; // [{texto, cantidad, color}]
  var total = 0;
  datos.forEach(function (d) { total += d.cantidad; });
  if (total === 0) total = 1;

  return (
    <div className="space-y-4">
      {datos.map(function (d) {
        var porcentaje = Math.round((d.cantidad / total) * 100);
        return (
          <div key={d.texto}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-semibold text-carbon-900">{d.texto}</span>
              <span className="text-slate-500">{d.cantidad} ({porcentaje}%)</span>
            </div>
            <div className="w-full h-3 rounded-full bg-white/60 overflow-hidden border border-white/70">
              <div style={{ width: porcentaje + "%", background: d.color }} className="h-full rounded-full transition-all"></div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ============================================================
//  PANEL PRINCIPAL
// ============================================================
window.AdminPanel = function AdminPanel(props) {
  var reportes = props.reportes || [];
  var vias = props.vias || [];
  var alertas = props.alertas || [];
  var adminName = props.adminName || "Administrador";
  var servidorOk = props.servidorOk;
  var onRefrescar = props.onRefrescar;
  var onClose = props.onClose;
  var onAprobarReporte = props.onAprobarReporte;
  var onEliminarReporte = props.onEliminarReporte;

  // Sección visible del panel
  var [seccion, setSeccion] = React.useState("resumen");

  var hoy = new Date().toLocaleDateString("es-CO", { day: "numeric", month: "long", year: "numeric" });

  // ---- Cálculos con datos reales ----
  function contarVias(estado) { var t = 0; vias.forEach(function (v) { if (v.estado === estado) t++; }); return t; }
  function contarReportes(estado) { var t = 0; reportes.forEach(function (r) { if (r.estado === estado) t++; }); return t; }

  var reportesAprobados = reportes.filter(function (r) { return r.aprobado; }).length;
  var reportesPendientes = reportes.filter(function (r) { return !r.aprobado; }).length;

  var barrasVias = [
    { texto: "Buenas", cantidad: contarVias("Buena"), color: "#16a34a" },
    { texto: "Regular", cantidad: contarVias("Regular"), color: "#f59e0b" },
    { texto: "Malas", cantidad: contarVias("Mala"), color: "#f97316" },
    { texto: "Cerradas", cantidad: contarVias("Cerrada"), color: "#ef4444" },
  ];
  var barrasReportes = [
    { texto: "Buena", cantidad: contarReportes("Buena"), color: "#16a34a" },
    { texto: "Regular", cantidad: contarReportes("Regular"), color: "#f59e0b" },
    { texto: "Mala", cantidad: contarReportes("Mala"), color: "#f97316" },
    { texto: "Cerrada", cantidad: contarReportes("Cerrada"), color: "#ef4444" },
  ];

  // KPIs
  var kpis = [
    { etiqueta: "Reportes totales", valor: reportes.length, sub: "en la plataforma", acento: "#1f6440" },
    { etiqueta: "Aprobados", valor: reportesAprobados, sub: "visibles en el mapa", acento: "#16a34a" },
    { etiqueta: "Pendientes", valor: reportesPendientes, sub: "por revisar", acento: "#f59e0b" },
    { etiqueta: "Alertas de sensores", valor: alertas.length, sub: "GeoSentinel", acento: "#ef4444" },
  ];

  var menu = [
    { id: "resumen", texto: "📊 Resumen" },
    { id: "reportes", texto: "📍 Reportes" },
    { id: "vias", texto: "🛣️ Vías" },
    { id: "alertas", texto: "⚠️ Alertas" },
  ];

  function confirmarEliminar(id) {
    if (confirm("¿Seguro que deseas eliminar este reporte?")) onEliminarReporte(id);
  }
  function claseBadge(estado) {
    if (estado === "Buena") return "badge badge-buena";
    if (estado === "Regular") return "badge badge-regular";
    if (estado === "Mala") return "badge badge-mala";
    return "badge badge-cerrada";
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-5 md:px-8 py-6">
      <div className="lg:grid lg:grid-cols-[240px_1fr] lg:gap-6">

        {/* ---------- BARRA LATERAL ---------- */}
        <aside className="vidrio-claro p-4 mb-6 lg:mb-0 lg:sticky lg:top-6 lg:self-start">
          <div className="flex items-center gap-3 mb-6 px-1">
            <img src="img/logoviaa.png" alt="Logo" className="w-10 h-10 rounded-xl object-cover" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Panel</p>
              <p className="font-extrabold text-carbon-900 leading-tight">Vías Chocó</p>
            </div>
          </div>

          <nav className="flex lg:flex-col gap-2 overflow-x-auto scroll-suave">
            {menu.map(function (m) {
              var activo = seccion === m.id ? " activo" : "";
              return (
                <button key={m.id} onClick={function () { setSeccion(m.id); }} className={"admin-nav-item" + activo}>
                  {m.texto}
                </button>
              );
            })}
          </nav>

          <div className="hidden lg:block mt-6 pt-4 border-t border-white/50">
            <p className="text-xs text-slate-500 px-1 mb-1">Sesión</p>
            <p className="font-semibold text-carbon-900 px-1 mb-3">{adminName}</p>
            <button onClick={onClose} className="boton-secundario w-full">Salir del panel</button>
          </div>
        </aside>

        {/* ---------- CONTENIDO ---------- */}
        <main className="space-y-8">
          {/* Barra superior */}
          <div className="vidrio-claro p-5 flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-carbon-900">Hola, {adminName} 👋</h1>
              <p className="text-sm text-slate-500">{hoy}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/60 border border-white/70 px-3 py-2 text-sm font-semibold text-carbon-900">
                <span className={"punto-servidor " + (servidorOk ? "serv-on" : "serv-off")}></span>
                {servidorOk ? "Servidor conectado" : "Modo local"}
              </span>
              <button onClick={onRefrescar} className="boton-secundario text-sm">↻ Actualizar</button>
              <button onClick={onClose} className="boton-primario text-sm lg:hidden">Salir</button>
            </div>
          </div>

          {/* ===== RESUMEN ===== */}
          {seccion === "resumen" && (
            <div className="space-y-6">
              {/* KPIs */}
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {kpis.map(function (k) {
                  return (
                    <div key={k.etiqueta} className="kpi" style={{ "--acento": k.acento }}>
                      <p className="text-sm text-slate-500">{k.etiqueta}</p>
                      <p className="numero-grande mt-3" style={{ color: k.acento }}>{k.valor}</p>
                      <p className="text-xs text-slate-400 mt-2">{k.sub}</p>
                    </div>
                  );
                })}
              </div>

              {/* Gráficas */}
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="vidrio-claro p-8">
                  <h3 className="font-bold text-carbon-900 mb-6">Reportes: aprobados vs pendientes</h3>
                  <GraficaDona aprobados={reportesAprobados} pendientes={reportesPendientes} />
                </div>
                <div className="vidrio-claro p-8">
                  <h3 className="font-bold text-carbon-900 mb-6">Estado de las vías</h3>
                  <GraficaBarras datos={barrasVias} />
                </div>
              </div>

              <div className="vidrio-claro p-8">
                <h3 className="font-bold text-carbon-900 mb-6">Reportes por estado</h3>
                <GraficaBarrasH datos={barrasReportes} />
              </div>
            </div>
          )}

          {/* ===== REPORTES ===== */}
          {seccion === "reportes" && (
            <div className="vidrio-claro p-6 md:p-8">
              <h3 className="text-2xl font-extrabold text-carbon-900 mb-1">Reportes de la comunidad</h3>
              <p className="text-sm text-slate-500 mb-6">Aprueba o elimina los reportes. Los cambios se guardan en la base de datos.</p>
              <div className="space-y-3">
                {reportes.length === 0 && <p className="text-center py-8 text-slate-500">Todavía no hay reportes.</p>}
                {reportes.map(function (r) {
                  return (
                    <div key={r.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white/55 border border-white/70 p-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className={claseBadge(r.estado)}>{r.estado}</span>
                          <span className={"badge " + (r.aprobado ? "badge-buena" : "badge-regular")}>{r.aprobado ? "Aprobado" : "Pendiente"}</span>
                        </div>
                        <p className="font-semibold text-carbon-900 mt-2">{r.titulo}</p>
                        <p className="text-sm text-slate-500">{r.ubicacion || "Sin ubicación"} · {r.autor || "Ciudadano"}</p>
                      </div>
                      <div className="flex gap-2">
                        {!r.aprobado && (
                          <button onClick={function () { onAprobarReporte(r.id); }} className="rounded-lg bg-selva-100 text-selva-700 px-4 py-2 text-sm font-semibold hover:bg-selva-200 transition">Aprobar</button>
                        )}
                        <button onClick={function () { confirmarEliminar(r.id); }} className="rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm font-semibold hover:bg-red-100 transition">Eliminar</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== VIAS ===== */}
          {seccion === "vias" && (
            <div className="vidrio-claro p-6 md:p-8">
              <h3 className="text-2xl font-extrabold text-carbon-900 mb-6">Estado de las vías</h3>
              <div className="space-y-2">
                {vias.map(function (v) {
                  return (
                    <div key={v.id} className="flex items-center justify-between gap-4 rounded-2xl bg-white/55 border border-white/70 p-4">
                      <div>
                        <p className="font-semibold text-carbon-900">{v.titulo}</p>
                        <p className="text-xs text-slate-500">{v.desde} → {v.hasta} · {v.km}</p>
                      </div>
                      <span className={claseBadge(v.estado)}>{v.estado}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ===== ALERTAS ===== */}
          {seccion === "alertas" && (
            <div className="vidrio-claro p-6 md:p-8">
              <h3 className="text-2xl font-extrabold text-carbon-900 mb-6">Alertas de sensores (GeoSentinel)</h3>
              <div className="space-y-3">
                {alertas.length === 0 && <p className="text-center py-8 text-slate-500">No hay alertas registradas.</p>}
                {alertas.map(function (a) {
                  return (
                    <div key={a.id} className="flex items-center justify-between gap-4 rounded-2xl bg-red-50/70 border border-red-100 p-4">
                      <div>
                        <p className="font-semibold text-carbon-900">{a.ubicacion}</p>
                        <p className="text-sm text-slate-500">{a.resumen}</p>
                      </div>
                      <span className="badge badge-cerrada">Riesgo {a.nivelRiesgo}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
