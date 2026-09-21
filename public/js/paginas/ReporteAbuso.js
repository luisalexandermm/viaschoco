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

  return (
    <div className="min-h-screen">
      <header className="encabezado">
        <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="img/logoviaa.png" alt="Logo" className="w-10 h-10 rounded-2xl object-cover" />
            <h1 className="text-lg font-extrabold text-carbon-900">Reportar abuso</h1>
          </div>
          <button onClick={function () { onNavigate("legal"); }} className="boton-secundario">← Volver</button>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-5 py-12">
        <div className="tarjeta p-8 md:p-10">
          <h2 className="text-2xl font-extrabold text-carbon-900 mb-2">Cuéntanos qué pasó</h2>
          <p className="text-slate-500 mb-6">Tu reporte nos ayuda a mantener la comunidad segura.</p>

          {enviado ? (
            <div className="rounded-2xl bg-selva-50 border border-selva-200 p-6 text-center">
              <p className="text-lg font-bold text-selva-800 mb-2">¡Gracias por tu reporte!</p>
              <p className="text-slate-600 mb-6">Lo revisaremos lo antes posible.</p>
              <button onClick={function () { onNavigate("main"); }} className="boton-primario">Volver al inicio</button>
            </div>
          ) : (
            <form onSubmit={enviar} className="space-y-4">
              <div>
                <label className="etiqueta-campo">Tu correo</label>
                <input type="email" className="campo" placeholder="tu@correo.com" required />
              </div>
              <div>
                <label className="etiqueta-campo">Tipo de problema</label>
                <select className="campo">
                  <option>Contenido inapropiado</option>
                  <option>Reporte falso</option>
                  <option>Comportamiento de un usuario</option>
                  <option>Otro</option>
                </select>
              </div>
              <div>
                <label className="etiqueta-campo">Descripción</label>
                <textarea className="campo" rows="4" placeholder="Describe lo que sucedió..." required></textarea>
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={function () { onNavigate("legal"); }} className="boton-secundario">Cancelar</button>
                <button type="submit" className="boton-primario">Enviar reporte</button>
              </div>
            </form>
          )}
        </div>
      </main>
      <window.Footer onNavigate={onNavigate} />
    </div>
  );
};
