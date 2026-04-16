import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';

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
  { id: 1, title: "Vía Quibdó - Medellín (Túnel de Occidente)", status: "Regular", location: "Km 145 - 148 (Sector El Carmen de Atrato)", message: "Múltiples baches de tamaño considerable en el carril derecho. Tránsito lento.", rec: "Reducir velocidad a 30 km/h. Preferiblemente conducir en carril izquierdo.", user: "Carlos M.", time: "Hace 2 h", lat: 5.8521, lng: -75.6521 },
  { id: 2, title: "Vía Tadó - Certegui", status: "Mala", location: "Km 22 - 25", message: "Vía muy deteriorada con derrumbes menores. Superficie completamente destruida.", rec: "Solo vehículos 4x4. Evitar en época de lluvia. Llevar tiempo extra de viaje.", user: "María L.", time: "Hace 3 h", lat: 5.7821, lng: -76.2389 },
  { id: 3, title: "Vía Quibdó - Pereira (Anserma - Tadó)", status: "Cerrada", location: "Km 78 (Sector La Lorena)", message: "Deslizamiento grande bloqueando completamente ambos carriles. Maquinaria trabajando.", rec: "Vía cerrada totalmente. Usar rutas alternas. Estimar reapertura en 3-4 días.", user: "Jorge P.", time: "Hace 5 h", lat: 5.6321, lng: -76.0521 },
  { id: 4, title: "Vía Quibdó - Istmina - Condoto", status: "Buena", location: "Km 0 - 86 (Todo el trayecto)", message: "Vía en excelente estado, recientemente pavimentada. Flujo vehicular normal.", rec: "Condiciones óptimas. Mantener velocidad reglamentaria.", user: "Ana S.", time: "Hace 3 h", lat: 5.6845, lng: -76.4278 },
  { id: 5, title: "Vía Quibdó - Lloró", status: "Regular", location: "Km 35 - 40", message: "Hundimiento del pavimento en varios puntos. Señalización deficiente.", rec: "Conducir con precaución especialmente de noche. Velocidad máxima 40 km/h en este sector.", user: "Pedro R.", time: "Hace 14 h", lat: 5.7234, lng: -75.9876 }
];

const roadCoords = {
  1: { lat: 6.2442, lng: -75.5812 },
  2: { lat: 5.0353, lng: -75.6757 },
  3: { lat: 5.1589, lng: -76.6521 },
  4: { lat: 5.6817, lng: -76.5428 },
  5: { lat: 5.2637, lng: -76.5595 },
  6: { lat: 5.1823, lng: -76.6685 },
  7: { lat: 5.8986, lng: -76.1425 },
  8: { lat: 5.2874, lng: -76.6299 }
};

function LoginModal({ onClose, onShowRegister, onLogin }) {
  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value.trim();
    const pass = form.password.value.trim();

    if (!email || !pass) {
      alert('Ingresa correo y contraseña');
      return;
    }

    if (email === 'alrxandermarturana76.admin@gmail.com' && pass === '3145312045La') {
      onLogin(email, 'admin');
      return;
    }

    const response = await fetch('/.netlify/functions/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password: pass })
    });

    if (response.ok) {
      const user = await response.json();
      if (user.exists) {
        onLogin(email, user.role);
      } else {
        // Permitir iniciar sesión aunque el usuario no exista en el registro
        alert('Usuario no registrado encontrado; se iniciará sesión como usuario estándar.');
        onLogin(email, 'user');
      }
    } else {
      alert('Error al verificar el usuario. Intenta nuevamente.');
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-lg shadow-2xl w-full max-w-md p-8 relative" style={{backgroundColor:'#f8fafc'}}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition">✕</button>
        <h2 className="text-3xl font-bold mb-6" style={{color:'#030213'}}>Iniciar sesión</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Correo electrónico</label>
            <input id="email" name="email" type="email" placeholder="tu@email.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition" style={{borderColor:'#bfdbfe', color:'#1a1a1a', backgroundColor:'white'}} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Contraseña</label>
            <input id="password" name="password" type="password" placeholder="••••••••" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition" style={{borderColor:'#bfdbfe', color:'#1a1a1a', backgroundColor:'white'}} />
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 font-semibold rounded-lg transition" style={{color:'#717182', backgroundColor:'#efefff'}}>Cancelar</button>
            <button type="submit" className="px-6 py-2 text-white font-bold rounded-lg transition" style={{backgroundColor:'#030213'}}>Entrar</button>
          </div>
        </form>
        <p className="text-center text-sm mt-4" style={{color:'#717182'}}>
          ¿No tienes cuenta? <button type="button" onClick={onShowRegister} className="font-semibold hover:underline ml-1 transition" style={{color:'#2563eb'}}>Regístrate aquí</button>
        </p>
      </div>
    </div>
  );
}

function RegisterModal({ onClose, onRegister }){
  function handleSubmit(e){
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const pass = form.password.value.trim();
    if(!name || !email || !pass){ alert('Completa todos los campos'); return; }
    onRegister(name, email, pass);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-50 rounded-lg shadow-2xl w-full max-w-md p-8 relative" style={{backgroundColor:'#f8fafc'}}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition">✕</button>
        <h2 className="text-3xl font-bold mb-6" style={{color:'#030213'}}>Crear cuenta</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Nombre completo</label>
            <input id="name" name="name" type="text" placeholder="Tu nombre" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition" style={{borderColor:'#bfdbfe', color:'#1a1a1a', backgroundColor:'white'}} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Correo electrónico</label>
            <input id="email" name="email" type="email" placeholder="tu@email.com" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition" style={{borderColor:'#bfdbfe', color:'#1a1a1a', backgroundColor:'white'}} />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Contraseña</label>
            <input id="password" name="password" type="password" placeholder="••••••••" className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition" style={{borderColor:'#bfdbfe', color:'#1a1a1a', backgroundColor:'white'}} />
          </div>
          <div className="flex gap-2 justify-end pt-4">
            <button type="button" onClick={onClose} className="px-4 py-2 font-semibold rounded-lg transition" style={{color:'#717182', backgroundColor:'#efefff'}}>Cancelar</button>
            <button type="submit" className="px-6 py-2 text-white font-bold rounded-lg transition" style={{backgroundColor:'#030213'}}>Registrar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Stats() {
  return (
    <section className="mb-8">
      <h3 className="text-2xl font-bold mb-4" style={{color:'#030213'}}>Estado General de las Vías</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-lg text-center" style={{backgroundColor:'#f0fdf4', borderLeft:'4px solid #22c55e'}}>
          <div className="text-3xl font-bold" style={{color:'#22c55e'}}>3</div>
          <div className="text-sm font-semibold" style={{color:'#030213'}}>Buenas</div>
        </div>
        <div className="p-4 rounded-lg text-center" style={{backgroundColor:'#fffbeb', borderLeft:'4px solid #eab308'}}>
          <div className="text-3xl font-bold" style={{color:'#eab308'}}>3</div>
          <div className="text-sm font-semibold" style={{color:'#030213'}}>Regulares</div>
        </div>
        <div className="p-4 rounded-lg text-center" style={{backgroundColor:'#fef3c7', borderLeft:'4px solid #f97316'}}>
          <div className="text-3xl font-bold" style={{color:'#f97316'}}>1</div>
          <div className="text-sm font-semibold" style={{color:'#030213'}}>Malas</div>
        </div>
        <div className="p-4 rounded-lg text-center" style={{backgroundColor:'#fee2e2', borderLeft:'4px solid #ef4444'}}>
          <div className="text-3xl font-bold" style={{color:'#ef4444'}}>1</div>
          <div className="text-sm font-semibold" style={{color:'#030213'}}>Cerradas</div>
        </div>
      </div>
    </section>
  );
}

function RoadCard({ road }) {
  const getBadgeColor = (status) => {
    switch(status) {
      case 'Buena': return '#22c55e';
      case 'Regular': return '#eab308';
      case 'Mala': return '#f97316';
      case 'Cerrada': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <article className="p-4 border rounded-lg shadow-md hover:shadow-lg transition" style={{borderColor:'#e5e7eb', backgroundColor:'white'}}>
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-bold text-lg" style={{color:'#030213'}}>{road.title}</h3>
        <span className="px-3 py-1 rounded-full text-sm font-bold text-white" style={{backgroundColor: getBadgeColor(road.status)}}>{road.status}</span>
      </div>
      <div className="space-y-2 text-sm mb-3">
        <div><strong style={{color:'#030213'}}>Desde:</strong> {road.from}</div>
        <div><strong style={{color:'#030213'}}>Hasta:</strong> {road.to}</div>
        <div><strong style={{color:'#030213'}}>Distancia:</strong> {road.km}</div>
      </div>
      <p style={{color:'#717182'}} className="mb-3">{road.desc}</p>
      <div className="text-xs" style={{color:'#9ca3af'}}>Última actualización: {road.updated}</div>
    </article>
  );
}

function Report({ r, onViewDetails }) {
  const getBadgeColor = (status) => {
    switch(status) {
      case 'Buena': return '#22c55e';
      case 'Regular': return '#eab308';
      case 'Mala': return '#f97316';
      case 'Cerrada': return '#ef4444';
      default: return '#6b7280';
    }
  };
  return (
    <article className="rounded-xl bg-white p-6 shadow-sm hover:shadow-md transition relative overflow-hidden" style={{border: `1px solid ${getBadgeColor(r.status)}22`}}>
      <div className="flex items-start justify-between mb-3">
        <div className="pr-2">
          <h3 className="font-semibold text-lg text-gray-900 mb-1">{r.title}</h3>
          <div className="text-sm text-gray-500">{r.location}</div>
        </div>
        <div className="text-right">
          <div className="text-sm text-gray-500">Distancia</div>
          <div className="font-bold text-gray-900 text-lg">{r.km ? r.km : ''}</div>
        </div>
      </div>

      <div className="mb-3">
        <div className="inline-block px-3 py-1 rounded-full text-xs font-bold text-white" style={{backgroundColor: getBadgeColor(r.status)}}>{r.status}</div>
        {r.outsideChoco && <div className="inline-block px-2 py-1 ml-2 rounded-full text-xs font-semibold text-white" style={{backgroundColor:'#6b7280'}}>Fuera del Chocó</div>}
      </div>

      <div className="mb-4 text-sm text-gray-700 bg-gray-50 rounded p-3" style={{borderLeft: `4px solid ${getBadgeColor(r.status)}`}}>{r.message}</div>
      <div className="mb-3 text-sm text-gray-600 italic">{r.rec}</div>

      <div className="flex items-center justify-between text-xs text-gray-400 mt-4">
        <div>{r.user}</div>
        <div>{r.time}</div>
      </div>

      <button onClick={() => onViewDetails(r)} className="mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">Ver detalles</button>
    </article>
  );
}

function MapComponent({ reports, highlightReportId, enableClickToSet, onMapClick, tempMarker }) {
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markers = useRef({});
  const propsRef = useRef({});

  const getMarkerColor = (report) => {
    if (report && report.outsideChoco) return '#6b7280';
    const status = report && report.status ? report.status : report;
    switch(status) {
      case 'Buena': return '#22c55e';
      case 'Regular': return '#eab308';
      case 'Mala': return '#f97316';
      case 'Cerrada': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const createMarkerIcon = (color) => {
    return L.divIcon({
      html: `<div style="background-color: ${color}; width: 30px; height: 30px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; font-weight: bold; color: white; font-size: 16px;">📍</div>`,
      iconSize: [36, 36],
      className: 'custom-marker'
    });
  };

  useEffect(() => {
    if (!window.L || !mapRef.current) return;

    if (!mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([5.6929, -75.7519], 8);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 5
      }).addTo(mapInstance.current);
    }

    Object.values(markers.current).forEach(marker => {
      mapInstance.current.removeLayer(marker);
    });
    markers.current = {};

    reports.forEach(report => {
      if (report.lat && report.lng) {
        const marker = L.marker([report.lat, report.lng], {
          icon: createMarkerIcon(getMarkerColor(report))
        }).bindPopup(`<div style="font-size: 12px; width: 200px;"><strong>${report.title}</strong><br/><span style="display:inline-block; margin: 4px 0; padding: 4px 8px; background-color: ${getMarkerColor(report.status)}; color: white; border-radius: 4px; font-weight: bold; font-size: 11px;">${report.status}</span><br/><small><strong>Ubicación:</strong> ${report.location}</small><br/><small><strong>Estado:</strong> ${report.message.substring(0, 50)}...</small><br/><small><strong>Usuario:</strong> ${report.user}</small><br/><small><strong>Reportado:</strong> ${report.time}</small></div>`).addTo(mapInstance.current);
        markers.current[report.id] = marker;
      }
    });

    if (window.L && tempMarker && tempMarker.lat && tempMarker.lng) {
      if (markers.current.__temp) mapInstance.current.removeLayer(markers.current.__temp);
      const m = L.marker([tempMarker.lat, tempMarker.lng], { opacity: 0.85 }).addTo(mapInstance.current);
      markers.current.__temp = m;
    }
  }, [reports]);

  useEffect(() => {
    if (!window.L || !mapInstance.current) return;
    const id = highlightReportId || propsRef.current.highlightReportId;
    if (!id) return;
    const marker = markers.current[id];
    if (marker) {
      try {
        marker.openPopup();
        mapInstance.current.setView(marker.getLatLng(), Math.max(mapInstance.current.getZoom(), 12));
      } catch (err) {
        console.warn('No se pudo abrir popup para el reporte', id, err);
      }
    }
    propsRef.current.highlightReportId = null;
  }, [reports, highlightReportId]);

  useEffect(() => {
    if (!window.L || !mapInstance.current) return;
    function onClick(e){
      if (!enableClickToSet) return;
      const { lat, lng } = e.latlng;
      if (typeof onMapClick === 'function') onMapClick({ lat, lng });
    }
    mapInstance.current.on('click', onClick);
    return () => mapInstance.current.off('click', onClick);
  }, [enableClickToSet, onMapClick]);

  return <div ref={mapRef} style={{width: '100%', height: '500px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb', marginBottom: '2rem'}}></div>;
}

function ReportDetailsModal({ report, onClose }) {
  if (!report) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition">✕</button>
        <h2 className="text-2xl font-bold mb-4 text-blue-700">Detalles del reporte</h2>
        <div className="mb-2"><span className="font-bold text-gray-700">Vía:</span> {report.title}</div>
        <div className="mb-2"><span className="font-bold text-gray-700">Estado:</span> <span style={{color: '#fff', backgroundColor: '#2563eb', borderRadius: '6px', padding: '2px 8px'}}>{report.status}</span></div>
        <div className="mb-2"><span className="font-bold text-gray-700">Ubicación:</span> {report.location}</div>
        <div className="mb-2"><span className="font-bold text-gray-700">Descripción:</span> {report.message}</div>
        <div className="mb-2"><span className="font-bold text-gray-700">Recomendaciones:</span> {report.rec}</div>
        <div className="mb-2"><span className="font-bold text-gray-700">Usuario:</span> {report.user}</div>
        <div className="mb-2"><span className="font-bold text-gray-700">Fecha:</span> {report.time}</div>
        {report.outsideChoco && <div className="mb-2"><span className="font-bold text-gray-700">Nota:</span> <span className="inline-block px-2 py-1 rounded text-white" style={{backgroundColor:'#6b7280'}}>Reporte fuera del área del Chocó</span></div>}
        {report.files && report.files.length > 0 && (
          <div className="mt-4">
            <span className="font-bold text-gray-700 block mb-2">Evidencia:</span>
            {report.files.map((file, idx) => (
              file.type.startsWith('image') ? <img key={idx} src={file.data || file.url} alt="Evidencia" className="rounded-lg mb-2 w-full max-h-48 object-cover" /> : <video key={idx} controls className="rounded-lg mb-2 w-full max-h-48"><source src={file.data || file.url} type={file.type} />Tu navegador no soporta video.</video>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function AdminPanel({ reports, setReports, users, setUsers, roads, onClose, apiAvailable }) {
  const [tab, setTab] = useState('reports');
  const [filter, setFilter] = useState('all');

  const approveToggle = async (id) => {
    const report = reports.find(r => r.id === id);
    const updated = { ...report, approved: !report.approved };
    setReports(prev => prev.map(r => r.id === id ? updated : r));

    if (apiAvailable) {
      try {
        const res = await fetch(`/.netlify/functions/reports?id=${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
        if (!res.ok) console.warn('Error al actualizar en servidor');
      } catch (err) {
        console.warn('Error de conexión:', err.message);
      }
    }
  };

  const removeReport = async (id) => {
    if (!confirm('¿Eliminar este reporte?')) return;
    setReports(prev => prev.filter(r => r.id !== id));

    if (apiAvailable) {
      try {
        const res = await fetch(`/.netlify/functions/reports?id=${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) console.warn('Error al eliminar en servidor');
      } catch (err) {
        console.warn('Error de conexión:', err.message);
      }
    }
  };

  const editReport = async (r) => {
    const newMsg = prompt('Editar descripción', r.message);
    if (newMsg == null) return;
    const updated = { ...r, message: newMsg };
    setReports(prev => prev.map(rep => rep.id === r.id ? updated : rep));

    if (apiAvailable) {
      try {
        const res = await fetch(`/.netlify/functions/reports?id=${r.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
        if (!res.ok) console.warn('Error al actualizar en servidor');
      } catch (err) {
        console.warn('Error de conexión:', err.message);
      }
    }
  };

  const blockToggle = async (name) => {
    const user = users.find(u => u.name === name);
    const updated = { ...user, blocked: !user.blocked };
    setUsers(prev => prev.map(u => u.name === name ? updated : u));

    if (apiAvailable) {
      try {
        const res = await fetch(`/.netlify/functions/users?name=${encodeURIComponent(name)}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updated)
        });
        if (!res.ok) console.warn('Error al actualizar usuario en servidor');
      } catch (err) {
        console.warn('Error de conexión:', err.message);
      }
    }
  };

  const stats = useMemo(() => {
    const total = reports.length;
    const approved = reports.filter(r => r.approved).length;
    const pending = reports.filter(r => !r.approved).length;
    const byStatus = reports.reduce((acc, r) => { acc[r.status] = (acc[r.status] || 0) + 1; return acc; }, {});
    const byRoad = reports.reduce((acc, r) => { acc[r.title] = (acc[r.title] || 0) + 1; return acc; }, {});
    const topRoads = Object.entries(byRoad).sort((a,b)=>b[1]-a[1]).slice(0,10);
    const totalUsers = users.length;
    const activeUsers = users.filter(u => !u.blocked).length;
    const admins = users.filter(u => u.role === 'admin').length;
    return { total, approved, pending, byStatus, topRoads, totalUsers, activeUsers, admins };
  }, [reports, users]);

  const filteredReports = useMemo(() => {
    if (filter === 'approved') return reports.filter(r => r.approved);
    if (filter === 'pending') return reports.filter(r => !r.approved);
    return reports;
  }, [reports, filter]);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 md:p-6 text-white flex items-center justify-between sticky top-0 z-50 shadow-lg">
        <h1 className="text-2xl md:text-3xl font-black">🛡️ Panel de Administración</h1>
        <button onClick={onClose} className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition text-2xl">✕</button>
      </div>

      <div className="bg-gray-50 px-3 md:px-6 py-3 md:py-4 border-b flex gap-2 md:gap-4 flex-wrap sticky top-16 overflow-x-auto z-40 shadow-sm">
        <button onClick={()=>{setTab('reports'); setFilter('all');}} className={`px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base whitespace-nowrap ${tab==='reports' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}>📋 Reportes</button>
        <button onClick={()=>setTab('users')} className={`px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base whitespace-nowrap ${tab==='users' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}>👥 Usuarios</button>
        <button onClick={()=>setTab('stats')} className={`px-3 md:px-4 py-2 rounded-lg font-semibold transition text-sm md:text-base whitespace-nowrap ${tab==='stats' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700 border hover:bg-gray-100'}`}>📊 Estadísticas</button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        {tab === 'reports' && (
          <div>
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">📋 Gestión de Reportes</h3>
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-600">
                  <div className="text-2xl md:text-3xl font-bold text-blue-700">{reports.length}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Total</div>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg border-l-4 border-yellow-600">
                  <div className="text-2xl md:text-3xl font-bold text-yellow-700">{reports.filter(r=>!r.approved).length}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Pendientes</div>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-l-4 border-green-600">
                  <div className="text-2xl md:text-3xl font-bold text-green-700">{reports.filter(r=>r.approved).length}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Aprobados</div>
                </div>
              </div>
            </div>

            <div className="mb-6 flex gap-2 flex-wrap">
              <button onClick={()=>setFilter('all')} className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-semibold transition ${filter==='all' ? 'bg-blue-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Todos</button>
              <button onClick={()=>setFilter('pending')} className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-semibold transition ${filter==='pending' ? 'bg-yellow-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Pendientes</button>
              <button onClick={()=>setFilter('approved')} className={`px-3 md:px-4 py-2 rounded-lg text-sm md:text-base font-semibold transition ${filter==='approved' ? 'bg-green-600 text-white shadow-md' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Aprobados</button>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto max-h-96 md:max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm md:text-base">
                  <thead className="bg-gradient-to-r from-blue-600 to-blue-700 text-white sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Vía</th>
                      <th className="px-4 py-3 text-left font-semibold">Estado</th>
                      <th className="px-4 py-3 text-left font-semibold">Usuario</th>
                      <th className="px-4 py-3 text-left font-semibold">Ubicación</th>
                      <th className="px-4 py-3 text-center font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredReports.length > 0 ? (
                      filteredReports.map(r => (
                        <tr key={r.id} className={`hover:bg-gray-50 transition ${r.approved ? 'bg-green-50/30' : 'bg-yellow-50/20'}`}>
                          <td className="px-4 py-3 font-semibold text-gray-800 truncate">{r.title}</td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <span className={`inline-block w-3 h-3 rounded-full ${r.approved ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                              <span className={`text-xs md:text-sm font-semibold ${r.approved ? 'text-green-700' : 'text-yellow-700'}`}>{r.approved ? 'Aprobado' : 'Pendiente'}</span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-gray-700 text-xs md:text-sm">{r.user}</td>
                          <td className="px-4 py-3 text-gray-600 text-xs md:text-sm truncate">{r.location}</td>
                          <td className="px-4 py-3 text-center">
                            <div className="flex justify-center gap-2 flex-wrap">
                              <button onClick={() => approveToggle(r.id)} className={`px-2 md:px-3 py-1 text-xs rounded font-semibold transition ${r.approved ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-yellow-500 text-white hover:bg-yellow-600'}`} title={r.approved ? 'Rechazar' : 'Aprobar'}>{r.approved ? '✓' : '⏳'}</button>
                              <button onClick={() => editReport(r)} className="px-2 md:px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 font-semibold transition" title="Editar">✏️</button>
                              <button onClick={() => removeReport(r.id)} className="px-2 md:px-3 py-1 text-xs rounded bg-red-500 text-white hover:bg-red-600 font-semibold transition" title="Eliminar">🗑️</button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-12 text-center text-gray-400">
                          <p className="text-lg">📭 No hay reportes en esta categoría</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'users' && (
          <div>
            <div className="mb-8">
              <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-800">👥 Gestión de Usuarios</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                <div className="p-3 md:p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border-l-4 border-blue-600">
                  <div className="text-2xl md:text-3xl font-bold text-blue-700">{users.length}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Total</div>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border-l-4 border-green-600">
                  <div className="text-2xl md:text-3xl font-bold text-green-700">{users.filter(u => !u.blocked).length}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Activos</div>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-br from-red-50 to-red-100 rounded-lg border-l-4 border-red-600">
                  <div className="text-2xl md:text-3xl font-bold text-red-700">{users.filter(u => u.blocked).length}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Bloqueados</div>
                </div>
                <div className="p-3 md:p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-600">
                  <div className="text-2xl md:text-3xl font-bold text-purple-700">{users.filter(u => u.role === 'admin').length}</div>
                  <div className="text-xs md:text-sm text-gray-600 mt-1">Admins</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="overflow-x-auto max-h-96 md:max-h-[500px] overflow-y-auto">
                <table className="w-full text-sm md:text-base">
                  <thead className="bg-gradient-to-r from-purple-600 to-purple-700 text-white sticky top-0">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Nombre</th>
                      <th className="px-4 py-3 text-left font-semibold">Rol</th>
                      <th className="px-4 py-3 text-left font-semibold">Estado</th>
                      <th className="px-4 py-3 text-center font-semibold">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {users.map(u => (
                      <tr key={u.name} className={`hover:bg-gray-50 transition ${u.blocked ? 'bg-red-50/30' : 'bg-green-50/30'}`}>
                        <td className="px-4 py-3 font-semibold text-gray-800">{u.name}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${u.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'}`}>{u.role === 'admin' ? '👑 Admin' : '👤 Usuario'}</span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <span className={`inline-block w-3 h-3 rounded-full ${u.blocked ? 'bg-red-500' : 'bg-green-500'}`}></span>
                            <span className={`text-xs md:text-sm font-semibold ${u.blocked ? 'text-red-700' : 'text-green-700'}`}>{u.blocked ? 'Bloqueado' : 'Activo'}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex justify-center gap-2 flex-wrap">
                            <button onClick={() => blockToggle(u.name)} className={`px-2 md:px-3 py-1 text-xs rounded font-semibold transition ${u.blocked ? 'bg-green-500 text-white hover:bg-green-600' : 'bg-red-500 text-white hover:bg-red-600'}`} title={u.blocked ? 'Desbloquear' : 'Bloquear'}>{u.blocked ? '🔓' : '🔒'}</button>
                            <button onClick={() => setUsers(prev => prev.map(x => x.name===u.name ? {...x, role: x.role==='user' ? 'admin' : 'user'} : x))} className="px-2 md:px-3 py-1 text-xs rounded bg-purple-500 text-white hover:bg-purple-600 font-semibold transition" title={`Cambiar a ${u.role === 'admin' ? 'Usuario' : 'Admin'}`}>{u.role === 'admin' ? '⬇️' : '⬆️'}</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'stats' && (
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">Estadísticas del Sistema</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8">
              <div className="p-4 md:p-6 bg-blue-50 border-2 border-blue-200 rounded-lg">
                <div className="text-3xl md:text-4xl font-black text-blue-600">{stats.total}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-2">Total de reportes</div>
              </div>
              <div className="p-4 md:p-6 bg-green-50 border-2 border-green-200 rounded-lg">
                <div className="text-3xl md:text-4xl font-black text-green-600">{stats.approved}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-2">Reportes aprobados</div>
              </div>
              <div className="p-4 md:p-6 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
                <div className="text-3xl md:text-4xl font-black text-yellow-600">{stats.pending}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-2">Reportes pendientes</div>
              </div>
              <div className="p-4 md:p-6 bg-purple-50 border-2 border-purple-200 rounded-lg">
                <div className="text-3xl md:text-4xl font-black text-purple-600">{stats.totalUsers}</div>
                <div className="text-xs md:text-sm text-gray-600 mt-2">Usuarios totales</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <h4 className="font-bold text-base md:text-lg mb-4 text-gray-800">📊 Reportes por Estado</h4>
                {Object.entries(stats.byStatus).length > 0 ? (
                  <div className="space-y-3">
                    {Object.entries(stats.byStatus).map(([status, count]) => (
                      <div key={status} className="flex items-center">
                        <div className="flex-1">
                          <div className="text-xs md:text-sm font-semibold text-gray-700">{status}</div>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: `${(count/stats.total)*100}%`}}></div>
                          </div>
                        </div>
                        <div className="ml-3 text-base md:text-lg font-bold text-gray-800">{count}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Sin datos</p>
                )}
              </div>

              <div className="p-4 md:p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <h4 className="font-bold text-base md:text-lg mb-4 text-gray-800">🚗 Top Vías con Reportes</h4>
                {stats.topRoads.length > 0 ? (
                  <div className="space-y-3">
                    {stats.topRoads.map(([name, count], idx) => (
                      <div key={name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="text-base md:text-lg font-bold text-blue-600">{idx+1}.</div>
                          <div className="text-xs md:text-sm font-semibold text-gray-700 truncate">{name}</div>
                        </div>
                        <div className="text-base md:text-lg font-bold text-gray-800">{count}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Sin datos</p>
                )}
              </div>

              <div className="p-4 md:p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <h4 className="font-bold text-base md:text-lg mb-4 text-gray-800">👥 Estado de Usuarios</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-semibold text-gray-700">Usuarios activos</span>
                    <span className="text-base md:text-lg font-bold text-green-600">{stats.activeUsers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-semibold text-gray-700">Usuarios bloqueados</span>
                    <span className="text-base md:text-lg font-bold text-red-600">{stats.totalUsers - stats.activeUsers}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-semibold text-gray-700">Administradores</span>
                    <span className="text-base md:text-lg font-bold text-purple-600">{stats.admins}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-6 bg-gray-50 border-2 border-gray-200 rounded-lg">
                <h4 className="font-bold text-base md:text-lg mb-4 text-gray-800">✅ Resumen General</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-semibold text-gray-700">% de aprobación</span>
                    <span className="text-base md:text-lg font-bold text-blue-600">{stats.total > 0 ? Math.round((stats.approved/stats.total)*100) : 0}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs md:text-sm font-semibold text-gray-700">Promedio por vía</span>
                    <span className="text-base md:text-lg font-bold text-gray-800">{stats.total > 0 ? (stats.total / (stats.topRoads.length || 1)).toFixed(1) : 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="bg-gray-900 text-white py-8 md:py-10 mt-auto border-t border-gray-700">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-6 md:mb-8">
            <div>
              <h4 className="text-base md:text-lg font-bold mb-3">Sobre Nosotros</h4>
              <p className="text-gray-400 text-xs md:text-sm">Vías del Chocó: Información vial en tiempo real para mejorar la seguridad.</p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-bold mb-3">Enlaces</h4>
              <ul className="space-y-1 md:space-y-2 text-gray-400 text-xs md:text-sm">
                <li><button className="hover:text-white transition" onClick={() => { const el = document.getElementById('about-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Sobre Nosotros</button></li>
                <li><a href="#" className="hover:text-white transition">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-bold mb-3">Contacto</h4>
              <p className="text-gray-400 text-xs md:text-sm mb-2">
                📧 <a href="mailto:Alrxandermaturana76@gmail.com" className="text-gray-400 hover:text-blue-400 transition">Alrxandermaturana76@gmail.com</a>
              </p>
              <p className="text-gray-400 text-xs md:text-sm mb-2">
                📞 <a href="https://wa.me/573145312045" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition">+57 314 531 2045</a>
              </p>
              <p className="text-gray-400 text-xs md:text-sm">📍 Quibdó, Chocó</p>
            </div>
            <div>
              <h4 className="text-base md:text-lg font-bold mb-3">Síguenos</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition text-lg md:text-xl">f</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition text-lg md:text-xl">𝕏</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition text-lg md:text-xl">📷</a>
              </div>
            </div>
          </div>
          <hr className="border-gray-700 mb-4 md:mb-6" />
          <div className="text-center text-gray-400 text-xs md:text-sm">
            <p>&copy; 2025 Vías del Chocó. Realizado por <span className="text-blue-400 font-bold">luisito</span> | Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function AboutSection() {
  return (
    <section id="about-section" className="w-full max-w-3xl mx-auto my-12 p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4" style={{color:'#030213'}}>Sobre Nosotros</h2>
      <div className="mb-4"><span className="font-semibold">Creador:</span> Luis Alexander Marturana</div>
      <div className="mb-4"><span className="font-semibold">Carrera:</span> Ingeniería de Sistemas</div>
      <div className="mb-4"><span className="font-semibold">Semestre:</span> 2°</div>
      <div className="mb-4"><span className="font-semibold">Correo:</span> alrxandermaturana76.admin@gmail.com</div>
      <p className="text-gray-700 mb-2">Vías del Chocó es una plataforma colaborativa para reportar y consultar el estado de las vías en tiempo real. Nuestro objetivo es mejorar la movilidad y seguridad de todos los viajeros y habitantes del departamento.</p>
      <p className="text-gray-700">Puedes contribuir reportando incidentes, condiciones de la vía, y compartiendo información útil para la comunidad. ¡Juntos hacemos mejores caminos!</p>
    </section>
  );
}

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showReport, setShowReport] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userName, setUserName] = useState('');
  const [roads, setRoads] = useState(roadsData);
  const [reports, setReports] = useState(reportsData);
  const [activeTab, setActiveTab] = useState('all');
  const [showDetails, setShowDetails] = useState(null);
  const [recentReports, setRecentReports] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [users, setUsers] = useState(() => {
    const uniq = Array.from(new Set(reportsData.map(r => r.user))).map(u => ({ name: u, blocked: false, role: 'user' }));
    return uniq;
  });
  const [highlightReportId, setHighlightReportId] = useState(null);
  const [view, setView] = useState('main');
  const [mapClickMode, setMapClickMode] = useState(false);
  const [pendingCoords, setPendingCoords] = useState(null);
  const [apiAvailable, setApiAvailable] = useState(false);
  const [selectedCoords, setSelectedCoords] = useState(null);

  useEffect(() => {
    const loadFromServer = async () => {
      try {
        const healthRes = await fetch('/.netlify/functions/health');
        if (healthRes.ok) {
          const h = await healthRes.json();
          if (h && h.ok) {
            setApiAvailable(true);
            try {
              const res = await fetch('/.netlify/functions/reports');
              if (res.ok) {
                const data = await res.json();
                setReports(data);
              } else {
                console.warn('No se pudo obtener reportes desde el servidor:', res.statusText);
              }
            } catch (err) {
              console.warn('Error obteniendo reportes:', err.message);
            }
            return;
          }
        }
        setApiAvailable(false);
      } catch (err) {
        console.warn('Servidor no disponible, usando datos en memoria:', err.message);
        setApiAvailable(false);
      }
    };
    loadFromServer();
  }, []);

  const handleNewReport = async (reportData) => {
    const chocoPolygon = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-78.5, 4.0],
          [-75.0, 4.0],
          [-75.0, 8.0],
          [-78.5, 8.0],
          [-78.5, 4.0]
        ]]
      }
    };

    const isWithinChoco = (lat, lng) => {
      if (!lat || !lng) return false;
      try {
        if (window.turf && typeof window.turf.booleanPointInPolygon === 'function') {
          const pt = window.turf.point([Number(lng), Number(lat)]);
          return window.turf.booleanPointInPolygon(pt, chocoPolygon);
        }
      } catch (e) {
        console.warn('turf error, falling back to bbox', e);
      }
      const minLat = 4.0;
      const maxLat = 8.0;
      const minLng = -78.5;
      const maxLng = -75.0;
      return lat >= minLat && lat <= maxLat && lng >= minLng && lng <= maxLng;
    };

    const newId = Math.max(...reports.map(r => r.id), 0) + 1;

    let lat = reportData.lat;
    let lng = reportData.lng;
    const roadId = parseInt(reportData.road);
    if ((!lat || !lng) && roadCoords[roadId]) {
      const jitter = () => (Math.random() - 0.5) * 0.02;
      lat = roadCoords[roadId].lat + jitter();
      lng = roadCoords[roadId].lng + jitter();
    }

    const allReports = [...reports, ...recentReports];
    if (lat && lng) {
      let attempts = 0;
      const maxAttempts = 12;
      const jitter = () => (Math.random() - 0.5) * 0.02;
      while (attempts < maxAttempts && allReports.some(r => Math.abs(r.lat - lat) < 0.0015 && Math.abs(r.lng - lng) < 0.0015)) {
        lat = Number(lat) + jitter();
        lng = Number(lng) + jitter();
        attempts++;
      }
    }

    const newReport = {
      id: newId,
      ...reportData,
      user: userName,
      time: 'Hace 0 min',
      lat,
      lng,
      approved: false
    };

    const latNumAfter = lat ? Number(lat) : null;
    const lngNumAfter = lng ? Number(lng) : null;
    const outsideChocoFlag = latNumAfter && lngNumAfter ? !isWithinChoco(latNumAfter, lngNumAfter) : false;
    newReport.outsideChoco = outsideChocoFlag;

    const allowedOutsideRoads = [1, 2];
    if (!allowedOutsideRoads.includes(roadId)) {
      if (latNumAfter && lngNumAfter && !isWithinChoco(latNumAfter, lngNumAfter)) {
        alert('Las coordenadas del reporte deben ubicarse dentro del departamento del Chocó para esta vía. Por favor selecciona un punto válido en el mapa.');
        return;
      }
      if (!latNumAfter || !lngNumAfter) {
        alert('Necesitas seleccionar la ubicación del reporte dentro del Chocó (usa el mapa para marcar el punto).');
        return;
      }
    }

    const filteredReports = reports.filter(r => !(r.title === reportData.title && r.location === reportData.location));
    const updatedReports = [newReport, ...filteredReports];
    setReports(updatedReports);
    setRecentReports([newReport, ...recentReports]);

    const roadIndex = roads.findIndex(r => r.id === roadId);
    if (roadIndex !== -1) {
      const updatedRoads = [...roads];
      updatedRoads[roadIndex].status = reportData.status;
      updatedRoads[roadIndex].updated = new Date().toLocaleString('es-ES');
      setRoads(updatedRoads);
    }

    setHighlightReportId(newId);
    setShowReport(false);
    setMapClickMode(false);
    setPendingCoords(null);
    setTimeout(() => setHighlightReportId(null), 1500);

    if (apiAvailable) {
      try {
        const res = await fetch('/.netlify/functions/reports', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newReport)
        });
        if (!res.ok) {
          console.warn('Error al guardar en servidor:', res.statusText);
        }
      } catch (err) {
        console.warn('Error de conexión al guardar reporte:', err.message);
      }
    }
  };

  const handleMapClick = ({ lat, lng }) => {
    setSelectedCoords({ lat, lng });
    setMapClickMode(false);
    setTimeout(() => {
      const latInput = document.getElementById('report-latitude');
      if (latInput) latInput.focus();
    }, 100);
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center relative overflow-hidden" style={{backgroundImage: "url('img/logo.jpeg')"}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 text-center text-white px-4 max-w-2xl">
          <div className="mb-8">
            <img src="img/logoviaa.png" alt="Vías del Chocó" className="h-20 rounded-lg shadow-lg mx-auto mb-8" />
          </div>
          <h1 className="text-6xl md:text-7xl font-black drop-shadow-2xl mb-4">Vías del Chocó</h1>
          <p className="text-xl md:text-2xl text-gray-100 drop-shadow-lg mb-12">Información actualizada sobre el estado de las carreteras</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowLogin(true)} className="px-8 py-3 bg-white text-black font-bold rounded-lg shadow-lg hover:bg-gray-100 transition text-lg">Iniciar sesión</button>
            <button onClick={() => setShowRegister(true)} className="px-8 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition text-lg">Registrarse</button>
          </div>
        </div>

        {showLogin && <LoginModal onClose={() => setShowLogin(false)} onShowRegister={() => { setShowLogin(false); setShowRegister(true); }} onLogin={(email, role) => { const localPart = String(email).toLowerCase().split('@')[0] || ''; const isAdminUser = (role === 'admin') || localPart === 'admin' || localPart.endsWith('.admin'); setIsAuthenticated(true); setUserName(email); setIsAdmin(isAdminUser); localStorage.setItem('currentUser', email); setShowLogin(false); }} />}
        {showRegister && <RegisterModal onClose={() => setShowRegister(false)} onRegister={(name, email, password) => { const localPart = String(email).toLowerCase().split('@')[0] || ''; const isAdminUser = localPart === 'admin' || localPart.endsWith('.admin'); setIsAuthenticated(true); setUserName(email); setIsAdmin(isAdminUser); localStorage.setItem('currentUser', email); const newUser = { name, email, password, blocked: false, role: isAdminUser ? 'admin' : 'user' }; setUsers(prev => [...prev, newUser]); if (apiAvailable) { fetch('/.netlify/functions/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newUser) }).catch(err => console.warn('Error al guardar usuario en servidor:', err.message)); } setShowRegister(false); }} />}
      </div>
    );
  }

  if (view === 'admin') {
    return <AdminPanel reports={reports} setReports={setReports} users={users} setUsers={setUsers} roads={roads} onClose={()=>setView('main')} apiAvailable={apiAvailable} />;
  }

  return (
    <div className="app min-h-screen bg-gray-50">
      <div className="relative w-full h-56 md:h-72 flex items-center justify-center" style={{backgroundImage: "url('img/LOGOCHCOCVIA.jpg')", backgroundSize: 'cover', backgroundPosition: 'center'}}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center w-full">
          <h1 className="text-5xl md:text-6xl font-black text-white drop-shadow-lg mb-2">Vías del Chocó</h1>
          <p className="text-lg md:text-2xl text-gray-100 drop-shadow mb-4">Información actualizada sobre el estado de las carreteras</p>
        </div>
        <nav className="fixed top-0 left-0 w-full bg-white/90 shadow-lg backdrop-blur-md flex items-center justify-between px-4 py-3 md:px-12 md:py-4" style={{borderBottom: '2px solid #2563eb', zIndex: 10000}}>
          <div className="flex items-center gap-3">
            <span className="font-black text-xl md:text-2xl text-blue-700">Vías del Chocó</span>
          </div>
          <div className="hidden md:flex gap-8 items-center">
            <button className={`font-bold px-4 py-2 rounded-lg transition ${activeTab==='all' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={()=>setActiveTab('all')}>Todos los Reportes</button>
            <button className={`font-bold px-4 py-2 rounded-lg transition ${activeTab==='recent' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={()=>setActiveTab('recent')}>Reportes Recientes</button>
            <button className="font-bold px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={() => { const el = document.getElementById('about-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Sobre nosotros</button>
            <div className="w-px h-6 bg-gray-300"></div>
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-gray-700">{userName}</span>
              {isAdmin && <button onClick={()=>setView('admin')} className="font-semibold px-3 py-1 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition inline-block">Panel Admin</button>}
              <button onClick={()=>{setIsAuthenticated(false); setShowMenu(false);}} className="font-bold px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition">Cerrar Sesión</button>
            </div>
          </div>
          <div className="md:hidden">
            <button onClick={()=>setShowMenu(m=>!m)} className="p-2 rounded-lg bg-blue-100 text-blue-700">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7"><path strokeLinecap="round" strokeLinejoin="round" d="M4.75 6.75h14.5M4.75 12h14.5M4.75 17.25h14.5" /></svg>
            </button>
            {showMenu && (
              <div className="absolute top-16 left-0 w-full bg-white shadow-lg flex flex-col gap-2 p-4" style={{zIndex: 10000}}>
                <button className={`font-bold px-4 py-2 rounded-lg transition ${activeTab==='all' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={()=>{setActiveTab('all');setShowMenu(false);}}>Todos los Reportes</button>
                <button className={`font-bold px-4 py-2 rounded-lg transition ${activeTab==='recent' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`} onClick={()=>{setActiveTab('recent');setShowMenu(false);}}>Reportes Recientes</button>
                <button className="font-bold px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100" onClick={()=>{ const el = document.getElementById('about-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); setShowMenu(false); }}>Sobre nosotros</button>
                <div className="border-t border-gray-200 my-2"></div>
                <div className="px-4 py-2">
                  <p className="text-xs text-gray-500 mb-2">Sesión: <span className="font-semibold text-gray-700">{userName}</span></p>
                </div>
                {isAdmin && <button onClick={()=>{ setView('admin'); setShowMenu(false); }} className="font-semibold px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition text-left mb-2 inline-block w-full text-center">Panel Admin</button>}
                <button onClick={()=>{setIsAuthenticated(false); setShowMenu(false);}} className="font-bold px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition text-left">🚪 Cerrar Sesión</button>
              </div>
            )}
          </div>
        </nav>
      </div>

      <main className="flex-1 container mx-auto px-2 md:px-8 py-8">
        <Stats />
        <section className="mb-12">
          <div className="mb-4">
            <h2 className="text-3xl font-bold text-gray-800">📍 Mapa en Tiempo Real</h2>
            <p className="text-gray-600 mt-2">Visualiza la ubicación de todos los reportes de vías en el Chocó</p>
          </div>
          <MapComponent reports={reports} highlightReportId={highlightReportId} enableClickToSet={mapClickMode} onMapClick={handleMapClick} tempMarker={selectedCoords} />
          <div className="mt-4 bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <h3 className="font-bold text-gray-800 mb-3">Leyenda de Estados:</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="flex items-center gap-2">
                <div style={{width: '20px', height: '20px', backgroundColor: '#22c55e', borderRadius: '50%'}}></div>
                <span className="text-sm text-gray-700">Buena</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{width: '20px', height: '20px', backgroundColor: '#eab308', borderRadius: '50%'}}></div>
                <span className="text-sm text-gray-700">Regular</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{width: '20px', height: '20px', backgroundColor: '#f97316', borderRadius: '50%'}}></div>
                <span className="text-sm text-gray-700">Mala</span>
              </div>
              <div className="flex items-center gap-2">
                <div style={{width: '20px', height: '20px', backgroundColor: '#ef4444', borderRadius: '50%'}}></div>
                <span className="text-sm text-gray-700">Cerrada</span>
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col items-center mt-8 mb-6">
          <button onClick={() => setShowReport(true)} className="px-6 md:px-8 py-3 md:py-4 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 flex items-center gap-3 text-lg" style={{boxShadow:'0 6px 20px 0 rgba(37,99,235,0.12)'}}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5" style={{color:'white'}}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h9" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5L20.5 7.5 8 20H4v-4L16.5 3.5z" />
            </svg>
            Hacer Reporte
          </button>
          <div className="mt-4 bg-white/60 rounded-xl p-1 shadow-sm flex items-center gap-1" style={{border:'1px solid rgba(0,0,0,0.04)'}}>
            <button onClick={() => setActiveTab('all')} className={`px-5 py-2 rounded-lg font-semibold transition ${activeTab==='all' ? 'bg-white text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}>Todas las Vías</button>
            <button onClick={() => setActiveTab('recent')} className={`px-5 py-2 rounded-lg font-semibold transition ${activeTab==='recent' ? 'bg-white text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}>Reportes Recientes</button>
          </div>
        </div>

        {activeTab === 'all' && (
          <section className="py-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Reportes de todas las vías</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reports.length > 0 ? reports.map(r => <Report key={r.id} r={r} onViewDetails={setShowDetails} />) : <div className="text-center py-8 text-gray-500"><p className="text-lg">No hay reportes disponibles</p></div>}
            </div>
          </section>
        )}
        {activeTab === 'recent' && (
          <section className="py-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Reportes recientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReports.length > 0 ? recentReports.map(r => <Report key={r.id} r={r} onViewDetails={setShowDetails} />) : <div className="text-center py-8 text-gray-500"><p className="text-lg">No hay reportes recientes. Usa "Hacer Reporte" para crear uno.</p></div>}
            </div>
          </section>
        )}

        <ReportDetailsModal report={showDetails} onClose={()=>setShowDetails(null)} />
        <AboutSection />
      </main>

      {showReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4" style={{zIndex: 9999}}>
          <div className="bg-gray-50 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 relative" style={{backgroundColor:'#f8fafc'}}>
            <button onClick={() => setShowReport(false)} className="sticky top-0 absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-full transition bg-white">✕</button>
            <h2 className="text-2xl md:text-3xl font-bold mb-6 pr-8" style={{color:'#030213'}}>Hacer Reporte</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              if (!selectedCoords || !selectedCoords.lat || !selectedCoords.lng) {
                alert('Por favor, selecciona la ubicación en el mapa primero');
                return;
              }
              const form = e.target;
              const filesInput = form.files;
              const files = Array.from(filesInput.files || []);
              const filesData = [];
              for (const file of files) {
                const reader = new FileReader();
                const fileBase64 = await new Promise((resolve) => {
                  reader.onload = () => resolve(reader.result);
                  reader.readAsDataURL(file);
                });
                filesData.push({
                  name: file.name,
                  type: file.type,
                  data: fileBase64
                });
              }
              handleNewReport({
                title: form.road.options[form.road.selectedIndex].text,
                road: form.road.value,
                status: form.status.value,
                location: form.location.value,
                message: form.comment.value,
                rec: form.recommendations.value,
                lat: selectedCoords.lat,
                lng: selectedCoords.lng,
                files: filesData
              });
            }} className="space-y-4">
              <div>
                <label htmlFor="report-road" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Selecciona la Vía</label>
                <select id="report-road" name="road" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-sm md:text-base" style={{borderColor:'#bfdbfe', backgroundColor:'white', color:'#1a1a1a'}}>
                  <option value="">Selecciona una vía</option>
                  {roads.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="report-status" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Estado Actual</label>
                <select id="report-status" name="status" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-sm md:text-base" style={{borderColor:'#bfdbfe', backgroundColor:'white', color:'#1a1a1a'}}>
                  <option value="">Selecciona el estado</option>
                  <option value="Buena">Buena - Transitable sin problemas</option>
                  <option value="Regular">Regular - Algunos baches o demoras</option>
                  <option value="Mala">Mala - Muy deteriorada</option>
                  <option value="Cerrada">Cerrada - Intransitable</option>
                </select>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border-2 border-blue-300">
                <h3 className="text-base font-bold mb-2" style={{color:'#030213'}}>📍 Paso 1: Selecciona la Ubicación en el Mapa</h3>
                <p className="text-xs md:text-sm text-gray-600 mb-3">Haz clic en el mapa para marcar exactamente dónde está el problema. El sistema capturará automáticamente las coordenadas.</p>
                {selectedCoords ? (
                  <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
                    <p className="text-sm font-semibold text-green-800">✓ Ubicación capturada</p>
                    <p className="text-xs text-gray-600 mt-1">Lat: {selectedCoords.lat?.toFixed(4)} | Lon: {selectedCoords.lng?.toFixed(4)}</p>
                  </div>
                ) : (
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3 rounded">
                    <p className="text-sm font-semibold text-yellow-800">⚠️ Ubicación no seleccionada</p>
                    <p className="text-xs text-gray-600 mt-1">Presiona el botón de abajo y luego haz clic en el mapa</p>
                  </div>
                )}
                <button type="button" onClick={() => setMapClickMode(!mapClickMode)} className={`w-full mt-3 px-4 py-3 rounded-lg font-bold transition text-sm md:text-base ${mapClickMode ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'}`}>{mapClickMode ? '❌ CANCELAR - Presiona de nuevo para salir' : '🗺️ ACTIVAR SELECCIÓN EN MAPA'}</button>
              </div>
              <div>
                <label htmlFor="report-location" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Ubicación Específica (Kilómetro)</label>
                <input type="text" id="report-location" name="location" placeholder="Ej: Km 45 - 48" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-sm md:text-base" style={{borderColor:'#bfdbfe', backgroundColor:'white', color:'#1a1a1a'}} />
              </div>
              <div>
                <label htmlFor="report-comment" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Descripción del Estado</label>
                <textarea id="report-comment" name="comment" rows="3" placeholder="Describe el problema..." className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-sm md:text-base" style={{borderColor:'#bfdbfe', backgroundColor:'white', color:'#1a1a1a'}}></textarea>
              </div>
              <div>
                <label htmlFor="report-recommendations" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Recomendaciones</label>
                <textarea id="report-recommendations" name="recommendations" rows="3" placeholder="Ej: Reducir velocidad..." className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition text-sm md:text-base" style={{borderColor:'#bfdbfe', backgroundColor:'white', color:'#1a1a1a'}}></textarea>
              </div>
              <div>
                <label htmlFor="report-files" className="block text-sm font-semibold mb-2" style={{color:'#030213'}}>Adjuntar Archivos (Fotos/Videos)</label>
                <input type="file" id="report-files" name="files" multiple accept="image/*,video/*" className="w-full px-3 md:px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 transition cursor-pointer text-sm md:text-base" style={{borderColor:'#bfdbfe', backgroundColor:'white', color:'#1a1a1a'}} />
                <p className="text-xs mt-1" style={{color:'#717182'}}>Soporta imágenes y videos. Máximo 5 archivos.</p>
              </div>
              <div className="flex gap-2 justify-end pt-4">
                <button type="button" onClick={() => setShowReport(false)} className="px-4 py-2 font-semibold rounded-lg transition text-sm md:text-base" style={{color:'#717182', backgroundColor:'#efefff'}}>Cancelar</button>
                <button type="submit" className="px-6 py-2 text-white font-bold rounded-lg transition text-sm md:text-base" style={{backgroundColor:'#030213'}}>Enviar Reporte</button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-lg font-bold mb-4">Sobre Nosotros</h4>
              <p className="text-gray-400 text-sm">Vías del Chocó: Información vial en tiempo real para mejorar la seguridad.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Enlaces</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><button className="hover:text-white transition" onClick={() => { const el = document.getElementById('about-section'); if (el) el.scrollIntoView({ behavior: 'smooth' }); }}>Sobre Nosotros</button></li>
                <li><a href="#" className="hover:text-white transition">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition">Privacidad</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Contacto</h4>
              <p className="text-gray-400 text-sm mb-2">
                📧 <a href="mailto:Alrxandermaturana76@gmail.com" className="text-gray-400 hover:text-blue-400 transition">Alrxandermaturana76@gmail.com</a>
              </p>
              <p className="text-gray-400 text-sm mb-2">
                📞 <a href="https://wa.me/573145312045" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-green-500 transition">+57 314 531 2045</a>
              </p>
              <p className="text-gray-400 text-sm">📍 Quibdó, Chocó</p>
            </div>
            <div>
              <h4 className="text-lg font-bold mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition text-xl">f</a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition text-xl">𝕏</a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-400 hover:text-pink-300 transition text-xl">📷</a>
              </div>
            </div>
          </div>
          <hr className="border-gray-700 mb-6" />
          <div className="text-center text-gray-400 text-sm">
            <p>&copy; 2025 Vías del Chocó. Realizado por <span className="text-blue-400 font-bold">luisito</span> | Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const appContainer = document.getElementById('app');
if (appContainer) {
  ReactDOM.createRoot(appContainer).render(<App />);
} else {
  console.error('No se encontró #app');
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
