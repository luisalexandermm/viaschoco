# 🚀 INICIO RÁPIDO - Sistema de Alertas Geosentinel

## ✅ Implementación Completada

Todos los componentes del sistema de alertas en tiempo real ya están instalados y configurados:

### 📦 Componentes Instalados

```
✓ Backend Node.js + Express + Socket.io
✓ 3 Sensores Geosentinels Pre-configurados
✓ Sistema de Alertas en Tiempo Real
✓ Integración Clima Simulado
✓ Socket.io Client para Frontend
✓ Panel Admin con Pestaña de Alertas
✓ Notificaciones del Navegador
✓ Script de Testing
```

---

## 🏃 CÓMO EJECUTAR EN 3 PASOS

### Paso 1: Iniciar Backend (Abrir Terminal)
```powershell
cd c:\Users\Maritza\Documents\GitHub\viaschoco\backend
npm start
```

**Esperado:**
```
🚀 Servidor corriendo en puerto 3000
📡 WebSocket (Socket.io) activo
📍 Geosentinels inicializados: 3
```

### Paso 2: Abrir Admin Panel
1. Abre navegador en: `http://localhost:3000/admin.html`
2. Login: 
   - Email: `admin@gmail.com` (o con prefix `admin@`)
   - Contraseña: Cualquiera

### Paso 3: Ver Alertas en Tiempo Real
1. Ve a la pestaña **🚨 Alertas**
2. Verás 3 sensores monitoreados en vivo
3. Clima actual con condiciones de riesgo
4. Punto verde = Conectado a WebSocket ✓

---

## 🧪 TESTING (Opcional)

Abre otra terminal en el directorio raíz:
```powershell
node test-alerts.js
```

Esto ejecutará 8 tests automatizados y verificará:
- ✓ Conexión al backend
- ✓ Obtener/Crear/Actualizar sensores
- ✓ Crear/Resolver alertas
- ✓ Clima actual

---

## 📡 ¿CÓMO GENERA ALERTAS?

El sistema monitorea **3 factores críticos**:

```
RIESGO = Base (0-40%)
       + Lluvia > 50mm? (+30%)
       + Humedad > 80%? (+15%)

SI RIESGO > 75% → ALERTA INMEDIATA
┬─────────────────────────────────┐
│ 🚨 DESLIZAMIENTO EN 30 MINUTOS  │
│ Ubicación: [Vía X]              │
│ Riesgo: 88%                     │
└─────────────────────────────────┘
```

### Eventos Socket.io:
- Banner rojo parpadeante
- Sonido de alerta (si el navegador lo permite)
- Notificación del SO (con permiso previo)
- Actualización instantánea en panel

---

## 🗺️ SENSORES GEOSENTINELS PRE-CONFIGURADOS

| ID | Nombre | Ubicación | Riesgo |
|----|--------|-----------|--------|
| 1 | GEO-Quibdó-Medellín-km145 | 5.8521, -75.6521 | Monitoreo |
| 2 | GEO-Tadó-Certegui-km22 | 5.7821, -76.2389 | Monitoreo |
| 3 | GEO-Quibdó-Pereira-km78 | 5.6321, -76.0521 | Monitoreo |

Los datos se **simulan cada 5 segundos** automáticamente.  
El clima se **simula cada 10 segundos**.

---

## 📊 NUEVA PESTAÑA EN ADMIN.PANEL

### Tab: "🚨 Alertas"

**Sección 1: Sensores Geosentinels**
- Muestra 3 sensores en vivo
- Riesgo actual de cada uno
- Humedad del suelo
- Presión barométrica
- Estado: Normal ✓ o ALERTA 🚨

**Sección 2: Alertas Activas**
- Historial de alertas últimas 24h
- ETA de deslizamiento (30 minutos)
- Botón para resolver manualmente

**Sección 3: Clima Actual**
- Temperatura
- Humedad ambiental
- Precipitación (mm/h)
- Velocidad del viento
- Advertencia si lluvia > 50mm

---

## 🔌 PUNTOS DE INTEGRACIÓN

### Backend (`backend/server.js`)
```javascript
// Socket.io escucha en puerto 3000
io.on('connection', (socket) => {
  socket.emit('geosentinels:updated', sensorsData);
  socket.emit('alert:landslide', alertData);
});
```

### Frontend (`socket-client.js`)
```javascript
window.socketClient.on('alert:landslide', (alert) => {
  // Banner rojo
  // Sonido
  // Notificación navegador
  // Actualizar dashboard
});
```

### Admin Panel (`admin.html`)
```javascript
// Nueva pestaña con tab === 'alerts'
// Renderiza sensores + alertas + clima en tiempo real
```

---

## 🛠️ ARCHIVO DE CONFIGURACIÓN

Archivo: `socket-client.js` - Línea 5
```javascript
const SOCKET_SERVER_URL = 'http://localhost:3000';
// Cambia si migras servidor a otro puerto/dominio
```

---

## 📁 ESTRUCTURA DE CARPETAS

```
viaschoco/
├── backend/
│   ├── server.js              ← Backend con Socket.io
│   ├── package.json
│   └── node_modules/
├── admin.html                 ← Panel admin actualizado
├── socket-client.js           ← Cliente Socket.io
├── test-alerts.js             ← Script de testing
├── GEOSENTINEL_ALERTS.md      ← Documentación completa
├── INICIO_RAPIDO.md           ← Este archivo
└── ...otros archivos
```

---

## 🔔 NOTIFICACIONES DEL NAVEGADOR

### Primer acceso
El navegador pedirá permiso para notificaciones:
- Click ✓ "Permitir"
- Las alertas críticas aparecerán como notificaciones

### Requisitos
- Chrome, Firefox, Edge: ✓ Soportado
- Safari: ⚠️ Soporte limitado
- Navegación privada: ✗ Bloqueado por defecto

---

## ⚙️ PRÓXIMAS INTEGRACIONES POSIBLES

- [ ] Base de datos (MongoDB) para persistencia
- [ ] OpenWeatherMap API real (en lugar de simulación)
- [ ] Gráficos de histórico Recharts
- [ ] Exportar alertas a PDF
- [ ] SMS/WhatsApp via Twilio
- [ ] Integración Leaflet para mapa interactivo
- [ ] Dashboard público (sin autenticación)
- [ ] Múltiples usuarios con roles

---

## 🐛 TROUBLESHOOTING

### "Puerto 3000 ya en uso"
```powershell
netstat -ano | findstr :3000  # Ver proceso
taskkill /PID <numero> /F     # Matar proceso
```

### "Socket.io no conecta"
- Verificar: `http://localhost:3000/api/health` (debe retornar `{"status":"ok"}`)
- Revisar console del navegador (F12)
- Asegurar que admin.html carga `socket-client.js`

### "Sin alertas visibles"
- Esperar 5-10 segundos para que sensores generemos datos
- Revisar que lluvia > 50mm o humedad > 80% (en clima simulado)
- O crear alerta manual: `npm run test`

---

## 📞 CONTACTO
Email: Alrxandermaturana76@gmail.com  
WhatsApp: +57 314 531 2045

---

## ✨ ¡LISTO PARA USAR!

Tu sistema de alertas geosentinel está **100% operativo**.  
Simplemente:  
1. Ejecuta `npm start` en backend  
2. Abre admin.html  
3. Ve a la pestaña "Alertas"  
4. ¡Observa los sensores en tiempo real!

**¡Bienvenido al futuro del monitoreo de vías!** 🚀
