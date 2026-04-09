# 🚨 Vías del Chocó - Sistema de Monitoreo en Tiempo Real

Plataforma completa para reportar, monitorear y alertar sobre el estado de vías y riesgo de deslizamientos en el Chocó, Colombia.

---

## 📁 Estructura del Proyecto

```
viaschoco/
├── backend/               ← Servidor Node.js + Express + Socket.io
│   ├── server.js         ← Servidor principal
│   ├── package.json
│   └── node_modules/
│
├── geosentinel/           ← 📡 Módulo IoT de monitoreo
│   ├── sensors.js        ← Gestión de sensores
│   ├── alerts.js         ← Sistema de alertas
│   ├── weather.js        ← Datos climáticos
│   ├── routes.js         ← Rutas API
│   ├── simulator.js      ← Simulación de datos
│   ├── index.js          ← Punto de entrada
│   └── README.md
│
├── frontend/              ← 🎨 Interfaz de usuario
│   ├── admin.html        ← Panel admin (React)
│   ├── index.html        ← Página principal
│   ├── App.jsx           ← Aplicación React principal
│   ├── socket-client.js  ← Cliente WebSocket
│   └── README.md
│
├── test-alerts.js        ← Script de testing
├── INICIO_RAPIDO.md      ← Guía rápida
├── GEOSENTINEL_ALERTS.md ← Documentación técnica
└── STRUCTURE.md          ← Este archivo
```

---

## 🚀 Quick Start (3 pasos)

### 1. Iniciar Backend
```bash
cd backend
npm install
npm start
```
Servidor en: `http://localhost:3000`

### 2. Abrir Panel Admin
```
http://localhost:3000/admin.html
Login: admin@gmail.com (cualquier contraseña)
```

### 3. Ver Alertas en Tiempo Real
- Ir a pestaña **🚨 Alertas**
- Ver sensores geosentinels monitoreados
- Recibir notificaciones de deslizamientos

---

## 📦 Módulos Principales

### 🔧 Backend (`backend/`)
- Express.js server
- Socket.io para comunicación real-time
- Middleware: CORS, Helmet, JSON parser
- API REST completa

### 📡 Geosentinel (`geosentinel/`)
- Gestión de sensores IoT
- Sistema de alertas automáticas
- Simulación de clima
- Predicción de riesgo (30 minutos)

### 🎨 Frontend (`frontend/`)
- Panel admin React (inline)
- Autenticación por email
- Gestión de reportes
- Visualización de alertas en vivo
- Notificaciones del navegador

---

## 🔗 URLs Principales

| Ruta | Descripción |
|------|-------------|
| `http://localhost:3000/` | Página principal (index.html) |
| `http://localhost:3000/admin.html` | Panel de administración |
| `http://localhost:3000/api/health` | Health check |

---

## 🔌 API Endpoints

### Reportes
```
GET    /api/reports           → Obtener todos
POST   /api/reports           → Crear
PUT    /api/reports/:id       → Actualizar
DELETE /api/reports/:id       → Eliminar
```

### Usuarios
```
GET    /api/users             → Obtener todos
PUT    /api/users/:name       → Actualizar
```

### Geosentinels
```
GET    /api/geosentinels      → Obtener sensores
GET    /api/geosentinels/:id  → Obtener uno
POST   /api/geosentinels      → Crear
PUT    /api/geosentinels/:id  → Actualizar
```

### Alertas
```
GET    /api/alerts            → Todas
GET    /api/alerts/active     → Últimas 24h
POST   /api/alerts            → Crear
DELETE /api/alerts/:id        → Resolver
```

### Clima
```
GET    /api/weather           → Clima actual
PUT    /api/weather           → Actualizar
```

---

## 📡 Socket.io Events

**Cliente recibe:**
```javascript
'geosentinels:all'      → Sensores iniciales
'geosentinels:updated'  → Actualización sensores
'alert:landslide'       → NUEVA ALERTA CRÍTICA
'weather:current'       → Clima inicial
'weather:updated'       → Actualización clima
```

---

## 🧪 Testing

```bash
# En la raíz del proyecto
node test-alerts.js
```

Ejecuta 8 tests automatizados:
- ✓ Conexión backend
- ✓ Sensores CRUD
- ✓ Alertas CRUD
- ✓ Clima

---

## 🔐 Autenticación

### Admin
- Email: `admin@gmail.com` (o cualquier email con prefix `admin`)
- Contraseña: Cualquiera
- Acceso: Panel completo

### Usuario Regular
- Cualquier otro email
- Contraseña: Cualquiera
- Acceso: Vista limitada

---

## ⚙️ Configuración

### Backend (`backend/server.js`)
```javascript
const PORT = process.env.PORT || 3000;
const SENSOR_INTERVAL = 5000;      // Cada 5 segundos
const WEATHER_INTERVAL = 10000;    // Cada 10 segundos
```

### Socket.io (`frontend/socket-client.js`)
```javascript
const SOCKET_SERVER_URL = 'http://localhost:3000';
```

---

## 🎯 Features Actuales

- ✅ Autenticación simple
- ✅ Gestión de reportes de vías
- ✅ Gestión de usuarios
- ✅ 3 sensores geosentinels
- ✅ Sistema de alertas en tiempo real
- ✅ Simulación de clima
- ✅ Cálculo automático de riesgo
- ✅ Notificaciones del navegador
- ✅ Sonido de alerta
- ✅ Banner brillante en alertas críticas
- ✅ Socket.io WebSocket
- ✅ API REST completa

---

## 🚧 Próximas Features

- [ ] Base de datos MongoDB/PostgreSQL
- [ ] OpenWeatherMap API real
- [ ] Mapa interactivo Leaflet
- [ ] Gráficos con Recharts
- [ ] Sistema de permisos avanzado
- [ ] SMS/WhatsApp notifications
- [ ] Exportar reportes PDF
- [ ] PWA (offline support)
- [ ] Darkmode
- [ ] i18n (múltiples idiomas)

---

## 📚 Documentación Completa

- [INICIO_RAPIDO.md](./INICIO_RAPIDO.md) - Guía de usuario rápida
- [GEOSENTINEL_ALERTS.md](./GEOSENTINEL_ALERTS.md) - Documentación técnica del sistema IoT
- [backend/README.md](./backend/README.md) - Documentación backend (próximamente)
- [geosentinel/README.md](./geosentinel/README.md) - Documentación módulo geosentinel
- [frontend/README.md](./frontend/README.md) - Documentación frontend

---

## 🛠️ Tech Stack

**Backend:**
- Node.js
- Express.js
- Socket.io
- Helmet (Security)
- CORS

**Frontend:**
- React 18
- Tailwind CSS
- Socket.io Client
- Babel (JSX transpilation)

---

## 📞 Contacto

**Desarrollador:** luisito  
**Email:** Alrxandermaturana76@gmail.com  
**WhatsApp:** +57 314 531 2045  
**Ubicación:** Quibdó, Chocó

---

## 📄 Licencia

MIT License - Código abierto para Vías del Chocó

---

## 🎉 ¡Listo para Usar!

```bash
cd backend && npm start
# Abre http://localhost:3000/admin.html en navegador
# Login con admin@gmail.com
# ¡Observa las alertas en tiempo real!
```

**¡Bienvenido al futuro del monitoreo de vías!** 🚀📡
