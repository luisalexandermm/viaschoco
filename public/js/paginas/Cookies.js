// ============================================================
//  PAGINA DE COOKIES
// ============================================================

window.CookiesPage = function CookiesPage(props) {
  var onNavigate = props.onNavigate;

  var items = [
    { titulo: "¿Qué son las cookies?", texto: "Son pequeños archivos que se guardan en tu navegador para recordar información, como tu sesión iniciada." },
    { titulo: "¿Para qué las usamos?", texto: "Para mantener tu sesión activa y recordar tus preferencias mientras usas la plataforma. No las usamos para publicidad." },
    { titulo: "¿Cómo controlarlas?", texto: "Puedes borrar o bloquear las cookies desde la configuración de tu navegador en cualquier momento." },
  ];

  return (
    <div className="min-h-screen">
      <header className="encabezado">
        <div className="max-w-4xl mx-auto px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="img/logoviaa.png" alt="Logo" className="w-10 h-10 rounded-2xl object-cover" />
            <h1 className="text-lg font-extrabold text-carbon-900">Política de cookies</h1>
          </div>
          <button onClick={function () { onNavigate("legal"); }} className="boton-secundario">← Volver</button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-5 py-12">
        <div className="rounded-3xl bg-selva-900 text-white p-10 mb-8">
          <h2 className="titulo-display text-3xl mb-2">Uso de cookies</h2>
          <p className="text-white/80">En Vías Chocó usamos cookies simples solo para que la aplicación funcione mejor.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {items.map(function (item) {
            return (
              <div key={item.titulo} className="tarjeta tarjeta-hover p-8">
                <h3 className="text-lg font-bold text-carbon-900 mb-3">{item.titulo}</h3>
                <p className="text-slate-600">{item.texto}</p>
              </div>
            );
          })}
        </div>
      </main>
      <window.Footer onNavigate={onNavigate} />
    </div>
  );
};
