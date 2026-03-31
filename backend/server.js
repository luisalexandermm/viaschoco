const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

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
  { name: "usuario1", role: "user", blocked: false },
  { name: "admin", role: "admin", blocked: false }
];

// ID incremental seguro
let nextReportId = 2;

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

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

//  Middleware global de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: 'Error interno del servidor'
  });
});

//  Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});