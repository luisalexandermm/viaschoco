window.LoadingOverlay = function LoadingOverlay({ message = 'Cargando Vías Chocó...' }) {
  return (
    <div className="fixed inset-0 z-[60] bg-white flex flex-col items-center justify-center gap-6 px-6">
      <div className="relative w-28 h-28">
        <div className="loading-ring loading-ring-green"></div>
        <div className="loading-ring loading-ring-yellow"></div>
        <div className="loading-ring loading-ring-blue"></div>
      </div>
      <p className="text-lg font-semibold text-slate-900 text-center">{message}</p>
    </div>
  );
}
