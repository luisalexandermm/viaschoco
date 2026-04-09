# 🚨 Sistema de Alertas Geosentinel - Vías del Chocó

## Descripción General

Sistema en tiempo real para detectar y alertar sobre riesgos de deslizamientos mediante sensores IoT (Geosentinels) distribuidos en puntos críticos del Chocó.

---

## 📡 Arquitectura del Sistema

### 1. **Backend (Node.js + Express + Socket.io)**
- **Ubicación:** `backend/server.js`
- **Puerto:** `3000`
- **Características:**
  - API REST para geosentinels y alertas
  - WebSocket en tiempo real con Socket.io
  - Simulación de sensores IoT
  - Generación automática de alertas

### 2. **Frontend (React + Socket.io Client)**
- **Ubicación:** `admin.html`
- **Archivo Cliente Socket.io:** `socket-client.js`
- **Características:**
  - Panel de control admin
  - Visualización de sensores
  - Alertas en tiempo real
  - Notificaciones del navegador

### 3. **Sensores Geosentinels**
3 sensores pre-configurados:
- **GEO-Quibdó-Medellín-km145** (Lat: 5.8521, Lng: -75.6521)
- **GEO-Tadó-Certegui-km22** (Lat: 5.7821, Lng: -76.2389)
- **GEO-Quibdó-Pereira-km78** (Lat: 5.6321, Lng: -76.0521)

---

## 🚀 Cómo Ejecutar

### 1. Iniciar Backend
```bash
cd backend
npm install
npm start
```
- Servidor en `http://localhost:3000`
- WebSocket activo automáticamente

### 2. Abrir Frontend
```
Abrir en navegador: http://localhost:3000/admin.html
```
- Panel de admin se carga
- Se conecta automáticamente al WebSocket

---

## 📊 Endpoints API

### Geosentinels
```javascript
GET  /api/geosentinels              // Obtener todos
GET  /api/geosentinels/:id          // Obtener uno
POST /api/geosentinels              // Crear nuevo
PUT  /api/geosentinels/:id          // Actualizar datos
```

### Alertas
```javascript
GET  /api/alerts                    // Todas las alertas
GET  /api/alerts/active             // Últimas 24h
POST /api/alerts                    // Crear alerta manual
DELETE /api/alerts/:id              // Resolver alerta
```

### Clima
```javascript
GET  /api/weather                   // Clima actual
PUT  /api/weather                   // Actualizar clima
```

---

## 🌦️ Cómo Funciona la Predicción (30 minutos)

### Variables de Riesgo:
1. **Humedad del Suelo** (40-90%)
2. **Lluvia** (0-100+ mm/h)
3. **Presión Barométrica**
4. **Aceleración/Inclinación del Suelo** (simuladas)

### Fórmula de Riesgo:
```
riesgo = baseRisk(0-40%)
       + (lluvia > 50mm ? +30% : 0)
       + (humedad > 80% ? +15% : 0)
       + aceleración

Si riesgo > 75% → ALERTA GENERADA
ETA: 30 minutos antes del deslizamiento
```

### Proceso de Detección:
```
1. Sensores envían datos cada 5 segundos
2. Backend analiza combinación de factores
3. Si riesgo supera umbral → genera alerta
4. Socket.io emite evento en tiempo real
5. Frontend muestra banner rojo + notificación
6. Admin puede resolver alerta manualmente
```

---

## 🔔 Eventos Socket.io

### Emitidos por Servidor:
```javascript
// Inicial
'geosentinels:all'     → array de sensores
'alerts:all'           → array de alertas
'weather:current'      → objeto clima

// Actualizaciones
'geosentinels:updated' → datos nuevos sensores
'alert:landslide'      → NUEVA ALERTA CRÍTICA
'alert:resolved'       → alerta resuelta
'weather:updated'      → cambio de clima
```

### Escuchados por Cliente:
```javascript
socketClient.on('alert:landslide', (alert) => {
  // Mostrar banner rojo
  // Reproducir sonido
  // Enviar notificación navegador
  // Actualizar dashboard
});
```

---

## 🛠️ Archivos Generados

| Archivo | Propósito |
|---------|-----------|
| `backend/server.js` | Backend con Socket.io |
| `socket-client.js` | Cliente Socket.io para frontend |
| `admin.html` | Panel admin con alertas |

---

## 📱 Integración Frontend

### En `admin.html`:
```html
<!-- Importar -->
<script src="https://cdn.socket.io/4.5.4/socket.io.min.js"></script>
<script src="./socket-client.js"></script>

<!-- Usar -->
<script>
  window.socketClient.on('alert:landslide', (alert) => {
    // Lógica de alerta
  });
</script>
```

### Nueva Pestaña "Alertas":
- Muestra todos los sensores con riesgo en vivo
- Muestra alertas activas
- Clima actual con condiciones de riesgo
- Conexión WebSocket indicada con punto verde

---

## 🧪 Testing Manual

### 1. Generar alerta de prueba:
```bash
curl -X POST http://localhost:3000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "sensorId": 1,
    "location": "GEO-Quibdó-Medellín-km145",
    "riskLevel": 85
  }'
```

### 2. Ver si aparece:
- Banner rojo en admin.html
- Notificación del navegador
- En pestaña de Alertas

### 3. Resolver alerta:
```bash
curl -X DELETE http://localhost:3000/api/alerts/1
```

---

## ⚙️ Configuración Personalizable

### En `socket-client.js`:
```javascript
const SOCKET_SERVER_URL = 'http://localhost:3000'; // Cambiar servidor
```

### En `backend/server.js`:
```javascript
// Ajustar umbrales de riesgo
if (sensor.riskLevel > 75) { // Cambiar 75 por otro valor
  // Generar alerta
}

// Cambiar frecuencia de simulación
setInterval(() => { ... }, 5000); // Cambiar 5000ms
```

---

## 🔐 Notas de Seguridad

- Socket.io CORS configurado para permitir origen "*"
- En producción: restringir a dominio específico
- Helmet instalado para seguridad HTTP
- Validación de datos en endpoints

---

## 🚧 Próximas Mejoras

- [ ] Integración con OpenWeatherMap API real
- [ ] Persistencia en base de datos (MongoDB)
- [ ] Gráficos de histórico de alertas
- [ ] Exportar reportes PDF
- [ ] SMS/WhatsApp notifications
- [ ] Integración maps (Leaflet)
- [ ] Dashboard público (lectura sin admin)
- [ ] Autenticación OAuth

---

## 📝 Autor
**luisito** - Desarrollo de sistema de alertas geosentinel

---

## 📞 Soporte
Contacto: Alrxandermaturana76@gmail.com  
WhatsApp: +57 314 531 2045
