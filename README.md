# Vías del Chocó

**Plataforma colaborativa para reportes de estado de carreteras en tiempo real en el departamento del Chocó, Colombia.**

🚨 **Versión 2.0** - Arquitectura completamente rediseñada con PostgreSQL, MQTT en tiempo real y autenticación de dispositivos.

---

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│ Frontend (React)                       [Vercel Static]       │
│ - Mapa interactivo con Leaflet                              │
│ - Reportes en tiempo real                                    │
│ - Dashboard de alertas                                       │
└─────────────────────────────────────────────────────────────┘
                            ↕ Socket.io + REST API
┌─────────────────────────────────────────────────────────────┐
│ Backend (Node.js/Express) [Railway/Render/Fly]              │
│ - Autenticación JWT                                          │
│ - Gestión de dispositivos                                    │
│ - Motor de alertas en tiempo real                            │
│ - Conexión MQTT                                              │
└─────────────────────────────────────────────────────────────┘
        ↓                   ↓                    ↓
   PostgreSQL (Neon)   MQTT Broker    Dispositivos en campo
   (datos históricos)  (sensores)     (ESP32 + SIM/WiFi)
```

---

## 🚀 Stack Tecnológico

### Frontend
- **React 18** - Framework JavaScript
- **Babel Standalone + CDN** - Sin build
- **Tailwind CSS** - Estilos responsive
- **Leaflet** - Mapas interactivos
- **Socket.io Client** - Tiempo real

### Backend
- **Node.js + Express** - Servidor API
- **Prisma ORM** - Base de datos
- **PostgreSQL (Neon)** - BD relacional
- **MQTT** - IoT en tiempo real
- **Socket.io** - WebSockets
- **JWT** - Autenticación segura
- **bcrypt** - Hashing de contraseñas

### Despliegue
- **Vercel** - Frontend estático
- **Railway/Render/Fly** - Backend
- **Neon** - PostgreSQL serverless
- **HiveMQ Cloud / EMQX** - MQTT Broker

---

## 📋 Cambios principales (v2.0)

### ✅ Nuevas características
- **PostgreSQL + Prisma** - Base de datos tipo SQL
- **Autenticación de dispositivos** - Cada sensor tiene `device_id` + `api_key`
- **MQTT en tiempo real** - Comunicación IoT estándar
- **Motor de alertas real** - Evalúa riesgo basado en lecturas
- **API REST documentada** - Endpoints seguros con autenticación JWT
- **Roles de usuario** - ADMIN, OPERATOR, USER

### ❌ Eliminado
- Firebase Admin + Firestore
- MongoDB + Mongoose
- Base de datos local JSON
- Simulador de sensores

---

## 🛠️ Instalación rápida

### Requisitos
- Node.js 18+
- PostgreSQL (o Neon)
- Docker (opcional)

### 1. Clonar y setup

```bash
git clone https://github.com/tuusuario/vias-choco.git
cd vias-choco

# Backend
cd backend
npm install
cp .env.example .env  # Editar con tus credenciales

# Migrar base de datos
npx prisma migrate deploy
npm run seed  # Opcional: migrar datos de JSON
```

### 2. Configurar variables de entorno

**backend/.env:**
```env
DATABASE_URL="postgresql://user:pass@host/viaschoco"
JWT_SECRET="tu-secret-muy-seguro"
ADMIN_EMAIL="admin@viaschoco.test"
ADMIN_PASSWORD="change-this"
MQTT_BROKER_URL="mqtt://broker.hivemq.com:1883"
PORT=3001
```

### 3. Iniciar servidor

```bash
npm run dev

# Output esperado:
# ============================================================
# 🚀 Servidor Vías del Chocó iniciado
# 🌐 Puerto: 3001
# 📡 WebSocket (Socket.io): ACTIVO
# 💾 Base de datos: PostgreSQL (Prisma)
# 📨 MQTT: CONECTADO
# ============================================================
```

### 4. Verificar funcionamiento

```bash
curl http://localhost:3001/api/health
```

---

## 📚 Documentación

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Descripción técnica completa
- **[SENSOR_SETUP_GUIDE.md](./SENSOR_SETUP_GUIDE.md)** - Guía para instalar sensores en campo
- **API Docs** - Disponible en `http://localhost:3001/api-docs` (próximamente)

---

## 🚨 Sistema de alertas

Las alertas se generan automáticamente cuando:

```
┌─ Inclinación > 25° ────────────┐
├─ Lluvia acumulada > 60mm (6h) ─┤
├─ Humedad del suelo > 85% ──────┤ → Riesgo ≥ 70% → 🚨 ALERTA
├─ Vibración > 7.5 m/s² ────────┤
└─ Presión < 970 hPa ───────────┘
```

**Alertas emitidas a:**
- ✓ Mapa web en tiempo real (Socket.io)
- ✓ Tabla de alertas activas
- ✓ Historial en base de datos

---

## 📡 API Endpoints

### Autenticación
```
POST   /api/auth/login          # Login usuario
POST   /api/auth/register       # Registro
GET    /api/auth/me             # Datos del usuario
```

### Reportes
```
GET    /api/reports             # Listar reportes
POST   /api/reports             # Crear reporte
GET    /api/reports/:id         # Detalle
PUT    /api/reports/:id         # Actualizar
DELETE /api/reports/:id         # Eliminar
```

### Dispositivos (Admin)
```
GET    /api/admin/devices                  # Listar
POST   /api/admin/devices                  # Registrar
PUT    /api/admin/devices/:id              # Actualizar
POST   /api/admin/devices/:id/rotate-key  # Nueva API key
DELETE /api/admin/devices/:id              # Eliminar
```

### Lecturas (Sensores)
```
POST   /api/devices/sensor/readings        # Enviar lecturas
GET    /api/devices/sensor/readings        # Historial
GET    /api/devices/sensor/health          # Estado
```

---

## 🌍 Despliegue

### Frontend (Vercel)
```bash
# Vercel detecta automáticamente /public
# Solo configurar variable VITE_API_URL
```

### Backend (Railway)
```bash
railway login
railway link
railway env RAILWAY_CONTEXT_REGION=us-west # Opcional
railway up --detach
```

**Variables en Railway:**
```
DATABASE_URL=postgresql://...
JWT_SECRET=tu-secret
MQTT_BROKER_URL=mqtt://...
ADMIN_PASSWORD=...
```

---

## 🔒 Seguridad

- ⚠️ **JWT Secrets** - Cambiar en cada despliegue
- ⚠️ **API Keys** - Rotarlas regularmente
- ⚠️ **Database** - Backups diarios
- ✅ HTTPS obligatorio en producción
- ✅ CORS configurado por dominio
- ✅ Rate limiting en endpoints

---

## 📊 Base de datos

### Tablas principales

**users** - Gestión de usuarios
```
id | name | email | passwordHash | role | blocked | createdAt
```

**devices** - Sensores registrados
```
id | deviceId | name | latitude | longitude | status | apiKeyHash | lastSeenAt
```

**sensor_readings** - Historial de mediciones
```
id | readingUuid | deviceId | measurementType | value | timestamp
```

**alerts** - Alertas generadas
```
id | deviceId | alertType | severity | message | status | createdAt
```

**reports** - Reportes de usuarios
```
id | title | message | location | status | authorId | createdAt
```

---

## 🚀 Roadmap v3.0

- [ ] Dashboard avanzado de analytics
- [ ] Predicción de riesgos con ML
- [ ] Integración con drones
- [ ] App móvil nativa
- [ ] Notificaciones push
- [ ] Integración con autoridades viales
- [ ] Exportación de reportes

---

## 🤝 Contribución

1. Fork el proyecto
2. Crea rama: `git checkout -b feature/AmazingFeature`
3. Commit: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/AmazingFeature`
5. Pull Request

---

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE)

---

## 👨‍💻 Autor

**Maturana Innovate Tech**
- 📧 Email: alexandermaturana76@gmail.com
- 📱 WhatsApp: +57 314 531 2045
- 📍 Quibdó, Chocó, Colombia

---

## 🆘 Soporte

- 📖 [Documentación completa](./ARCHITECTURE.md)
- 📡 [Guía de sensores](./SENSOR_SETUP_GUIDE.md)
- 🐛 [Reportar bugs](https://github.com/tuusuario/vias-choco/issues)

**⭐ Si este proyecto te resulta útil, ¡dale una estrella!**