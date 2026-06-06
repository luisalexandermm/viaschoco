window.ReporteAbusoPage = function ReporteAbusoPage({ onNavigate }) {
  const [formData, setFormData] = React.useState({
    tipoAbuso: 'contenido-inapropiado',
    descripcion: '',
    email: '',
    evidencia: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.descripcion || !formData.email) {
      alert('Por favor completa los campos requeridos');
      return;
    }
    alert('¡Gracias por tu reporte! Lo investigaremos lo antes posible. Nos comunicaremos contigo pronto.');
    setFormData({
      tipoAbuso: 'contenido-inapropiado',
      descripcion: '',
      email: '',
      evidencia: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-slate-200 py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="img/logoviaa.png" alt="Logo Vías Chocó" className="w-10 h-10 rounded-lg object-cover" />
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">Reporte de Abuso</p>
              <h1 className="text-lg font-bold text-slate-950">Vías Chocó</h1>
            </div>
          </div>
          <button onClick={() => onNavigate('main')} className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition">
            ← Volver a Vías Chocó
          </button>
        </div>
      </header>

      <div className="pt-24"></div>

      <main className="max-w-4xl mx-auto my-12 px-4 pb-12">
        <section className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-950 mb-2">Reporte de Abuso</h2>
            <p className="text-slate-600">Ayúdanos a mantener una comunidad segura reportando comportamientos inapropiados</p>
          </div>

          <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-8">
            <p className="text-red-800 text-sm"><strong>Nota importante:</strong> Todos los reportes serán investigados de manera confidencial. Por favor proporciona detalles precisos para ayudarnos a resolver el problema.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Tipo de Abuso *</label>
              <select 
                value={formData.tipoAbuso}
                onChange={(e) => setFormData({...formData, tipoAbuso: e.target.value})}
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
              >
                <option value="contenido-inapropiado">Contenido inapropiado o ofensivo</option>
                <option value="acoso">Acoso o intimidación</option>
                <option value="spam">Spam o publicidad no autorizada</option>
                <option value="phishing">Intento de fraude o phishing</option>
                <option value="datos-personales">Exposición de datos personales</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Descripción del Incidente *</label>
              <textarea 
                value={formData.descripcion}
                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                placeholder="Por favor describe en detalle qué sucedió..."
                rows="6"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 resize-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Tu Email *</label>
              <input 
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="tu.correo@ejemplo.com"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-900 mb-2">Evidencia / Detalles Adicionales</label>
              <textarea 
                value={formData.evidencia}
                onChange={(e) => setFormData({...formData, evidencia: e.target.value})}
                placeholder="Adjunta links, capturas de pantalla u otros detalles que ayuden..."
                rows="4"
                className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700 resize-none"
              ></textarea>
            </div>

            <div className="pt-4">
              <button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-red-200 active:scale-95"
              >
                Enviar Reporte
              </button>
            </div>
          </form>

          <hr className="my-10 border-slate-100" />

          <div className="bg-slate-50 rounded-2xl p-6 md:p-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">¿Qué sucede después de reportar?</h3>
            <ul className="space-y-3 text-slate-700">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">1</span>
                <span><strong>Revisión:</strong> Nuestro equipo revisará tu reporte dentro de 24 a 48 horas.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">2</span>
                <span><strong>Investigación:</strong> Investigaremos el incidente reportado de manera confidencial.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">3</span>
                <span><strong>Comunicación:</strong> Te contactaremos al email proporcionado con actualizaciones.</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">4</span>
                <span><strong>Acción:</strong> Tomaremos las medidas necesarias según nuestras políticas.</span>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <window.Footer onNavigate={onNavigate} slim={false} />
    </div>
  );
};
