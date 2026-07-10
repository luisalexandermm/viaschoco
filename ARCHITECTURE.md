# 🚀 Vías del Chocó - Nueva Arquitectura

## Cambios principales

### ✅ Implementado
- **PostgreSQL + Prisma**: Base de datos relacional moderna con ORM type-safe
- **Autenticación JWT**: Login seguro con tokens expirables
- **Roles**: ADMIN, OPERATOR, USER con permisos diferenciados
- **Autenticación de dispositivos**: Cada sensor tiene `device_id` + `api_key` única
- **MQTT ready**: Integración con broker MQTT (HiveMQ Cloud, EMQX)
- **API REST documentada**: Endpoints para usuarios, reportes, dispositivos, lecturas
- **Socket.io en tiempo real**: Alertas instantáneas en el mapa
- **Motor de alertas real**: Evalúa riesgo basado en lecturas de sensores

### ❌ Eliminado
- ❌ Firebase Admin + Firestore
- ❌ MongoDB + Mongoose
- ❌ Base de datos local JSON (db.js)
- ❌ Simulador de sensores (reemplazado por MQTT real)

---

## Flujo de datos - Dispositivos en campo

```
┌─────────────────────────────────────────────────────────────────┐
│ SENSOR FÍSICO (ESP32, Arduino, etc.)                            │
│ - Lee: tilt, humidity, rainfall, vibration, pressure            │
│ - Conecta por WiFi/LTE a MQTT broker                            │
│ - Publica mensajes JSON en: viaschoco/devices/{device_id}/...   │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ MQTT (QoS 1/2)
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│ MQTT BROKER (HiveMQ Cloud / EMQX)                               │
│ - Almacena mensajes si hay desconexiones                        │
│ - Garantiza entrega con QoS                                      │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       │ Backend se suscribe
                       │
┌──────────────────────▼──────────────────────────────────────────┐
│ BACKEND NODE.JS (Prisma + PostgreSQL)                           │
│ 1. Recibe lecturas MQTT                                          │
│ 2. Valida device_id + api_key                                    │
│ 3. Almacena en tabla sensor_readings                             │
│ 4. Evalúa alertas en tiempo real                                 │
│ 5. Emite por Socket.io al frontend                              │
└──────────────────────┬──────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
   PostgreSQL    Socket.io       API REST
   (histórico)  (alertas live)  (reportes)
```

---

## Setup Inicial

### 1. Variables de entorno (backend/.env)

```env
# PostgreSQL (Neon recomendado)
DATABASE_URL="postgresql://user:password@host/viaschoco"

# JWT
JWT_SECRET="super-secreto-cambiar-en-produccion"
JWT_EXPIRATION="8h"

# Admin initial
ADMIN_EMAIL="admin@viaschoco.test"
ADMIN_PASSWORD="cambiar-en-produccion"

# MQTT (HiveMQ Cloud o EMQX)
MQTT_BROKER_URL="mqtt://broker.hivemq.com:1883"
MQTT_USERNAME="usuario-opcional"
MQTT_PASSWORD="password-opcional"
MQTT_TOPIC_PREFIX="viaschoco/"

# Puerto
PORT=3001
NODE_ENV="development"
```

### 2. Crear base de datos

```bash
cd backend
npm install
npx prisma migrate deploy
npm run seed  # (si existe script de seed)
```

### 3. Migrar datos JSON → PostgreSQL

```bash
node scripts/migrate-to-postgres.js
```

### 4. Iniciar servidor

```bash
npm run dev
```

---

## API Endpoints

### 🔐 Autenticación

- `POST /api/auth/login` - Login con email + contraseña
- `POST /api/auth/register` - Registro de nuevo usuario
- `GET /api/auth/me` - Información del usuario logueado
- `POST /api/auth/seed-admin` - Crear usuario admin inicial

**Request ejemplo:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "USER"
  }
}
```

### 📊 Reportes

- `GET /api/reports` - Listar todos los reportes
- `POST /api/reports` - Crear reporte (requiere auth)
- `GET /api/reports/:id` - Obtener reporte específico
- `PUT /api/reports/:id` - Actualizar reporte (requiere auth)
- `DELETE /api/reports/:id` - Eliminar reporte (requiere auth)

### 📡 Dispositivos (Administrador)

- `GET /api/admin/devices` - Listar dispositivos registrados
- `POST /api/admin/devices` - Registrar nuevo dispositivo
- `GET /api/admin/devices/:deviceId` - Info del dispositivo
- `PUT /api/admin/devices/:deviceId` - Actualizar dispositivo
- `POST /api/admin/devices/:deviceId/rotate-key` - Rotar API key
- `DELETE /api/admin/devices/:deviceId` - Eliminar dispositivo

**Crear dispositivo:**
```bash
curl -X POST http://localhost:3001/api/admin/devices \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "DEVICE-001-QUIBDO",
    "name": "Sensor Km 145 Quibdó-Medellín",
    "description": "Monitor de deslizamientos en túnel",
    "latitude": 5.8521,
    "longitude": -75.6521
  }'
```

**Response:**
```json
{
  "message": "Dispositivo registrado exitosamente",
  "device": {
    "id": 1,
    "deviceId": "DEVICE-001-QUIBDO",
    "name": "Sensor Km 145 Quibdó-Medellín",
    "status": "ACTIVE"
  },
  "apiKey": "a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3",
  "notice": "GUARDA ESTA API KEY - no se mostrará de nuevo"
}
```

### 📈 Lecturas de Sensores (desde campo)

- `POST /api/devices/sensor/readings` - Enviar lecturas
  - Headers: `x-device-id`, `x-device-key`
  - Body: JSON array de lecturas
  
- `GET /api/devices/sensor/readings` - Obtener historial
- `GET /api/devices/sensor/health` - Health check del dispositivo

**Enviar lecturas (HTTP):**
```bash
curl -X POST http://localhost:3001/api/devices/sensor/readings \
  -H "x-device-id: DEVICE-001-QUIBDO" \
  -H "x-device-key: a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3" \
  -H "Content-Type: application/json" \
  -d '{
    "readings": [
      {
        "type": "TILT",
        "value": 22.5,
        "unit": "degrees",
        "uuid": "uuid-123-abc"
      },
      {
        "type": "RAINFALL",
        "value": 15.3,
        "unit": "mm",
        "uuid": "uuid-456-def"
      },
      {
        "type": "HUMIDITY",
        "value": 82,
        "unit": "%",
        "uuid": "uuid-789-ghi"
      }
    ]
  }'
```

---

## Publicar desde MQTT

**Tema (topic):**
```
viaschoco/devices/DEVICE-001-QUIBDO/readings
```

**Payload (JSON):**
```json
{
  "readings": [
    { "type": "TILT", "value": 22.5, "unit": "degrees", "uuid": "..." },
    { "type": "RAINFALL", "value": 15.3, "unit": "mm", "uuid": "..." },
    { "type": "HUMIDITY", "value": 82, "unit": "%", "uuid": "..." }
  ]
}
```

**Ejemplo con mosquitto:**
```bash
mosquitto_pub \
  -h broker.hivemq.com \
  -t "viaschoco/devices/DEVICE-001-QUIBDO/readings" \
  -m '{
    "readings": [
      {"type":"TILT","value":22.5,"unit":"degrees","uuid":"001"}
    ]
  }'
```

---

## 🚨 Motor de Alertas

Las alertas se generan automáticamente cuando se cumplen estos criterios:

| Factor          | Umbral | Peso |
|-----------------|--------|------|
| Tilt            | > 25°  | +25% |
| Rainfall (6h)   | > 60mm | +30% |
| Humidity        | > 85%  | +20% |
| Vibration       | > 7.5 m/s² | +15% |

**Riesgo total ≥ 70% → Alerta ACTIVA**
- **70-84%**: Severidad HIGH
- **≥ 85%**: Severidad CRITICAL

---

## Estructura de Datos

### users
```
id: Int (PK)
name: String
email: String (UNIQUE)
passwordHash: String
role: ADMIN | OPERATOR | USER
blocked: Boolean
createdAt: DateTime
updatedAt: DateTime
```

### devices
```
id: Int (PK)
deviceId: String (UNIQUE)  # "DEVICE-001-QUIBDO"
name: String
description: String?
latitude: Float
longitude: Float
status: ACTIVE | DISABLED | MAINTENANCE
apiKeyHash: String (bcrypted)
lastSeenAt: DateTime?
lastKeyRotation: DateTime?
createdAt: DateTime
updatedAt: DateTime
```

### sensor_readings
```
id: Int (PK)
readingUuid: String (UNIQUE)  # Previene duplicados
deviceId: Int (FK → devices)
measurementType: TILT | HUMIDITY | VIBRATION | RAINFALL | PRESSURE
value: Float
unit: String?
timestamp: DateTime
createdAt: DateTime
```

### alerts
```
id: Int (PK)
deviceId: Int? (FK → devices)
alertType: String  # "LANDSLIDE_RISK"
severity: String  # "HIGH" | "CRITICAL"
message: String
location: String?
status: ACTIVE | RESOLVED
createdAt: DateTime
resolvedAt: DateTime?
```

---

## Despliegue

### Frontend (Vercel)
```bash
# El frontend ya está en /public y se sirve como estático
# Vercel lo desplegará automáticamente
```

### Backend (Railway / Render / Fly)

**Railway.app:**
```bash
railway login
railway link
railway up
```

**Render:**
```bash
# Crear .render.yaml en raíz del proyecto
# Configurar DATABASE_URL en variables
# Conectar repo de GitHub
```

---

## Troubleshooting

### MQTT no conecta
```bash
# Verificar credenciales en .env
# Probar conexión:
mosquitto_sub -h broker.hivemq.com -t 'viaschoco/#'
```

### Base de datos no sincroniza
```bash
npx prisma migrate reset  # ⚠️ BORRA TODO
npx prisma migrate deploy  # Aplicar migraciones
```

### Device credentials inválidas
```bash
# Regenerar API key
curl -X POST http://localhost:3001/api/admin/devices/DEVICE-ID/rotate-key \
  -H "Authorization: Bearer ADMIN_TOKEN"
```

---

## Notas de Seguridad

- ⚠️ **Nunca** exponer `JWT_SECRET` en cliente
- ⚠️ **Nunca** hardcodear `api_key` en código fuente
- ⚠️ **Rotar** API keys regularmente
- ✅ Usar HTTPS en producción
- ✅ Validar todos los inputs del servidor
- ✅ Rate limiting en endpoints públicos
