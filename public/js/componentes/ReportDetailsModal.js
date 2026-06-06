window.ReportDetailsModal = function ReportDetailsModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition">✕</button>
        <h2 className="text-2xl font-bold mb-4 text-slate-900">Detalles del reporte</h2>
        <div className="space-y-3 text-sm text-slate-700">
          <div><span className="font-semibold">Vía:</span> {report.title}</div>
          <div><span className="font-semibold">Estado:</span> {report.status}</div>
          <div><span className="font-semibold">Ubicación:</span> {report.location}</div>
          {report.message && <div><span className="font-semibold">Descripción:</span> {report.message}</div>}
          {report.rec && <div><span className="font-semibold">Recomendaciones:</span> {report.rec}</div>}
          {report.sensorId && <div><span className="font-semibold">Sensor ID:</span> {report.sensorId}</div>}
          {report.riskLevel != null && <div><span className="font-semibold">Nivel de riesgo:</span> {report.riskLevel.toFixed(1)}%</div>}
          {report.user && <div><span className="font-semibold">Autor:</span> {report.user}</div>}
          <div><span className="font-semibold">Fecha:</span> {report.timestamp ? new Date(report.timestamp).toLocaleString('es-CO') : report.time}</div>
          {report.outsideChoco && (
            <div><span className="font-semibold">Nota:</span> Reporte fuera del área del Chocó</div>
          )}
        </div>
        {report.files && report.files.length > 0 && (
          <div className="mt-6 space-y-3">
            <span className="font-semibold text-slate-900">Evidencia:</span>
            {report.files.map((file, idx) => (
              file.type.startsWith('image') ? (
                <img key={idx} src={file.data || file.url} alt="Evidencia" className="rounded-3xl w-full object-cover" />
              ) : (
                <video key={idx} controls className="rounded-3xl w-full">
                  <source src={file.data || file.url} type={file.type} />
                  Tu navegador no soporta video.
                </video>
              )
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
