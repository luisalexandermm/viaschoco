# 🎨 FRONTEND - Panel de Administración

Interfaz React para monitoreo de vías, reportes, usuarios y alertas de deslizamientos en tiempo real.

## 📁 Estructura

```
frontend/
├── admin.html          ← Panel admin (React inline)
├── socket-client.js    ← Cliente Socket.io
├── styles/             ← Estilos personalizados (opcional)
├── components/         ← Componentes (futuro)
└── README.md          ← Este archivo
```

## 🚀 Cómo Usar

### Opción 1: Archivo Local
```bash
# Abrir en navegador
http://localhost:3000/frontend/admin.html
```

### Opción 2: Desde Servidor
```bash
# Backend sirve archivos estáticos
cd backend
npm start

# Acceder en navegador
http://localhost:3000/admin.html
```

## 📄 Archivos

### `admin.html`
Panel principal con:
- ✓ Autenticación admin
- ✓ Gestión de reportes
- ✓ Gestión de usuarios
- ✓ **Pestaña Alertas** (geosentinels en vivo)
- ✓ Estadísticas

**Login:**
- Email: `admin@gmail.com` (o con prefix `admin`)
- Contraseña: Cualquiera

### `socket-client.js`
Cliente Socket.io que:
- ✓ Conecta a WebSocket en tiempo real
- ✓ Recibe actualizaciones de sensores
- ✓ Emite alertas críticas
- ✓ Muestra notificaciones del navegador
- ✓ Reproduce sonido de alerta

**Eventos escuchados:**
```javascript
'geosentinels:updated'  → Actualización sensores
'alert:landslide'       → ALERTA CRÍTICA
'weather:updated'       → Cambio de clima
```

## 🎨 Características del Frontend

### Pestaña "Reportes"
- Lista reportes de vías del Chocó
- Detalles: ubicación, estado, usuario
- Botones: Aprobar, Eliminar

### Pestaña "Usuarios"
- Gestión de usuarios registrados
- Estado: Activo, Bloqueado
- Botones: Bloquear, Desbloquear

### Pestaña "Alertas" (NUEVO)
**Sensores Geosentinels:**
- 3 sensores monitoreados en vivo
- Riesgo actual (%)
- Humedad del suelo
- Presión barométrica
- Estado: Normal ✓ o ALERTA 🚨

**Alertas Activas:**
- Historial de últimas 24h
- Ubicación del deslizamiento
- Riesgo (%)
- ETA (30 minutos)
- Botón: Resolver

**Clima Actual:**
- Temperatura (°C)
- Humedad (%)
- Lluvia (mm/h)
- Viento (km/h)
- ⚠️ Advertencia si lluvia > 50mm

### Pestaña "Estadísticas"
- Reportes por estado
- Vías con más reportes
- Resumen total

## 🔌 Integración Socket.io

```javascript
// Cliente cargado automáticamente en admin.html
<script src="./socket-client.js"></script>

// Escuchar alertas
window.socketClient.on('alert:landslide', (alert) => {
  // Mostrar en pestaña de alertas
  // Banner rojo
  // Notificación navegador
});
```

## 🎯 URL de Acceso

```
http://localhost:3000/admin.html
http://localhost:3000/frontend/admin.html
```

## 🔐 Autenticación

- Email con prefix `admin` → Admin
- Otros emails → Usuario estándar

## 📱 Responsive

- ✓ Desktop
- ✓ Tablet
- ✓ Mobile
- Basado en Tailwind CSS

## 🚧 Futuras Mejoras

- [ ] Componentes React separados
- [ ] Store estado Redux/Context
- [ ] Gráficos con Recharts
- [ ] Mapas interactivos Leaflet
- [ ] PWA (offline support)
- [ ] Darkmode
- [ ] i18n (múltiples idiomas)

---

**Desarrollado con React 18 + Tailwind CSS + Socket.io**
