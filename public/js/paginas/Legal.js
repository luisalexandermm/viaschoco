// ============================================================
//  PAGINA LEGAL (centro de documentos)
// ============================================================

window.LegalPage = function LegalPage(props) {
  var onNavigate = props.onNavigate;

  // Encabezado pequeno con boton de volver (se repite en las paginas legales)
  function Cabecera() {
    return (
      <header className="encabezado">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="img/logoviaa.png" alt="Logo" className="w-10 h-10 rounded-2xl object-cover" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Centro legal</p>
              <h1 className="text-lg font-extrabold text-carbon-900">Vías Chocó</h1>
            </div>
          </div>
          <button onClick={function () { onNavigate("main"); }} className="boton-secundario">← Volver</button>
        </div>
      </header>
    );
  }

  var tarjetas = [
    { titulo: "Términos y condiciones", texto: "Reglas y responsabilidades para usar la plataforma de forma segura.", boton: "Ver términos", vista: "terminos" },
    { titulo: "Política de privacidad", texto: "Cómo recolectamos, usamos y protegemos la información de las personas.", boton: "Ver privacidad", vista: "legal" },
    { titulo: "Cookies", texto: "Uso de cookies y tecnologías similares para mejorar tu experiencia.", boton: "Ver cookies", vista: "cookies" },
    { titulo: "Reportar abuso", texto: "Cuéntanos si encuentras contenido o comportamiento inapropiado.", boton: "Reportar", vista: "reporte-abuso" },
  ];

  return (
    <div className="min-h-screen">
      <Cabecera />
      <main className="max-w-5xl mx-auto px-5 py-12">
        <div className="rounded-3xl bg-selva-900 text-white p-10 mb-8">
          <h2 className="titulo-display text-3xl mb-3">Bienvenido al centro legal</h2>
          <p className="text-white/80 max-w-2xl">
            Aquí encuentras la información sobre los términos de uso, la privacidad, las cookies y cómo reportar abuso en Vías Chocó.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {tarjetas.map(function (t) {
            return (
              <div key={t.titulo} className="tarjeta tarjeta-hover p-8">
                <h3 className="text-xl font-bold text-carbon-900 mb-3">{t.titulo}</h3>
                <p className="text-slate-600 mb-6">{t.texto}</p>
                <button onClick={function () { onNavigate(t.vista); }} className="boton-primario">{t.boton}</button>
              </div>
            );
          })}
        </div>

        <div className="tarjeta p-8 mt-6">
          <h3 className="text-lg font-bold text-carbon-900 mb-2">Contacto legal</h3>
          <p className="text-slate-600">
            Si necesitas ayuda con estos documentos, escríbenos a{" "}
            <a href="mailto:contacto.maturanainnovate@gmail.com" className="text-selva-600 font-semibold">contacto.maturanainnovate@gmail.com</a>.
          </p>
        </div>
      </main>
      <window.Footer onNavigate={onNavigate} />
    </div>
  );
};
