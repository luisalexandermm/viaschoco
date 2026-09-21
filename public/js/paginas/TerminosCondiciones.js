// ============================================================
//  PAGINA DE TERMINOS Y CONDICIONES
// ============================================================

window.TerminosCondicionesPage = function TerminosCondicionesPage(props) {
  var onNavigate = props.onNavigate;

  // Lista de puntos de los terminos (para no repetir codigo)
  var puntos = [
    { numero: "01", titulo: "Aceptación de los términos", texto: "Al usar la plataforma, aceptas estos términos y condiciones. Si no estás de acuerdo, te pedimos no usar el servicio." },
    { numero: "02", titulo: "Reglas de uso", texto: "No realizar actividades ilegales o fraudulentas, cuidar tus datos de acceso, no intentar vulnerar la seguridad y respetar a los demás usuarios." },
    { numero: "03", titulo: "Propiedad intelectual", texto: "El contenido, las marcas y el software del sitio pertenecen a la plataforma. Se prohíbe su reproducción sin autorización." },
    { numero: "04", titulo: "Limitación de responsabilidad", texto: "La plataforma se ofrece \"tal cual\", sin garantía de funcionamiento ininterrumpido. La información es orientativa." },
  ];

  return (
    <div className="min-h-screen">
      <header className="encabezado">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="img/logoviaa.png" alt="Logo" className="w-10 h-10 rounded-2xl object-cover" />
            <h1 className="text-lg font-extrabold text-carbon-900">Términos y condiciones</h1>
          </div>
          <button onClick={function () { onNavigate("legal"); }} className="boton-secundario">← Volver</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-12">
        <div className="tarjeta p-8 md:p-10 space-y-8">
          {puntos.map(function (punto) {
            return (
              <div key={punto.numero}>
                <h2 className="flex items-center gap-3 text-xl font-bold text-carbon-900 mb-2">
                  <span className="w-9 h-9 rounded-full bg-selva-100 text-selva-700 flex items-center justify-center text-sm font-bold">{punto.numero}</span>
                  {punto.titulo}
                </h2>
                <p className="text-slate-600 leading-relaxed pl-12">{punto.texto}</p>
              </div>
            );
          })}

          {/* Aceptar */}
          <div className="rounded-3xl bg-selva-50 border border-selva-200 p-8 text-center">
            <h3 className="text-xl font-bold text-selva-900 mb-2">¿Aceptas los términos y condiciones?</h3>
            <p className="text-slate-600 mb-6 max-w-md mx-auto">Confirma que has leído y aceptas nuestras reglas para seguir usando la plataforma.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={function () { alert("¡Gracias! Has aceptado los términos y condiciones."); onNavigate("main"); }}
                className="boton-primario"
              >
                Acepto los términos
              </button>
              <button onClick={function () { onNavigate("legal"); }} className="boton-secundario">Volver</button>
            </div>
          </div>
        </div>
      </main>
      <window.Footer onNavigate={onNavigate} />
    </div>
  );
};
