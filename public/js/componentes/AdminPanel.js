window.AdminPanel = function AdminPanel({ reports, setReports, users, setUsers, roads, adminTab, onClose, apiAvailable, adminName, onNavigate }) {
  const [tab, setTab] = React.useState(adminTab || 'dashboard');
  const [selectedReport, setSelectedReport] = React.useState(null);

  const approvedReports = reports.filter(report => report.approved);
  const pendingReports = reports.filter(report => !report.approved && !report.flagged);
  const flaggedReports = reports.filter(report => report.flagged);
  const usuariosBloqueados = users.filter(u => u.blocked);
  const usuariosActivos = users.filter(u => !u.blocked);

  const statusCounts = {
    Buena: roads.filter(r => r.status === 'Buena').length,
    Regular: roads.filter(r => r.status === 'Regular').length,
    Mala: roads.filter(r => r.status === 'Mala').length,
    Cerrada: roads.filter(r => r.status === 'Cerrada').length,
  };

  const reportStatusCounts = reports.reduce((acc, report) => {
    const key = report.status || 'Regular';
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, { Buena: 0, Regular: 0, Mala: 0, Cerrada: 0 });

  const statusData = [
    { label: 'Buena', value: statusCounts.Buena, color: 'bg-emerald-500' },
    { label: 'Regular', value: statusCounts.Regular, color: 'bg-amber-500' },
    { label: 'Mala', value: statusCounts.Mala, color: 'bg-orange-500' },
    { label: 'Cerrada', value: statusCounts.Cerrada, color: 'bg-red-500' },
  ];

  const handleApproveReport = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, approved: true, flagged: false } : r));
  };

  const handleFlagReport = (id) => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, flagged: true, approved: false } : r));
  };

  const handleDeleteReport = async (id) => {
    const confirmed = window.confirm('¿Eliminar este informe permanentemente?');
    if (!confirmed) return;

    setReports(prev => prev.filter(r => r.id !== id));

    try {
      const response = await fetch(`/api/reports/${id}`, { method: 'DELETE' });
      if (!response.ok) {
        throw new Error('La eliminación en servidor falló.');
      }
    } catch (error) {
      console.warn('Error eliminando el informe en backend:', error);
      window.alert('El reporte se eliminó localmente, pero no se pudo borrar en el servidor.');
    }
  };

  const handleBlockUser = (email) => {
    setUsers(prev => prev.map(u => u.email === email ? { ...u, blocked: !u.blocked } : u));
  };

  const handleDeleteUser = (email) => {
    const confirmed = window.confirm('¿Eliminar este usuario permanentemente?');
    if (!confirmed) return;
    setUsers(prev => prev.filter(u => u.email !== email));
  };

  const reportMetrics = [
    { title: 'Reportes totales', value: reports.length, variant: 'emerald', delta: '18% vs. semana pasada' },
    { title: 'Vías en buen estado', value: statusCounts.Buena, variant: 'emerald', delta: '8% vs. semana pasada' },
    { title: 'Vías en mal estado', value: statusCounts.Mala, variant: 'orange', delta: '5% vs. semana pasada' },
    { title: 'Vías cerradas', value: statusCounts.Cerrada, variant: 'red', delta: '12% vs. semana pasada' },
  ];

  const today = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
  const showName = adminName ? (adminName.includes('@') ? adminName.split('@')[0] : adminName) : 'Admin';
  const statusBadge = apiAvailable ? 'Conectado' : 'Offline';
  const statusBadgeClass = apiAvailable ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700';

  return (
    <div className="min-h-screen w-full flex flex-col bg-slate-100">
      {/* HEADER — ocupa todo el ancho */}
      <header className="w-full bg-slate-100 border-b border-slate-200">
        <div className="max-w-screen-2xl mx-auto w-full flex flex-col gap-3 px-4 py-3 lg:px-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src="img/logoviaa.png" alt="Logo" className="w-12 h-12 rounded-2xl object-cover shadow-sm" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Administrador</p>
              <h1 className="text-2xl lg:text-3xl font-black text-slate-950">Panel de administración</h1>
              <p className="mt-1 text-sm text-slate-600">Bienvenido, <span className="font-semibold text-slate-950">{showName}</span></p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="rounded-3xl bg-slate-950/5 px-4 py-2 text-slate-700 shadow-sm border border-slate-200">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">Hoy</p>
              <p className="font-semibold">{today}</p>
            </div>
            <span className={`rounded-3xl px-4 py-2 text-xs font-semibold ${statusBadgeClass}`}>{statusBadge}</span>
            <button onClick={onClose} className="rounded-3xl bg-slate-950 px-4 py-2 text-white font-semibold hover:bg-slate-800 transition">Volver</button>
          </div>
        </div>
      </div>

        {/* NAV TABS */}
        <div className="max-w-screen-2xl mx-auto w-full px-4 py-2 flex flex-wrap gap-3 lg:px-5">
          {[
            { id: 'dashboard', label: 'Inicio' },
            { id: 'informes', label: 'Informes' },
            { id: 'usuarios', label: 'Usuarios' },
            { id: 'carreteras', label: 'Vías' },
            { id: 'alertas', label: 'Alertas' }
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`rounded-full px-5 py-3 text-sm font-semibold transition ${tab === item.id ? 'bg-emerald-500 text-slate-950 shadow-xl' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </header>

      {/* MAIN — mismo max-w que el header, ocupa el resto de la pantalla */}
      <main className="flex-1 w-full">
        <div className="max-w-screen-2xl mx-auto w-full px-4 py-6 lg:px-5">

          {/* ─── DASHBOARD ─── */}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {/* Panel izquierdo */}
                <div className="premium-panel bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-5 lg:col-span-2">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Resumen completo</p>
                      <h2 className="text-2xl font-bold text-slate-950 mt-2">Panel de control principal</h2>
                    </div>
                    <button
                      onClick={() => { if (reports && reports.length) setSelectedReport(reports[0]); else window.alert('No hay reportes registrados aún.'); }}
                      className="rounded-3xl bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-600 transition"
                    >
                      Ver detalles
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                    {reportMetrics.map(metric => (
                      <div key={metric.title} className="rounded-3xl border border-slate-200 p-4 bg-white shadow-sm">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{metric.title}</p>
                        <p className={`text-3xl font-bold mt-4 ${metric.variant === 'emerald' ? 'text-emerald-600' : metric.variant === 'orange' ? 'text-orange-600' : 'text-red-600'}`}>{metric.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Informes por estado */}
                    <div className="rounded-3xl bg-slate-950/5 border border-slate-200 p-4 shadow-sm">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Informes por estado</p>
                          <p className="text-lg font-semibold text-slate-950 mt-2">{reports.length} totales</p>
                        </div>
                        <span className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-semibold text-emerald-700">Activo</span>
                      </div>
                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                          <p className="text-sm text-slate-500">Buena</p>
                          <p className="text-2xl font-bold text-emerald-600 mt-2">{statusCounts.Buena}</p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                          <p className="text-sm text-slate-500">Regular</p>
                          <p className="text-2xl font-bold text-amber-600 mt-2">{statusCounts.Regular}</p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                          <p className="text-sm text-slate-500">Mala</p>
                          <p className="text-2xl font-bold text-orange-600 mt-2">{statusCounts.Mala}</p>
                        </div>
                        <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                          <p className="text-sm text-slate-500">Cerrada</p>
                          <p className="text-2xl font-bold text-red-600 mt-2">{statusCounts.Cerrada}</p>
                        </div>
                      </div>
                    </div>

                    {/* Barras de progreso */}
                    <div className="rounded-3xl bg-white p-4 shadow-sm border border-slate-200">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Evolución de los datos</p>
                          <p className="text-lg font-semibold text-slate-950 mt-2">Estado de rutas</p>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">{reports.length} reportes</span>
                      </div>
                      <div className="mt-6 space-y-4">
                        {statusData.map((item) => {
                          const width = reports.length ? Math.round((item.value / reports.length) * 100) : 0;
                          return (
                            <div key={item.label} className="space-y-2">
                              <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>{item.label}</span>
                                <span className="font-semibold text-slate-900">{item.value}</span>
                              </div>
                              <div className="h-3 rounded-full bg-slate-200 overflow-hidden">
                                <div className={`${item.color} h-full rounded-full`} style={{ width: `${width}%` }} />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Panel derecho */}
                <div className="premium-panel bg-white rounded-3xl p-5 shadow-sm border border-slate-200 space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Actividad reciente</p>
                      <h2 className="text-2xl font-bold text-slate-950 mt-2">Información clave</h2>
                    </div>
                    <button className="rounded-3xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">Actualizar</button>
                  </div>

                  <div className="space-y-4">
                    {/* Últimos usuarios */}
                    <div className="rounded-3xl bg-white p-5 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Últimos usuarios registrados</p>
                        <span className="text-xs uppercase tracking-[0.18em] text-slate-400">Activo</span>
                      </div>
                      <div className="mt-4 grid gap-3">
                        {users.slice(0, 4).map(u => (
                          <div key={u.email} className="flex items-center justify-between rounded-3xl bg-slate-50 p-4 border border-slate-200">
                            <div>
                              <p className="font-semibold text-slate-900">{u.name || u.email}</p>
                              <p className="text-xs text-slate-500">{u.email}</p>
                            </div>
                            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${u.blocked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{u.blocked ? 'Bloqueado' : 'Activo'}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Informes recientes */}
                    <div className="rounded-3xl bg-white p-5 border border-slate-200 shadow-sm">
                      <div className="flex items-center justify-between">
                        <p className="text-sm uppercase tracking-[0.18em] text-slate-500">Informes recientes</p>
                        <button className="text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition">Ver todos</button>
                      </div>
                      <div className="mt-4 space-y-3">
                        {reports.slice(0, 4).map(r => (
                          <div key={r.id} className="rounded-3xl bg-slate-50 p-4 border border-slate-200">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <p className="font-semibold text-slate-900">{r.title}</p>
                                <p className="text-xs text-slate-500 mt-1">{r.location || 'Ubicación no definida'}</p>
                              </div>
                              <span className={`text-[11px] rounded-full px-3 py-1 font-semibold ${r.approved ? 'bg-emerald-100 text-emerald-700' : r.flagged ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                                {r.approved ? 'Aprobado' : r.flagged ? 'Falso' : 'Pendiente'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ─── INFORMES ─── */}
          {tab === 'informes' && (
            <section className="space-y-6">
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Gestión de informes</p>
                    <h2 className="text-3xl font-bold text-slate-950 mt-2">Informes activos</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{reports.length} reportes</span>
                </div>
              </div>

              <div className="grid gap-4">
                {reports.length ? reports.map(report => (
                  <div key={report.id} className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{report.status}</p>
                        <h3 className="text-xl font-semibold text-slate-950 mt-2">{report.title}</h3>
                        <p className="text-sm text-slate-600 mt-2">{report.location || report.message}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button onClick={() => setSelectedReport(report)} className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 transition">Ver detalles</button>
                        <button onClick={() => handleApproveReport(report.id)} className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition">Aprobar</button>
                        <button onClick={() => handleFlagReport(report.id)} className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-600 transition">Marcar</button>
                        <button onClick={() => handleDeleteReport(report.id)} className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition">Eliminar</button>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-600">No hay reportes registrados aún.</div>
                )}
              </div>
            </section>
          )}

          {/* ─── USUARIOS ─── */}
          {tab === 'usuarios' && (
            <section className="space-y-6">
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Usuarios</p>
                    <h2 className="text-3xl font-bold text-slate-950 mt-2">Base de datos de usuarios</h2>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">{users.length} usuarios</span>
                </div>
              </div>

              <div className="grid gap-4">
                {users.length ? users.map(user => (
                    <div key={user.email} className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="font-semibold text-slate-900">{user.name || user.email}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                      <p className="text-xs text-slate-500 mt-1">Rol: {user.role || 'usuario'}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 items-center">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${user.blocked ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'}`}>{user.blocked ? 'Bloqueado' : 'Activo'}</span>
                      <button onClick={() => handleBlockUser(user.email)} className="rounded-full bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-amber-600 transition">{user.blocked ? 'Desbloquear' : 'Bloquear'}</button>
                      <button onClick={() => handleDeleteUser(user.email)} className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition">Eliminar</button>
                    </div>
                  </div>
                )) : (
                  <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-600">Aún no hay usuarios registrados.</div>
                )}
              </div>
            </section>
          )}

          {/* ─── CARRETERAS ─── */}
          {tab === 'carreteras' && (
            <section className="space-y-6">
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Carreteras</p>
                    <h2 className="text-3xl font-bold text-slate-950 mt-2">Condición de las vías</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{roads.length} vías monitorizadas</span>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                {roads.map(road => {
                  const colors = {
                    Buena: 'bg-emerald-50 border-emerald-200 text-emerald-700',
                    Regular: 'bg-amber-50 border-amber-200 text-amber-700',
                    Mala: 'bg-orange-50 border-orange-200 text-orange-700',
                    Cerrada: 'bg-red-50 border-red-200 text-red-700'
                  };
                  return (
                    <div key={road.id} className={`rounded-3xl border p-5 shadow-sm ${colors[road.status] || 'border-slate-200 bg-slate-50 text-slate-900'}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-semibold">{road.title}</h3>
                          <p className="text-xs uppercase tracking-[0.25em] mt-2">{road.from} → {road.to}</p>
                        </div>
                        <span className="rounded-full px-3 py-1 text-xs font-semibold uppercase">{road.status}</span>
                      </div>
                      <p className="mt-4 text-sm text-slate-700">{road.desc}</p>
                      <div className="mt-6 grid grid-cols-3 gap-3 text-sm">
                        <div className="rounded-2xl bg-white p-3">Humedad<br /><strong>{road.humidity ?? 'N/A'}%</strong></div>
                        <div className="rounded-2xl bg-white p-3">Temperatura<br /><strong>{road.temperature ?? 'N/A'}°C</strong></div>
                        <div className="rounded-2xl bg-white p-3">Precip<br /><strong>{road.precip ?? 'N/A'}%</strong></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* ─── ALERTAS ─── */}
          {tab === 'alertas' && (
            <section className="space-y-6">
              <div className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Alertas</p>
                    <h2 className="text-3xl font-bold text-slate-950 mt-2">Últimas alertas</h2>
                  </div>
                  <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700">{flaggedReports.length} marcadas</span>
                </div>
              </div>

              <div className="grid gap-4">
                {reports.filter(r => r.flagged || !r.approved).length ? reports.filter(r => r.flagged || !r.approved).map(report => (
                  <div key={report.id} className="rounded-3xl bg-white p-5 shadow-sm border border-slate-200">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                      <div>
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{report.status}</p>
                        <h3 className="text-xl font-semibold text-slate-950 mt-2">{report.title}</h3>
                        <p className="text-sm text-slate-600 mt-2">{report.location || report.message}</p>
                      </div>
                      <div className="space-y-2 text-right">
                        <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${report.flagged ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'}`}>
                          {report.flagged ? 'Falso' : 'Pendiente'}
                        </span>
                        <div>
                          <button onClick={() => handleApproveReport(report.id)} className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition">Aprobar</button>
                        </div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <div className="rounded-3xl bg-slate-50 p-8 text-center text-slate-600">No hay alertas pendientes.</div>
                )}
              </div>
            </section>
          )}

        </div>
      </main>

      {selectedReport && <window.ReportDetailsModal report={selectedReport} onClose={() => setSelectedReport(null)} />}
    </div>
  );
}
