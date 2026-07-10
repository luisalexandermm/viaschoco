# 🧪 Guía de Testing Local - Backend v2.0

Pruebas paso a paso para validar que todo funciona antes de desplegar.

---

## Fase 1: Setup inicial

### 1.1 Verificar que Node.js está instalado

```bash
node --version   # v18.0.0 o superior
npm --version    # v8.0.0 o superior
```

### 1.2 Instalar dependencias

```bash
cd backend
npm install
npx prisma generate
```

### 1.3 Crear base de datos local (SQLite para testing)

**Para testing rápido sin PostgreSQL:**

Edita `backend/.env`:
```env
DATABASE_URL="file:./dev.db"
JWT_SECRET="test-secret-key-12345"
JWT_EXPIRATION="8h"
ADMIN_EMAIL="admin@test.local"
ADMIN_PASSWORD="Admin123!"
MQTT_BROKER_URL="mqtt://broker.hivemq.com:1883"
MQTT_USERNAME=""
MQTT_PASSWORD=""
PORT=3001
```

### 1.4 Ejecutar migraciones

```bash
npx prisma migrate deploy
# Output:
# ✓ Successfully created migrations folder
# ✓ Your database is now in sync with your schema
```

---

## Fase 2: Iniciar servidor

```bash
npm run dev

# Expected output:
# ============================================================
# 🚀 Servidor Vías del Chocó iniciado
# 🌐 Puerto: 3001
# 📡 WebSocket (Socket.io): ACTIVO
# 💾 Base de datos: Prisma ORM
# 📨 MQTT: CONECTANDO...
# ============================================================
```

**Dejar corriendo en una terminal.**

---

## Fase 3: Testing de endpoints

Abrir otra terminal en el proyecto root.

### 3.1 Test básico de salud

```bash
curl http://localhost:3001/api/health
```

**Respuesta esperada:**
```json
{
  "status": "ok",
  "timestamp": "2026-07-09T10:30:45Z"
}
```

---

### 3.2 Crear admin inicial

```bash
curl -X POST http://localhost:3001/api/auth/seed-admin \
  -H "Content-Type: application/json"
```

**Respuesta esperada:**
```json
{
  "message": "Admin creado",
  "email": "admin@test.local",
  "password": "Admin123!"
}
```

**O si ya existe:**
```json
{
  "message": "Admin ya existe"
}
```

---

### 3.3 Login (obtener JWT token)

```bash
TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@test.local","password":"Admin123!"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

echo "Token: $TOKEN"
```

**Respuesta esperada:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid-here",
    "email": "admin@test.local",
    "role": "ADMIN",
    "name": "Admin"
  }
}
```

---

### 3.4 Obtener datos del usuario autenticado

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/auth/me
```

**Respuesta esperada:**
```json
{
  "id": "uuid",
  "name": "Admin",
  "email": "admin@test.local",
  "role": "ADMIN"
}
```

---

## Fase 4: Testing de dispositivos

### 4.1 Registrar nuevo dispositivo (sensor)

```bash
curl -X POST http://localhost:3001/api/admin/devices \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "deviceId": "DEVICE-001-TEST",
    "name": "Sensor Quibdó",
    "latitude": 5.8521,
    "longitude": -75.6521,
    "status": "ACTIVE"
  }'
```

**Respuesta esperada:**
```json
{
  "id": "uuid",
  "deviceId": "DEVICE-001-TEST",
  "name": "Sensor Quibdó",
  "latitude": 5.8521,
  "longitude": -75.6521,
  "status": "ACTIVE",
  "apiKey": "a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3",
  "message": "⚠️ GUARDA ESTA API KEY - No se mostrará nuevamente"
}
```

**GUARDA el `apiKey` para el siguiente paso!**

---

### 4.2 Listar dispositivos

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/admin/devices
```

**Respuesta esperada:**
```json
{
  "devices": [
    {
      "id": "uuid",
      "deviceId": "DEVICE-001-TEST",
      "name": "Sensor Quibdó",
      "status": "ACTIVE",
      "lastSeenAt": null
    }
  ]
}
```

---

## Fase 5: Testing de lecturas de sensores

### 5.1 Enviar lecturas (como sensor)

```bash
curl -X POST http://localhost:3001/api/devices/sensor/readings \
  -H "x-device-id: DEVICE-001-TEST" \
  -H "x-device-key: a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3" \
  -H "Content-Type: application/json" \
  -d '{
    "readings": [
      {
        "type": "TILT",
        "value": 22.5,
        "unit": "degrees",
        "uuid": "001-2026-07-09-001"
      },
      {
        "type": "HUMIDITY",
        "value": 78.3,
        "unit": "%",
        "uuid": "001-2026-07-09-002"
      },
      {
        "type": "RAINFALL",
        "value": 45.2,
        "unit": "mm",
        "uuid": "001-2026-07-09-003"
      }
    ]
  }'
```

**Respuesta esperada:**
```json
{
  "stored": 3,
  "alertTriggered": false,
  "riskScore": 35
}
```

---

### 5.2 Obtener lecturas del dispositivo

```bash
curl -H "x-device-id: DEVICE-001-TEST" \
  -H "x-device-key: a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3" \
  "http://localhost:3001/api/devices/sensor/readings?hours=24"
```

**Respuesta esperada:**
```json
{
  "deviceId": "DEVICE-001-TEST",
  "readings": [
    {
      "id": "uuid",
      "measurementType": "TILT",
      "value": 22.5,
      "unit": "degrees",
      "timestamp": "2026-07-09T10:35:00Z"
    }
  ],
  "count": 3,
  "period": "24h"
}
```

---

### 5.3 Obtener estadísticas

```bash
curl -H "x-device-id: DEVICE-001-TEST" \
  -H "x-device-key: a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3" \
  "http://localhost:3001/api/devices/sensor/statistics/TILT"
```

**Respuesta esperada:**
```json
{
  "type": "TILT",
  "average": 22.5,
  "min": 20.1,
  "max": 25.3,
  "count": 12,
  "unit": "degrees",
  "period": "24h"
}
```

---

## Fase 6: Testing de alertas

### 6.1 Enviar lecturas que disparen alerta

```bash
curl -X POST http://localhost:3001/api/devices/sensor/readings \
  -H "x-device-id: DEVICE-001-TEST" \
  -H "x-device-key: a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3" \
  -H "Content-Type: application/json" \
  -d '{
    "readings": [
      {
        "type": "TILT",
        "value": 28.5,
        "unit": "degrees",
        "uuid": "001-2026-07-09-high-1"
      },
      {
        "type": "RAINFALL",
        "value": 70.2,
        "unit": "mm",
        "uuid": "001-2026-07-09-high-2"
      },
      {
        "type": "HUMIDITY",
        "value": 88.0,
        "unit": "%",
        "uuid": "001-2026-07-09-high-3"
      }
    ]
  }'
```

**Respuesta esperada (alerta generada):**
```json
{
  "stored": 3,
  "alertTriggered": true,
  "riskScore": 92,
  "alert": {
    "id": "uuid",
    "severity": "CRITICAL",
    "message": "Riesgo crítico de deslizamiento: 92%",
    "createdAt": "2026-07-09T10:40:00Z"
  }
}
```

---

## Fase 7: Testing de reportes

### 7.1 Crear reporte (usuario)

```bash
# Primero registrar usuario
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Juan Operador",
    "email": "juan@test.local",
    "password": "Password123!"
  }'

# Obtener token del usuario
USER_TOKEN=$(curl -s -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@test.local","password":"Password123!"}' \
  | grep -o '"token":"[^"]*' | cut -d'"' -f4)

# Crear reporte
curl -X POST http://localhost:3001/api/reports \
  -H "Authorization: Bearer $USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Carretera destrozada km 150",
    "message": "Hay un bache profundo que daña los autos",
    "location": "Quibdó - Medellín km 150",
    "status": "PENDING"
  }'
```

**Respuesta esperada:**
```json
{
  "id": "uuid",
  "title": "Carretera destrozada km 150",
  "message": "Hay un bache profundo que daña los autos",
  "location": "Quibdó - Medellín km 150",
  "status": "PENDING",
  "authorId": "uuid",
  "createdAt": "2026-07-09T10:45:00Z"
}
```

### 7.2 Listar reportes

```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:3001/api/reports
```

---

## Fase 8: Testing en tiempo real (Socket.io)

### 8.1 Conectar cliente Socket.io

```bash
npm install -g wscat

wscat -c "ws://localhost:3001/socket.io/?transport=websocket&EIO=4&t=$(date +%s)"
```

### 8.2 Suscribirse a alertas

```json
{"type":"subscribe","event":"alerts"}
```

### 8.3 Recibir eventos

Cuando envíes lecturas que generen alerta, verás:

```json
{
  "event": "alert:created",
  "data": {
    "id": "uuid",
    "deviceId": "DEVICE-001-TEST",
    "severity": "CRITICAL",
    "riskScore": 92
  }
}
```

---

## 🐛 Troubleshooting

### "Database connection failed"
```bash
# Verificar que la BD está activa
npx prisma db push
```

### "MQTT connection refused"
Es normal si no tienes broker configurado. El servidor sigue funcionando.

### "Cannot find token"
Asegúrate que copiaste exactamente el token del login (sin comillas extra).

### "Unauthorized" en endpoints admin
Verifica que usas `Authorization: Bearer` (con espacio).

---

## ✅ Checklist de validación

- [ ] `npm install` completa sin errores
- [ ] Base de datos inicializada (`npx prisma migrate deploy`)
- [ ] Servidor inicia sin errores
- [ ] GET `/api/health` responde
- [ ] Seed admin creado
- [ ] Login funciona (obtiene JWT)
- [ ] Dispositivo registrado con API key
- [ ] Lecturas de sensor aceptadas
- [ ] Alertas disparadas cuando riesgo > 70%
- [ ] Reportes creables por usuarios
- [ ] Socket.io recibe eventos

**Si todas las pruebas pasan: ✅ LISTO PARA DESPLEGAR**

---

**Última actualización:** 2026-07-09
**Versión:** 2.0
