// ARCHIVO GENERADO AUTOMATICAMENTE por 'node compilar.js'.
// No lo edites a mano: edita los archivos de js/componentes y js/paginas.


// ===== public/js/componentes/Header.js =====
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

  // Enlaces del menu. Cada uno tiene un color de hover (colores de Vias Choco).
  var enlaces = [{
    id: "inicio-seccion",
    texto: "Inicio",
    hov: "nav-verde"
  }, {
    id: "seccion-mapa",
    texto: "Mapa",
    hov: "nav-teal"
  }, {
    id: "seccion-reportes",
    texto: "Reportes",
    hov: "nav-ambar"
  }, {
    id: "seccion-vias",
    texto: "Vías",
    hov: "nav-naranja"
  }, {
    id: "seccion-sobre-nosotros",
    texto: "Nosotros",
    hov: "nav-violeta"
  }, {
    id: "legal",
    texto: "Legal",
    hov: "nav-rosa"
  }];
  function cerrarMenu() {
    setShowMenu(false);
  }
  return /*#__PURE__*/React.createElement("header", {
    className: "encabezado"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex items-center justify-between gap-4 px-5 md:px-8 py-4"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("inicio-seccion");
    },
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/logoviaa.png",
    alt: "Logo Vías Chocó",
    className: "w-11 h-11 rounded-2xl object-cover shadow"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xl md:text-2xl font-extrabold text-carbon-900"
  }, "Vías ", /*#__PURE__*/React.createElement("span", {
    className: "text-selva-600"
  }, "Chocó"))), /*#__PURE__*/React.createElement("nav", {
    className: "hidden lg:flex items-center gap-1"
  }, enlaces.map(function (enlace) {
    return /*#__PURE__*/React.createElement("button", {
      key: enlace.id,
      onClick: function () {
        onNavigate(enlace.id);
      },
      className: "enlace-menu " + enlace.hov
    }, enlace.texto);
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onReportar,
    className: "boton-primario hidden sm:inline-flex text-sm"
  }, "+ Reportar"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setShowMenu(true);
    },
    className: "hamburguesa lg:hidden",
    "aria-label": "Abrir menú"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#16201a",
    strokeWidth: "2",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "6",
    x2: "21",
    y2: "6"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "12",
    x2: "21",
    y2: "12"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "3",
    y1: "18",
    x2: "21",
    y2: "18"
  }))))), showMenu && /*#__PURE__*/React.createElement("div", {
    className: "drawer-fondo lg:hidden",
    onClick: cerrarMenu
  }), /*#__PURE__*/React.createElement("div", {
    className: "drawer lg:hidden" + (showMenu ? " abierto" : "")
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/logoviaa.png",
    alt: "Logo",
    className: "w-9 h-9 rounded-xl object-cover"
  }), /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-carbon-900"
  }, "Vías ", /*#__PURE__*/React.createElement("span", {
    className: "text-selva-600"
  }, "Chocó"))), /*#__PURE__*/React.createElement("button", {
    onClick: cerrarMenu,
    className: "w-9 h-9 rounded-full bg-arena-100 text-selva-800",
    "aria-label": "Cerrar"
  }, "✕")), /*#__PURE__*/React.createElement("nav", {
    className: "flex flex-col gap-2"
  }, enlaces.map(function (enlace) {
    return /*#__PURE__*/React.createElement("button", {
      key: enlace.id,
      onClick: function () {
        onNavigate(enlace.id);
      },
      className: "enlace-menu text-left " + enlace.hov
    }, enlace.texto);
  }), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      cerrarMenu();
      onReportar();
    },
    className: "boton-primario w-full mt-3"
  }, "+ Reportar"))));
};

// ===== public/js/componentes/Footer.js =====
// ============================================================
//  PIE DE PAGINA (Footer)
//  Muestra la informacion de la marca, enlaces y contacto.
// ============================================================

window.Footer = function Footer(props) {
  var onNavigate = props.onNavigate;
  return /*#__PURE__*/React.createElement("footer", {
    className: "bg-carbon-900 text-white"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-6 py-14"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-4"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/logoviaa.png",
    alt: "Logo",
    className: "w-11 h-11 rounded-2xl object-cover"
  }), /*#__PURE__*/React.createElement("h4", {
    className: "text-xl font-extrabold"
  }, "Vías ", /*#__PURE__*/React.createElement("span", {
    className: "text-selva-400"
  }, "Chocó"))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-white/70 leading-relaxed"
  }, "Plataforma colaborativa de información vial en tiempo real para la región del Chocó, Colombia.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold uppercase tracking-widest text-white/60 mb-4"
  }, "Plataforma"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-sm text-white/80"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("inicio-seccion");
    },
    className: "hover:text-selva-400 transition"
  }, "Inicio")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("seccion-mapa");
    },
    className: "hover:text-selva-400 transition"
  }, "Mapa en vivo")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("seccion-reportes");
    },
    className: "hover:text-selva-400 transition"
  }, "Reportes")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("seccion-vias");
    },
    className: "hover:text-selva-400 transition"
  }, "Estado de vías")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold uppercase tracking-widest text-white/60 mb-4"
  }, "Contacto"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3 text-sm text-white/80"
  }, /*#__PURE__*/React.createElement("li", {
    className: "flex items-start gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-selva-400"
  }, "✉"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:contacto.maturanainnovate@gmail.com",
    className: "hover:text-selva-400 transition break-all"
  }, "contacto.maturanainnovate@gmail.com")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-selva-400"
  }, "📱"), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/573145312045",
    target: "_blank",
    rel: "noreferrer",
    className: "hover:text-selva-400 transition"
  }, "+57 314 531 2045")), /*#__PURE__*/React.createElement("li", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-selva-400"
  }, "📍"), /*#__PURE__*/React.createElement("span", null, "Quibdó, Chocó")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold uppercase tracking-widest text-white/60 mb-4"
  }, "Legal"), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-2 text-sm text-white/80"
  }, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("terminos");
    },
    className: "hover:text-selva-400 transition"
  }, "Términos y condiciones")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("legal");
    },
    className: "hover:text-selva-400 transition"
  }, "Política de privacidad")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("cookies");
    },
    className: "hover:text-selva-400 transition"
  }, "Cookies")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("reporte-abuso");
    },
    className: "hover:text-selva-400 transition"
  }, "Reportar abuso"))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-white/60 text-center sm:text-left"
  }, "© 2026 Vías del Chocó · Realizado por ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-white"
  }, "Maturana Tech")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://www.facebook.com/viaschoco",
    target: "_blank",
    rel: "noreferrer",
    className: "w-9 h-9 rounded-full bg-white/10 hover:bg-selva-500 flex items-center justify-center text-white transition font-bold"
  }, "f"), /*#__PURE__*/React.createElement("a", {
    href: "https://wa.me/573145312045",
    target: "_blank",
    rel: "noreferrer",
    className: "w-9 h-9 rounded-full bg-white/10 hover:bg-selva-500 flex items-center justify-center text-white transition font-bold"
  }, "W"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:contacto.maturanainnovate@gmail.com",
    className: "w-9 h-9 rounded-full bg-white/10 hover:bg-selva-500 flex items-center justify-center text-white transition"
  }, "✉"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("acceso-admin");
    },
    className: "admin-punto ml-2",
    title: "Acceso administrador",
    "aria-label": "Acceso administrador"
  })))));
};

// ===== public/js/componentes/DeslizarEntrar.js =====
// ============================================================
//  CONTROL "DESLIZA PARA ENTRAR"
//  El usuario arrastra el circulo hacia la derecha para entrar.
//  Si no lo desliza completo, el circulo regresa al inicio.
//  Tambien hay un boton de respaldo por si prefiere solo tocar.
// ============================================================

window.DeslizarEntrar = function DeslizarEntrar(props) {
  var onEntrar = props.onEntrar;
  var pistaRef = React.useRef(null);
  var [x, setX] = React.useState(0); // posicion del circulo
  var [arrastrando, setArrastrando] = React.useState(false);
  var anchoKnob = 56;
  var margen = 5;

  // Cuanto se puede mover el circulo (ancho de la pista menos el circulo)
  function maximo() {
    if (!pistaRef.current) return 0;
    return pistaRef.current.offsetWidth - anchoKnob - margen * 2;
  }
  function alPresionar(e) {
    setArrastrando(true);
    e.target.setPointerCapture(e.pointerId); // seguir el dedo aunque salga del circulo
  }
  function alMover(e) {
    if (!arrastrando) return;
    var caja = pistaRef.current.getBoundingClientRect();
    var nueva = e.clientX - caja.left - anchoKnob / 2;
    if (nueva < 0) nueva = 0;
    if (nueva > maximo()) nueva = maximo();
    setX(nueva);
  }
  function alSoltar() {
    setArrastrando(false);
    // Si llego a mas del 70% del recorrido, entramos
    if (x >= maximo() * 0.7) {
      onEntrar();
    } else {
      setX(0); // regresa al inicio
    }
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "desliza",
    ref: pistaRef
  }, /*#__PURE__*/React.createElement("div", {
    className: "desliza-relleno",
    style: {
      width: x + anchoKnob + margen + "px"
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "desliza-texto"
  }, "Desliza para entrar"), /*#__PURE__*/React.createElement("div", {
    className: "desliza-knob",
    style: {
      transform: "translateX(" + x + "px)",
      transition: arrastrando ? "none" : "transform 0.25s ease"
    },
    onPointerDown: alPresionar,
    onPointerMove: alMover,
    onPointerUp: alSoltar
  }, "→")), /*#__PURE__*/React.createElement("button", {
    onClick: onEntrar,
    className: "boton-fantasma mt-4",
    style: {
      color: "rgba(255,255,255,0.85)"
    }
  }, "o entra directo"));
};

// ===== public/js/componentes/LoginModal.js =====
// ============================================================
//  VENTANA DE ACCESO DE ADMINISTRADOR
//  Solo la usan los administradores. Se abre desde el punto
//  discreto que esta en el pie de pagina.
// ============================================================

window.LoginModal = function LoginModal(props) {
  var onClose = props.onClose;
  var onLogin = props.onLogin; // recibe (email, clave) y devuelve true o un mensaje

  async function enviar(e) {
    e.preventDefault();
    var email = e.target.email.value.trim();
    var clave = e.target.password.value.trim();
    if (!email || !clave) {
      alert("Ingresa tu correo y contraseña.");
      return;
    }
    var resultado = await onLogin(email, clave);
    if (resultado !== true) {
      alert(resultado || "No se pudo iniciar sesión.");
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "fondo-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "caja-modal max-w-md p-8 relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 w-9 h-9 rounded-full bg-arena-100 text-selva-800 hover:bg-arena-200 transition"
  }, "✕"), /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-2xl bg-selva-700 text-white flex items-center justify-center text-xl mb-4"
  }, "🔒"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-extrabold text-carbon-900 mb-1"
  }, "Acceso administrador"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 mb-6"
  }, "Área privada. Solo para el equipo de Vías Chocó."), /*#__PURE__*/React.createElement("form", {
    onSubmit: enviar,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "email",
    className: "etiqueta-campo"
  }, "Correo"), /*#__PURE__*/React.createElement("input", {
    id: "email",
    name: "email",
    type: "email",
    placeholder: "admin@viaschoco.com",
    className: "campo",
    autoComplete: "username"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "password",
    className: "etiqueta-campo"
  }, "Contraseña"), /*#__PURE__*/React.createElement("input", {
    id: "password",
    name: "password",
    type: "password",
    placeholder: "••••••••",
    className: "campo",
    autoComplete: "current-password"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 justify-end pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "boton-secundario"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "boton-primario"
  }, "Entrar al panel")))));
};

// ===== public/js/componentes/MapComponent.js =====
// ============================================================
//  MAPA (usa la libreria Leaflet)
//  Muestra marcadores de:
//    - Reportes de la comunidad (color segun el estado de la via)
//    - Alertas de sensores (rojo)
//    - Ubicacion seleccionada al hacer un reporte (verde)
//  Tambien permite hacer clic para elegir una ubicacion.
// ============================================================

window.MapComponent = function MapComponent(props) {
  var reportes = props.reportes || [];
  var alertas = props.alertas || [];
  var permitirClic = props.permitirClic || false;
  var alHacerClic = props.alHacerClic;
  var marcadorTemporal = props.marcadorTemporal || null;
  var centro = props.centro || [5.7, -76.3];
  var zoom = props.zoom || 7;

  // Referencias que Leaflet necesita para no crear el mapa dos veces
  var contenedorRef = React.useRef(null);
  var mapaRef = React.useRef(null);
  var capaMarcadores = React.useRef(null);
  var alHacerClicRef = React.useRef(alHacerClic);
  var permitirClicRef = React.useRef(permitirClic);

  // Mantenemos actualizadas las referencias del clic
  React.useEffect(function () {
    alHacerClicRef.current = alHacerClic;
    permitirClicRef.current = permitirClic;
  }, [alHacerClic, permitirClic]);

  // Devuelve un color segun el estado de la via
  function colorPorEstado(estado) {
    if (estado === "Cerrada") return "#dc2626"; // rojo
    if (estado === "Mala") return "#ea580c"; // naranja
    if (estado === "Regular") return "#f59e0b"; // amarillo
    return "#16a34a"; // verde (Buena)
  }

  // Crea un icono redondo de color para el mapa
  function crearIcono(color) {
    return L.divIcon({
      className: "",
      html: '<div style="width:20px;height:20px;border-radius:50%;background:' + color + ';border:3px solid white;box-shadow:0 4px 10px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10]
    });
  }

  // 1) Crear el mapa una sola vez
  React.useEffect(function () {
    if (mapaRef.current) return; // ya existe, no lo creamos de nuevo

    mapaRef.current = L.map(contenedorRef.current, {
      center: centro,
      zoom: zoom,
      attributionControl: false
    });
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18
    }).addTo(mapaRef.current);

    // Recalcula el tamano cuando la cuadricula termina de acomodarse.
    window.requestAnimationFrame(function () {
      if (mapaRef.current) mapaRef.current.invalidateSize();
    });

    // Capa donde iran todos los marcadores (para borrarlos facil)
    capaMarcadores.current = L.layerGroup().addTo(mapaRef.current);

    // Escuchar los clics en el mapa
    mapaRef.current.on("click", function (e) {
      if (permitirClicRef.current && alHacerClicRef.current) {
        alHacerClicRef.current({
          lat: e.latlng.lat,
          lng: e.latlng.lng
        });
      }
    });

    // Cuando el componente se cierra, destruimos el mapa para no dejar basura
    return function () {
      if (mapaRef.current) {
        mapaRef.current.remove();
        mapaRef.current = null;
      }
    };
  }, []);

  // 2) Cada vez que cambian los datos, volvemos a dibujar los marcadores
  React.useEffect(function () {
    if (!mapaRef.current || !capaMarcadores.current) return;
    capaMarcadores.current.clearLayers(); // borramos los anteriores

    // Marcadores de reportes (solo los aprobados)
    reportes.forEach(function (reporte) {
      if (!reporte.lat || !reporte.lng) return;
      if (reporte.aprobado === false) return;
      var icono = crearIcono(colorPorEstado(reporte.estado));
      var texto = "<strong>" + (reporte.titulo || "Reporte") + "</strong><br/>" + (reporte.ubicacion || "") + "<br/>Estado: " + reporte.estado;
      L.marker([reporte.lat, reporte.lng], {
        icon: icono
      }).bindPopup(texto).addTo(capaMarcadores.current);
    });

    // Marcadores de alertas de sensores (rojo)
    alertas.forEach(function (alerta) {
      if (!alerta.lat || !alerta.lng) return;
      var icono = crearIcono("#dc2626");
      var texto = "<strong>⚠ " + (alerta.ubicacion || "Alerta") + "</strong><br/>" + (alerta.resumen || "");
      L.marker([alerta.lat, alerta.lng], {
        icon: icono
      }).bindPopup(texto).addTo(capaMarcadores.current);
    });

    // Marcador temporal (cuando el usuario elige ubicacion para un reporte)
    if (marcadorTemporal) {
      var iconoTemp = crearIcono("#2f7d50");
      L.marker([marcadorTemporal.lat, marcadorTemporal.lng], {
        icon: iconoTemp
      }).bindPopup("Ubicación seleccionada").addTo(capaMarcadores.current);
    }
  }, [reportes, alertas, marcadorTemporal]);
  return /*#__PURE__*/React.createElement("div", {
    ref: contenedorRef,
    className: "w-full h-full"
  });
};

// ===== public/js/componentes/ReporteModal.js =====
// ============================================================
//  VENTANA PARA HACER UN REPORTE NUEVO
//  El usuario elige la via, el estado, escribe la zona, marca el
//  punto en el minimapa y puede subir fotos o videos.
// ============================================================

window.ReporteModal = function ReporteModal(props) {
  var vias = props.vias || [];
  var onClose = props.onClose;
  var onCrear = props.onCrear;

  // Estados del formulario
  var [nombre, setNombre] = React.useState("");
  var [viaId, setViaId] = React.useState("");
  var [estado, setEstado] = React.useState("");
  var [zona, setZona] = React.useState("");
  var [ubicacion, setUbicacion] = React.useState("");
  var [descripcion, setDescripcion] = React.useState("");
  var [recomendacion, setRecomendacion] = React.useState("");
  var [coords, setCoords] = React.useState(null); // punto elegido en el mapa
  var [archivos, setArchivos] = React.useState([]); // fotos/videos

  // Cuando el usuario hace clic en el minimapa
  function alHacerClicMapa(punto) {
    setCoords(punto);
  }

  // Cuando el usuario sube fotos o videos
  function alSubirArchivos(e) {
    var lista = Array.prototype.slice.call(e.target.files || []);
    lista.forEach(function (file) {
      // Evitamos archivos muy pesados (para que quepan en el navegador)
      if (file.size > 8 * 1024 * 1024) {
        alert('El archivo "' + file.name + '" es muy pesado (máx 8 MB).');
        return;
      }
      var lector = new FileReader();
      lector.onload = function (ev) {
        setArchivos(function (prev) {
          return prev.concat([{
            tipo: file.type,
            datos: ev.target.result
          }]);
        });
      };
      lector.readAsDataURL(file); // lo guardamos como texto (base64)
    });
    e.target.value = ""; // permitir subir el mismo archivo otra vez
  }
  function quitarArchivo(indice) {
    setArchivos(function (prev) {
      return prev.filter(function (_, i) {
        return i !== indice;
      });
    });
  }

  // Enviar el reporte
  async function enviar(e) {
    e.preventDefault();
    if (!viaId || !estado) {
      alert("Elige la vía y el estado antes de enviar.");
      return;
    }
    var via = vias.find(function (v) {
      return v.id === Number(viaId);
    });
    var lat = coords ? coords.lat : via.lat;
    var lng = coords ? coords.lng : via.lng;
    var reporte = {
      via: via.titulo,
      titulo: via.titulo,
      estado: estado,
      zona: zona,
      ubicacion: ubicacion,
      descripcion: descripcion,
      recomendacion: recomendacion,
      autor: nombre.trim() || "Ciudadano",
      archivos: archivos,
      lat: lat,
      lng: lng
    };
    await onCrear(reporte);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "fondo-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "caja-modal max-w-4xl p-6 sm:p-8 relative scroll-suave"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 w-9 h-9 rounded-full bg-arena-100 text-selva-800 hover:bg-arena-200 transition"
  }, "✕"), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl font-extrabold text-carbon-900 mb-1"
  }, "Hacer un reporte"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 mb-6"
  }, "Cuéntale a la comunidad cómo está la vía."), /*#__PURE__*/React.createElement("form", {
    onSubmit: enviar,
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 md:grid-cols-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Tu nombre (opcional)"), /*#__PURE__*/React.createElement("input", {
    className: "campo",
    placeholder: "Ej: María, o déjalo en blanco",
    value: nombre,
    onChange: function (e) {
      setNombre(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Vía"), /*#__PURE__*/React.createElement("select", {
    className: "campo",
    value: viaId,
    onChange: function (e) {
      setViaId(e.target.value);
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Selecciona una vía"), vias.map(function (v) {
    return /*#__PURE__*/React.createElement("option", {
      key: v.id,
      value: v.id
    }, v.titulo);
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Estado de la vía"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, ["Buena", "Regular", "Mala", "Cerrada"].map(function (op) {
    var sel = estado === op ? " sel-" + op.toLowerCase() : "";
    return /*#__PURE__*/React.createElement("button", {
      type: "button",
      key: op,
      onClick: function () {
        setEstado(op);
      },
      className: "chip-estado" + sel
    }, op);
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Zona o sector"), /*#__PURE__*/React.createElement("input", {
    className: "campo",
    placeholder: "Ej: Barrio, corregimiento o municipio",
    value: zona,
    onChange: function (e) {
      setZona(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Ubicación específica"), /*#__PURE__*/React.createElement("input", {
    className: "campo",
    placeholder: "Ej: Km 45 - 48",
    value: ubicacion,
    onChange: function (e) {
      setUbicacion(e.target.value);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Ubicación en el mapa (opcional)"), /*#__PURE__*/React.createElement("div", {
    className: "h-52 rounded-2xl overflow-hidden border border-white/70"
  }, /*#__PURE__*/React.createElement(window.MapComponent, {
    reportes: [],
    alertas: [],
    permitirClic: true,
    alHacerClic: alHacerClicMapa,
    marcadorTemporal: coords,
    centro: [5.7, -76.3],
    zoom: 7
  })), coords && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-selva-700 mt-2 font-semibold"
  }, "Punto marcado: ", coords.lat.toFixed(4), ", ", coords.lng.toFixed(4))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Fotos o videos (opcional)"), /*#__PURE__*/React.createElement("label", {
    className: "subir-zona block"
  }, /*#__PURE__*/React.createElement("input", {
    type: "file",
    accept: "image/*,video/*",
    multiple: true,
    onChange: alSubirArchivos,
    className: "hidden"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl"
  }, "📷"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-semibold text-selva-700 mt-1"
  }, "Toca para subir"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "Imágenes o videos (máx 8 MB)")), archivos.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2 mt-3"
  }, archivos.map(function (a, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "previa"
    }, a.tipo.indexOf("video") === 0 ? /*#__PURE__*/React.createElement("video", {
      src: a.datos,
      muted: true
    }) : /*#__PURE__*/React.createElement("img", {
      src: a.datos,
      alt: "evidencia"
    }), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "previa-quitar",
      onClick: function () {
        quitarArchivo(i);
      }
    }, "✕"));
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Descripción"), /*#__PURE__*/React.createElement("textarea", {
    className: "campo",
    rows: "3",
    placeholder: "Describe el problema...",
    value: descripcion,
    onChange: function (e) {
      setDescripcion(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Recomendación"), /*#__PURE__*/React.createElement("textarea", {
    className: "campo",
    rows: "2",
    placeholder: "Ej: Reducir velocidad, buscar ruta alterna...",
    value: recomendacion,
    onChange: function (e) {
      setRecomendacion(e.target.value);
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-3 justify-end"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: onClose,
    className: "boton-secundario"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "boton-primario"
  }, "Enviar reporte")))));
};

// ===== public/js/componentes/ReportDetailsModal.js =====
// ============================================================
//  VENTANA DE DETALLES
//  Muestra la informacion completa de un reporte o de una alerta.
// ============================================================

window.ReportDetailsModal = function ReportDetailsModal(props) {
  var dato = props.dato;
  var onClose = props.onClose;

  // Si no hay nada seleccionado, no mostramos nada
  if (!dato) return null;

  // Convertimos la fecha a un formato legible
  function fechaBonita(fecha) {
    if (!fecha) return "Reciente";
    try {
      return new Date(fecha).toLocaleString("es-CO");
    } catch (e) {
      return fecha;
    }
  }

  // Una fila con etiqueta y valor
  function Fila(propsFila) {
    if (!propsFila.valor) return null;
    return /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2 py-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-semibold text-carbon-900 min-w-[110px]"
    }, propsFila.etiqueta, ":"), /*#__PURE__*/React.createElement("span", {
      className: "text-slate-600"
    }, propsFila.valor));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "fondo-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "caja-modal max-w-lg p-8 relative"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "absolute top-4 right-4 w-9 h-9 rounded-full bg-arena-100 text-selva-800 hover:bg-arena-200 transition"
  }, "✕"), /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-extrabold text-carbon-900 mb-4"
  }, dato.sensorId ? "Detalle de la alerta" : "Detalle del reporte"), /*#__PURE__*/React.createElement("div", {
    className: "text-sm"
  }, /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Vía / Lugar",
    valor: dato.titulo || dato.ubicacion
  }), /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Estado",
    valor: dato.estado
  }), /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Zona",
    valor: dato.zona
  }), /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Ubicación",
    valor: dato.ubicacion
  }), /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Descripción",
    valor: dato.descripcion || dato.resumen
  }), /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Recomendación",
    valor: dato.recomendacion
  }), /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Sensor",
    valor: dato.sensorId
  }), dato.nivelRiesgo != null && /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Nivel de riesgo",
    valor: dato.nivelRiesgo + "%"
  }), /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Autor",
    valor: dato.autor
  }), /*#__PURE__*/React.createElement(Fila, {
    etiqueta: "Fecha",
    valor: fechaBonita(dato.fecha)
  })), dato.archivos && dato.archivos.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "mt-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-carbon-900 mb-2 text-sm"
  }, "Evidencia"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-3 gap-2"
  }, dato.archivos.map(function (a, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "previa"
    }, a.tipo.indexOf("video") === 0 ? /*#__PURE__*/React.createElement("video", {
      src: a.datos,
      controls: true
    }) : /*#__PURE__*/React.createElement("img", {
      src: a.datos,
      alt: "evidencia"
    }));
  })))));
};

// ===== public/js/componentes/AdminPanel.js =====
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
  var C = 2 * Math.PI * r; // circunferencia
  var largoAprob = total ? aprobados / total * C : 0;
  var largoPend = total ? pendientes / total * C : 0;
  return /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-6"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 140 140",
    className: "w-36 h-36 flex-shrink-0"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: r,
    fill: "none",
    stroke: "#eae7df",
    strokeWidth: "16"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: r,
    fill: "none",
    stroke: "#16a34a",
    strokeWidth: "16",
    strokeLinecap: "round",
    strokeDasharray: largoAprob + " " + (C - largoAprob),
    transform: "rotate(-90 70 70)"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "70",
    cy: "70",
    r: r,
    fill: "none",
    stroke: "#f59e0b",
    strokeWidth: "16",
    strokeLinecap: "round",
    strokeDasharray: largoPend + " " + (C - largoPend),
    strokeDashoffset: -largoAprob,
    transform: "rotate(-90 70 70)"
  }), /*#__PURE__*/React.createElement("text", {
    x: "70",
    y: "66",
    textAnchor: "middle",
    fontSize: "26",
    fontWeight: "800",
    fill: "#16201a"
  }, total), /*#__PURE__*/React.createElement("text", {
    x: "70",
    y: "86",
    textAnchor: "middle",
    fontSize: "11",
    fill: "#5c6b61"
  }, "reportes")), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-buena"
  }), " Aprobados ", /*#__PURE__*/React.createElement("b", {
    className: "ml-1 text-carbon-900"
  }, aprobados)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-regular"
  }), " Pendientes ", /*#__PURE__*/React.createElement("b", {
    className: "ml-1 text-carbon-900"
  }, pendientes))));
}

// ---- Gráfica de barras verticales: vías por estado ----
function GraficaBarras(props) {
  var datos = props.datos; // [{texto, cantidad, color}]
  var maximo = 1;
  datos.forEach(function (d) {
    if (d.cantidad > maximo) maximo = d.cantidad;
  });
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 320 170",
    className: "w-full h-44"
  }, [0, 1, 2, 3].map(function (i) {
    var y = 20 + i * 33;
    return /*#__PURE__*/React.createElement("line", {
      key: i,
      x1: "10",
      y1: y,
      x2: "310",
      y2: y,
      stroke: "#eae7df",
      strokeWidth: "1"
    });
  }), datos.map(function (d, i) {
    var x = 35 + i * 72;
    var alto = d.cantidad / maximo * 110;
    var y = 130 - alto;
    return /*#__PURE__*/React.createElement("g", {
      key: d.texto
    }, /*#__PURE__*/React.createElement("rect", {
      x: x,
      y: y,
      width: "44",
      height: alto,
      rx: "8",
      fill: d.color
    }), /*#__PURE__*/React.createElement("text", {
      x: x + 22,
      y: y - 6,
      textAnchor: "middle",
      fontSize: "14",
      fontWeight: "800",
      fill: "#16201a"
    }, d.cantidad), /*#__PURE__*/React.createElement("text", {
      x: x + 22,
      y: "150",
      textAnchor: "middle",
      fontSize: "11",
      fill: "#5c6b61"
    }, d.texto));
  }));
}

// ---- Gráfica de barras horizontales: reportes por estado ----
function GraficaBarrasH(props) {
  var datos = props.datos; // [{texto, cantidad, color}]
  var total = 0;
  datos.forEach(function (d) {
    total += d.cantidad;
  });
  if (total === 0) total = 1;
  return /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, datos.map(function (d) {
    var porcentaje = Math.round(d.cantidad / total * 100);
    return /*#__PURE__*/React.createElement("div", {
      key: d.texto
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex justify-between text-sm mb-1"
    }, /*#__PURE__*/React.createElement("span", {
      className: "font-semibold text-carbon-900"
    }, d.texto), /*#__PURE__*/React.createElement("span", {
      className: "text-slate-500"
    }, d.cantidad, " (", porcentaje, "%)")), /*#__PURE__*/React.createElement("div", {
      className: "w-full h-3 rounded-full bg-white/60 overflow-hidden border border-white/70"
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        width: porcentaje + "%",
        background: d.color
      },
      className: "h-full rounded-full transition-all"
    })));
  }));
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
  var hoy = new Date().toLocaleDateString("es-CO", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  // ---- Cálculos con datos reales ----
  function contarVias(estado) {
    var t = 0;
    vias.forEach(function (v) {
      if (v.estado === estado) t++;
    });
    return t;
  }
  function contarReportes(estado) {
    var t = 0;
    reportes.forEach(function (r) {
      if (r.estado === estado) t++;
    });
    return t;
  }
  var reportesAprobados = reportes.filter(function (r) {
    return r.aprobado;
  }).length;
  var reportesPendientes = reportes.filter(function (r) {
    return !r.aprobado;
  }).length;
  var barrasVias = [{
    texto: "Buenas",
    cantidad: contarVias("Buena"),
    color: "#16a34a"
  }, {
    texto: "Regular",
    cantidad: contarVias("Regular"),
    color: "#f59e0b"
  }, {
    texto: "Malas",
    cantidad: contarVias("Mala"),
    color: "#f97316"
  }, {
    texto: "Cerradas",
    cantidad: contarVias("Cerrada"),
    color: "#ef4444"
  }];
  var barrasReportes = [{
    texto: "Buena",
    cantidad: contarReportes("Buena"),
    color: "#16a34a"
  }, {
    texto: "Regular",
    cantidad: contarReportes("Regular"),
    color: "#f59e0b"
  }, {
    texto: "Mala",
    cantidad: contarReportes("Mala"),
    color: "#f97316"
  }, {
    texto: "Cerrada",
    cantidad: contarReportes("Cerrada"),
    color: "#ef4444"
  }];

  // KPIs
  var kpis = [{
    etiqueta: "Reportes totales",
    valor: reportes.length,
    sub: "en la plataforma",
    acento: "#1f6440"
  }, {
    etiqueta: "Aprobados",
    valor: reportesAprobados,
    sub: "visibles en el mapa",
    acento: "#16a34a"
  }, {
    etiqueta: "Pendientes",
    valor: reportesPendientes,
    sub: "por revisar",
    acento: "#f59e0b"
  }, {
    etiqueta: "Alertas de sensores",
    valor: alertas.length,
    sub: "GeoSentinel",
    acento: "#ef4444"
  }];
  var menu = [{
    id: "resumen",
    texto: "📊 Resumen"
  }, {
    id: "reportes",
    texto: "📍 Reportes"
  }, {
    id: "vias",
    texto: "🛣️ Vías"
  }, {
    id: "alertas",
    texto: "⚠️ Alertas"
  }];
  function confirmarEliminar(id) {
    if (confirm("¿Seguro que deseas eliminar este reporte?")) onEliminarReporte(id);
  }
  function claseBadge(estado) {
    if (estado === "Buena") return "badge badge-buena";
    if (estado === "Regular") return "badge badge-regular";
    if (estado === "Mala") return "badge badge-mala";
    return "badge badge-cerrada";
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen max-w-7xl mx-auto px-5 md:px-8 py-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:grid lg:grid-cols-[240px_1fr] lg:gap-6"
  }, /*#__PURE__*/React.createElement("aside", {
    className: "vidrio-claro p-4 mb-6 lg:mb-0 lg:sticky lg:top-6 lg:self-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 mb-6 px-1"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/logoviaa.png",
    alt: "Logo",
    className: "w-10 h-10 rounded-xl object-cover"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "text-xs uppercase tracking-widest text-slate-500"
  }, "Panel"), /*#__PURE__*/React.createElement("p", {
    className: "font-extrabold text-carbon-900 leading-tight"
  }, "Vías Chocó"))), /*#__PURE__*/React.createElement("nav", {
    className: "flex lg:flex-col gap-2 overflow-x-auto scroll-suave"
  }, menu.map(function (m) {
    var activo = seccion === m.id ? " activo" : "";
    return /*#__PURE__*/React.createElement("button", {
      key: m.id,
      onClick: function () {
        setSeccion(m.id);
      },
      className: "admin-nav-item" + activo
    }, m.texto);
  })), /*#__PURE__*/React.createElement("div", {
    className: "hidden lg:block mt-6 pt-4 border-t border-white/50"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 px-1 mb-1"
  }, "Sesión"), /*#__PURE__*/React.createElement("p", {
    className: "font-semibold text-carbon-900 px-1 mb-3"
  }, adminName), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "boton-secundario w-full"
  }, "Salir del panel"))), /*#__PURE__*/React.createElement("main", {
    className: "space-y-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vidrio-claro p-5 flex flex-wrap items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl font-extrabold text-carbon-900"
  }, "Hola, ", adminName, " 👋"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500"
  }, hoy)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-2 rounded-full bg-white/60 border border-white/70 px-3 py-2 text-sm font-semibold text-carbon-900"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto-servidor " + (servidorOk ? "serv-on" : "serv-off")
  }), servidorOk ? "Servidor conectado" : "Modo local"), /*#__PURE__*/React.createElement("button", {
    onClick: onRefrescar,
    className: "boton-secundario text-sm"
  }, "↻ Actualizar"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "boton-primario text-sm lg:hidden"
  }, "Salir"))), seccion === "resumen" && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
  }, kpis.map(function (k) {
    return /*#__PURE__*/React.createElement("div", {
      key: k.etiqueta,
      className: "kpi",
      style: {
        "--acento": k.acento
      }
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-500"
    }, k.etiqueta), /*#__PURE__*/React.createElement("p", {
      className: "numero-grande mt-3",
      style: {
        color: k.acento
      }
    }, k.valor), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 mt-2"
    }, k.sub));
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 lg:grid-cols-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "vidrio-claro p-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-carbon-900 mb-6"
  }, "Reportes: aprobados vs pendientes"), /*#__PURE__*/React.createElement(GraficaDona, {
    aprobados: reportesAprobados,
    pendientes: reportesPendientes
  })), /*#__PURE__*/React.createElement("div", {
    className: "vidrio-claro p-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-carbon-900 mb-6"
  }, "Estado de las vías"), /*#__PURE__*/React.createElement(GraficaBarras, {
    datos: barrasVias
  }))), /*#__PURE__*/React.createElement("div", {
    className: "vidrio-claro p-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-carbon-900 mb-6"
  }, "Reportes por estado"), /*#__PURE__*/React.createElement(GraficaBarrasH, {
    datos: barrasReportes
  }))), seccion === "reportes" && /*#__PURE__*/React.createElement("div", {
    className: "vidrio-claro p-6 md:p-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-extrabold text-carbon-900 mb-1"
  }, "Reportes de la comunidad"), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500 mb-6"
  }, "Aprueba o elimina los reportes. Los cambios se guardan en la base de datos."), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, reportes.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-center py-8 text-slate-500"
  }, "Todavía no hay reportes."), reportes.map(function (r) {
    return /*#__PURE__*/React.createElement("div", {
      key: r.id,
      className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white/55 border border-white/70 p-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 flex-wrap"
    }, /*#__PURE__*/React.createElement("span", {
      className: claseBadge(r.estado)
    }, r.estado), /*#__PURE__*/React.createElement("span", {
      className: "badge " + (r.aprobado ? "badge-buena" : "badge-regular")
    }, r.aprobado ? "Aprobado" : "Pendiente")), /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-carbon-900 mt-2"
    }, r.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-500"
    }, r.ubicacion || "Sin ubicación", " · ", r.autor || "Ciudadano")), /*#__PURE__*/React.createElement("div", {
      className: "flex gap-2"
    }, !r.aprobado && /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        onAprobarReporte(r.id);
      },
      className: "rounded-lg bg-selva-100 text-selva-700 px-4 py-2 text-sm font-semibold hover:bg-selva-200 transition"
    }, "Aprobar"), /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        confirmarEliminar(r.id);
      },
      className: "rounded-lg bg-red-50 text-red-700 px-4 py-2 text-sm font-semibold hover:bg-red-100 transition"
    }, "Eliminar")));
  }))), seccion === "vias" && /*#__PURE__*/React.createElement("div", {
    className: "vidrio-claro p-6 md:p-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-extrabold text-carbon-900 mb-6"
  }, "Estado de las vías"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, vias.map(function (v) {
    return /*#__PURE__*/React.createElement("div", {
      key: v.id,
      className: "flex items-center justify-between gap-4 rounded-2xl bg-white/55 border border-white/70 p-4"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-carbon-900"
    }, v.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500"
    }, v.desde, " → ", v.hasta, " · ", v.km)), /*#__PURE__*/React.createElement("span", {
      className: claseBadge(v.estado)
    }, v.estado));
  }))), seccion === "alertas" && /*#__PURE__*/React.createElement("div", {
    className: "vidrio-claro p-6 md:p-8"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-2xl font-extrabold text-carbon-900 mb-6"
  }, "Alertas de sensores (GeoSentinel)"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, alertas.length === 0 && /*#__PURE__*/React.createElement("p", {
    className: "text-center py-8 text-slate-500"
  }, "No hay alertas registradas."), alertas.map(function (a) {
    return /*#__PURE__*/React.createElement("div", {
      key: a.id,
      className: "flex items-center justify-between gap-4 rounded-2xl bg-red-50/70 border border-red-100 p-4"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-carbon-900"
    }, a.ubicacion), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-500"
    }, a.resumen)), /*#__PURE__*/React.createElement("span", {
      className: "badge badge-cerrada"
    }, "Riesgo ", a.nivelRiesgo, "%"));
  }))))));
};

// ===== public/js/paginas/SobreNosotros.js =====
// ============================================================
//  SECCION "SOBRE NOSOTROS" + EQUIPO  (rediseño liquid glass)
//  Un manifiesto en vidrio, numeros de impacto, tres pilares y
//  las tarjetas del equipo tipo vidrio transparente.
// ============================================================

// ---- Tarjeta de una persona del equipo (vidrio) ----
window.TarjetaEquipo = function TarjetaEquipo(props) {
  var p = props.persona;
  return /*#__PURE__*/React.createElement("div", {
    className: "equipo-card"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.imagen,
    alt: p.nombre,
    className: "equipo-foto"
  }), /*#__PURE__*/React.createElement("h3", {
    className: "font-bold text-carbon-900 text-lg"
  }, p.nombre), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500"
  }, p.apellido), /*#__PURE__*/React.createElement("div", {
    className: "mt-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rol-chip"
  }, p.rol)), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-600 mt-4 leading-relaxed"
  }, p.descripcion), p.email && /*#__PURE__*/React.createElement("a", {
    href: "mailto:" + p.email,
    className: "inline-flex items-center gap-2 mt-4 text-sm font-semibold text-selva-700 hover:text-selva-600 break-all"
  }, "✉ ", p.email));
};

// ---- Seccion completa ----
window.AboutSection = function AboutSection() {
  var equipo = [{
    nombre: "Luis Alexander",
    apellido: "Moreno Maturana",
    rol: "Full Stack",
    imagen: "img/luis-alexander (2).png",
    descripcion: "Lideró el panel de administración, la arquitectura backend-frontend y el despliegue.",
    email: "alrxandermaturana76@gmail.com"
  }, {
    nombre: "Ashley Sofía",
    apellido: "Panesso Palacios",
    rol: "Frontend y Backend",
    imagen: "img/ashley-sofia.png",
    descripcion: "Diseñó el login, el registro y la validación de usuarios, además de parte del servidor.",
    email: "Ashleysofiapanessopalacios@gmail.com"
  }, {
    nombre: "Carlos Mauricio",
    apellido: "Machado Córdoba",
    rol: "Frontend",
    imagen: "img/carlos-mauricio.png",
    descripcion: "Implementó los componentes interactivos y mejoró la experiencia en celulares.",
    email: "machaocarlo10@gmail.com"
  }, {
    nombre: "Boris Leon",
    apellido: "Valoy Hinestroza",
    rol: "Frontend",
    imagen: "img/boris-leon.png",
    descripcion: "Diseñó el estilo visual, las animaciones y la presentación general del panel.",
    email: "borisleonvaloy@gmail.com"
  }, {
    nombre: "Jhaymar Smith",
    apellido: "Caicedo Garces",
    rol: "Frontend",
    imagen: "img/jhaymar-smith.png",
    descripcion: "Desarrolló las integraciones de mapas y los reportes georreferenciados.",
    email: "marcelaoficial2020@gmail.com"
  }];
  var impacto = [{
    n: "8",
    t: "Vías monitoreadas"
  }, {
    n: "24/7",
    t: "Monitoreo continuo"
  }, {
    n: "4",
    t: "Niveles de estado"
  }, {
    n: "100%",
    t: "Hecho con la comunidad"
  }];
  var pilares = [{
    icono: "🎯",
    titulo: "Nuestra misión",
    texto: "Dar acceso a información vial oportuna para que conductores, comunidades y autoridades planifiquen rutas seguras y eviten riesgos."
  }, {
    icono: "🌅",
    titulo: "Nuestra visión",
    texto: "Ser la herramienta de referencia para la movilidad del Pacífico colombiano, con datos precisos y una experiencia confiable."
  }, {
    icono: "🤝",
    titulo: "Lo que ofrecemos",
    texto: "Estado de las vías al día, alertas de derrumbes e inundaciones, mapa interactivo y reportes ciudadanos en vivo."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "seccion-sobre-nosotros",
    className: "scroll-mt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-12"
  }, /*#__PURE__*/React.createElement("span", {
    className: "etiqueta-seccion"
  }, "Acerca de Vías Chocó"), /*#__PURE__*/React.createElement("h2", {
    className: "titulo-seccion mt-3"
  }, "Sobre nosotros")), /*#__PURE__*/React.createElement("div", {
    className: "vidrio-claro vidrio-glow p-8 md:p-12 mb-8 relative overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative z-10 max-w-3xl"
  }, /*#__PURE__*/React.createElement("p", {
    className: "titulo-display text-2xl md:text-4xl leading-snug text-carbon-900"
  }, "Conectamos a las comunidades del Chocó con información vial", " ", /*#__PURE__*/React.createElement("span", {
    className: "text-selva-600"
  }, "clara, oportuna y colaborativa"), "."), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 mt-5 text-lg"
  }, "Vías del Chocó reúne reportes ciudadanos, sensores y alertas en tiempo real para que viajar por el Pacífico colombiano sea más seguro."))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
  }, impacto.map(function (i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i.t,
      className: "impacto"
    }, /*#__PURE__*/React.createElement("p", {
      className: "numero-grande text-selva-700"
    }, i.n), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 mt-2"
    }, i.t));
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 lg:grid-cols-3 mb-16"
  }, pilares.map(function (p) {
    return /*#__PURE__*/React.createElement("div", {
      key: p.titulo,
      className: "vidrio-claro vidrio-glow vidrio-hover p-8"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-3xl mb-3"
    }, p.icono), /*#__PURE__*/React.createElement("h3", {
      className: "font-bold text-carbon-900 text-xl mb-2"
    }, p.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-600 leading-relaxed"
    }, p.texto));
  })), /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "etiqueta-seccion"
  }, "Creadores"), /*#__PURE__*/React.createElement("h2", {
    className: "titulo-seccion mt-3"
  }, "Equipo de desarrollo")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
  }, equipo.map(function (persona) {
    return /*#__PURE__*/React.createElement(window.TarjetaEquipo, {
      key: persona.nombre,
      persona: persona
    });
  })));
};

// ===== public/js/paginas/Legal.js =====
// ============================================================
//  PAGINA LEGAL (centro de documentos)
// ============================================================

window.LegalPage = function LegalPage(props) {
  var onNavigate = props.onNavigate;

  // Encabezado pequeno con boton de volver (se repite en las paginas legales)
  function Cabecera() {
    return /*#__PURE__*/React.createElement("header", {
      className: "encabezado"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-5xl mx-auto px-5 py-4 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("img", {
      src: "img/logoviaa.png",
      alt: "Logo",
      className: "w-10 h-10 rounded-2xl object-cover"
    }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
      className: "text-xs uppercase tracking-widest text-slate-500"
    }, "Centro legal"), /*#__PURE__*/React.createElement("h1", {
      className: "text-lg font-extrabold text-carbon-900"
    }, "Vías Chocó"))), /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        onNavigate("main");
      },
      className: "boton-secundario"
    }, "← Volver")));
  }
  var tarjetas = [{
    titulo: "Términos y condiciones",
    texto: "Reglas y responsabilidades para usar la plataforma de forma segura.",
    boton: "Ver términos",
    vista: "terminos"
  }, {
    titulo: "Política de privacidad",
    texto: "Cómo recolectamos, usamos y protegemos la información de las personas.",
    boton: "Ver privacidad",
    vista: "legal"
  }, {
    titulo: "Cookies",
    texto: "Uso de cookies y tecnologías similares para mejorar tu experiencia.",
    boton: "Ver cookies",
    vista: "cookies"
  }, {
    titulo: "Reportar abuso",
    texto: "Cuéntanos si encuentras contenido o comportamiento inapropiado.",
    boton: "Reportar",
    vista: "reporte-abuso"
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen"
  }, /*#__PURE__*/React.createElement(Cabecera, null), /*#__PURE__*/React.createElement("main", {
    className: "max-w-5xl mx-auto px-5 py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl bg-selva-900 text-white p-10 mb-8"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "titulo-display text-3xl mb-3"
  }, "Bienvenido al centro legal"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80 max-w-2xl"
  }, "Aquí encuentras la información sobre los términos de uso, la privacidad, las cookies y cómo reportar abuso en Vías Chocó.")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 md:grid-cols-2"
  }, tarjetas.map(function (t) {
    return /*#__PURE__*/React.createElement("div", {
      key: t.titulo,
      className: "tarjeta tarjeta-hover p-8"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl font-bold text-carbon-900 mb-3"
    }, t.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-600 mb-6"
    }, t.texto), /*#__PURE__*/React.createElement("button", {
      onClick: function () {
        onNavigate(t.vista);
      },
      className: "boton-primario"
    }, t.boton));
  })), /*#__PURE__*/React.createElement("div", {
    className: "tarjeta p-8 mt-6"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg font-bold text-carbon-900 mb-2"
  }, "Contacto legal"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600"
  }, "Si necesitas ayuda con estos documentos, escríbenos a", " ", /*#__PURE__*/React.createElement("a", {
    href: "mailto:contacto.maturanainnovate@gmail.com",
    className: "text-selva-600 font-semibold"
  }, "contacto.maturanainnovate@gmail.com"), "."))), /*#__PURE__*/React.createElement(window.Footer, {
    onNavigate: onNavigate
  }));
};

// ===== public/js/paginas/TerminosCondiciones.js =====
// ============================================================
//  PAGINA DE TERMINOS Y CONDICIONES
// ============================================================

window.TerminosCondicionesPage = function TerminosCondicionesPage(props) {
  var onNavigate = props.onNavigate;

  // Lista de puntos de los terminos (para no repetir codigo)
  var puntos = [{
    numero: "01",
    titulo: "Aceptación de los términos",
    texto: "Al usar la plataforma, aceptas estos términos y condiciones. Si no estás de acuerdo, te pedimos no usar el servicio."
  }, {
    numero: "02",
    titulo: "Reglas de uso",
    texto: "No realizar actividades ilegales o fraudulentas, cuidar tus datos de acceso, no intentar vulnerar la seguridad y respetar a los demás usuarios."
  }, {
    numero: "03",
    titulo: "Propiedad intelectual",
    texto: "El contenido, las marcas y el software del sitio pertenecen a la plataforma. Se prohíbe su reproducción sin autorización."
  }, {
    numero: "04",
    titulo: "Limitación de responsabilidad",
    texto: "La plataforma se ofrece \"tal cual\", sin garantía de funcionamiento ininterrumpido. La información es orientativa."
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen"
  }, /*#__PURE__*/React.createElement("header", {
    className: "encabezado"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-5 py-4 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/logoviaa.png",
    alt: "Logo",
    className: "w-10 h-10 rounded-2xl object-cover"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-extrabold text-carbon-900"
  }, "Términos y condiciones")), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("legal");
    },
    className: "boton-secundario"
  }, "← Volver"))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-4xl mx-auto px-5 py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tarjeta p-8 md:p-10 space-y-8"
  }, puntos.map(function (punto) {
    return /*#__PURE__*/React.createElement("div", {
      key: punto.numero
    }, /*#__PURE__*/React.createElement("h2", {
      className: "flex items-center gap-3 text-xl font-bold text-carbon-900 mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-9 h-9 rounded-full bg-selva-100 text-selva-700 flex items-center justify-center text-sm font-bold"
    }, punto.numero), punto.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-600 leading-relaxed pl-12"
    }, punto.texto));
  }), /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl bg-selva-50 border border-selva-200 p-8 text-center"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-bold text-selva-900 mb-2"
  }, "¿Aceptas los términos y condiciones?"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 mb-6 max-w-md mx-auto"
  }, "Confirma que has leído y aceptas nuestras reglas para seguir usando la plataforma."), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row justify-center gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      alert("¡Gracias! Has aceptado los términos y condiciones.");
      onNavigate("main");
    },
    className: "boton-primario"
  }, "Acepto los términos"), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("legal");
    },
    className: "boton-secundario"
  }, "Volver"))))), /*#__PURE__*/React.createElement(window.Footer, {
    onNavigate: onNavigate
  }));
};

// ===== public/js/paginas/Cookies.js =====
// ============================================================
//  PAGINA DE COOKIES
// ============================================================

window.CookiesPage = function CookiesPage(props) {
  var onNavigate = props.onNavigate;
  var items = [{
    titulo: "¿Qué son las cookies?",
    texto: "Son pequeños archivos que se guardan en tu navegador para recordar información, como tu sesión iniciada."
  }, {
    titulo: "¿Para qué las usamos?",
    texto: "Para mantener tu sesión activa y recordar tus preferencias mientras usas la plataforma. No las usamos para publicidad."
  }, {
    titulo: "¿Cómo controlarlas?",
    texto: "Puedes borrar o bloquear las cookies desde la configuración de tu navegador en cualquier momento."
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen"
  }, /*#__PURE__*/React.createElement("header", {
    className: "encabezado"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-4xl mx-auto px-5 py-4 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/logoviaa.png",
    alt: "Logo",
    className: "w-10 h-10 rounded-2xl object-cover"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-extrabold text-carbon-900"
  }, "Política de cookies")), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("legal");
    },
    className: "boton-secundario"
  }, "← Volver"))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-4xl mx-auto px-5 py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rounded-3xl bg-selva-900 text-white p-10 mb-8"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "titulo-display text-3xl mb-2"
  }, "Uso de cookies"), /*#__PURE__*/React.createElement("p", {
    className: "text-white/80"
  }, "En Vías Chocó usamos cookies simples solo para que la aplicación funcione mejor.")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 md:grid-cols-3"
  }, items.map(function (item) {
    return /*#__PURE__*/React.createElement("div", {
      key: item.titulo,
      className: "tarjeta tarjeta-hover p-8"
    }, /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold text-carbon-900 mb-3"
    }, item.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-600"
    }, item.texto));
  }))), /*#__PURE__*/React.createElement(window.Footer, {
    onNavigate: onNavigate
  }));
};

// ===== public/js/paginas/ReporteAbuso.js =====
// ============================================================
//  PAGINA PARA REPORTAR ABUSO
//  Un formulario sencillo para avisar sobre contenido o
//  comportamiento inapropiado.
// ============================================================

window.ReporteAbusoPage = function ReporteAbusoPage(props) {
  var onNavigate = props.onNavigate;
  var [enviado, setEnviado] = React.useState(false);
  function enviar(e) {
    e.preventDefault();
    // En un proyecto real esto se guardaria en el servidor.
    // Aqui solo mostramos un mensaje de agradecimiento.
    setEnviado(true);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen"
  }, /*#__PURE__*/React.createElement("header", {
    className: "encabezado"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto px-5 py-4 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("img", {
    src: "img/logoviaa.png",
    alt: "Logo",
    className: "w-10 h-10 rounded-2xl object-cover"
  }), /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-extrabold text-carbon-900"
  }, "Reportar abuso")), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("legal");
    },
    className: "boton-secundario"
  }, "← Volver"))), /*#__PURE__*/React.createElement("main", {
    className: "max-w-3xl mx-auto px-5 py-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "tarjeta p-8 md:p-10"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-extrabold text-carbon-900 mb-2"
  }, "Cuéntanos qué pasó"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 mb-6"
  }, "Tu reporte nos ayuda a mantener la comunidad segura."), enviado ? /*#__PURE__*/React.createElement("div", {
    className: "rounded-2xl bg-selva-50 border border-selva-200 p-6 text-center"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-lg font-bold text-selva-800 mb-2"
  }, "¡Gracias por tu reporte!"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-600 mb-6"
  }, "Lo revisaremos lo antes posible."), /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      onNavigate("main");
    },
    className: "boton-primario"
  }, "Volver al inicio")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: enviar,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Tu correo"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    className: "campo",
    placeholder: "tu@correo.com",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Tipo de problema"), /*#__PURE__*/React.createElement("select", {
    className: "campo"
  }, /*#__PURE__*/React.createElement("option", null, "Contenido inapropiado"), /*#__PURE__*/React.createElement("option", null, "Reporte falso"), /*#__PURE__*/React.createElement("option", null, "Comportamiento de un usuario"), /*#__PURE__*/React.createElement("option", null, "Otro"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "etiqueta-campo"
  }, "Descripción"), /*#__PURE__*/React.createElement("textarea", {
    className: "campo",
    rows: "4",
    placeholder: "Describe lo que sucedió...",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end gap-3"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: function () {
      onNavigate("legal");
    },
    className: "boton-secundario"
  }, "Cancelar"), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "boton-primario"
  }, "Enviar reporte"))))), /*#__PURE__*/React.createElement(window.Footer, {
    onNavigate: onNavigate
  }));
};

// ===== public/js/main.js =====
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
  try {
    yaEntro = sessionStorage.getItem("entro") === "1";
  } catch (e) {}
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
    window.Api.hayServidor().then(function (ok) {
      setServidorOk(ok);
    });
  }, []);
  async function cargarDatos() {
    setReportes(await window.Api.listarReportes());
    setAlertas(await window.Api.listarAlertas());
  }

  // Traer el clima de las dos vías principales usando OpenWeather
  async function cargarClima() {
    if (!window.CONFIG.OPENWEATHER_API_KEY) {
      setClima({});
      return;
    }
    var idsVias = [1, 2]; // Quibdó-Medellín y Quibdó-Pereira
    var resultado = {};
    for (var i = 0; i < idsVias.length; i++) {
      var via = vias.find(function (v) {
        return v.id === idsVias[i];
      });
      if (!via) continue;
      try {
        var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + via.lat + "&lon=" + via.lng + "&units=metric&lang=es&appid=" + window.CONFIG.OPENWEATHER_API_KEY;
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
    try {
      sessionStorage.setItem("entro", "1");
    } catch (e) {}
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
      if (el) el.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
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
      aprobado: true,
      // se muestra al instante
      fecha: new Date().toISOString()
    });
    await window.Api.crearReporte(nuevo);
    setReportes(function (lista) {
      return [nuevo].concat(lista);
    });
    setVerReporte(false);
    alert("¡Gracias! Tu reporte fue publicado.");
  }
  async function aprobarReporte(id) {
    setReportes(await window.Api.actualizarReporte(id, {
      aprobado: true
    }));
  }
  async function eliminarReporte(id) {
    setReportes(await window.Api.eliminarReporte(id));
  }

  // ---------- Calculos ----------
  // Aplicamos los reportes aprobados para actualizar el estado de las vias
  function calcularVias() {
    return vias.map(function (via) {
      var deEstaVia = reportes.filter(function (r) {
        return r.titulo === via.titulo && r.aprobado;
      });
      if (deEstaVia.length === 0) return via;
      var peor = via.estado;
      deEstaVia.forEach(function (r) {
        if (r.estado === "Cerrada") peor = "Cerrada";else if (r.estado === "Mala" && peor !== "Cerrada") peor = "Mala";else if (r.estado === "Regular" && peor !== "Cerrada" && peor !== "Mala") peor = "Regular";
      });
      return Object.assign({}, via, {
        estado: peor
      });
    });
  }
  var viasActualizadas = calcularVias();
  function contar(estado) {
    var total = 0;
    viasActualizadas.forEach(function (v) {
      if (v.estado === estado) total++;
    });
    return total;
  }
  var conteo = {
    Buena: contar("Buena"),
    Regular: contar("Regular"),
    Mala: contar("Mala"),
    Cerrada: contar("Cerrada")
  };
  function riesgoGeneral() {
    var malas = conteo.Mala + conteo.Cerrada;
    if (malas >= 2) return {
      texto: "Riesgo alto",
      clase: "badge-cerrada"
    };
    if (malas === 1 || conteo.Regular >= 3) return {
      texto: "Riesgo medio",
      clase: "badge-regular"
    };
    return {
      texto: "Riesgo bajo",
      clase: "badge-buena"
    };
  }
  var riesgo = riesgoGeneral();
  var reportesRecientes = reportes.filter(function (r) {
    return r.aprobado;
  }).slice(0, 6);
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
    return /*#__PURE__*/React.createElement("div", {
      className: "entrada"
    }, /*#__PURE__*/React.createElement("div", {
      className: "entrada-fondo",
      style: {
        backgroundImage: "url('img/logo.jpeg')"
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "entrada-velo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "relative z-10 w-full max-w-6xl mx-auto px-5 grid gap-10 lg:grid-cols-2 items-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "entrada-contenido aparece text-center lg:text-left"
    }, /*#__PURE__*/React.createElement("img", {
      src: "img/logoviaa.png",
      alt: "Vías Chocó",
      className: "entrada-logo lg:mx-0"
    }), /*#__PURE__*/React.createElement("h1", null, "Vías del ", /*#__PURE__*/React.createElement("span", null, "Chocó")), /*#__PURE__*/React.createElement("p", {
      className: "lg:mx-0"
    }, "Consulta y reporta el estado de las carreteras del Chocó en tiempo real. Sin registros: entra y participa."), /*#__PURE__*/React.createElement("div", {
      className: "entrada-chips lg:justify-start"
    }, /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, "🛣️ ", vias.length, " vías monitoreadas"), /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, "📍 ", reportes.length, " reportes"), /*#__PURE__*/React.createElement("span", {
      className: "chip"
    }, "⚠️ ", alertas.length, " alertas activas")), /*#__PURE__*/React.createElement(window.DeslizarEntrar, {
      onEntrar: entrar
    })), /*#__PURE__*/React.createElement("div", {
      className: "w-full max-w-md mx-auto lg:mx-0 aparece"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mb-4 text-center lg:text-left"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs uppercase tracking-widest text-white/70"
    }, "Clima en tiempo real"), /*#__PURE__*/React.createElement("h2", {
      className: "text-xl font-bold text-white"
    }, "Estado de rutas clave")), /*#__PURE__*/React.createElement("div", {
      className: "space-y-4"
    }, [1, 2].map(function (id) {
      var via = vias.find(function (v) {
        return v.id === id;
      });
      var w = clima[id];
      return /*#__PURE__*/React.createElement("div", {
        key: id,
        className: "clima-card " + claseClima(w)
      }, /*#__PURE__*/React.createElement("div", {
        className: "flex items-start justify-between gap-4"
      }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
        className: "text-xs uppercase tracking-widest text-slate-500"
      }, via.desde, " → ", via.hasta), /*#__PURE__*/React.createElement("h3", {
        className: "font-bold text-carbon-900 mt-1"
      }, via.titulo), /*#__PURE__*/React.createElement("p", {
        className: "text-sm text-slate-500 mt-1 capitalize"
      }, w ? w.weather[0].description : "Datos locales")), /*#__PURE__*/React.createElement("p", {
        className: "text-4xl font-extrabold text-carbon-900"
      }, w ? Math.round(w.main.temp) + "°" : via.temperatura + "°")), /*#__PURE__*/React.createElement("div", {
        className: "grid grid-cols-3 gap-2 mt-4"
      }, /*#__PURE__*/React.createElement("div", {
        className: "mini-clima"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-xs font-semibold text-carbon-900"
      }, "💧 Humedad"), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-slate-500 mt-1"
      }, w ? w.main.humidity : via.humedad, "%")), /*#__PURE__*/React.createElement("div", {
        className: "mini-clima"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-xs font-semibold text-carbon-900"
      }, "💨 Viento"), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-slate-500 mt-1"
      }, w ? w.wind.speed + " m/s" : "—")), /*#__PURE__*/React.createElement("div", {
        className: "mini-clima"
      }, /*#__PURE__*/React.createElement("p", {
        className: "text-xs font-semibold text-carbon-900"
      }, "🌡️ Presión"), /*#__PURE__*/React.createElement("p", {
        className: "text-xs text-slate-500 mt-1"
      }, w ? w.main.pressure : "—"))));
    })))));
  }

  // ============================================================
  //  PANEL DE ADMINISTRADOR
  // ============================================================
  if (vista === "admin" && admin) {
    return /*#__PURE__*/React.createElement(window.AdminPanel, {
      reportes: reportes,
      vias: viasActualizadas,
      alertas: alertas,
      adminName: admin.nombre,
      servidorOk: servidorOk,
      onRefrescar: refrescar,
      onClose: salirPanel,
      onAprobarReporte: aprobarReporte,
      onEliminarReporte: eliminarReporte
    });
  }

  // ============================================================
  //  PAGINAS LEGALES
  // ============================================================
  if (vista === "legal") return /*#__PURE__*/React.createElement(window.LegalPage, {
    onNavigate: navegar
  });
  if (vista === "terminos") return /*#__PURE__*/React.createElement(window.TerminosCondicionesPage, {
    onNavigate: navegar
  });
  if (vista === "cookies") return /*#__PURE__*/React.createElement(window.CookiesPage, {
    onNavigate: navegar
  });
  if (vista === "reporte-abuso") return /*#__PURE__*/React.createElement(window.ReporteAbusoPage, {
    onNavigate: navegar
  });

  // ============================================================
  //  VISTA PRINCIPAL (app publica de reportes)
  // ============================================================
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen"
  }, /*#__PURE__*/React.createElement(window.Header, {
    showMenu: verMenu,
    setShowMenu: setVerMenu,
    onNavigate: navegar,
    onReportar: function () {
      setVerReporte(true);
    }
  }), /*#__PURE__*/React.createElement("main", {
    id: "inicio-seccion",
    className: "max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-16 space-y-24"
  }, /*#__PURE__*/React.createElement("section", {
    className: "scroll-mt full-bleed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "full-bleed-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "etiqueta-seccion"
  }, "Estado general"), /*#__PURE__*/React.createElement("h2", {
    className: "titulo-seccion mt-3"
  }, "Panorama de las vías hoy")), /*#__PURE__*/React.createElement("span", {
    className: "badge " + riesgo.clase + " text-sm px-4 py-2"
  }, "Nivel: ", riesgo.texto)), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-estado est-buena"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-buena"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500"
  }, "Vías buenas")), /*#__PURE__*/React.createElement("p", {
    className: "numero-grande text-selva-700 mt-3"
  }, conteo.Buena), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-2"
  }, "Seguras para circular")), /*#__PURE__*/React.createElement("div", {
    className: "card-estado est-regular"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-regular"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500"
  }, "Vías regulares")), /*#__PURE__*/React.createElement("p", {
    className: "numero-grande mt-3",
    style: {
      color: "#b45309"
    }
  }, conteo.Regular), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-2"
  }, "Circular con precaución")), /*#__PURE__*/React.createElement("div", {
    className: "card-estado est-mala"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-mala"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500"
  }, "Vías malas")), /*#__PURE__*/React.createElement("p", {
    className: "numero-grande mt-3",
    style: {
      color: "#c2410c"
    }
  }, conteo.Mala), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-2"
  }, "Alto riesgo")), /*#__PURE__*/React.createElement("div", {
    className: "card-estado est-cerrada"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-cerrada"
  }), /*#__PURE__*/React.createElement("p", {
    className: "text-sm text-slate-500"
  }, "Vías cerradas")), /*#__PURE__*/React.createElement("p", {
    className: "numero-grande mt-3",
    style: {
      color: "#b91c1c"
    }
  }, conteo.Cerrada), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-2"
  }, "No disponibles"))))), /*#__PURE__*/React.createElement("section", {
    id: "seccion-mapa",
    className: "scroll-mt full-bleed"
  }, /*#__PURE__*/React.createElement("div", {
    className: "full-bleed-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "etiqueta-seccion"
  }, "En tiempo real"), /*#__PURE__*/React.createElement("h2", {
    className: "titulo-seccion mt-3"
  }, "Mapa del estado de las vías"), /*#__PURE__*/React.createElement("p", {
    className: "text-slate-500 mt-3 max-w-2xl mx-auto"
  }, "Reportes de la comunidad y alertas de sensores en todo el Chocó.")), /*#__PURE__*/React.createElement("div", {
    className: "mapa-zona"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)_340px]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-vidrio p-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "📰"), " Noticias"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 max-h-[520px] overflow-y-auto scroll-suave pr-1"
  }, noticias.map(function (n) {
    return /*#__PURE__*/React.createElement("a", {
      key: n.id,
      href: n.enlace,
      target: "_blank",
      rel: "noreferrer",
      className: "noticia"
    }, /*#__PURE__*/React.createElement("p", {
      className: "text-xs uppercase tracking-widest text-selva-600 font-semibold mb-1"
    }, n.fuente), /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-carbon-900 text-sm leading-snug"
    }, n.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 mt-1"
    }, n.resumen), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 mt-2"
    }, n.tiempo));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "panel-vidrio p-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "marco-mapa"
  }, /*#__PURE__*/React.createElement(window.MapComponent, {
    reportes: reportes,
    alertas: alertas
  }))), /*#__PURE__*/React.createElement("div", {
    className: "panel-vidrio p-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold mb-3"
  }, "Leyenda"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2 text-sm text-slate-600"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-buena"
  }), " Vía buena"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-regular"
  }), " Vía regular"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-mala"
  }), " Vía mala"), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "punto punto-cerrada"
  }), " Cerrada / Alerta")))), /*#__PURE__*/React.createElement("div", {
    className: "panel-vidrio p-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "font-bold mb-4 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, "⚠️"), " Alertas GeoSentinel"), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 max-h-[520px] overflow-y-auto scroll-suave pr-1"
  }, alertasRecientes.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: "noticia text-sm text-slate-500 text-center"
  }, "Sin alertas por ahora."), alertasRecientes.map(function (a) {
    return /*#__PURE__*/React.createElement("button", {
      key: a.id,
      onClick: function () {
        setDetalle(a);
      },
      className: "alerta-item"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between gap-2"
    }, /*#__PURE__*/React.createElement("p", {
      className: "font-semibold text-carbon-900 text-sm"
    }, a.ubicacion), /*#__PURE__*/React.createElement("span", {
      className: "badge badge-cerrada"
    }, a.estado)), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-600 mt-1"
    }, a.resumen));
  }))))))), /*#__PURE__*/React.createElement("section", {
    id: "seccion-reportes",
    className: "scroll-mt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "etiqueta-seccion"
  }, "Reportes de la comunidad"), /*#__PURE__*/React.createElement("h2", {
    className: "titulo-seccion mt-3"
  }, "Últimos reportes")), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-center mb-10"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: function () {
      setVerReporte(true);
    },
    className: "boton-primario text-base"
  }, "+ Hacer un reporte")), reportesRecientes.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "tarjeta p-10 text-center text-slate-500"
  }, "Todavía no hay reportes. ¡Sé el primero en publicar uno!") : /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
  }, reportesRecientes.map(function (reporte) {
    return /*#__PURE__*/React.createElement("button", {
      key: reporte.id,
      onClick: function () {
        setDetalle(reporte);
      },
      className: claseCard(reporte.estado) + " w-full text-left"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-4"
    }, /*#__PURE__*/React.createElement("span", {
      className: claseBadge(reporte.estado)
    }, reporte.estado), /*#__PURE__*/React.createElement("span", {
      className: "text-xs text-slate-500"
    }, reporte.autor)), /*#__PURE__*/React.createElement("h3", {
      className: "font-bold text-carbon-900 mb-1"
    }, reporte.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-500 mb-3"
    }, "📍 ", reporte.ubicacion || "Sin ubicación"), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-600 line-clamp-2"
    }, reporte.descripcion));
  }))), /*#__PURE__*/React.createElement("section", {
    id: "seccion-vias",
    className: "scroll-mt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-10"
  }, /*#__PURE__*/React.createElement("span", {
    className: "etiqueta-seccion"
  }, "Monitoreo vial"), /*#__PURE__*/React.createElement("h2", {
    className: "titulo-seccion mt-3"
  }, "Estado de las vías")), /*#__PURE__*/React.createElement("div", {
    className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3"
  }, viasActualizadas.map(function (via) {
    return /*#__PURE__*/React.createElement("div", {
      key: via.id,
      className: claseCard(via.estado)
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-3 mb-5"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "font-bold text-carbon-900 leading-snug"
    }, via.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-400 mt-1"
    }, via.desde, " → ", via.hasta, " · ", via.km)), /*#__PURE__*/React.createElement("span", {
      className: claseBadge(via.estado)
    }, via.estado)), /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mini-dato"
    }, /*#__PURE__*/React.createElement("p", {
      className: "t"
    }, "💧 Humedad"), /*#__PURE__*/React.createElement("p", {
      className: "v"
    }, via.humedad, "%")), /*#__PURE__*/React.createElement("div", {
      className: "mini-dato"
    }, /*#__PURE__*/React.createElement("p", {
      className: "t"
    }, "🌡️ Temp."), /*#__PURE__*/React.createElement("p", {
      className: "v"
    }, via.temperatura, "°C")), /*#__PURE__*/React.createElement("div", {
      className: "mini-dato"
    }, /*#__PURE__*/React.createElement("p", {
      className: "t"
    }, "🌧️ Lluvia"), /*#__PURE__*/React.createElement("p", {
      className: "v"
    }, via.precipitacion, "%"))));
  }))), /*#__PURE__*/React.createElement("section", {
    id: "seccion-funciones",
    className: "scroll-mt"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-center mb-12"
  }, /*#__PURE__*/React.createElement("span", {
    className: "etiqueta-seccion"
  }, "Características"), /*#__PURE__*/React.createElement("h2", {
    className: "titulo-seccion mt-3"
  }, "¿Qué hace Vías Chocó?")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6"
  }, [{
    icono: "🛰️",
    titulo: "Información en tiempo real",
    texto: "El estado de las carreteras con reportes de la comunidad."
  }, {
    icono: "🤝",
    titulo: "Reportes sin cuenta",
    texto: "Cualquiera puede reportar en segundos, sin registrarse."
  }, {
    icono: "🗺️",
    titulo: "Mapa interactivo",
    texto: "Todas las alertas y reportes en un mapa del Chocó."
  }, {
    icono: "🔔",
    titulo: "Alertas de sensores",
    texto: "Avisos de riesgo por humedad e inclinación del terreno."
  }, {
    icono: "📰",
    titulo: "Noticias viales",
    texto: "Novedades de redes sociales sobre las vías de la región."
  }, {
    icono: "🌿",
    titulo: "Hecho para el Chocó",
    texto: "Pensado para la realidad del Pacífico colombiano."
  }].map(function (f) {
    return /*#__PURE__*/React.createElement("div", {
      key: f.titulo,
      className: "vidrio-claro vidrio-hover vidrio-glow p-8 text-center"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-4xl mb-4"
    }, f.icono), /*#__PURE__*/React.createElement("h3", {
      className: "font-bold text-carbon-900 mb-2"
    }, f.titulo), /*#__PURE__*/React.createElement("p", {
      className: "text-sm text-slate-500"
    }, f.texto));
  }))), /*#__PURE__*/React.createElement(window.AboutSection, null)), /*#__PURE__*/React.createElement(window.Footer, {
    onNavigate: navegar
  }), verReporte && /*#__PURE__*/React.createElement(window.ReporteModal, {
    vias: vias,
    onClose: function () {
      setVerReporte(false);
    },
    onCrear: crearReporte
  }), verLoginAdmin && /*#__PURE__*/React.createElement(window.LoginModal, {
    onClose: function () {
      setVerLoginAdmin(false);
    },
    onLogin: loginAdmin
  }), detalle && /*#__PURE__*/React.createElement(window.ReportDetailsModal, {
    dato: detalle,
    onClose: function () {
      setDetalle(null);
    }
  }));
}

// Dibujar la aplicacion en la pagina
ReactDOM.createRoot(document.getElementById("aplicacion")).render(/*#__PURE__*/React.createElement(App, null));
