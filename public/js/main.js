const roadsData = [
  { id: 1, title: "Vía Quibdó - Medellín (Túnel de Occidente)", status: "Regular", scope: "exterior", from: "Quibdó", to: "Medellín", km: "240 km", desc: "Principal vía que conecta el Chocó con Antioquia.", humidity: 78, precip: 55, temperature: 24, lastChecked: "10:30 AM", updated: "2 nov 2025, 10:30 AM" },
  { id: 2, title: "Vía Quibdó - Pereira (Anserma - Tadó)", status: "Regular", scope: "exterior", from: "Quibdó", to: "Pereira", km: "195 km", desc: "Conecta con Risaralda pasando por Tadó.", humidity: 83, precip: 65, temperature: 23, lastChecked: "8:00 AM", updated: "2 nov 2025, 8:00 AM" },
  { id: 3, title: "Vía Quibdó - Istmina - Condoto", status: "Buena", scope: "interior", from: "Quibdó", to: "Istmina", km: "86 km", desc: "Vía intermunicipal que conecta la capital con Istmina y Condoto.", humidity: 85, precip: 52, temperature: 25, lastChecked: "9:15 AM", updated: "2 nov 2025, 9:15 AM" },
  { id: 4, title: "Vía Quibdó - Lloró", status: "Regular", scope: "interior", from: "Quibdó", to: "Lloró", km: "72 km", desc: "Conecta con el municipio de Lloró en la zona del medio San Juan.", humidity: 88, precip: 68, temperature: 22, lastChecked: "11:00 AM", updated: "2 nov 2025, 11:00 AM" },
  { id: 5, title: "Vía Tadó - Certeguí", status: "Mala", scope: "interior", from: "Tadó", to: "Certeguí", km: "45 km", desc: "Vía en mal estado que requiere mantenimiento constante.", humidity: 92, precip: 77, temperature: 21, lastChecked: "4:45 PM", updated: "1 nov 2025, 4:45 PM" },
  { id: 6, title: "Vía Istmina - Río Iró", status: "Buena", scope: "interior", from: "Istmina", to: "Río Iró", km: "32 km", desc: "Vía hacia la zona del Río Iró en buen estado.", humidity: 80, precip: 45, temperature: 26, lastChecked: "7:30 AM", updated: "2 nov 2025, 7:30 AM" },
  { id: 7, title: "Vía Carmen de Atrato - Vigía del Fuerte", status: "Regular", scope: "interior", from: "Carmen de Atrato", to: "Vigía del Fuerte", km: "55 km", desc: "Conecta con la zona del Atrato medio.", humidity: 84, precip: 60, temperature: 23, lastChecked: "10:00 AM", updated: "2 nov 2025, 10:00 AM" },
  { id: 8, title: "Vía Quibdó - Unión Panamericana", status: "Buena", scope: "interior", from: "Quibdó", to: "Unión Panamericana", km: "38 km", desc: "Vía en buen estado hacia el norte del departamento.", humidity: 79, precip: 50, temperature: 25, lastChecked: "9:30 AM", updated: "2 nov 2025, 9:30 AM" }
];

const reportsData = [];

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

const OPEN_WEATHER_API_KEY = '772e3fa3294c7e0ba5ae4dc3e9186362';
const isLocalDev = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
const API_BASE_URL = isLocalDev ? 'http://localhost:3001' : 'https://viaschoco-backend.onrender.com';

function App() {
  const [showLogin, setShowLogin] = React.useState(false);
  const [showRegister, setShowRegister] = React.useState(false);
  const [showReport, setShowReport] = React.useState(false);
  const [showMenu, setShowMenu] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(false);
  const [userName, setUserName] = React.useState('');
  const [showWelcomeScreen, setShowWelcomeScreen] = React.useState(false);
  const [roads, setRoads] = React.useState(roadsData);
  const [reports, setReports] = React.useState([]);
  const [recentReports, setRecentReports] = React.useState([]);
  const [newsItems, setNewsItems] = React.useState([
    { id: 1, title: 'Facebook: Derrumbe en la vía Quibdó - Medellín', source: 'Facebook', time: 'Hace 12 min', summary: 'Vecinos reportan caída de piedras alrededor del Km 145. Tránsito lento.', link: 'https://facebook.com/viaschoco/posts/1' },
    { id: 2, title: 'Facebook: Inundación en el sector de Tadó', source: 'Facebook', time: 'Hace 25 min', summary: 'Video en vivo del desbordamiento que afecta el tramo Tadó - Pereira.', link: 'https://facebook.com/viaschoco/posts/2' },
    { id: 3, title: 'Facebook: Vehículo varado en Condoto', source: 'Facebook', time: 'Hace 38 min', summary: 'Un camión quedó atravesado en el puente de Condoto. La comunidad pide regulación de tránsito.', link: 'https://facebook.com/viaschoco/posts/3' }
  ]);
  const [geoSensors, setGeoSensors] = React.useState([]);
  const [geoAlerts, setGeoAlerts] = React.useState([]);
  const [geoSocketConnected, setGeoSocketConnected] = React.useState(false);
  const [highlightReportId, setHighlightReportId] = React.useState(null);
  const [view, setView] = React.useState('main');
  const [mapClickMode, setMapClickMode] = React.useState(false);
  const [selectedCoords, setSelectedCoords] = React.useState(null);
  const [apiAvailable, setApiAvailable] = React.useState(false);
  const [routeWeather, setRouteWeather] = React.useState({});
  const [users, setUsers] = React.useState([]);

  const defaultLocalUsers = [
    { name: 'usuario1', email: 'usuario1@example.com', password: 'pass', role: 'user', blocked: false },
    { name: 'admin', email: 'alrxandermarturana76.admin@gmail.com', password: '3145312045La', role: 'admin', blocked: false },
    { name: 'other admin', email: 'other.admin@gmail.com', password: 'otherpassword', role: 'admin', blocked: false }
  ];

  const loadUsersFromStorage = () => {
    try {
      const raw = localStorage.getItem('viasChocoUsers');
      if (raw) {
        const storedUsers = JSON.parse(raw);
        if (Array.isArray(storedUsers) && storedUsers.length) {
          setUsers(storedUsers);
          return;
        }
      }
    } catch (err) {
      console.warn('Error leyendo usuarios locales:', err);
    }
    localStorage.setItem('viasChocoUsers', JSON.stringify(defaultLocalUsers));
    setUsers(defaultLocalUsers);
  };

  const saveUsersToStorage = (userList) => {
    setUsers(userList);
    localStorage.setItem('viasChocoUsers', JSON.stringify(userList));
  };

  React.useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedName = localStorage.getItem('currentUserName');
    const storedRole = localStorage.getItem('currentUserRole');
    if (storedUser) {
      setIsAuthenticated(true);
      setUserName(storedName || storedUser);
      setIsAdmin(storedRole === 'admin');
    }
    loadUsersFromStorage();
  }, []);

  // cuando se carguen `users`, asegurarse de mostrar el nombre registrado en vez del email
  React.useEffect(() => {
    try {
      if (!isAuthenticated || !users || !users.length) return;
      const storedUser = localStorage.getItem('currentUser');
      const storedName = localStorage.getItem('currentUserName');
      if (!storedUser) return;
      const email = String(storedUser).toLowerCase();
      const found = users.find(u => String(u.email || '').toLowerCase() === email);
      if (found && found.name && found.name !== storedName) {
        // mapear admin alias si aplica
        const adminAliases = { 'alrxandermarturana76.admin@gmail.com': 'luisADMIN' };
        const displayName = (found.role === 'admin' && adminAliases[email]) ? adminAliases[email] : found.name;
        setUserName(displayName);
        localStorage.setItem('currentUserName', displayName);
      }
    } catch (err) {
      // no bloquear si algo falla
    }
  }, [users, isAuthenticated]);

  React.useEffect(() => {
    if (!showWelcomeScreen) return;
    const timer = setTimeout(() => {
      setShowWelcomeScreen(false);
    }, 3200);
    return () => clearTimeout(timer);
  }, [showWelcomeScreen]);

  React.useEffect(() => {
    const newsUpdates = [
      { title: 'Facebook: Cierre temporal en Quibdó - Medellín por lluvias', source: 'Facebook', summary: 'Usuarios comparten imágenes del tramo inundado y piden evitar la vía.', link: 'https://facebook.com/viaschoco/posts/4' },
      { title: 'Facebook: Protesta en Condoto por el estado de la vía', source: 'Facebook', summary: 'Bloqueo en la carretera por falta de mantenimiento urgente.', link: 'https://facebook.com/viaschoco/posts/5' },
      { title: 'Facebook: Alerta de lodo en Lloró', source: 'Facebook', summary: 'Reportan paso lento y riesgo de derrumbe tras las lluvias.', link: 'https://facebook.com/viaschoco/posts/6' }
    ];
    const interval = setInterval(() => {
      const next = newsUpdates[Math.floor(Math.random() * newsUpdates.length)];
      const newItem = {
        id: Date.now(),
        title: next.title,
        source: next.source,
        time: 'Hace unos segundos',
        summary: next.summary,
        link: next.link
      };
      setNewsItems(prev => [newItem, ...prev].slice(0, 5));
    }, 120000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    let timer = null;
    const initSocketClient = () => {
      if (!window.socketClient) return false;
      const updateSensors = data => setGeoSensors(Array.isArray(data) ? data : []);
      const updateAlerts = data => setGeoAlerts(Array.isArray(data) ? data : []);
      setGeoSensors(window.socketClient.getGeosentinels?.() || []);
      setGeoAlerts(window.socketClient.getAlerts?.() || []);
      window.socketClient.on?.('geosentinels:all', updateSensors);
      window.socketClient.on?.('geosentinels:updated', updateSensors);
      window.socketClient.on?.('alerts:all', updateAlerts);
      window.socketClient.on?.('alert:landslide', alert => setGeoAlerts(prev => [alert, ...prev.filter(a => a.id !== alert.id)]));
      window.socketClient.on?.('connection', () => setGeoSocketConnected(true));
      window.socketClient.on?.('disconnect', () => setGeoSocketConnected(false));
      setGeoSocketConnected(true);
      return true;
    };

    const fetchGeoData = async () => {
      try {
        const [sRes, aRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/geosentinels`),
          fetch(`${API_BASE_URL}/api/alerts`)
        ]);
        if (sRes.ok) setGeoSensors(await sRes.json());
        if (aRes.ok) setGeoAlerts(await aRes.json());
      } catch (err) {
        console.warn('Error cargando datos GeoSentinel:', err);
      }
    };

    if (!initSocketClient()) {
      timer = setInterval(() => {
        if (window.socketClient && initSocketClient()) {
          clearInterval(timer);
          timer = null;
        }
      }, 300);
    }

    fetchGeoData();

    return () => { if (timer) clearInterval(timer); };
  }, []);

  React.useEffect(() => {
    const loadApiHealth = async () => {
      try {
        const healthRes = await fetch(`${API_BASE_URL}/api/health`);
        if (healthRes.ok) {
          const h = await healthRes.json();
          if (h && h.status === 'ok') {
            setApiAvailable(true);
            return;
          }
        }
      } catch (err) {
        console.warn('API no disponible:', err);
      }
      setApiAvailable(false);
    };
    loadApiHealth();
  }, []);

  React.useEffect(() => {
    const routeIds = [1, 2];
    const fetchRouteWeather = async () => {
      if (!OPEN_WEATHER_API_KEY || OPEN_WEATHER_API_KEY.includes('TU_API_KEY')) return;
      try {
        const weatherResults = await Promise.all(routeIds.map(async id => {
          const coords = roadCoords[id];
          if (!coords) return null;
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&lang=es&appid=${OPEN_WEATHER_API_KEY}`;
          const res = await fetch(url);
          if (!res.ok) return null;
          const json = await res.json();
          return { id, json };
        }));
        const nextWeather = {};
        weatherResults.forEach(item => {
          if (item && item.id) nextWeather[item.id] = item.json;
        });
        setRouteWeather(nextWeather);
      } catch (err) {
        console.warn('Error cargando clima:', err);
      }
    };
    fetchRouteWeather();
  }, []);

  const latestGeoAlerts = React.useMemo(() => {
    return [...geoAlerts]
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 3);
  }, [geoAlerts]);

  const updatedRoads = React.useMemo(() => {
    return roads.map(road => {
      const relevantReports = reports.filter(r => r.title === road.title && r.approved !== false);
      if (!relevantReports.length) return road;
      if (relevantReports.some(r => r.status === 'Cerrada')) return { ...road, status: 'Cerrada' };
      if (relevantReports.some(r => r.status === 'Mala')) return { ...road, status: 'Mala' };
      if (relevantReports.some(r => r.status === 'Regular')) return { ...road, status: 'Regular' };
      return { ...road, status: 'Buena' };
    });
  }, [reports, roads]);

  const latestReports = React.useMemo(() => {
    return [...reports].sort((a, b) => Number(b.id) - Number(a.id)).slice(0, 3);
  }, [reports]);

  const roadStatusCounts = React.useMemo(() => {
    const counts = { Buena: 0, Regular: 0, Mala: 0, Cerrada: 0 };
    updatedRoads.forEach(road => {
      if (road.status in counts) counts[road.status] += 1;
    });
    return counts;
  }, [updatedRoads]);

  const getGlobalStatus = () => {
    const badCount = reports.filter(r => r.status === 'Mala' || r.status === 'Cerrada').length;
    const regularCount = reports.filter(r => r.status === 'Regular').length;
    if (badCount >= 2) return { label: 'Riesgo alto', bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-300' };
    if (regularCount >= 3 || badCount === 1) return { label: 'Riesgo medio', bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-300' };
    return { label: 'Riesgo bajo', bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-300' };
  };

  const globalStatus = getGlobalStatus();

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserName');
    localStorage.removeItem('currentUserRole');
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUserName('');
    setShowMenu(false);
  };

  const handleLogin = (email, password) => {
    const emailStr = String(email || '').toLowerCase();
    const found = users.find(u => String(u.email || '').toLowerCase() === emailStr);
    if (!found) {
      return 'Correo no registrado. Regístrate primero.';
    }
    if (found.blocked) {
      return 'Esta cuenta está bloqueada.';
    }
    if (String(found.password || '') !== String(password || '')) {
      return 'Correo o contraseña incorrectos.';
    }

    const adminFlag = found.role === 'admin';
    let name = found.name || String(emailStr).split('@')[0] || 'Usuario';
    const adminAliases = {
      'alrxandermarturana76.admin@gmail.com': 'luisADMIN',
    };
    if (adminFlag) {
      if (adminAliases[emailStr]) {
        name = adminAliases[emailStr];
      } else {
        const localPart = emailStr.split('@')[0] || '';
        const base = localPart.replace(/\.admin$/i, '');
        const tokenMatch = base.match(/[a-zA-Z]+/);
        const token = tokenMatch ? tokenMatch[0] : base || 'Admin';
        name = `${token}ADMIN`;
      }
    }

    setIsAuthenticated(true);
    setIsAdmin(adminFlag);
    setUserName(name);
    localStorage.setItem('currentUser', emailStr);
    localStorage.setItem('currentUserName', name);
    localStorage.setItem('currentUserRole', adminFlag ? 'admin' : 'user');
    setRememberedUser(true);
    setShowWelcomeScreen(true);
    setShowLogin(false);
    setShowRegister(false);
    if (adminFlag) setView('admin');
    return true;
  };

  const [rememberedUser, setRememberedUser] = React.useState(false);

  const handleRegisterSuccess = (name, email, password) => {
    const emailStr = String(email || '').toLowerCase();
    const localPart = emailStr.split('@')[0] || '';
    const adminFlag = localPart === 'admin' || localPart.endsWith('.admin');
    const existing = users.find(u => String(u.email || '').toLowerCase() === emailStr);
    if (existing) {
      return 'Ese correo ya está registrado.';
    }
    const newUser = {
      name,
      email: emailStr,
      password: String(password || ''),
      blocked: false,
      role: adminFlag ? 'admin' : 'user'
    };
    saveUsersToStorage([...users, newUser]);
    setIsAuthenticated(true);
    setIsAdmin(adminFlag);
    setUserName(name);
    localStorage.setItem('currentUser', emailStr);
    localStorage.setItem('currentUserName', name);
    localStorage.setItem('currentUserRole', adminFlag ? 'admin' : 'user');
    setRememberedUser(true);
    setShowWelcomeScreen(true);
    setShowRegister(false);
    if (adminFlag) setView('admin');
    return true;
  };

  const handleNavigate = (sectionId) => {
    if (sectionId === 'admin') {
      setView('admin');
      setShowMenu(false);
      return;
    }
    if (sectionId === 'legal' || sectionId === 'terminos') {
      setView(sectionId);
      setShowMenu(false);
      return;
    }
    if (sectionId === 'main') {
      setView('main');
      setShowMenu(false);
      return;
    }
    setView('main');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setShowMenu(false);
  };

  const welcomeOverlay = showWelcomeScreen ? (
    <window.LoadingOverlay message={`Iniciando sesión, ${userName || 'usuario'}...`} />
  ) : null;

  const handleMapClick = ({ lat, lng }) => {
    setSelectedCoords({ lat, lng });
    setMapClickMode(false);
  };

  const geocodeAndFallback = async (roadId, locationText) => {
    if (!locationText) return null;
    if (!OPEN_WEATHER_API_KEY || OPEN_WEATHER_API_KEY.includes('TU_API_KEY')) {
      return roadCoords[roadId] ? { lat: roadCoords[roadId].lat, lng: roadCoords[roadId].lng } : null;
    }
    try {
      const geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(locationText + ', Chocó, Colombia')}&limit=3&appid=${OPEN_WEATHER_API_KEY}`;
      const res = await fetch(geocodeUrl);
      if (!res.ok) return null;
      const list = await res.json();
      const valid = list.find(item => item.lat >= 4.0 && item.lat <= 8.0 && item.lon >= -78.5 && item.lon <= -75.0);
      if (!valid) return null;
      return { lat: valid.lat, lng: valid.lon };
    } catch (err) {
      console.warn('Geocoding error:', err);
      return null;
    }
  };

  const handleNewReport = async (reportData) => {
    const selected = selectedCoords || {};
    let lat = reportData.lat || selected.lat || null;
    let lng = reportData.lng || selected.lng || null;
    if ((!lat || !lng) && reportData.location) {
      const geocoded = await geocodeAndFallback(reportData.road, reportData.location);
      if (geocoded) {
        lat = geocoded.lat;
        lng = geocoded.lng;
      }
    }
    if ((!lat || !lng) && roadCoords[reportData.road]) {
      lat = roadCoords[reportData.road].lat + (Math.random() - 0.5) * 0.02;
      lng = roadCoords[reportData.road].lng + (Math.random() - 0.5) * 0.02;
    }
    if (!lat || !lng) {
      alert('No se pudieron determinar las coordenadas. Selecciona en el mapa o ingresa una ubicación válida.');
      return;
    }
    const newId = Date.now();
    const newReport = {
      id: newId,
      ...reportData,
      user: userName || 'Usuario',
      time: 'Hace unos minutos',
      lat,
      lng,
      approved: true
    };
    setReports(prev => [newReport, ...prev]);
    setRecentReports(prev => [newReport, ...prev].slice(0, 5));
    setHighlightReportId(newId);
    setShowReport(false);
    setMapClickMode(false);
    setSelectedCoords(null);
    if (apiAvailable) {
      fetch(`${API_BASE_URL}/api/reports`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReport)
      }).catch(err => console.warn('Error guardando reporte:', err));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full min-h-screen bg-cover bg-center flex flex-col items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url('img/logo.jpeg')" }}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 w-full max-w-[1340px] px-6 py-10 mx-auto text-white">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="text-center lg:text-left">
              <div className="mb-8 flex justify-center lg:justify-start">
                <img src="img/logoviaa.png" alt="Vías del Chocó" className="h-24 md:h-28 rounded-3xl shadow-2xl" />
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black drop-shadow-2xl mb-4 text-white">Vías Chocó</h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-100 drop-shadow-lg mb-12 max-w-3xl mx-auto lg:mx-0">Información actualizada sobre el estado de las carreteras, alertas de incidentes y reportes ciudadanos.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button onClick={() => setShowLogin(true)} className="w-full sm:w-auto px-8 py-4 rounded-full premium-btn-secondary font-bold text-base sm:text-lg hover:bg-slate-800/70 transition">Iniciar sesión</button>
                <button onClick={() => setShowRegister(true)} className="w-full sm:w-auto px-8 py-4 rounded-full premium-btn-primary font-bold text-base sm:text-lg hover:opacity-95 transition">Registrarse</button>
              </div>
            </div>
            <div className="mx-auto w-full max-w-md lg:max-w-sm">
              <div className="rounded-[2rem] border border-white/20 bg-white/10 p-8 shadow-2xl home-pearl-block mb-6 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-slate-200">Actualización de rutas</p>
                    <h2 className="text-xl font-semibold text-white">Clima en rutas clave</h2>
                  </div>
                  <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold text-white">OpenWeather</span>
                </div>
                <div className="space-y-4">
                  {[1, 2].map(id => {
                    const road = roadsData.find(r => r.id === id);
                    const weather = routeWeather[id];
                    const statusColor = road?.status === 'Buena' ? 'border-emerald-300' : road?.status === 'Regular' ? 'border-amber-300' : road?.status === 'Mala' ? 'border-orange-300' : road?.status === 'Cerrada' ? 'border-red-300' : 'border-slate-200';
                    const statusLabelColor = road?.status === 'Buena' ? 'bg-emerald-100 text-emerald-700' : road?.status === 'Regular' ? 'bg-amber-100 text-amber-700' : road?.status === 'Mala' ? 'bg-orange-100 text-orange-700' : road?.status === 'Cerrada' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700';
                    return (
                      <div key={id} className={`rounded-[1.75rem] border ${statusColor} bg-white p-5`}>
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <div className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${statusLabelColor}`}>
                              {road?.status || 'Estado desconocido'}
                            </div>
                            <p className="text-xs uppercase tracking-[0.25em] text-slate-500 mt-3">{road?.from} → {road?.to}</p>
                            <h3 className="text-lg font-semibold text-slate-900 mt-2">{road?.title}</h3>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-slate-900">{weather ? `${Math.round(weather.main.temp)}°C` : '—'}</p>
                            <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{weather ? weather.weather?.[0]?.description : 'Cargando...'}</p>
                          </div>
                        </div>
                        {weather ? (
                          <div className="mt-4 grid grid-cols-3 gap-3 text-center text-slate-700 text-xs">
                            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-200">
                              <p className="font-semibold">Humedad</p>
                              <p>{weather.main.humidity}%</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-200">
                              <p className="font-semibold">Viento</p>
                              <p>{weather.wind.speed} m/s</p>
                            </div>
                            <div className="rounded-2xl bg-slate-50 p-3 border border-slate-200">
                              <p className="font-semibold">Presión</p>
                              <p>{weather.main.pressure} hPa</p>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-4 rounded-2xl bg-white/10 border border-white/10 p-4 text-slate-200 text-sm">Cargando datos de OpenWeather para esta ruta...</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
        {showLogin && (
          <window.LoginModal
            onClose={() => setShowLogin(false)}
            onShowRegister={() => { setShowLogin(false); setShowRegister(true); }}
            onLogin={(email, pass) => handleLogin(email, pass)}
          />
        )}
        {showRegister && (
          <window.RegisterModal
            onClose={() => setShowRegister(false)}
            onRegisterSuccess={(name, email, pass) => handleRegisterSuccess(name, email, pass)}
          />
        )}
      </div>
    );
  }

  if (view === 'admin') {
    return (
      <div className="premium-shell min-h-screen bg-white">
        {welcomeOverlay}
          <window.AdminPanelClean reports={reports} users={users} roads={updatedRoads} onClose={() => setView('main')} apiAvailable={apiAvailable} adminName={userName} onNavigate={handleNavigate} />
        <window.Footer onNavigate={handleNavigate} slim={true} />
      </div>
    );
  }

  if (view === 'legal') {
    return (
      <div className="premium-shell min-h-screen bg-slate-100">
        {welcomeOverlay}
        <window.LegalPage onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'terminos') {
    return (
      <div className="premium-shell min-h-screen bg-slate-100">
        {welcomeOverlay}
        <window.TerminosCondicionesPage onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'cookies') {
    return (
      <div className="premium-shell min-h-screen bg-slate-100">
        {welcomeOverlay}
        <window.CookiesPage onNavigate={handleNavigate} />
      </div>
    );
  }

  if (view === 'reporte-abuso') {
    return (
      <div className="premium-shell min-h-screen bg-slate-100">
        {welcomeOverlay}
        <window.ReporteAbusoPage onNavigate={handleNavigate} />
      </div>
    );
  }

  return (
    <div className="premium-shell min-h-screen bg-white">
      {welcomeOverlay}
      <window.Header userName={userName} isAdmin={isAdmin} showMenu={showMenu} setShowMenu={setShowMenu} onLogout={handleLogout} onNavigate={handleNavigate} />
      

      <main id="inicio-seccion" className="max-w-[1540px] mx-auto px-10 py-20">
        {/* STATS SECTION */}
        <section className="mb-20">
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm hover:shadow-md transition">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-700 font-bold">Vías buenas</p>
              <p className="mt-4 text-5xl font-black text-emerald-700">{roadStatusCounts.Buena}</p>
              <p className="text-xs text-emerald-600 mt-2">Seguras para circular</p>
            </div>
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-8 shadow-sm hover:shadow-md transition">
              <p className="text-sm uppercase tracking-[0.3em] text-amber-700 font-bold">Vías regulares</p>
              <p className="mt-4 text-5xl font-black text-amber-700">{roadStatusCounts.Regular}</p>
              <p className="text-xs text-amber-600 mt-2">Con precaución</p>
            </div>
            <div className="rounded-2xl border border-orange-200 bg-orange-50 p-8 shadow-sm hover:shadow-md transition">
              <p className="text-sm uppercase tracking-[0.3em] text-orange-700 font-bold">Vías malas</p>
              <p className="mt-4 text-5xl font-black text-orange-700">{roadStatusCounts.Mala}</p>
              <p className="text-xs text-orange-600 mt-2">Alto riesgo</p>
            </div>
            <div className="rounded-2xl border border-red-200 bg-red-50 p-8 shadow-sm hover:shadow-md transition">
              <p className="text-sm uppercase tracking-[0.3em] text-red-700 font-bold">Vías cerradas</p>
              <p className="mt-4 text-5xl font-black text-red-700">{roadStatusCounts.Cerrada}</p>
              <p className="text-xs text-red-600 mt-2">No disponibles</p>
            </div>
          </div>
        </section>

        {/* MAPA CENTRAL CON NOTICIAS Y GeoSentinel */}
        <section className="mb-20" id="seccion-mapa">
          <div className="mb-10 text-center">
            <h2 className="text-5xl font-black text-slate-900 mb-3">Mapa en tiempo real</h2>
            <p className="text-xl text-slate-600">Visualiza reportes, sensores y alertas del estado de las vías en el Chocó.</p>
          </div>
          <div className="grid gap-8 xl:grid-cols-[320px_minmax(0,1.5fr)_320px]">
            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Noticias de Facebook</h3>
                <div className="space-y-4 max-h-[620px] overflow-y-auto pr-2">
                  {newsItems.slice(0, 4).map(item => (
                    <a key={item.id} href={item.link} target="_blank" rel="noreferrer" className="block rounded-3xl border border-slate-200 bg-slate-50 p-4 hover:border-emerald-300 transition">
                      <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold mb-2">{item.source}</p>
                      <h4 className="text-lg font-semibold text-slate-900 mb-2 leading-snug">{item.title}</h4>
                      <p className="text-sm text-slate-600">{item.summary}</p>
                      <p className="text-xs text-slate-400 mt-3">{item.time}</p>
                    </a>
                  ))}
                  {newsItems.length === 0 && (
                    <div className="rounded-[2rem] bg-slate-50 p-6 text-sm text-slate-500 text-center shadow-sm">
                      <p className="font-semibold mb-2">Sin noticias de Facebook</p>
                      <p>Actualiza más tarde para ver las últimas novedades.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] overflow-hidden border border-slate-200 shadow-2xl h-[520px]">
                <window.MapComponent reports={reports} geoSensors={[]} geoAlerts={[]} highlightReportId={null} enableClickToSet={false} onMapClick={() => {}} tempMarker={null} />
              </div>
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Leyenda del mapa</h3>
                <div className="space-y-4 text-sm text-slate-600">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                    <span>Sensor GeoSentinel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-red-500"></div>
                    <span>Alerta GeoSentinel</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                    <span>Reporte buena</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-orange-500"></div>
                    <span>Reporte regular/mala</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-slate-900 mb-4">GeoSentinel</h3>
                <div className="space-y-4 max-h-[620px] overflow-y-auto pr-2">
                  {latestGeoAlerts.length > 0 ? latestGeoAlerts.map(alert => {
                    const critical = alert.riskLevel >= 70 || alert.status === 'Cerrada' || alert.status === 'Mala';
                    return (
                      <button key={alert.id} type="button" onClick={() => setShowDetails(alert)} className={`w-full text-left rounded-3xl p-4 transition hover:-translate-y-0.5 ${critical ? 'bg-red-50 border-red-200 border' : 'bg-yellow-50 border-yellow-200 border'}`}>
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-semibold text-slate-900">{alert.location || `Sensor ${alert.sensorId}`}</p>
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${critical ? 'bg-red-200 text-red-800' : 'bg-yellow-200 text-yellow-800'}`}>{alert.status || 'Alerta'}</span>
                          </div>
                          <p className="text-sm text-slate-600">{alert.summary || alert.message || 'Alerta detectada por el sensor'}</p>
                          <p className="text-xs text-slate-500">{alert.source || 'GeoSentinel'} · {alert.time || new Date(alert.timestamp).toLocaleString('es-CO') || ''}</p>
                        </div>
                      </button>
                    );
                  }) : (
                    <div className="rounded-[2rem] bg-slate-50 p-6 text-sm text-slate-500 text-center shadow-sm">
                      <p className="font-semibold mb-2">Sin alertas críticas</p>
                      <p>Seguimos monitoreando los sensores GeoSentinel.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REPORTES EN CARDS */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-bold mb-3">Reportes verificados</p>
            <h2 className="text-5xl font-black text-slate-900 mb-4">Últimos reportes de usuarios</h2>
          </div>
          
          <div className="px-6 md:px-10" id="seccion-reportes">
            <div className="flex justify-center mb-8">
              <button onClick={() => setShowReport(true)} className="px-8 py-4 bg-emerald-500 text-white font-bold rounded-full hover:bg-emerald-600 transition transform hover:scale-105">
                + Hacer reporte
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentReports.slice(0, 6).map(report => {
                const statusConfig = {
                  'Buena': { bg: 'bg-emerald-50', border: 'border-emerald-300', text: 'text-emerald-700', badge: 'bg-emerald-200', icon: '✓' },
                  'Regular': { bg: 'bg-amber-50', border: 'border-amber-300', text: 'text-amber-700', badge: 'bg-amber-200', icon: '⚠️' },
                  'Mala': { bg: 'bg-orange-50', border: 'border-orange-300', text: 'text-orange-700', badge: 'bg-orange-200', icon: '⚠️' },
                  'Cerrada': { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-700', badge: 'bg-red-200', icon: '✕' }
                };
                const config = statusConfig[report.status] || statusConfig['Regular'];
                return (
                  <button key={report.id} onClick={() => setShowDetails(report)} className={`text-left rounded-2xl border-2 p-6 transition transform hover:scale-105 ${config.bg} ${config.border} shadow-sm hover:shadow-lg`}>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div className="text-3xl">{config.icon}</div>
                      <span className={`text-xs font-bold px-3 py-1 rounded-full ${config.badge} ${config.text}`}>{report.status}</span>
                    </div>
                    <h3 className="font-bold text-lg text-slate-900 mb-2">{report.title}</h3>
                    <p className="text-sm text-slate-600 mb-3">📍 {report.location}</p>
                    <p className="text-sm text-slate-600 line-clamp-2">{report.description || report.message}</p>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <p className="text-xs text-slate-500">👤 {report.author || 'Usuario'}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ESTADO DE CARRETERAS */}
        <section className="mb-20 bg-white border border-slate-200 rounded-[2rem] shadow-sm">
          <div className="max-w-6xl mx-auto px-6 md:px-10 py-16">
            <div className="text-center mb-12">
              <p className="text-sm uppercase tracking-[0.3em] text-slate-500 font-bold mb-3">Monitoreo vial</p>
              <h2 className="text-5xl md:text-6xl font-black text-slate-900">Monitorea el estado de las vías</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {updatedRoads.map(road => {
                const statusColors = {
                  Buena: 'bg-emerald-100 text-emerald-800',
                  Regular: 'bg-amber-100 text-amber-800',
                  Mala: 'bg-orange-100 text-orange-800',
                  Cerrada: 'bg-red-100 text-red-800'
                };
                return (
                  <div key={road.id} className="rounded-[2rem] bg-white/95 p-6 shadow-[0_20px_80px_-40px_rgba(15,23,42,0.35)] transition hover:-translate-y-1">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <h3 className="font-bold text-lg text-slate-900">{road.title}</h3>
                        <p className="text-xs text-slate-500 mt-1">{road.from} → {road.to}</p>
                      </div>
                      <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold ${statusColors[road.status] || 'bg-slate-100 text-slate-700'}`}>{road.status}</span>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-3 text-xs">
                      <div className="rounded-2xl bg-slate-100 p-4 text-center">
                        <p className="font-semibold text-slate-700">💧 Humedad</p>
                        <p className="text-slate-600 font-semibold">{road.humidity ?? 'N/A'}%</p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 p-4 text-center">
                        <p className="font-semibold text-slate-700">🌡️ Temperatura</p>
                        <p className="text-slate-600 font-semibold">{road.temperature ?? 'N/A'}°C</p>
                      </div>
                      <div className="rounded-2xl bg-slate-100 p-4 text-center">
                        <p className="font-semibold text-slate-700">🌧️ Precipitación</p>
                        <p className="text-slate-600 font-semibold">{road.precip ?? 'N/A'}%</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CARACTERÍSTICAS */}
        <section id="seccion-funciones" className="py-20 px-10 bg-slate-50">
          <div className="max-w-[1540px] mx-auto">
            <div className="text-center mb-16">
              <p className="text-sm uppercase tracking-[0.3em] text-emerald-600 font-bold mb-3">Características principales</p>
              <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">¿Qué hace Viaschoco?</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">Tecnología para mantener informados a los viajeros y mejorar la seguridad vial</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
               
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">Información en Tiempo Real</h3>
                <p className="text-slate-600">Monitoreo continuo del estado de las carreteras con actualizaciones instantáneas basadas en reportes verificados y sensores IoT</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
               
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">Reportes Colaborativos</h3>
                <p className="text-slate-600">Los ciudadanos pueden compartir fotos, videos y descripciones detalladas de problemas viales para ayudar a toda la comunidad</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
               
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">Mapa Interactivo</h3>
                <p className="text-slate-600">Visualiza todas las alertas, reportes y sensores en un mapa georeferenciado del Chocó con actualizaciones en vivo</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
               
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">Alertas Inteligentes</h3>
                <p className="text-slate-600">Recibe notificaciones sobre cierres, derrumbes, inundaciones y otros eventos que afecten tu ruta</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
                
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">Noticias Viales</h3>
                <p className="text-slate-600">Accede a información de fuentes confiables y redes sociales sobre eventos viales en la región</p>
              </div>
              <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-lg transition">
              
                <h3 className="text-2xl font-bold text-slate-900 mb-3 text-center">Comunidad Activa</h3>
                <p className="text-slate-600">Únete a miles de usuarios que comparten su experiencia para mejorar la movilidad en el Chocó</p>
              </div>
            </div>
          </div>
        </section>

        <window.AboutSection />
        <window.ReportDetailsModal report={showDetails} onClose={() => setShowDetails(null)} />


        {showReport && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
            <div className="w-full max-w-3xl overflow-y-auto rounded-[2rem] bg-slate-50 p-6 shadow-2xl">
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Hacer reporte</h2>
                  <p className="text-sm text-slate-600">Selecciona la ubicación en el mapa y describe el problema.</p>
                </div>
                <button onClick={() => setShowReport(false)} className="rounded-full bg-white p-3 text-slate-700 shadow hover:bg-slate-100 transition">✕</button>
              </div>
              <form onSubmit={async e => {
                e.preventDefault();
                const form = e.target;
                const road = Number(form.road.value);
                const status = form.status.value;
                const location = form.location.value.trim();
                const message = form.comment.value.trim();
                const rec = form.recommendations.value.trim();
                if (!road || !status) {
                  alert('Selecciona vía y estado antes de enviar.');
                  return;
                }
                await handleNewReport({ title: roads.find(r => r.id === road)?.title || 'Reporte', road, status, location, message, rec });
              }} className="space-y-5">
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700">
                    Vía
                    <select name="road" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300">
                      <option value="">Selecciona una vía</option>
                      {roads.map(r => <option key={r.id} value={r.id}>{r.title}</option>)}
                    </select>
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    Estado
                    <select name="status" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300">
                      <option value="">Selecciona el estado</option>
                      <option value="Buena">Buena</option>
                      <option value="Regular">Regular</option>
                      <option value="Mala">Mala</option>
                      <option value="Cerrada">Cerrada</option>
                    </select>
                  </label>
                </div>
                <div className="rounded-[2rem] border border-slate-200 bg-white p-5">
                  <div className="flex flex-col gap-3">
                    <div>
                      <p className="font-semibold text-slate-900">Paso 1: elige la ubicación en el mapa</p>
                      <p className="text-sm text-slate-500">Haz clic en el mapa y se guardarán las coordenadas automáticamente.</p>
                    </div>
                    {selectedCoords ? (
                      <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-slate-700">
                        <p className="font-semibold">Ubicación capturada</p>
                        <p className="text-sm">Lat: {selectedCoords.lat.toFixed(4)} · Lon: {selectedCoords.lng.toFixed(4)}</p>
                      </div>
                    ) : (
                      <div className="rounded-2xl bg-yellow-50 border border-yellow-200 p-4 text-slate-700">
                        <p className="font-semibold">Ubicación no seleccionada</p>
                        <p className="text-sm">Activa la selección y haz clic en el mapa.</p>
                      </div>
                    )}
                    <button type="button" onClick={() => setMapClickMode(prev => !prev)} className={`w-full rounded-2xl px-4 py-3 font-semibold text-white transition ${mapClickMode ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                      {mapClickMode ? 'Cancelar selección de mapa' : 'Activar selección en el mapa'}
                    </button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <label className="space-y-2 text-sm text-slate-700">
                    Ubicación específica
                    <input name="location" placeholder="Ej: Km 45 - 48" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </label>
                  <label className="space-y-2 text-sm text-slate-700">
                    Archivos adjuntos
                    <input type="file" name="files" multiple accept="image/*,video/*" className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                  </label>
                </div>
                <label className="space-y-2 text-sm text-slate-700 block">
                  Descripción
                  <textarea name="comment" rows="4" placeholder="Describe el problema..." className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                </label>
                <label className="space-y-2 text-sm text-slate-700 block">
                  Recomendaciones
                  <textarea name="recommendations" rows="3" placeholder="Ej: Reducir velocidad..." className="w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-emerald-300" />
                </label>
                <div className="flex flex-wrap gap-3 justify-end">
                  <button type="button" onClick={() => setShowReport(false)} className="rounded-2xl border border-slate-300 bg-white px-5 py-3 text-slate-700 font-semibold hover:bg-slate-100 transition">Cancelar</button>
                  <button type="submit" className="rounded-2xl bg-slate-950 px-6 py-3 text-white font-bold hover:bg-slate-800 transition">Enviar reporte</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
      <window.Footer onNavigate={handleNavigate} slim={view === 'admin'} />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('aplicacion')).render(<App />);
