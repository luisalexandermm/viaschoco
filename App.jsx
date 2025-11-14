const roadsData = [
  { id: 1, title: "Vía Quibdó - Medellín (Túnel de Occidente)", status: "Regular", from: "Quibdó", to: "Medellín", km: "240 km", desc: "Principal vía que conecta el Chocó con Antioquia. Atraviesa Carmen de Atrato y El Carmen de Atrato.", updated: "2 nov 2025, 10:30 AM" },
  { id: 2, title: "Vía Quibdó - Pereira (Anserma - Tadó)", status: "Regular", from: "Quibdó", to: "Pereira", km: "195 km", desc: "Conecta con Risaralda pasando por Tadó. Estado variable según temporada de lluvias.", updated: "2 nov 2025, 8:00 AM" },
  { id: 3, title: "Vía Quibdó - Istmina - Condoto", status: "Buena", from: "Quibdó", to: "Istmina", km: "86 km", desc: "Vía intermunicipal que conecta la capital con Istmina y Condoto.", updated: "2 nov 2025, 9:15 AM" },
  { id: 4, title: "Vía Quibdó - Lloró", status: "Regular", from: "Quibdó", to: "Lloró", km: "72 km", desc: "Conecta con el municipio de Lloró en la zona del medio San Juan.", updated: "2 nov 2025, 11:00 AM" },
  { id: 5, title: "Vía Tadó - Certegui", status: "Mala", from: "Tadó", to: "Certegui", km: "45 km", desc: "Vía en mal estado que requiere mantenimiento constante.", updated: "1 nov 2025, 4:45 PM" },
  { id: 6, title: "Vía Istmina - Río Iró", status: "Buena", from: "Istmina", to: "Río Iró", km: "32 km", desc: "Vía hacia la zona del Río Iró en buen estado.", updated: "2 nov 2025, 7:30 AM" },
  { id: 7, title: "Vía Carmen de Atrato - Vigía del Fuerte", status: "Regular", from: "Carmen de Atrato", to: "Vigía del Fuerte", km: "55 km", desc: "Conecta con la zona del Atrato medio.", updated: "2 nov 2025, 10:00 AM" },
  { id: 8, title: "Vía Quibdó - Unión Panamericana", status: "Buena", from: "Quibdó", to: "Unión Panamericana", km: "38 km", desc: "Vía en buen estado hacia el norte del departamento.", updated: "2 nov 2025, 9:30 AM" }
];

const reportsData = [
  { id: 1, title: "Vía Quibdó - Medellín (Túnel de Occidente)", status: "Regular", location: "Km 145 - 148 (Sector El Carmen de Atrato)", message: "Múltiples baches de tamaño considerable en el carril derecho. Tránsito lento.", rec: "Reducir velocidad a 30 km/h. Preferiblemente conducir en carril izquierdo.", user: "Carlos M.", time: "Hace 2 h" },
  { id: 2, title: "Vía Tadó - Certegui", status: "Mala", location: "Km 22 - 25", message: "Vía muy deteriorada con derrumbes menores. Superficie completamente destruida.", rec: "Solo vehículos 4x4. Evitar en época de lluvia. Llevar tiempo extra de viaje.", user: "María L.", time: "Hace 3 h" },
  { id: 3, title: "Vía Quibdó - Pereira (Anserma - Tadó)", status: "Cerrada", location: "Km 78 (Sector La Lorena)", message: "Deslizamiento grande bloqueando completamente ambos carriles. Maquinaria trabajando.", rec: "Vía cerrada totalmente. Usar rutas alternas. Estimar reapertura en 3-4 días.", user: "Jorge P.", time: "Hace 5 h" },
  { id: 4, title: "Vía Quibdó - Istmina - Condoto", status: "Buena", location: "Km 0 - 86 (Todo el trayecto)", message: "Vía en excelente estado, recientemente pavimentada. Flujo vehicular normal.", rec: "Condiciones óptimas. Mantener velocidad reglamentaria.", user: "Ana S.", time: "Hace 3 h" },
  { id: 5, title: "Vía Quibdó - Lloró", status: "Regular", location: "Km 35 - 40", message: "Hundimiento del pavimento en varios puntos. Señalización deficiente.", rec: "Conducir con precaución especialmente de noche. Velocidad máxima 40 km/h en este sector.", user: "Pedro R.", time: "Hace 14 h" }
];

function Header() {
  return (
    <header>
      <img src="https://imagenes.portafolio.co/files/image_600_455/uploads/2024/09/18/66eae7c14e80b.jpeg" alt="Vías del Chocó" />
      <div className="hero-content">
        <div className="hero-title">
          <h1>Vías del Chocó</h1>
        </div>
        <p className="hero-description">Información actualizada sobre el estado de las carreteras</p>
      </div>
    </header>
  );
}

function Stats() {
  return (
    <section>
      <h3>Estado General de las Vías</h3>
      <div className="stats-grid">
        <div className="stat-card"><div className="stat-content"><div className="stat-label">Buenas</div><div className="stat-value">3</div></div></div>
        <div className="stat-card"><div className="stat-content"><div className="stat-label">Regulares</div><div className="stat-value">3</div></div></div>
        <div className="stat-card"><div className="stat-content"><div className="stat-label">Malas</div><div className="stat-value">1</div></div></div>
        <div className="stat-card"><div className="stat-content"><div className="stat-label">Cerradas</div><div className="stat-value">1</div></div></div>
      </div>
    </section>
  );
}

function RoadCard({ road }) {
  return (
    <article key={road.id} className="road-card">
      <div className="road-header">
        <h3>{road.title}</h3>
        <div className={`badge ${road.status === 'Buena' ? 'badge-green' : road.status === 'Regular' ? 'badge-yellow' : road.status === 'Mala' ? 'badge-orange' : 'badge-red'}`}>{road.status}</div>
      </div>
      <div className="road-details">
        <div className="road-route">
          <span>Desde: {road.from}</span>
          <span>Hasta: {road.to}</span>
        </div>
        <div className="road-distance"><span>{road.km}</span></div>
      </div>
      <p className="road-description">{road.desc}</p>
      <div className="road-footer"><span>Última actualización: {road.updated}</span></div>
    </article>
  );
}

function Report({ r }) {
  return (
    <article key={r.id} className="report-card">
      <div className="report-header">
        <h3>{r.title}</h3>
        <div className={`badge ${r.status === 'Buena' ? 'badge-green' : r.status === 'Regular' ? 'badge-yellow' : r.status === 'Mala' ? 'badge-orange' : 'badge-red'}`}>{r.status}</div>
      </div>
      <div className="report-body">
        <div className="report-location"><strong>Ubicación:</strong><span>{r.location}</span></div>
        <p>{r.message}</p>
        <div className="report-recommendations"><strong>Recomendaciones:</strong><p>{r.rec}</p></div>
      </div>
      <div className="report-footer"><span>Usuario: {r.user}</span><span>{r.time}</span></div>
    </article>
  );
}

function ReportForm() {
  function handleSubmit(e) {
    e.preventDefault();
    alert('Reporte enviado (demo).');
    const d = document.querySelector('dialog');
    if (d) d.close();
  }

  return (
    <dialog>
      <div className="dialog-header">
        <h2>Reportar Estado de Vía</h2>
        <p>Ayuda a la comunidad compartiendo información sobre el estado actual de las vías.</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user">Tu Nombre</label>
          <input type="text" id="user" name="user" placeholder="Ej: Juan Pérez" />
        </div>

        <div className="form-group">
          <label htmlFor="road">Selecciona la Vía</label>
          <select id="road" name="road">
            <option value="">Selecciona una vía</option>
            {roadsData.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="status">Estado Actual</label>
          <select id="status" name="status">
            <option value="">Selecciona el estado</option>
            <option value="good">Buena - Transitable sin problemas</option>
            <option value="regular">Regular - Algunos baches o demoras</option>
            <option value="bad">Mala - Muy deteriorada</option>
            <option value="closed">Cerrada - Intransitable</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="location">Ubicación Específica (Kilómetro)</label>
          <input type="text" id="location" name="location" placeholder="Ej: Km 45 - 48 o Sector La Lorena" />
        </div>

        <div className="form-group">
          <label htmlFor="comment">Descripción del Estado</label>
          <textarea id="comment" name="comment" rows="3" placeholder="Describe detalladamente el problema: baches, deslizamientos, hundimientos, etc."></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="recommendations">Recomendaciones</label>
          <textarea id="recommendations" name="recommendations" rows={3} placeholder="Ej: Reducir velocidad, usar vehículo 4x4, evitar en época de lluvia, etc."></textarea>
        </div>

        <button type="submit">Enviar Reporte</button>
      </form>
    </dialog>
  );
}

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <div>
          <div className="container">
            <div className="alert"><p>Esta plataforma permite a la comunidad reportar el estado de las vías en tiempo real. Tu colaboración ayuda a otros viajeros.</p></div>
            <Stats />
            <div className="button-center"><button onClick={() => { const d = document.querySelector('dialog'); if (d) d.showModal(); }}>Reportar Estado de Vía</button></div>

            <section className="tabs">
              <div className="tabs-list">
                <button className="tab-trigger active">Todas las Vías</button>
                <button className="tab-trigger">Reportes Recientes</button>
              </div>

              <div className="tab-content active">
                <h2>Vías del Departamento</h2>
                <div className="roads-grid">
                  {roadsData.map(r => <RoadCard key={r.id} road={r} />)}
                </div>
              </div>

              <div className="tab-content">
                <h2>Reportes Recientes</h2>
                <div className="reports-container">
                  {reportsData.map(r => <Report key={r.id} r={r} />)}
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>
      <ReportForm />
      <footer><p>© 2025 Vías del Chocó. Plataforma comunitaria de información vial.</p></footer>
    </div>
  );
}

// Montaje (React y ReactDOM están disponibles globalmente a través de los scripts UMD cargados en index.html)
const appContainer = document.getElementById('app');
if (appContainer) {
  ReactDOM.createRoot(appContainer).render(<App />);
} else {
  console.error('No se encontró #app');
}
