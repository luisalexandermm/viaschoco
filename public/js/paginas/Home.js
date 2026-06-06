window.HomeSection = function HomeSection({ onLoginClick, onRegisterClick }) {
  return (
    <div className="w-full min-h-[85vh] bg-cover bg-center flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url('img/logo.jpeg')" }}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 text-white px-6 py-10 max-w-[1340px] w-full mx-auto">
        <div className="flex flex-col items-center justify-center gap-10 lg:grid lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="w-full text-center lg:text-left">
            <div className="mb-8 flex justify-center lg:justify-start">
              <img src="img/logoviaa.png" alt="Vías del Chocó" className="h-24 md:h-28 rounded-3xl shadow-2xl" />
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black drop-shadow-2xl mb-4">Vías del Chocó</h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-100 drop-shadow-lg mb-12 max-w-3xl mx-auto lg:mx-0">Información actualizada sobre el estado de las carreteras, alertas de incidentes y reportes ciudadanos para el Chocó.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={onLoginClick} className="w-full sm:w-auto px-8 py-4 rounded-full premium-btn-secondary font-bold text-base sm:text-lg hover:bg-slate-800/70 transition">Iniciar sesión</button>
              <button onClick={onRegisterClick} className="w-full sm:w-auto px-8 py-4 rounded-full premium-btn-primary font-bold text-base sm:text-lg hover:opacity-95 transition">Registrarse</button>
            </div>
          </div>
          <div className="mx-auto w-full max-w-md lg:max-w-sm text-center text-slate-100">
            <div className="rounded-[2rem] border border-slate-200 bg-white/95 p-8 shadow-2xl home-pearl-block">
              <h2 className="text-xl font-semibold mb-3 text-slate-900">Estado del servicio</h2>
              <p className="text-sm text-slate-700 leading-7">Consulta tráfico, alertas y condiciones de vías con una interfaz amplia y moderna pensada para el 2026.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
