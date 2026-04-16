const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

// Importar módulo geosentinel
const geosentinel = require('../geosentinel');

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '../frontend')));

// Ruta raíz para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Datos simulados
let reports = [
  {
    id: 1,
    title: "Vía Quibdó - Medellín",
    message: "Estado regular debido a lluvias",
    user: "usuario1",
    location: "Km 45",
    status: "Regular",
    time: new Date().toISOString(),
    approved: false,
    geocoded: false
  }
];

let users = [
  { name: "usuario1", email: "usuario1@example.com", password: "pass", role: "user", blocked: false },
  { name: "admin", email: "alrxandermarturana76.admin@gmail.com", password: "3145312045La", role: "admin", blocked: false }
];

// ID incremental seguro
let nextReportId = 2;

// ==================== REGISTRAR RUTAS GEOSENTINEL ====================
geosentinel.routes(app, io);

// 🔎 Middleware de validación
function validateReport(req, res, next) {
  const { title, message, user } = req.body;

  if (!title || !message || !user) {
    return res.status(400).json({
      error: "Faltan campos obligatorios: title, message, user"
    });
  }

  next();
}

//  Rutas

// Obtener reportes
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

// Crear reporte
app.post('/api/reports', validateReport, (req, res) => {
  const newReport = {
    id: nextReportId++,
    title: req.body.title,
    message: req.body.message,
    user: req.body.user,
    location: req.body.location || "",
    status: req.body.status || "Pendiente",
    time: new Date().toISOString(),
    approved: false,
    geocoded: false
  };

  reports.push(newReport);
  res.status(201).json(newReport);
});

// Actualizar reporte
app.put('/api/reports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const report = reports.find(r => r.id === id);

  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  Object.assign(report, req.body);
  res.json(report);
});

// Eliminar reporte
app.delete('/api/reports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const exists = reports.some(r => r.id === id);

  if (!exists) {
    return res.status(404).json({ error: 'Report not found' });
  }

  reports = reports.filter(r => r.id !== id);
  res.json({ success: true });
});

// Usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

// Actualizar usuario
app.put('/api/users/:name', (req, res) => {
  const name = req.params.name;
  const user = users.find(u => u.name === name);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  Object.assign(user, req.body);
  res.json(user);
});

// Login
app.post('/api/users', (req, res) => {
  const { email, password, googleAuth } = req.body;
  if (googleAuth) {
    const user = users.find(u => u.email === email);
    if (user) {
      res.json({ exists: true, role: user.role, name: user.name });
    } else {
      res.json({ exists: false });
    }
  } else {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      res.json({ exists: true, role: user.role, name: user.name });
    } else {
      res.json({ exists: false });
    }
  }
});

// Registro
app.put('/api/users', (req, res) => {
  const { name, email, password, googleAuth } = req.body;
  const existing = users.find(u => u.email === email);
  if (existing) {
    res.status(400).json({ error: 'Usuario ya existe' });
  } else {
    users.push({ name, email, password: googleAuth ? null : password, role: 'user', blocked: false });
    res.json({ success: true });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// ==================== SOCKET.IO - CONEXIONES EN TIEMPO REAL ====================

io.on('connection', (socket) => {
  console.log(`✅ Cliente conectado: ${socket.id}`);
  
  // Enviar estado actual de geosentinels
  socket.emit('geosentinels:all', geosentinel.sensors.getAllSensors());
  socket.emit('alerts:all', geosentinel.alerts.getAllAlerts());
  socket.emit('weather:current', geosentinel.weather.getWeather());
  
  socket.on('disconnect', () => {
    console.log(`❌ Cliente desconectado: ${socket.id}`);
  });
});

// ==================== SIMULACIÓN DE SENSORES ====================

// Iniciar simulación de sensores geosentinel
const sensorInterval = geosentinel.simulator.startSensorSimulation(io, 5000);
const weatherInterval = geosentinel.simulator.startWeatherSimulation(io, 10000);
const alertInterval = geosentinel.simulator.startAlertCleanup(3600000); // 1 hora

// Iniciar servidor
server.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
  console.log(`📡 WebSocket (Socket.io) activo`);
  console.log(`📍 Geosentinels inicializados: ${geosentinel.sensors.getAllSensors().length}`);
});