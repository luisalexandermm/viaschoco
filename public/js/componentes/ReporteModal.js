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
  var [coords, setCoords] = React.useState(null);   // punto elegido en el mapa
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
          return prev.concat([{ tipo: file.type, datos: ev.target.result }]);
        });
      };
      lector.readAsDataURL(file); // lo guardamos como texto (base64)
    });
    e.target.value = ""; // permitir subir el mismo archivo otra vez
  }

  function quitarArchivo(indice) {
    setArchivos(function (prev) {
      return prev.filter(function (_, i) { return i !== indice; });
    });
  }

  // Enviar el reporte
  async function enviar(e) {
    e.preventDefault();
    if (!viaId || !estado) {
      alert("Elige la vía y el estado antes de enviar.");
      return;
    }
    var via = vias.find(function (v) { return v.id === Number(viaId); });
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
      lng: lng,
    };
    await onCrear(reporte);
  }

  return (
    <div className="fondo-modal">
      <div className="caja-modal max-w-4xl p-6 sm:p-8 relative scroll-suave">
        <button onClick={onClose} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-arena-100 text-selva-800 hover:bg-arena-200 transition">✕</button>

        <h2 className="text-3xl font-extrabold text-carbon-900 mb-1">Hacer un reporte</h2>
        <p className="text-sm text-slate-500 mb-6">Cuéntale a la comunidad cómo está la vía.</p>

        <form onSubmit={enviar} className="space-y-6">
          {/* Dos columnas para mejor proporción */}
          <div className="grid gap-6 md:grid-cols-2">

            {/* Columna izquierda: datos */}
            <div className="space-y-4">
              <div>
                <label className="etiqueta-campo">Tu nombre (opcional)</label>
                <input className="campo" placeholder="Ej: María, o déjalo en blanco" value={nombre} onChange={function (e) { setNombre(e.target.value); }} />
              </div>

              <div>
                <label className="etiqueta-campo">Vía</label>
                <select className="campo" value={viaId} onChange={function (e) { setViaId(e.target.value); }}>
                  <option value="">Selecciona una vía</option>
                  {vias.map(function (v) {
                    return <option key={v.id} value={v.id}>{v.titulo}</option>;
                  })}
                </select>
              </div>

              <div>
                <label className="etiqueta-campo">Estado de la vía</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Buena", "Regular", "Mala", "Cerrada"].map(function (op) {
                    var sel = estado === op ? " sel-" + op.toLowerCase() : "";
                    return (
                      <button type="button" key={op} onClick={function () { setEstado(op); }} className={"chip-estado" + sel}>
                        {op}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="etiqueta-campo">Zona o sector</label>
                <input className="campo" placeholder="Ej: Barrio, corregimiento o municipio" value={zona} onChange={function (e) { setZona(e.target.value); }} />
              </div>

              <div>
                <label className="etiqueta-campo">Ubicación específica</label>
                <input className="campo" placeholder="Ej: Km 45 - 48" value={ubicacion} onChange={function (e) { setUbicacion(e.target.value); }} />
              </div>
            </div>

            {/* Columna derecha: mapa y evidencia */}
            <div className="space-y-4">
              <div>
                <label className="etiqueta-campo">Ubicación en el mapa (opcional)</label>
                <div className="h-52 rounded-2xl overflow-hidden border border-white/70">
                  <window.MapComponent
                    reportes={[]}
                    alertas={[]}
                    permitirClic={true}
                    alHacerClic={alHacerClicMapa}
                    marcadorTemporal={coords}
                    centro={[5.7, -76.3]}
                    zoom={7}
                  />
                </div>
                {coords && (
                  <p className="text-xs text-selva-700 mt-2 font-semibold">
                    Punto marcado: {coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}
                  </p>
                )}
              </div>

              <div>
                <label className="etiqueta-campo">Fotos o videos (opcional)</label>
                <label className="subir-zona block">
                  <input type="file" accept="image/*,video/*" multiple onChange={alSubirArchivos} className="hidden" />
                  <span className="text-2xl">📷</span>
                  <p className="text-sm font-semibold text-selva-700 mt-1">Toca para subir</p>
                  <p className="text-xs text-slate-500">Imágenes o videos (máx 8 MB)</p>
                </label>

                {archivos.length > 0 && (
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    {archivos.map(function (a, i) {
                      return (
                        <div key={i} className="previa">
                          {a.tipo.indexOf("video") === 0 ? (
                            <video src={a.datos} muted></video>
                          ) : (
                            <img src={a.datos} alt="evidencia" />
                          )}
                          <button type="button" className="previa-quitar" onClick={function () { quitarArchivo(i); }}>✕</button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Descripción y recomendación (ancho completo) */}
          <div>
            <label className="etiqueta-campo">Descripción</label>
            <textarea className="campo" rows="3" placeholder="Describe el problema..." value={descripcion} onChange={function (e) { setDescripcion(e.target.value); }}></textarea>
          </div>
          <div>
            <label className="etiqueta-campo">Recomendación</label>
            <textarea className="campo" rows="2" placeholder="Ej: Reducir velocidad, buscar ruta alterna..." value={recomendacion} onChange={function (e) { setRecomendacion(e.target.value); }}></textarea>
          </div>

          <div className="flex gap-3 justify-end">
            <button type="button" onClick={onClose} className="boton-secundario">Cancelar</button>
            <button type="submit" className="boton-primario">Enviar reporte</button>
          </div>
        </form>
      </div>
    </div>
  );
};
