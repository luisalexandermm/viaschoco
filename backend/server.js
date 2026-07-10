require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const mqtt = require('mqtt');
const prisma = require('./services/prismaClient');

const authRoutes = require('./routes/auth');
const usersRoutes = require('./routes/users');
const reportsRoutes = require('./routes/reports');
const devicesRoutes = require('./routes/devices');
const adminDevicesRoutes = require('./routes/admin/devices');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Store io instance in app for routes
app.set('io', io);

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Ruta raíz para servir index.html (SPA)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Rutas API
app.use('/api/auth', authRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/devices/sensor', devicesRoutes);
app.use('/api/admin/devices', adminDevicesRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), database: 'postgres' });
});

// MQTT Client (conecta si está disponible)
let mqttClient = null;
if (process.env.MQTT_BROKER_URL) {
  try {
    mqttClient = mqtt.connect(process.env.MQTT_BROKER_URL, {
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
      reconnectPeriod: 5000
    });

    mqttClient.on('connect', () => {
      console.log('✓ Conectado a MQTT broker');
      const topicPrefix = process.env.MQTT_TOPIC_PREFIX || 'viaschoco/';
      mqttClient.subscribe(`${topicPrefix}devices/+/readings`, (err) => {
        if (!err) console.log(`✓ Suscrito a ${topicPrefix}devices/+/readings`);
      });
    });

    mqttClient.on('message', async (topic, message) => {
      try {
        const data = JSON.parse(message.toString());
        const topicParts = topic.split('/');
        const deviceId = topicParts[2];

        if (data.readings && Array.isArray(data.readings)) {
          const { storeSensorReading } = require('./services/sensorReadings');
          const { createAlertIfNeeded } = require('./services/alertEngine');

          for (const reading of data.readings) {
            await storeSensorReading({
              deviceId,
              measurementType: reading.type || reading.measurementType,
              value: reading.value,
              unit: reading.unit,
              readingUuid: reading.uuid
            });
          }

          const device = await prisma.device.findUnique({
            where: { deviceId }
          });

          if (device) {
            await createAlertIfNeeded(device.id, io);
            io.emit('sensor:reading', { deviceId, readings: data.readings, timestamp: new Date() });
          }
        }
      } catch (error) {
        console.error('Error procesando mensaje MQTT:', error.message);
      }
    });

    mqttClient.on('error', (err) => {
      console.warn('⚠ Error MQTT:', err.message);
    });
  } catch (error) {
    console.warn('⚠ MQTT no configurado:', error.message);
  }
}

// Socket.IO - Conexiones en tiempo real
io.on('connection', (socket) => {
  console.log(`✅ Cliente frontend conectado: ${socket.id}`);

  socket.on('subscribe:alerts', async () => {
    const { getActiveAlerts } = require('./services/alertEngine');
    const alerts = await getActiveAlerts();
    socket.emit('alerts:all', alerts);
  });

  socket.on('subscribe:devices', async () => {
    const devices = await prisma.device.findMany();
    socket.emit('devices:all', devices);
  });

  socket.on('subscribe:readings', async () => {
    const readings = await prisma.sensorReading.findMany({
      orderBy: { timestamp: 'desc' },
      take: 100
    });
    socket.emit('readings:latest', readings);
  });

  socket.on('disconnect', () => {
    console.log(`❌ Cliente desconectado: ${socket.id}`);
  });
});

// Fallback para SPA
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint no encontrado' });
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Inicializar base de datos (crear tablas si no existen)
async function initializeDatabase() {
  try {
    console.log('🔧 Inicializando base de datos con Prisma...');
    // Prisma maneja las migraciones automáticamente
    const userCount = await prisma.user.count();
    console.log(`✓ Conexión a base de datos OK (${userCount} usuarios)`);
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error.message);
    process.exit(1);
  }
}

// Iniciar servidor
async function startServer() {
  await initializeDatabase();

  server.listen(PORT, () => {
    console.log(`\n${'='.repeat(60)}`);
    console.log(`🚀 Servidor Vías del Chocó iniciado`);
    console.log(`🌐 Puerto: ${PORT}`);
    console.log(`📡 WebSocket (Socket.io): ACTIVO`);
    console.log(`💾 Base de datos: PostgreSQL (Prisma)`);
    if (mqttClient) {
      console.log(`📨 MQTT: CONECTADO`);
    }
    console.log(`${'='.repeat(60)}\n`);
  });
}

startServer();

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Apagando servidor...');
  if (mqttClient) {
    mqttClient.end();
  }
  await prisma.$disconnect();
  process.exit(0);
});