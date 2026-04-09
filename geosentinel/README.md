# 📡 GEOSENTINEL - Sistema de Monitoreo IoT

Módulo independiente para gestión de sensores, alertas y clima en tiempo real.

## 📁 Estructura

```
geosentinel/
├── sensors.js      ← Gestión de sensores IoT
├── alerts.js       ← Sistema de alertas
├── weather.js      ← Datos climáticos
├── routes.js       ← Rutas API Express
├── simulator.js    ← Simulación de datos
├── index.js        ← Punto de entrada
└── README.md       ← Este archivo
```

## 🚀 Uso en Backend

```javascript
const geosentinel = require('./geosentinel');

// Registrar rutas API
geosentinel.routes(app, io);

// Iniciar simulación
geosentinel.simulator.startSensorSimulation(io);
geosentinel.simulator.startWeatherSimulation(io);
```

## 📡 Módulos

### `sensors.js`
- `getAllSensors()` - Obtener todos
- `getSensorById(id)` - Obtener uno
- `createSensor(name, lat, lng)` - Crear
- `updateSensor(id, data)` - Actualizar
- `simulateSensorReadings(weather)` - Simular datos

### `alerts.js`
- `getAllAlerts()` - Todas las alertas
- `getActiveAlerts()` - Últimas 24h
- `createAlert(sensorId, location, risk)` - Nueva alerta
- `resolveAlert(alertId)` - Resolver
- `getAlertsBySensor(sensorId)` - Por sensor

### `weather.js`
- `getWeather()` - Clima actual
- `updateWeather(data)` - Actualizar
- `simulateWeather()` - Simular cambios
- `calculateWeatherRiskFactor()` - Índice de riesgo
- `isDangerousWeather()` - ¿Peligroso?

### `simulator.js`
- `startSensorSimulation(io)` - Simular sensores
- `startWeatherSimulation(io)` - Simular clima
- `startAlertCleanup()` - Limpiar antiguas

## 🔗 API Endpoints

### Sensores
```
GET  /api/geosentinels
GET  /api/geosentinels/:id
POST /api/geosentinels
PUT  /api/geosentinels/:id
```

### Alertas
```
GET  /api/alerts
GET  /api/alerts/active
POST /api/alerts
DELETE /api/alerts/:id
```

### Clima
```
GET  /api/weather
PUT  /api/weather
```

## 🔌 Socket.io Events

**Emitidos:**
- `geosentinels:updated` - Datos de sensores
- `alert:landslide` - Nueva alerta crítica
- `weather:updated` - Cambio de clima

## ⚙️ Configuración

En `backend/server.js`:
```javascript
// Cambiar frecuencia de simulación
geosentinel.simulator.startSensorSimulation(io, 5000); // 5 segundos
geosentinel.simulator.startWeatherSimulation(io, 10000); // 10 segundos
```

---

**Desarrollado para Vías del Chocó**
