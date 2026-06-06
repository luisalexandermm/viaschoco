window.Footer = function Footer({ onNavigate, slim }) {
  const outerClass = slim ? 'bg-gradient-to-b from-slate-950 to-slate-900 text-white py-8 mt-0 border-t border-emerald-500' : 'bg-gradient-to-b from-slate-950 to-slate-900 text-white py-20 mt-20 border-t-2 border-emerald-500';
  const innerPadding = slim ? 'px-6 sm:px-8 lg:px-8' : 'px-6 sm:px-8 lg:px-12';
  return (
    <footer className={outerClass}>
      <div className={`max-w-[1540px] mx-auto ${innerPadding}`}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src="img/logoviaa.png" alt="Logo" className="w-12 h-12 rounded-lg object-cover" />
              <h4 className="text-2xl font-black text-white">Vías <span className="text-emerald-400">Chocó</span></h4>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">Plataforma colaborativa de información vial en tiempo real para la región del Chocó, Colombia. Mejorando la seguridad y movilidad de la comunidad.</p>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-[0.1em]">Plataforma</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><button type="button" onClick={() => onNavigate?.('inicio-seccion')} className="hover:text-emerald-400 transition">Inicio</button></li>
              <li><button type="button" onClick={() => onNavigate?.('seccion-mapa')} className="hover:text-emerald-400 transition">Mapa en vivo</button></li>
              <li><button type="button" onClick={() => onNavigate?.('seccion-reportes')} className="hover:text-emerald-400 transition">Reportes</button></li>
              <li><button type="button" onClick={() => onNavigate?.('seccion-funciones')} className="hover:text-emerald-400 transition">Noticias</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-[0.1em]">Contacto</h4>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-400 mt-1">✉️</span>
                <a href="mailto:contacto.maturanainnovate@gmail.com" className="hover:text-emerald-400 transition break-all">contacto.maturanainnovate@gmail.com</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">📱</span>
                <a href="https://wa.me/573145312045" target="_blank" rel="noreferrer" className="hover:text-emerald-400 transition">+57 314 531 2045</a>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-400">📍</span>
                <span>Quibdó, Chocó</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 text-white uppercase tracking-[0.1em]">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-300">
              <li><button type="button" onClick={() => onNavigate?.('terminos')} className="hover:text-emerald-400 transition">Términos de Uso</button></li>
              <li><button type="button" onClick={() => onNavigate?.('legal')} className="hover:text-emerald-400 transition">Política de Privacidad</button></li>
              <li><button type="button" onClick={() => onNavigate?.('legal')} className="hover:text-emerald-400 transition">Cookies</button></li>
              <li><button type="button" onClick={() => onNavigate?.('legal')} className="hover:text-emerald-400 transition">Reportar Abuso</button></li>
            </ul>
          </div>
        </div>

  

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <p className="text-sm text-slate-400">© 2025 Vías del Chocó. Realizado por <span className="font-bold text-white">Maturana Innovate Tech</span></p>
            <p className="text-xs text-slate-500 mt-2">Plataforma desarrollada con tecnología moderna para mejorar la movilidad y seguridad vial en la región.</p>
          </div>
          <div className="flex justify-center md:justify-end gap-6">
            <a href="https://www.facebook.com/viaschoco" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500 flex items-center justify-center text-white transition font-bold">f</a>
            <a href="https://twitter.com/viaschoco" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500 flex items-center justify-center text-white transition font-bold">𝕏</a>
            <a href="https://wa.me/573145312045" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500 flex items-center justify-center text-white transition font-bold">W</a>
            <a href="mailto:alrxandermarturana76@gmail.com" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-emerald-500 flex items-center justify-center text-white transition">✉️</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
