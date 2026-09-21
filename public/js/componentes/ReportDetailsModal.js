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
    return (
      <div className="flex gap-2 py-1">
        <span className="font-semibold text-carbon-900 min-w-[110px]">{propsFila.etiqueta}:</span>
        <span className="text-slate-600">{propsFila.valor}</span>
      </div>
    );
  }

  return (
    <div className="fondo-modal">
      <div className="caja-modal max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-arena-100 text-selva-800 hover:bg-arena-200 transition">✕</button>

        <h2 className="text-2xl font-extrabold text-carbon-900 mb-4">
          {dato.sensorId ? "Detalle de la alerta" : "Detalle del reporte"}
        </h2>

        <div className="text-sm">
          <Fila etiqueta="Vía / Lugar" valor={dato.titulo || dato.ubicacion} />
          <Fila etiqueta="Estado" valor={dato.estado} />
          <Fila etiqueta="Zona" valor={dato.zona} />
          <Fila etiqueta="Ubicación" valor={dato.ubicacion} />
          <Fila etiqueta="Descripción" valor={dato.descripcion || dato.resumen} />
          <Fila etiqueta="Recomendación" valor={dato.recomendacion} />
          <Fila etiqueta="Sensor" valor={dato.sensorId} />
          {dato.nivelRiesgo != null && <Fila etiqueta="Nivel de riesgo" valor={dato.nivelRiesgo + "%"} />}
          <Fila etiqueta="Autor" valor={dato.autor} />
          <Fila etiqueta="Fecha" valor={fechaBonita(dato.fecha)} />
        </div>

        {/* Evidencia: fotos y videos subidos */}
        {dato.archivos && dato.archivos.length > 0 && (
          <div className="mt-5">
            <p className="font-semibold text-carbon-900 mb-2 text-sm">Evidencia</p>
            <div className="grid grid-cols-3 gap-2">
              {dato.archivos.map(function (a, i) {
                return (
                  <div key={i} className="previa">
                    {a.tipo.indexOf("video") === 0 ? (
                      <video src={a.datos} controls></video>
                    ) : (
                      <img src={a.datos} alt="evidencia" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
