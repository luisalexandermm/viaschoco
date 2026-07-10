# ✅ PRE-DEPLOYMENT CHECKLIST

Use esta lista antes de desplegar a producción.

---

## Fase 1: Validación Local

### Backend setup
- [ ] `cd backend && npm install` sin errores
- [ ] `npx prisma generate` sin errores
- [ ] Base de datos SQLite inicializada
- [ ] `npx prisma migrate deploy` exitoso
- [ ] `npm run dev` inicia correctamente
- [ ] Servidor escucha en puerto 3001

### Verificar endpoints básicos
- [ ] `curl http://localhost:3001/api/health` responde OK
- [ ] `curl -X POST http://localhost:3001/api/auth/seed-admin` crea admin
- [ ] `curl -X POST http://localhost:3001/api/auth/login` con admin retorna JWT
- [ ] `curl -H "Authorization: Bearer TOKEN" http://localhost:3001/api/auth/me` responde user data

### Verificar dispositivos
- [ ] Admin puede registrar dispositivo: `POST /api/admin/devices`
- [ ] API key se genera correctamente
- [ ] Dispositivo puede enviar lecturas: `POST /api/devices/sensor/readings`
- [ ] Alertas se disparan cuando riesgo > 70%

### Verificar Socket.io
- [ ] Cliente Socket.io puede conectar
- [ ] Eventos de alerta se reciben en tiempo real
- [ ] No hay errores CORS en console

---

## Fase 2: Revisión de código

### Backend files
- [ ] `backend/server.js` - No tiene referencias a Firebase/Mongo/geosentinel
- [ ] `backend/package.json` - No incluye firebase-admin, mongodb, mongoose
- [ ] `backend/.env.example` - Tiene todas las vars nuevas (DATABASE_URL, JWT_SECRET, etc)
- [ ] `backend/prisma/schema.prisma` - 6 modelos, relaciones correctas
- [ ] Todos los services en `backend/services/` están completos
- [ ] Todos los routes en `backend/routes/` están completos

### Frontend files
- [ ] `public/js/main.js` - Usa VITE_API_BASE_URL variable
- [ ] Socket.io conecta a nuevo backend (no localhost)
- [ ] No hay referencias a geosentinel simulator
- [ ] No hay referencias a Firebase

### Config files
- [ ] `.gitignore` incluye sección "DEPRECATED"
- [ ] `.env.example` (root) actualizado si existe
- [ ] `package.json` (root) actualizado

---

## Fase 3: Limpieza

### Eliminar archivos obsoletos
- [ ] ❌ `firebase.json`
- [ ] ❌ `firestore.rules`
- [ ] ❌ `firestore.indexes.json`
- [ ] ❌ `cloudbuild.yaml`
- [ ] ❌ `deploy.sh`
- [ ] ❌ `test-alerts.js`
- [ ] ❌ `backend/db.js`
- [ ] ❌ `backend/models/User.js`
- [ ] ❌ `backend/models/Report.js`
- [ ] ❌ `backend/migrate-to-firestore.js`
- [ ] ❌ `backend/migrate-to-mongo.js`
- [ ] ❌ `backend/mongo-test.js`
- [ ] ❌ `geosentinel/simulator.js`

### Remover dependencias obsoletas
```bash
cd backend
npm uninstall firebase-admin mongodb mongoose
npm install
```
- [ ] Backend `npm install` sin warnings
- [ ] No aparecen firebase-admin, mongodb, mongoose en `npm list`

---

## Fase 4: Documentación

### Archivos creados (verificar existencia)
- [ ] ✅ `ARCHITECTURE.md` (3000+ líneas)
- [ ] ✅ `DEPLOYMENT.md`
- [ ] ✅ `TESTING_GUIDE.md`
- [ ] ✅ `SENSOR_SETUP_GUIDE.md`
- [ ] ✅ `CLEANUP_CHECKLIST.md`
- [ ] ✅ `IMPLEMENTATION_SUMMARY.md`
- [ ] ✅ `PROJECT_STATUS.md`

### Archivos actualizados
- [ ] ✅ `README.md` - Stack v2.0 documentado
- [ ] ✅ `backend/package.json` - Scripts actualizados
- [ ] ✅ `.gitignore` - Incluye deprecated files

---

## Fase 5: Configuración de Producción

### Antes de desplegar
- [ ] Generar `JWT_SECRET` nuevo (no usar "test")
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```
- [ ] Cambiar `ADMIN_PASSWORD` de default
- [ ] Tener `DATABASE_URL` de Neon lista
- [ ] Tener credenciales MQTT disponibles
- [ ] Verificar que dominios están reservados

### En Railway (backend)
- [ ] Base directory: `backend/`
- [ ] Build command: `npm install && npx prisma generate && npx prisma migrate deploy`
- [ ] Start command: `npm start`
- [ ] Variables de entorno configuradas:
  - [ ] DATABASE_URL
  - [ ] JWT_SECRET
  - [ ] JWT_EXPIRATION
  - [ ] ADMIN_EMAIL
  - [ ] ADMIN_PASSWORD
  - [ ] MQTT_BROKER_URL
  - [ ] PORT=3001
  - [ ] NODE_ENV=production

### En Vercel (frontend)
- [ ] Proyecto conectado a GitHub
- [ ] Build command configurado
- [ ] Output directory: `public/`
- [ ] Variables de entorno:
  - [ ] VITE_API_BASE_URL=https://backend.vias-choco.app
  - [ ] VITE_SOCKET_URL=https://backend.vias-choco.app

### En Neon (BD)
- [ ] Proyecto creado
- [ ] Connection string copiada
- [ ] IP allowlist configurado (si necesario)

### En HiveMQ/EMQX (MQTT)
- [ ] Broker creado
- [ ] Credenciales generadas
- [ ] URL y puerto obtenidos

---

## Fase 6: Despliegue

### Backend (Railway)
- [ ] Push a main: `git push origin main`
- [ ] Railway detecta cambios
- [ ] Build inicia automáticamente
- [ ] Deploy completado (ver Logs)
- [ ] Health check: `curl https://backend.vias-choco.railway.app/api/health`

### Frontend (Vercel)
- [ ] Push a main: `git push origin main`
- [ ] Vercel detecta cambios
- [ ] Build inicia automáticamente
- [ ] Deploy completado (ver Deployments)
- [ ] Accesible en https://vias-choco.vercel.app

### Post-deploy
- [ ] Crear admin en producción: `POST /api/auth/seed-admin`
- [ ] Login funciona en producción
- [ ] Registrar dispositivo test
- [ ] Enviar lecturas test
- [ ] Ver en mapa web
- [ ] Socket.io recibe eventos

---

## Fase 7: Validación End-to-End

### API testing
```bash
# Health
curl https://backend.vias-choco.railway.app/api/health

# Login
TOKEN=$(curl -s -X POST https://backend.vias-choco.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@...","password":"..."}' | jq -r .token)

# Get user
curl -H "Authorization: Bearer $TOKEN" \
  https://backend.vias-choco.railway.app/api/auth/me

# Register device
curl -X POST https://backend.vias-choco.railway.app/api/admin/devices \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"deviceId":"TEST-001","name":"Test","latitude":5.85,"longitude":-75.65}'
```
- [ ] Todos los endpoints responden correctamente
- [ ] No hay errores 500
- [ ] JWT funciona correctamente

### Frontend testing
- [ ] Página carga sin errores
- [ ] Mapa visible
- [ ] Reportes visible
- [ ] Dashboard visible
- [ ] Socket.io conecta (ver network)
- [ ] Alertas llegan en tiempo real

### Device testing
- [ ] Sensor puede conectar a MQTT
- [ ] Sensor puede enviar lecturas
- [ ] Lecturas aparecen en API
- [ ] Alertas se disparan en frontend

---

## Fase 8: Monitoreo

### Logs y alertas
- [ ] Railway logs monitoreados (sin errores críticos)
- [ ] Vercel logs monitoreados
- [ ] Neon logs monitoreados
- [ ] Alertas configuradas para Railway

### Backups
- [ ] Base de datos Neon tiene backup automático
- [ ] Considerado backup manual si necesario

### Performance
- [ ] API responde < 200ms
- [ ] Frontend carga < 3s
- [ ] Socket.io latencia aceptable

---

## Fase 9: Documentación post-deploy

### Comunicar cambios
- [ ] README.md actualizado con URLs de producción
- [ ] Equipo notificado del nuevo backend
- [ ] Operadores capacitados con SENSOR_SETUP_GUIDE.md
- [ ] Admin credentials guardadas securely

### Actualizar referencias
- [ ] URLs hardcoded actualizadas si existen
- [ ] Endpoints antiguos documentados como deprecated
- [ ] Contactos de soporte disponibles

---

## Signoff

**Completado por:** ________________________  
**Fecha:** ________________________  
**Observaciones:** ________________________

```
╔═══════════════════════════════════════════════════════════════╗
║  Si todos los items están marcados ✓                         ║
║  EL PROYECTO ESTÁ LISTO PARA PRODUCCIÓN 🚀                  ║
╚═══════════════════════════════════════════════════════════════╝
```

---

**Última actualización:** 2026-07-09  
**Versión:** Pre-Deployment v2.0
