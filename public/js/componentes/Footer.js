// ============================================================
//  PIE DE PAGINA (Footer)
//  Muestra la informacion de la marca, enlaces y contacto.
// ============================================================

window.Footer = function Footer(props) {
  var onNavigate = props.onNavigate;

  return (
    <footer className="bg-carbon-900 text-white">
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Marca */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="img/logoviaa.png" alt="Logo" className="w-11 h-11 rounded-2xl object-cover" />
              <h4 className="text-xl font-extrabold">Vías <span className="text-selva-400">Chocó</span></h4>
            </div>
            <p className="text-sm text-white/70 leading-relaxed">
              Plataforma colaborativa de información vial en tiempo real para la región del Chocó, Colombia.
            </p>
          </div>

          {/* Plataforma */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">Plataforma</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><button onClick={function () { onNavigate("inicio-seccion"); }} className="hover:text-selva-400 transition">Inicio</button></li>
              <li><button onClick={function () { onNavigate("seccion-mapa"); }} className="hover:text-selva-400 transition">Mapa en vivo</button></li>
              <li><button onClick={function () { onNavigate("seccion-reportes"); }} className="hover:text-selva-400 transition">Reportes</button></li>
              <li><button onClick={function () { onNavigate("seccion-vias"); }} className="hover:text-selva-400 transition">Estado de vías</button></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">Contacto</h4>
            <ul className="space-y-3 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-selva-400">✉</span>
                <a href="mailto:contacto.maturanainnovate@gmail.com" className="hover:text-selva-400 transition break-all">contacto.maturanainnovate@gmail.com</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-selva-400">📱</span>
                <a href="https://wa.me/573145312045" target="_blank" rel="noreferrer" className="hover:text-selva-400 transition">+57 314 531 2045</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-selva-400">📍</span>
                <span>Quibdó, Chocó</span>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li><button onClick={function () { onNavigate("terminos"); }} className="hover:text-selva-400 transition">Términos y condiciones</button></li>
              <li><button onClick={function () { onNavigate("legal"); }} className="hover:text-selva-400 transition">Política de privacidad</button></li>
              <li><button onClick={function () { onNavigate("cookies"); }} className="hover:text-selva-400 transition">Cookies</button></li>
              <li><button onClick={function () { onNavigate("reporte-abuso"); }} className="hover:text-selva-400 transition">Reportar abuso</button></li>
            </ul>
          </div>
        </div>

        {/* Linea final */}
        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60 text-center sm:text-left">
            © 2026 Vías del Chocó · Realizado por <span className="font-semibold text-white">Maturana Tech</span>
          </p>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/viaschoco" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-selva-500 flex items-center justify-center text-white transition font-bold">f</a>
            <a href="https://wa.me/573145312045" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-selva-500 flex items-center justify-center text-white transition font-bold">W</a>
            <a href="mailto:contacto.maturanainnovate@gmail.com" className="w-9 h-9 rounded-full bg-white/10 hover:bg-selva-500 flex items-center justify-center text-white transition">✉</a>
            {/* Punto discreto: acceso al panel de administrador */}
            <button onClick={function () { onNavigate("acceso-admin"); }} className="admin-punto ml-2" title="Acceso administrador" aria-label="Acceso administrador"></button>
          </div>
        </div>
      </div>
    </footer>
  );
};
