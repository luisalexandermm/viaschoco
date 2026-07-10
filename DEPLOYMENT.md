# 🚀 Guía de Despliegue - v2.0

Pasos completos para desplegar Vías del Chocó en producción.

---

## Arquitectura del despliegue

```
┌─────────────────────────────────────────────────────────┐
│ FRONTEND (Vercel)                                       │
│ - React + Tailwind + Leaflet                           │
│ - Conecta a: API_BASE_URL del backend                 │
│ URL: https://vias-choco.vercel.app                    │
└─────────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────────┐
│ BACKEND (Railway / Render / Fly.io)                    │
│ - Express + Socket.io + MQTT                           │
│ - Base de datos PostgreSQL (Neon)                      │
│ URL: https://backend.vias-choco.app                   │
└─────────────────────────────────────────────────────────┘
        ↓                   ↓
┌─────────────┐    ┌─────────────────────┐
│   PostgreSQL│    │   MQTT Broker       │
│   (Neon)    │    │  (HiveMQ / EMQX)    │
│             │    │                     │
└─────────────┘    └─────────────────────┘
                        ↑
┌─────────────────────────────────────────────────────────┐
│ DISPOSITIVOS EN CAMPO                                  │
│ - ESP32 + Sensores                                     │
│ - Publican a MQTT: viaschoco/devices/{id}/readings    │
└─────────────────────────────────────────────────────────┘
```

---

## 1. Preparativos

### 1.1 Cuentas requeridas

- ✅ GitHub (para repositorio)
- ✅ Vercel (frontend)
- ✅ Railway o Render (backend)
- ✅ Neon (PostgreSQL)
- ✅ HiveMQ Cloud o EMQX (MQTT)

### 1.2 Variables de entorno

Necesitarás:

```env
# Backend variables
DATABASE_URL=postgresql://user:password@host/database
JWT_SECRET=tu-secret-muy-seguro-aleatorio
JWT_EXPIRATION=8h
ADMIN_EMAIL=admin@viaschoco.app
ADMIN_PASSWORD=ChangeThis123!
MQTT_BROKER_URL=mqtt://broker.mqtt.cool:1883
MQTT_USERNAME=optional
MQTT_PASSWORD=optional
PORT=3001
NODE_ENV=production

# Frontend variables (en Vercel)
VITE_API_BASE_URL=https://backend.vias-choco.app
VITE_SOCKET_URL=https://backend.vias-choco.app
```

---

## 2. Preparar base de datos (PostgreSQL - Neon)

### 2.1 Crear proyecto en Neon

1. Ir a [neon.tech](https://neon.tech)
2. Crear cuenta (gratis)
3. Crear nuevo proyecto
4. Copiar **Connection String** (CONNECTION_STRING)

### 2.2 Obtener DATABASE_URL

En Neon Dashboard:
```
Connection: postgresql://username:password@host.neon.tech/database?sslmode=require
```

Copiar como **DATABASE_URL**

### 2.3 Verificar conexión local

```bash
cd backend
DATABASE_URL="tu-connection-string" npx prisma db execute --stdin < <(echo "SELECT 1")
```

Si no da error: ✅ OK

---

## 3. Configurar MQTT Broker

### 3.1 Crear cuenta en HiveMQ Cloud

1. Ir a [console.hivemq.cloud](https://console.hivemq.cloud)
2. Crear cluster gratuito
3. Obtener:
   - **Broker URL**: `mqtt.broker-url.com:1883`
   - **Username**: `opcional`
   - **Password**: `opcional`

### 3.2 Alternativa: EMQX

1. Ir a [emqx.com](https://www.emqx.com)
2. Crear cuenta gratuita
3. Deployment incluye URL + credenciales

### 3.3 Variables MQTT

```env
MQTT_BROKER_URL=mqtt://broker.mqtt.cool:1883
MQTT_USERNAME=user
MQTT_PASSWORD=pass
```

---

## 4. Desplegar Backend (Railway)

### 4.1 Conectar GitHub a Railway

1. Ir a [railway.app](https://railway.app)
2. Login con GitHub
3. Importar proyecto: `https://github.com/tuusuario/vias-choco`
4. Seleccionar rama: `main`

### 4.2 Configurar variables

En Railway Dashboard → Project Settings:

```
DATABASE_URL=postgresql://...
JWT_SECRET=tu-secret-seguro
JWT_EXPIRATION=8h
ADMIN_EMAIL=admin@viaschoco.app
ADMIN_PASSWORD=ChangeThis123!
MQTT_BROKER_URL=mqtt://...
PORT=3001
NODE_ENV=production
```

### 4.3 Especificar carpeta del backend

En Railway:
- Base directory: `backend/`
- Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
- Start command: `npm start`

### 4.4 Deploy

```bash
# Railway auto-deploya al hacer push
git add .
git commit -m "Deploy v2.0"
git push origin main
```

Monitor en Railway Dashboard → View Logs

---

## 5. Ejecutar Migraciones (Primera vez)

### 5.1 Acceder al backend desplegado

Una vez que Railway esté corriendo:

```bash
# SSH a Railway (desde proyecto local)
railway shell
```

### 5.2 Ejecutar migraciones

```bash
npx prisma migrate deploy
# Output: ✓ Already applied X migrations
```

### 5.3 Ejecutar seed (si migras datos antiguos)

```bash
npm run seed

# Output:
# ✓ 15 usuarios importados
# ✓ 23 reportes importados
```

---

## 6. Desplegar Frontend (Vercel)

### 6.1 Conectar GitHub a Vercel

1. Ir a [vercel.com](https://vercel.com)
2. Login con GitHub
3. Import Project → Seleccionar repositorio

### 6.2 Configurar build

- **Framework**: Other (SPA manual)
- **Build Command**: `npm run build` (o no necesario si es SPA)
- **Output Directory**: `public/`
- **Install Command**: `npm install`

### 6.3 Variables de entorno

En Vercel Settings → Environment Variables:

```
VITE_API_BASE_URL=https://backend-railway-domain.railway.app
VITE_SOCKET_URL=https://backend-railway-domain.railway.app
```

### 6.4 Deploy

```bash
git push origin main
# Vercel auto-deploya

# Ver en: https://vias-choco.vercel.app
```

---

## 7. Configurar CORS en backend

Editar `backend/server.js`:

```javascript
const ALLOWED_ORIGINS = [
  "https://vias-choco.vercel.app",
  "http://localhost:3000"
];

app.use(cors({
  origin: ALLOWED_ORIGINS,
  credentials: true
}));
```

---

## 8. Verificar despliegue

### 8.1 Health check

```bash
curl https://backend-railway-domain.railway.app/api/health
```

Respuesta esperada:
```json
{"status":"ok","timestamp":"..."}
```

### 8.2 Verificar conectividad Socket.io

En consola del navegador (vercel app):
```javascript
const socket = io("https://backend-railway-domain.railway.app");
socket.on("connect", () => console.log("✅ Conectado"));
```

### 8.3 Probar dispositivo

Simular lectura de sensor:

```bash
curl -X POST https://backend-railway-domain.railway.app/api/devices/sensor/readings \
  -H "x-device-id: TEST-001" \
  -H "x-device-key: test-key-123" \
  -H "Content-Type: application/json" \
  -d '{"readings":[{"type":"TILT","value":25,"uuid":"001"}]}'
```

---

## 9. Certificado SSL (HTTPS)

### Railway
✅ Automático (incluido)

### Vercel
✅ Automático (incluido)

### MQTT (opcional)
Para producción, usar TLS:
```env
MQTT_BROKER_URL=mqtts://broker.mqtt.cool:8883
```

---

## 10. DNS y dominios

### 10.1 Dominio personalizado Vercel

1. En Vercel Dashboard → Settings → Domains
2. Agregar dominio: `vias-choco.app`
3. Configurar nameservers según instrucciones

### 10.2 Dominio personalizado Railway

1. En Railway → Settings → Domain
2. Agregar dominio: `api.vias-choco.app`
3. Configurar CNAME

---

## 11. Monitoreo en producción

### 11.1 Logs del backend (Railway)

```bash
railway logs
```

### 11.2 Dashboards

- Railway: https://railway.app/project/YOUR_PROJECT/deployments
- Vercel: https://vercel.com/dashboard
- Neon: https://console.neon.tech

### 11.3 Alertas (opcional)

Configurar en Railway para notificaciones de errores.

---

## 12. Actualizaciones continuas

### 12.1 Actualizar backend

```bash
# Hacer cambios localmente
git add .
git commit -m "Fix: descripción"

# Railway auto-deploy
git push origin main
```

### 12.2 Correr migraciones nuevas

```bash
# Railway shell
railway shell
npx prisma migrate deploy
```

### 12.3 Rollback en caso de error

```bash
# Railway → View Deployments → Redeploy previous
```

---

## Troubleshooting

### "Database connection failed"
1. Verificar DATABASE_URL en variables
2. Verificar que Neon está activo
3. Validar IP allowlist en Neon

### "MQTT connection refused"
1. Verificar MQTT_BROKER_URL es correcto
2. Revisar credenciales (usuario/password)
3. Probar en HiveMQ console

### "CORS error desde frontend"
1. Agregar dominio Vercel a ALLOWED_ORIGINS
2. Verificar VITE_API_BASE_URL es correcto
3. Reiniciar deployments

### "JWT token invalid"
1. Usar mismo JWT_SECRET en todos los deploys
2. Verificar expiración (JWT_EXPIRATION)
3. Regenerar tokens después de cambiar secret

---

## Checklist de despliegue

- [ ] Base de datos PostgreSQL (Neon) creada
- [ ] Connection string validada localmente
- [ ] MQTT broker configurado
- [ ] Backend push a GitHub main branch
- [ ] Railway deployment completado
- [ ] Migraciones ejecutadas (npx prisma migrate deploy)
- [ ] Seed de datos ejecutado (npm run seed)
- [ ] Frontend push a GitHub main branch
- [ ] Vercel deployment completado
- [ ] Variables de entorno configuradas
- [ ] CORS configurado correctamente
- [ ] Health check API responde ✅
- [ ] Socket.io conecta desde frontend ✅
- [ ] Dispositivo puede enviar datos ✅
- [ ] Alertas se disparan correctamente ✅

---

## Después del despliegue

1. **Crear admin en producción:**
   ```bash
   curl -X POST https://backend.vias-choco.app/api/auth/seed-admin
   ```

2. **Cambiar contraseña admin:**
   - Login en https://vias-choco.vercel.app
   - Cambiar password en profile

3. **Registrar primer dispositivo:**
   - Como admin
   - Dashboard → Devices → Add
   - Obtener y guardar API key

4. **Comunicar a campo:**
   - Compartir documento [SENSOR_SETUP_GUIDE.md](SENSOR_SETUP_GUIDE.md)
   - Proporcionar credenciales del dispositivo

---

**Última actualización:** 2026-07-09
**Versión:** 2.0 Deploy
