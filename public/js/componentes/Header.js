window.Header = function Header({ userName, isAdmin, showMenu, setShowMenu, onLogout, onNavigate }) {
  return (
    <header className="w-full premium-header sticky top-0 z-50">
      <div className="max-w-[1540px] mx-auto flex flex-wrap items-center justify-between px-6 py-5 gap-4">
        <button onClick={() => onNavigate('inicio-seccion')} className="flex items-center gap-3 hover:opacity-80 transition">
          <img src="img/logoviaa.png" alt="Logo" className="w-14 h-14 rounded-3xl object-cover shadow-sm" />
          <span className="text-2xl md:text-3xl font-black tracking-tight text-slate-900">Vías <span className="text-emerald-500">Chocó</span></span>
        </button>

        <nav className="hidden md:flex items-center gap-3">
          <button onClick={() => onNavigate('inicio-seccion')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-slate-100/90 hover:bg-slate-200 transition">Inicio</button>
          <button onClick={() => onNavigate('seccion-funciones')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-slate-100/90 hover:bg-slate-200 transition">¿Qué hace?</button>
          <button onClick={() => onNavigate('seccion-mapa')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-slate-100/90 hover:bg-slate-200 transition">Mapa</button>
          <button onClick={() => onNavigate('seccion-sobre-nosotros')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-slate-100/90 hover:bg-slate-200 transition">Sobre nosotros</button>
          <button onClick={() => onNavigate('legal')} className="px-4 py-2 rounded-full text-sm font-medium text-slate-700 bg-slate-100/90 hover:bg-slate-200 transition">Legal</button>
        </nav>

        <div className="flex items-center gap-2">
          <button onClick={() => setShowMenu(prev => !prev)} className="md:hidden p-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition">{showMenu ? 'Cerrar' : 'Menú'}</button>
          <span className="hidden md:block text-sm text-slate-600 font-medium">
            {userName ? (userName.includes('@') ? userName.split('@')[0] : userName) : 'Invitado'}
          </span>
          {isAdmin && <button onClick={() => onNavigate('admin')} className="px-4 py-2 bg-slate-950 text-white font-semibold rounded-full hover:bg-slate-800 transition">Admin</button>}
          <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition">Salir</button>
        </div>
      </div>

      {showMenu && (
        <div className="md:hidden bg-white/95 border-t border-slate-200/60 px-4 py-4 shadow-xl backdrop-blur-xl">
          <nav className="flex flex-col gap-3">
            <button onClick={() => onNavigate('inicio-seccion')} className="w-full text-left px-4 py-3 text-slate-700 bg-slate-100/90 hover:bg-slate-200 rounded-2xl">Inicio</button>
            <button onClick={() => onNavigate('seccion-funciones')} className="w-full text-left px-4 py-3 text-slate-700 bg-slate-100/90 hover:bg-slate-200 rounded-2xl">¿Qué hace?</button>
            <button onClick={() => onNavigate('seccion-mapa')} className="w-full text-left px-4 py-3 text-slate-700 bg-slate-100/90 hover:bg-slate-200 rounded-2xl">Mapa</button>
            <button onClick={() => onNavigate('seccion-sobre-nosotros')} className="w-full text-left px-4 py-3 text-slate-700 bg-slate-100/90 hover:bg-slate-200 rounded-2xl">Sobre nosotros</button>
          </nav>
        </div>
      )}
    </header>
  );
}
