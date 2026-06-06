window.TerminosCondicionesPage = function TerminosCondicionesPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="img/logoviaa.png" alt="Logo Vías Chocó" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Términos y Condiciones</p>
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
              <li><a href="#aceptacion" className="hover:text-green-600 transition-colors">1. Aceptación de Términos</a></li>
              <li><a href="#uso" className="hover:text-green-600 transition-colors">2. Reglas de Uso</a></li>
              <li><a href="#propiedad" className="hover:text-green-600 transition-colors">3. Propiedad Intelectual</a></li>
              <li><a href="#limitacion" className="hover:text-green-600 transition-colors">4. Limitación de Responsabilidad</a></li>
              <li><a href="#contacto" className="hover:text-green-600 transition-colors">5. Contacto</a></li>
            </ul>
          </nav>
        </aside>

        <section className="md:col-span-3 bg-white p-6 sm:p-10 md:p-12 rounded-xl shadow-sm border border-slate-200">
          <div id="aceptacion" className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">01</span>
              Aceptación de los Términos
            </h2>
            <p className="leading-relaxed text-slate-600">Al acceder y utilizar nuestra plataforma, usted acepta estar sujeto a estos términos y condiciones. Si no está de acuerdo con alguna parte de estos términos, le rogamos que no utilice nuestros servicios.</p>
          </div>

          <div id="uso" className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">02</span>
              Reglas de la Plataforma
            </h2>
            <p className="mb-4 text-slate-600">Para mantener una comunidad segura, los usuarios se comprometen a:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li>No realizar actividades ilegales o fraudulentas.</li>
              <li>Mantener la confidencialidad de sus credenciales de acceso.</li>
              <li>No intentar vulnerar la seguridad de los sistemas.</li>
              <li>Respetar la integridad de otros usuarios de la comunidad.</li>
            </ul>
          </div>

          <div id="propiedad" className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">03</span>
              Propiedad Intelectual
            </h2>
            <p className="leading-relaxed text-slate-600">Todo el contenido, marcas y software en este sitio son propiedad de la Plataforma o sus licenciantes. Se prohíbe la reproducción total o parcial sin autorización previa por escrito.</p>
          </div>

          <div id="limitacion" className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-blue-800 mb-4 flex items-center">
              <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">04</span>
              Limitación de Responsabilidad
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 italic text-slate-700 text-sm">
              La plataforma se proporciona "tal cual" sin garantías explícitas o implícitas de funcionamiento ininterrumpido.
            </div>
          </div>

          <div id="decision-container" className="mt-12 p-6 md:p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-center transition-all">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">¿Aceptas los términos y condiciones?</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">Para continuar disfrutando de nuestros servicios, es necesario que confirmes que has leído y aceptas nuestras reglas.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button onClick={() => {alert('¡Gracias! Has aceptado nuestros términos y condiciones.'); onNavigate('main');}} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-6 md:px-10 rounded-xl transition-all shadow-lg hover:shadow-emerald-200 active:scale-95">Acepto los términos</button>
              <button onClick={() => onNavigate('legal')} className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 font-semibold py-3 px-10 rounded-xl transition-all active:scale-95">Volver</button>
            </div>
          </div>

          <hr className="my-10 border-slate-100" />

          <footer id="contacto" className="text-center">
            <p className="text-slate-500 mb-4 text-sm">¿Tienes preguntas sobre estos términos?</p>
            <button onClick={() => window.open('mailto:contacto.maturanainnovate@gmail.com?subject=Pregunta sobre Términos y Condiciones')} className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-6 rounded-full transition-all">Contactar Soporte</button>
          </footer>
        </section>
      </main>

      <window.Footer onNavigate={onNavigate} slim={false} />
    </div>
  );
};
