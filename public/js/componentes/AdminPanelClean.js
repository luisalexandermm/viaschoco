window.AdminPanelClean = function AdminPanelClean({ reports = [], users = [], roads = [], onClose, apiAvailable = true, adminName = '', onNavigate }) {
  const today = new Date().toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });

  const totalReports = reports.length;
  const approvedReports = reports.filter(report => report.approved).length;
  const pendingReports = reports.filter(report => !report.approved && !report.flagged).length;
  const flaggedReports = reports.filter(report => report.flagged).length;
  const totalUsers = users.length;
  const activeUsers = users.filter(user => !user.blocked).length;
  const blockedUsers = users.filter(user => user.blocked).length;
  const totalRoads = roads.length;
  const roadStatusCounts = roads.reduce((acc, road) => {
    acc[road.status] = (acc[road.status] || 0) + 1;
    return acc;
  }, {});
  const closedRoads = roadStatusCounts.Cerrada || 0;

  const sectionItems = [
    { id: 'admin-overview', label: 'Resumen' },
    { id: 'admin-vias', label: 'Vías' },
    { id: 'admin-incidentes', label: 'Incidentes' },
    { id: 'admin-usuarios', label: 'Usuarios' },
    { id: 'admin-reportes', label: 'Reportes' },
    { id: 'admin-config', label: 'Configuración' }
  ];

  const handleSectionClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleDeleteUser = (userId) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      console.log('Eliminando usuario:', userId);
    }
  };

  const handleDeleteReport = (reportId) => {
    if (confirm('¿Estás seguro de que deseas eliminar este reporte?')) {
      console.log('Eliminando reporte:', reportId);
    }
  };

  const handleApproveReport = (reportId) => {
    console.log('Aprobando reporte:', reportId);
  };

  const recentReports = reports.slice(0, 5);
  const chartValues = [5, 6, 5, 7, 4, 6, 5];
  const lineValues = [22, 28, 35, 32, 25];
  const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May'];

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="flex flex-col gap-4 py-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <img src="img/logoviaa.png" alt="Logo Vías Chocó" className="w-12 h-12 rounded-xl object-cover" />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Panel Admin</p>
                <h1 className="text-xl font-bold text-slate-950">Vías Chocó</h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 justify-between">
              <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-3 py-2 text-sm text-slate-700">
                <span>{today}</span>
              </div>
              <button onClick={onClose} className="rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600 transition">Salir</button>
            </div>
          </div>

          <nav className="mb-4 flex flex-wrap items-center gap-2 pb-2">
            {sectionItems.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSectionClick(item.id)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300 hover:bg-slate-100 transition"
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 lg:px-8 pb-20 pt-8 space-y-10">
        <section id="admin-overview" className="rounded-3xl bg-white shadow-xl border border-slate-200 p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Resumen general</p>
              <h2 className="text-3xl font-bold text-slate-950 mt-2">Estado actual de la plataforma</h2>
            </div>
            <div className="inline-flex items-center gap-3 rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
              <span className="font-semibold">Dashboard de monitoreo</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Reportes totales</p>
              <p className="mt-4 text-4xl font-bold text-slate-950">{totalReports}</p>
              <p className="text-sm text-slate-600 mt-2">Informes registrados</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Usuarios registrados</p>
              <p className="mt-4 text-4xl font-bold text-slate-950">{totalUsers}</p>
              <p className="text-sm text-slate-600 mt-2">Cuentas activas y bloqueadas</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Vías monitorizadas</p>
              <p className="mt-4 text-4xl font-bold text-slate-950">{totalRoads}</p>
              <p className="text-sm text-slate-600 mt-2">Tramos con datos</p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Alertas activas</p>
              <p className="mt-4 text-4xl font-bold text-slate-950">{flaggedReports}</p>
              <p className="text-sm text-slate-600 mt-2">Incidentes para revisar</p>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Estado de vías - Últimos 7 días</p>
                </div>
                <div className="text-xs text-slate-500 font-semibold">Incidentes diarios</div>
              </div>
              <div className="overflow-hidden rounded-3xl bg-white p-6">
                <svg viewBox="0 0 420 180" className="w-full h-48">
                  <defs>
                    <linearGradient id="barGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>
                  {[0, 1, 2, 3, 4, 5, 6].map(index => {
                    const x = 40 + index * 50;
                    const barHeight = (chartValues[index] / 10) * 120;
                    return (
                      <rect
                        key={index}
                        x={x}
                        y={140 - barHeight}
                        width="12"
                        height={barHeight}
                        rx="4"
                        fill="url(#barGradient)"
                      />
                    );
                  })}
                  {[0, 2, 4, 6, 8, 10].map(value => (
                    <g key={value}>
                      <line x1="40" y1={140 - (value / 10) * 120} x2="410" y2={140 - (value / 10) * 120} stroke="#e2e8f0" strokeWidth="1" />
                      <text x="32" y={145 - (value / 10) * 120} fontSize="11" fill="#64748b" textAnchor="end">{value}</text>
                    </g>
                  ))}
                  {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Hoy'].map((label, index) => (
                    <text key={label} x={46 + index * 50} y="165" fontSize="11" fill="#64748b" textAnchor="middle" fontWeight="500">{label}</text>
                  ))}
                </svg>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-6">Distribución de estados viales</p>
              <div className="flex flex-col items-center gap-6">
                <svg viewBox="0 0 160 160" className="w-48 h-48">
                  <defs>
                    <linearGradient id="pieGreen" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#22c55e" />
                      <stop offset="100%" stopColor="#16a34a" />
                    </linearGradient>
                    <linearGradient id="pieYellow" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                    <linearGradient id="pieRed" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                    <linearGradient id="piePurple" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#a855f7" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>
                  <circle cx="80" cy="80" r="65" fill="#f1f5f9" opacity="0.3" />
                  <path d="M80,15 A65,65 0 0,1 145.31,102.82 L101.29,107.41 A30,30 0 0,0 80,50 Z" fill="url(#pieGreen)" stroke="#fff" strokeWidth="2" />
                  <path d="M145.31,102.82 A65,65 0 0,1 80,145 L80,80 A30,30 0 0,0 101.29,107.41 Z" fill="url(#pieYellow)" stroke="#fff" strokeWidth="2" />
                  <path d="M80,145 A65,65 0 0,1 14.69,102.82 L80,80 A30,30 0 0,0 80,145 Z" fill="url(#pieRed)" stroke="#fff" strokeWidth="2" />
                  <path d="M14.69,102.82 A65,65 0 0,1 80,15 L80,80 A30,30 0 0,0 14.69,102.82 Z" fill="url(#piePurple)" stroke="#fff" strokeWidth="2" />
                </svg>
                <div className="grid gap-3 w-full text-sm">
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-emerald-600"></div>
                      <span>Buenas</span>
                    </div>
                    <span className="font-bold text-emerald-700">{roadStatusCounts.Buena || 0}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <span>Regulares</span>
                    </div>
                    <span className="font-bold text-amber-700">{roadStatusCounts.Regular || 0}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-red-600"></div>
                      <span>Malas</span>
                    </div>
                    <span className="font-bold text-red-700">{roadStatusCounts.Mala || 0}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 border border-slate-200">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-purple-700"></div>
                      <span>Cerradas</span>
                    </div>
                    <span className="font-bold text-purple-700">{roadStatusCounts.Cerrada || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="admin-vias" className="rounded-3xl bg-white shadow-xl border border-slate-200 p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Monitoreo Vial</p>
              <h2 className="text-2xl font-bold text-slate-950 mt-2">Gestión de tramos</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
              <span>{closedRoads} cerradas</span>
            </div>
          </div>

          <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
            <div className="grid grid-cols-3 gap-4 bg-slate-100 p-4 text-xs uppercase tracking-[0.18em] text-slate-500">
              <span>Tramo</span>
              <span>Estado</span>
              <span>Detalles</span>
            </div>
            <div className="divide-y divide-slate-200">
              {roads.slice(0, 6).map(road => (
                <div key={road.id} className="grid grid-cols-3 gap-4 p-4 text-sm text-slate-700 items-center">
                  <div>
                    <p className="font-semibold">{road.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{road.from} → {road.to}</p>
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${road.status === 'Buena' ? 'bg-emerald-100 text-emerald-700' : road.status === 'Regular' ? 'bg-amber-100 text-amber-700' : road.status === 'Mala' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                      {road.status}
                    </span>
                  </div>
                  <div className="text-right text-xs text-slate-500">{road.km}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="admin-incidentes" className="rounded-3xl bg-white shadow-xl border border-slate-200 p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Incidentes</p>
              <h2 className="text-2xl font-bold text-slate-950 mt-2">Alertas y eventos</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {['Todos','Aprobados','Pendientes','Marcados'].map(filter => (
                <button key={filter} className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition">
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {recentReports.length ? recentReports.map(report => (
              <div key={report.id} className="border-l-4 border-amber-300 bg-white p-6 shadow-sm rounded-xl">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <div className="font-semibold text-slate-900 text-lg">{report.title || 'Reporte reciente'}</div>
                    <div className="flex flex-wrap gap-2 mt-2 text-xs text-slate-500">
                      <span>{report.source || 'Usuario'}</span>
                      <span>•</span>
                      <span>{report.time || 'Hace unos minutos'}</span>
                    </div>
                    <p className="mt-3 text-sm text-slate-600">{report.summary || report.message || 'No hay descripción disponible.'}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${report.flagged ? 'bg-red-100 text-red-700' : report.approved ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{report.flagged ? 'Marcado' : report.approved ? 'Aprobado' : 'Pendiente'}</span>
                  </div>
                </div>
              </div>
            )) : <div className="text-center py-6 text-slate-500">No hay incidentes disponibles.</div>}
          </div>
        </section>

        <section id="admin-usuarios" className="rounded-3xl bg-white shadow-xl border border-slate-200 p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Usuarios</p>
              <h2 className="text-2xl font-bold text-slate-950 mt-2">Gestión de cuentas</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
              <span>Total: {totalUsers} usuarios</span>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-emerald-600"></div>
                <h3 className="text-lg font-bold text-slate-900">Usuarios Activos ({activeUsers})</h3>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                <div className="grid grid-cols-5 gap-4 bg-slate-100 p-4 text-xs uppercase tracking-[0.18em] text-slate-500">
                  <span>Usuario</span>
                  <span>Rol</span>
                  <span>Email</span>
                  <span>Estado</span>
                  <span className="text-center">Acciones</span>
                </div>
                <div className="divide-y divide-slate-200">
                  {users.filter(u => !u.blocked).slice(0, 6).map(user => (
                    <div key={user.email || user.id} className="grid grid-cols-5 gap-4 p-4 text-sm text-slate-700 items-center">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-slate-900 text-white w-9 h-9 flex items-center justify-center text-xs font-bold">{(user.name || user.email || 'U').split(' ').map(word => word[0]).join('').slice(0, 2)}</div>
                        <span>{user.name || user.email}</span>
                      </div>
                      <span>{user.role || 'Colaborador'}</span>
                      <span className="truncate text-xs">{user.email}</span>
                      <span className="font-semibold text-emerald-700">Activo</span>
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleDeleteUser(user.id)} className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                  {users.filter(u => !u.blocked).length === 0 && <div className="p-6 text-sm text-slate-500 text-center">No hay usuarios activos.</div>}
                </div>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-4 h-4 rounded-full bg-red-600"></div>
                <h3 className="text-lg font-bold text-slate-900">Usuarios Bloqueados ({blockedUsers})</h3>
              </div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-50">
                <div className="grid grid-cols-5 gap-4 bg-slate-100 p-4 text-xs uppercase tracking-[0.18em] text-slate-500">
                  <span>Usuario</span>
                  <span>Rol</span>
                  <span>Email</span>
                  <span>Estado</span>
                  <span className="text-center">Acciones</span>
                </div>
                <div className="divide-y divide-slate-200">
                  {users.filter(u => u.blocked).slice(0, 6).map(user => (
                    <div key={user.email || user.id} className="grid grid-cols-5 gap-4 p-4 text-sm text-slate-700 items-center">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-slate-900 text-white w-9 h-9 flex items-center justify-center text-xs font-bold">{(user.name || user.email || 'U').split(' ').map(word => word[0]).join('').slice(0, 2)}</div>
                        <span>{user.name || user.email}</span>
                      </div>
                      <span>{user.role || 'Colaborador'}</span>
                      <span className="truncate text-xs">{user.email}</span>
                      <span className="font-semibold text-red-700">Bloqueado</span>
                      <div className="flex justify-center gap-2">
                        <button onClick={() => handleDeleteUser(user.id)} className="px-3 py-1 rounded-lg bg-red-50 text-red-700 text-xs font-semibold hover:bg-red-100 transition">
                          Eliminar
                        </button>
                      </div>
                    </div>
                  ))}
                  {users.filter(u => u.blocked).length === 0 && <div className="p-6 text-sm text-slate-500 text-center">No hay usuarios bloqueados.</div>}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="admin-reportes" className="rounded-3xl bg-white shadow-xl border border-slate-200 p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Reportes</p>
              <h2 className="text-2xl font-bold text-slate-950 mt-2">Estadísticas e historial</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
              <span>{approvedReports} aprobados</span>
              <span>•</span>
              <span>{pendingReports} pendientes</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-6">Incidentes por mes - 2026</p>
              <svg viewBox="0 0 380 180" className="w-full h-48">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="100%" stopColor="#991b1b" />
                  </linearGradient>
                </defs>
                {lineValues.map((value, index) => {
                  const x = 40 + index * 75;
                  const y = 140 - (value / 40) * 120;
                  return (
                    <g key={index}>
                      <line x1="40" y1="140" x2={x} y2={y} stroke="#fecaca" strokeWidth="2" opacity="0.4" />
                      <circle cx={x} cy={y} r="6" fill="#dc2626" stroke="#fff" strokeWidth="2" />
                      {index < lineValues.length - 1 && (
                        <line x1={x} y1={y} x2={x + 75} y2={140 - (lineValues[index + 1] / 40) * 120} stroke="#dc2626" strokeWidth="2.5" />
                      )}
                    </g>
                  );
                })}
                {months.map((month, index) => (
                  <text key={month} x={40 + index * 75} y="165" fontSize="11" fill="#64748b" textAnchor="middle" fontWeight="500">{month}</text>
                ))}
              </svg>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-6">Resumen estadístico</p>
              <div className="space-y-3">
                {[
                  ['Total vías monitoreadas', `${totalRoads}`, '#16a34a'],
                  ['Incidentes este mes', `${reports.length}`, '#dc2626'],
                  ['Usuarios activos', `${activeUsers}`, '#2563eb'],
                  ['Vías en buen estado', `${roadStatusCounts.Buena || 0}`, '#f59e0b'],
                ].map(([label, value, color]) => (
                  <div key={label} className="flex items-center justify-between rounded-2xl bg-white px-4 py-3 border border-slate-200">
                    <span className="text-slate-600 text-sm">{label}</span>
                    <span className="font-bold text-lg" style={{ color }}>{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50 p-8">
            <h3 className="text-sm uppercase tracking-[0.2em] text-slate-500 mb-6">Reportes pendientes de revisión</h3>
            <div className="space-y-3">
              {reports.filter(r => !r.approved).slice(0, 4).map(report => (
                <div key={report.id} className="flex items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200">
                  <div className="flex-1">
                    <p className="font-semibold text-slate-900">{report.title || 'Reporte sin título'}</p>
                    <p className="text-xs text-slate-500 mt-1">{report.time || 'Hace poco'}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleApproveReport(report.id)} className="px-4 py-2 rounded-lg bg-emerald-100 text-emerald-700 text-xs font-semibold hover:bg-emerald-200 transition">
                      Aceptar
                    </button>
                    <button onClick={() => handleDeleteReport(report.id)} className="px-4 py-2 rounded-lg bg-red-100 text-red-700 text-xs font-semibold hover:bg-red-200 transition">
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
              {reports.filter(r => !r.approved).length === 0 && <div className="text-center py-6 text-slate-500">No hay reportes pendientes.</div>}
            </div>
          </div>
        </section>

        <section id="admin-config" className="rounded-3xl bg-white shadow-xl border border-slate-200 p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">Configuración</p>
              <h2 className="text-2xl font-bold text-slate-950 mt-2">Ajustes del sistema</h2>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-700">
              <span>⚙️ Sistema activo</span>
            </div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="text-lg font-bold text-slate-900 mb-6">Notificaciones</div>
              <div className="space-y-4">
                {['Alertas por correo electrónico', 'Alertas por SMS', 'Notificaciones push'].map(label => (
                  <div key={label} className="flex items-center justify-between p-4 bg-white rounded-xl border border-slate-200">
                    <span className="text-sm text-slate-700">{label}</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" checked readOnly className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
                    </label>
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
                Guardar cambios
              </button>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="text-lg font-bold text-slate-900 mb-6">Información del sistema</div>
              <div className="space-y-4">
                {[
                  ['Nombre del sistema', 'Vías Chocó'],
                  ['Entidad responsable', 'Gobernación del Chocó'],
                  ['Contacto soporte', 'tic@choco.gov.co'],
                ].map(([label, value]) => (
                  <div key={label} className="flex flex-col gap-2">
                    <label className="text-xs uppercase tracking-[0.1em] text-slate-500 font-semibold">{label}</label>
                    <input 
                      className="px-4 py-3 rounded-lg border border-slate-200 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      value={value}
                      readOnly
                    />
                  </div>
                ))}
              </div>
              <button className="mt-6 w-full px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition">
                Guardar cambios
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
