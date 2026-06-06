window.TransitAdmin = function TransitAdmin({ transitRecords, setTransitRecords, onBack, onClose, adminName }) {
  const handleReleaseAll = () => {
    const updated = transitRecords.map(record => ({ ...record, estado: 'Liberada' }));
    setTransitRecords(updated);
  };

  return (
    <div className="min-h-screen premium-shell py-12">
      <div className="max-w-[1540px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Panel de Tránsito</h1>
            <p className="mt-2 text-slate-600">Administración rápida de registros de tránsito para {adminName}.</p>
          </div>
          <div className="flex gap-3">
            <button onClick={onBack} className="px-5 py-3 rounded-full bg-slate-100 text-slate-800 hover:bg-slate-200 transition">Volver</button>
            <button onClick={onClose} className="px-5 py-3 rounded-full bg-red-500 text-white hover:bg-red-600 transition">Cerrar</button>
          </div>
        </div>
        <div className="premium-panel rounded-[2rem] p-8 bg-white shadow-xl">
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-semibold text-slate-900">Registros de tránsito</h2>
              <button onClick={handleReleaseAll} className="px-4 py-3 rounded-full bg-emerald-600 text-white hover:bg-emerald-700 transition">Marcar como liberada</button>
            </div>
            <div className="grid gap-4">
              {transitRecords.map(record => (
                <div key={record.placa} className="rounded-[1.75rem] border border-slate-200 p-5 bg-slate-50">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-semibold text-slate-900">{record.placa} — {record.conductor}</span>
                    <span className="text-sm text-slate-500">{record.estado}</span>
                  </div>
                  <p className="text-sm text-slate-600 mt-3">{record.motivo} en {record.lugar} ({record.fecha})</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
