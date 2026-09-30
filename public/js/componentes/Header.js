// ============================================================
//  ENCABEZADO (barra de arriba)
//  Es publico. En computador muestra el menu completo; en celular
//  usa un menu lateral (drawer) que se desliza de izquierda a derecha.
// ============================================================

window.Header = function Header(props) {
  var showMenu = props.showMenu;
  var setShowMenu = props.setShowMenu;
  var onNavigate = props.onNavigate;
  var onReportar = props.onReportar;
  var canInstall = props.canInstall;
  var onInstall = props.onInstall;

  // Enlaces del menu. Cada uno tiene un color de hover (colores de Vias Choco).
  var enlaces = [
    { id: "inicio-seccion", texto: "Inicio", hov: "nav-verde" },
    { id: "seccion-mapa", texto: "Mapa", hov: "nav-teal" },
    { id: "seccion-reportes", texto: "Reportes", hov: "nav-ambar" },
    { id: "seccion-vias", texto: "Vías", hov: "nav-naranja" },
    { id: "seccion-sobre-nosotros", texto: "Nosotros", hov: "nav-violeta" },
    { id: "legal", texto: "Legal", hov: "nav-rosa" },
  ];

  function cerrarMenu() { setShowMenu(false); }

  return (
    <header className="encabezado">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 md:px-8 py-4">
        {/* Logo y nombre */}
        <button onClick={function () { onNavigate("inicio-seccion"); }} className="flex items-center gap-3">
          <img src="img/logoviaa.png" alt="Logo Vías Chocó" className="w-11 h-11 rounded-2xl object-cover shadow" />
          <span className="text-xl md:text-2xl font-extrabold text-carbon-900">
            Vías <span className="text-selva-600">Chocó</span>
          </span>
        </button>

        {/* Menu para computador */}
        <nav className="hidden lg:flex items-center gap-1">
          {enlaces.map(function (enlace) {
            return (
              <button key={enlace.id} onClick={function () { onNavigate(enlace.id); }} className={"enlace-menu " + enlace.hov}>
                {enlace.texto}
              </button>
            );
          })}
        </nav>

        {/* Derecha: reportar (compu) + hamburguesa (celular) */}
        <div className="flex items-center gap-2">
          {canInstall && <button onClick={onInstall} className="boton-instalar hidden sm:inline-flex"><span aria-hidden="true">↓</span> Instalar</button>}
          <button onClick={onReportar} className="boton-primario hidden sm:inline-flex text-sm">+ Reportar</button>
          {/* Botón hamburguesa (solo celular) */}
          <button onClick={function () { setShowMenu(true); }} className="hamburguesa lg:hidden" aria-label="Abrir menú">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#16201a" strokeWidth="2" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>
        </div>
      </div>

      {/* Fondo oscuro detrás del menú lateral */}
      {showMenu && <div className="drawer-fondo lg:hidden" onClick={cerrarMenu}></div>}

      {/* Menú lateral (drawer) para celular */}
      <div className={"drawer lg:hidden" + (showMenu ? " abierto" : "")}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <img src="img/logoviaa.png" alt="Logo" className="w-9 h-9 rounded-xl object-cover" />
            <span className="font-extrabold text-carbon-900">Vías <span className="text-selva-600">Chocó</span></span>
          </div>
          <button onClick={cerrarMenu} className="w-9 h-9 rounded-full bg-arena-100 text-selva-800" aria-label="Cerrar">✕</button>
        </div>
        <nav className="flex flex-col gap-2">
          {enlaces.map(function (enlace) {
            return (
              <button key={enlace.id} onClick={function () { onNavigate(enlace.id); }} className={"enlace-menu text-left " + enlace.hov}>
                {enlace.texto}
              </button>
            );
          })}
          {canInstall && <button onClick={function () { cerrarMenu(); onInstall(); }} className="boton-instalar w-full mt-3"><span aria-hidden="true">↓</span> Instalar aplicación</button>}
          <button onClick={function () { cerrarMenu(); onReportar(); }} className="boton-primario w-full mt-3">+ Reportar</button>
        </nav>
      </div>
    </header>
  );
};
