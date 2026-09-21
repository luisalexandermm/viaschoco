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
    if (estado === "Mala") return "#ea580c";     // naranja
    if (estado === "Regular") return "#f59e0b";  // amarillo
    return "#16a34a";                             // verde (Buena)
  }

  // Crea un icono redondo de color para el mapa
  function crearIcono(color) {
    return L.divIcon({
      className: "",
      html:
        '<div style="width:20px;height:20px;border-radius:50%;background:' +
        color +
        ';border:3px solid white;box-shadow:0 4px 10px rgba(0,0,0,0.3);"></div>',
      iconSize: [20, 20],
      iconAnchor: [10, 10],
    });
  }

  // 1) Crear el mapa una sola vez
  React.useEffect(function () {
    if (mapaRef.current) return; // ya existe, no lo creamos de nuevo

    mapaRef.current = L.map(contenedorRef.current, {
      center: centro,
      zoom: zoom,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
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
        alHacerClicRef.current({ lat: e.latlng.lat, lng: e.latlng.lng });
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
      var texto =
        "<strong>" + (reporte.titulo || "Reporte") + "</strong><br/>" +
        (reporte.ubicacion || "") + "<br/>Estado: " + reporte.estado;
      L.marker([reporte.lat, reporte.lng], { icon: icono })
        .bindPopup(texto)
        .addTo(capaMarcadores.current);
    });

    // Marcadores de alertas de sensores (rojo)
    alertas.forEach(function (alerta) {
      if (!alerta.lat || !alerta.lng) return;
      var icono = crearIcono("#dc2626");
      var texto =
        "<strong>⚠ " + (alerta.ubicacion || "Alerta") + "</strong><br/>" +
        (alerta.resumen || "");
      L.marker([alerta.lat, alerta.lng], { icon: icono })
        .bindPopup(texto)
        .addTo(capaMarcadores.current);
    });

    // Marcador temporal (cuando el usuario elige ubicacion para un reporte)
    if (marcadorTemporal) {
      var iconoTemp = crearIcono("#2f7d50");
      L.marker([marcadorTemporal.lat, marcadorTemporal.lng], { icon: iconoTemp })
        .bindPopup("Ubicación seleccionada")
        .addTo(capaMarcadores.current);
    }
  }, [reportes, alertas, marcadorTemporal]);

  return <div ref={contenedorRef} className="w-full h-full" />;
};
