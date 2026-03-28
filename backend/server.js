const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Datos simulados (en producción, usar una base de datos)
let reports = [
  {
    id: 1,
    title: "Vía Quibdó - Medellín",
    message: "Estado regular debido a lluvias",
    user: "usuario1",
    location: "Km 45",
    status: "Regular",
    time: "Hace 2 horas",
    approved: false,
    geocoded: false
  }
];

let users = [
  { name: "usuario1", role: "user", blocked: false },
  { name: "admin", role: "admin", blocked: false }
];

// Rutas
app.get('/api/reports', (req, res) => {
  res.json(reports);
});

app.get('/api/users', (req, res) => {
  res.json(users);
});

app.post('/api/reports', (req, res) => {
  const newReport = {
    id: Math.max(...reports.map(r => r.id), 0) + 1,
    ...req.body,
    time: new Date().toLocaleString('es-CO'),
    approved: false
  };
  reports.push(newReport);
  res.json(newReport);
});

app.put('/api/reports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = reports.findIndex(r => r.id === id);
  if (index !== -1) {
    reports[index] = { ...reports[index], ...req.body };
    res.json(reports[index]);
  } else {
    res.status(404).json({ error: 'Report not found' });
  }
});

app.delete('/api/reports/:id', (req, res) => {
  const id = parseInt(req.params.id);
  reports = reports.filter(r => r.id !== id);
  res.json({ success: true });
});

app.put('/api/users/:name', (req, res) => {
  const name = req.params.name;
  const index = users.findIndex(u => u.name === name);
  if (index !== -1) {
    users[index] = { ...users[index], ...req.body };
    res.json(users[index]);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});