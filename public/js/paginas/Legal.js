window.LegalPage = function LegalPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="img/logoviaa.png" alt="Logo Vías Chocó" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Panel Legal</p>
              <h1 className="text-lg font-bold text-slate-950">Vías Chocó</h1>
            </div>
          </div>
          <button onClick={() => onNavigate('main')} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition">
            ← Volver a Vías Chocó
          </button>
        </div>
      </header>
      <div className="pt-24"></div>

      <main className="max-w-6xl mx-auto my-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <nav className="sticky top-8 bg-white p-6 rounded-xl shadow-sm border-l-4 border-emerald-500">
            <h3 className="font-bold text-blue-900 mb-4 uppercase text-xs tracking-widest">Contenido</h3>
            <ul className="space-y-3 text-sm text-slate-700">
              <li>
                <button onClick={() => onNavigate('terminos')} className="text-left hover:text-emerald-600 transition-colors font-semibold text-emerald-700">1. Términos y Condiciones</button>
              </li>
              <li>
                <button onClick={() => alert('Política de Privacidad: Aquí se describe cómo recolectamos y protegemos tus datos. Contáctanos para más detalles.')} className="text-left hover:text-emerald-600 transition-colors">2. Política de Privacidad</button>
              </li>
              <li>
                <button onClick={() => alert('Cookies: Utilizamos cookies para mejorar tu experiencia. Puedes controlar esto en la configuración de tu navegador.')} className="text-left hover:text-emerald-600 transition-colors">3. Cookies</button>
              </li>
              <li>
                <button onClick={() => window.open('mailto:contacto.maturanainnovate@gmail.com?subject=Consulta Legal')} className="text-left hover:text-emerald-600 transition-colors">4. Contacto</button>
              </li>
            </ul>
          </nav>
        </aside>

        <section className="md:col-span-3 bg-white p-6 sm:p-10 md:p-12 rounded-xl shadow-sm border border-slate-200">
          <div className="space-y-10">
            <div className="rounded-3xl bg-slate-50 p-8 border border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Bienvenido al centro legal</h2>
              <p className="text-slate-600 leading-relaxed">Encuentra aquí la información sobre los términos de uso, privacidad, cookies y contacto del servicio. Este espacio te permite consultar las políticas principales de Vías Chocó y regresar fácilmente a la plataforma.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Términos y Condiciones</h3>
                <p className="text-slate-600 leading-relaxed mb-6">Lee las reglas y responsabilidades que rigen el uso de Vías Chocó. Allí encontrarás qué esperar y cómo usar la plataforma de forma segura.</p>
                <button onClick={() => onNavigate('terminos')} className="rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400 transition">Ver términos</button>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Política de Privacidad</h3>
                <p className="text-slate-600 leading-relaxed mb-6">Describe cómo recolectamos, usamos y protegemos la información de las personas que usan el servicio.</p>
                <button onClick={() => onNavigate('legal')} className="rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">Ver privacidad</button>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Cookies</h3>
                <p className="text-slate-600 leading-relaxed">Explicamos el uso de cookies y tecnologías similares que ayudan a mejorar tu experiencia en la plataforma.</p>
              </div>
              <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
                <h3 className="text-xl font-semibold text-slate-900 mb-4">Contacto legal</h3>
                <p className="text-slate-600 leading-relaxed">Si necesitas ayuda con estos documentos, contáctanos en <a href="mailto:contacto.maturanainnovate@gmail.com" className="text-emerald-600 hover:text-emerald-500">contacto.maturanainnovate@gmail.com</a>.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <window.Footer onNavigate={onNavigate} slim={false} />
    </div>
  );
};
