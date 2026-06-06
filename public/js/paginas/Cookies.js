window.CookiesPage = function CookiesPage({ onNavigate }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="img/logoviaa.png" alt="Logo Vías Chocó" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Política de Cookies</p>
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
        <aside className="hidden md:block">
          <nav className="sticky top-24 space-y-3 text-sm">
            <a href="#que-son" className="block hover:text-emerald-600 transition-colors text-slate-700">¿Qué son las cookies?</a>
            <a href="#tipos" className="block hover:text-emerald-600 transition-colors text-slate-700">Tipos de cookies</a>
            <a href="#control" className="block hover:text-emerald-600 transition-colors text-slate-700">Tu control</a>
            <a href="#terceros" className="block hover:text-emerald-600 transition-colors text-slate-700">Cookies de terceros</a>
          </nav>
        </aside>

        <section className="md:col-span-3 space-y-10">
          <div id="que-son" className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-emerald-700 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">01</span>
              ¿Qué son las cookies?
            </h2>
            <p className="leading-relaxed text-slate-600">Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas nuestro sitio web. Estos archivos nos permiten reconocerte, recordar tus preferencias y mejorar tu experiencia de navegación. Son herramientas estándar utilizadas por casi todos los sitios web modernos.</p>
          </div>

          <div id="tipos" className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-emerald-700 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">02</span>
              Tipos de cookies que utilizamos
            </h2>
            <div className="space-y-4">
              <div className="bg-emerald-50 border-l-4 border-emerald-400 p-4">
                <h3 className="font-bold text-slate-900 mb-2">Cookies Esenciales</h3>
                <p className="text-slate-600 text-sm">Necesarias para el funcionamiento básico del sitio, como la autenticación de usuario y la seguridad.</p>
              </div>
              <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                <h3 className="font-bold text-slate-900 mb-2">Cookies de Desempeño</h3>
                <p className="text-slate-600 text-sm">Nos ayudan a entender cómo los visitantes utilizan nuestro sitio para optimizar el rendimiento.</p>
              </div>
              <div className="bg-purple-50 border-l-4 border-purple-400 p-4">
                <h3 className="font-bold text-slate-900 mb-2">Cookies de Funcionalidad</h3>
                <p className="text-slate-600 text-sm">Permiten recordar tus preferencias y personalizaciones en tu próxima visita.</p>
              </div>
            </div>
          </div>

          <div id="control" className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-emerald-700 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">03</span>
              Tu control sobre las cookies
            </h2>
            <p className="mb-4 text-slate-600">Puedes controlar y eliminar cookies de tu dispositivo mediante la configuración de tu navegador:</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              <li><strong>Google Chrome:</strong> Configuración → Privacidad y seguridad → Cookies y datos de otros sitios</li>
              <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad → Cookies y datos de sitios</li>
              <li><strong>Safari:</strong> Preferencias → Privacidad → Gestionar datos de sitios web</li>
              <li><strong>Microsoft Edge:</strong> Configuración → Privacidad y servicios → Cookies y otros datos de sitios</li>
            </ul>
          </div>

          <div id="terceros" className="mb-10">
            <h2 className="text-xl md:text-2xl font-bold text-emerald-700 mb-4 flex items-center">
              <span className="bg-emerald-100 text-emerald-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">04</span>
              Cookies de terceros
            </h2>
            <p className="leading-relaxed text-slate-600">Algunos servicios integrados en Vías Chocó pueden establecer sus propias cookies, como mapas interactivos o herramientas de análisis. Estos terceros tienen sus propias políticas de privacidad y te recomendamos revisarlas.</p>
          </div>

          <div id="contact-container" className="mt-12 p-6 md:p-8 bg-emerald-50 rounded-2xl border-2 border-emerald-200 text-center transition-all">
            <h3 className="text-xl font-bold text-emerald-900 mb-3">¿Preguntas sobre cookies?</h3>
            <p className="text-slate-600 mb-8 max-w-md mx-auto">Si tienes dudas sobre cómo utilizamos las cookies, no dudes en contactarnos.</p>
            <button onClick={() => window.open('mailto:contacto.maturanainnovate@gmail.com?subject=Pregunta sobre Cookies')} className="inline-block bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-8 rounded-lg transition-all shadow-lg hover:shadow-emerald-200">
              Contactar Soporte
            </button>
          </div>

          <hr className="my-10 border-slate-100" />
        </section>
      </main>

      <window.Footer onNavigate={onNavigate} slim={false} />
    </div>
  );
};
