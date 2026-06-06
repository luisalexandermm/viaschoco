window.ReportsSection = function ReportsSection({ recentReports, onOpenReport, onCreateReport }) {
  return (
    <section id="seccion-reportes" className="mb-16 premium-panel">
      <div className="premium-panel rounded-[2rem] p-10">
        <div className="mb-8 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-3">Reportes recientes</h2>
            <p className="text-lg text-slate-600">Aquí aparecen los últimos reportes e incidentes compartidos por la comunidad.</p>
          </div>
          <button onClick={onCreateReport} className="px-8 py-4 premium-btn-primary font-bold rounded-2xl shadow-lg hover:opacity-95 transition text-lg">Nuevo Reporte</button>
        </div>
        <div className="space-y-6">
          {recentReports.length === 0 ? (
            <div className="rounded-[2rem] border border-rose-200 bg-white p-6 text-sm text-slate-600">No hay reportes recientes disponibles. Crea uno nuevo para compartir condiciones de la vía.</div>
          ) : (
            recentReports.map(report => (
              <div key={report.id} className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">{report.title}</p>
                    <p className="text-sm text-slate-500">{report.location}</p>
                  </div>
                  <span className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold">{report.status}</span>
                </div>
                <p className="mt-4 text-sm text-slate-600">{report.message}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <span>{report.user} · {report.time}</span>
                  <button onClick={() => onOpenReport(report)} className="font-semibold text-emerald-700 hover:text-emerald-900">Ver detalles</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
