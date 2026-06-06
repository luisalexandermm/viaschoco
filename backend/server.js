require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Importar módulo geosentinel
const geosentinel = require('../geosentinel');

let db = null;
let admin = null;
let mongoose = null;
let useMongo = false;
const localDb = require('./db');

// Inicializar Firebase Admin (completamente opcional)
try {
  const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json');
  if (fs.existsSync(serviceAccountPath)) {
    // Solo si el archivo existe, intentar cargar firebase-admin
    try {
      admin = require('firebase-admin');
      const serviceAccount = require(serviceAccountPath);
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
      db = admin.firestore();
      console.log('✓ Firebase Admin inicializado con serviceAccountKey.json');
    } catch (firebaseErr) {
      console.warn('⚠ Firebase Admin no se pudo inicializar:', firebaseErr.message);
    }
  } else {
    console.log('ℹ Firebase Admin no configurado. Usando base de datos local.');
  }
} catch (err) {
  console.warn('⚠ Error al verificar Firebase:', err.message);
}

// Conectar a MongoDB Atlas si MONGODB_URI está presente
try {
  const MONGODB_URI = process.env.MONGODB_URI;
  if (MONGODB_URI) {
    mongoose = require('mongoose');
    mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
      console.log('✓ Conectado a MongoDB');
    }).catch(err => {
      console.warn('⚠ No se pudo conectar a MongoDB:', err.message);
    });
    useMongo = true;
  }
} catch (err) {
  console.warn('⚠ Error al inicializar Mongoose:', err.message);
}

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

// Servir archivos estáticos (frontend)
app.use(express.static(path.join(__dirname, '../public')));

// Ruta raíz para servir index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

localDb.load();

// Datos simulados persistentes
let reports = localDb.getReports();
let users = localDb.getUsers();
let nextReportId = reports.reduce((maxId, report) => Math.max(maxId, report.id || 0), 0) + 1;

async function getFirestoreReports() {
  if (useMongo) {
    const Report = require('./models/Report');
    const docs = await Report.find().sort({ createdAt: -1 }).lean();
    return docs.map(d => ({ _docId: d._id, id: d.id, ...d }));
  }
  if (!db) return reports;
  const snapshot = await db.collection('reports').orderBy('createdAt', 'desc').get();
  return snapshot.docs.map(doc => {
    const data = doc.data();
    return { _docId: doc.id, id: data.id || Number(doc.id) || null, ...data };
  });
}

async function findFirestoreReportById(id) {
  if (useMongo) {
    const Report = require('./models/Report');
    const doc = await Report.findOne({ id: Number(id) }).lean();
    if (!doc) return null;
    return { _docId: doc._id, id: doc.id, ...doc };
  }
  if (!db) return reports.find(r => Number(r.id) === Number(id));
  const snapshot = await db.collection('reports').where('id', '==', Number(id)).limit(1).get();
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  const data = doc.data();
  return { _docId: doc.id, id: data.id || Number(id), ...data };
}

async function getFirestoreUsers() {
  if (useMongo) {
    const User = require('./models/User');
    const docs = await User.find().lean();
    return docs.map(d => {
      const { password, ...safeUser } = d;
      return { _docId: d._id, ...safeUser };
    });
  }
  if (!db) return users;
  const snapshot = await db.collection('users').get();
  return snapshot.docs.map(doc => {
    const data = doc.data();
    const { password, ...safeUser } = data;
    return { _docId: doc.id, ...safeUser };
  });
}

async function findFirestoreUserByName(name) {
  if (useMongo) {
    const User = require('./models/User');
    const doc = await User.findOne({ name }).lean();
    if (!doc) return null;
    return { _docId: doc._id, ...doc };
  }
  if (!db) return users.find(u => u.name === name);
  const snapshot = await db.collection('users').where('name', '==', name).limit(1).get();
  if (snapshot.empty) return null;
  const data = snapshot.docs[0].data();
  return { _docId: snapshot.docs[0].id, ...data };
}

async function findFirestoreUserByEmail(email) {
  if (useMongo) {
    const User = require('./models/User');
    const doc = await User.findOne({ email }).lean();
    if (!doc) return null;
    return { _docId: doc._id, ...doc };
  }
  if (!db) return users.find(u => u.email === email);
  const snapshot = await db.collection('users').where('email', '==', email).limit(1).get();
  if (snapshot.empty) return null;
  const data = snapshot.docs[0].data();
  return { _docId: snapshot.docs[0].id, ...data };
}

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

// Middleware de autenticación
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado, token requerido' });
  }

  jwt.verify(token, 'secret_key', (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

//  Rutas

// Obtener reportes
app.get('/api/reports', async (req, res) => {
  try {
    const data = await getFirestoreReports();
    res.json(data);
  } catch (error) {
    console.error('Error obteniendo reportes:', error);
    res.status(500).json({ error: 'Error interno al obtener reportes' });
  }
});

// Crear reporte
app.post('/api/reports', validateReport, async (req, res) => {
  const newReport = {
    id: nextReportId++,
    title: req.body.title,
    message: req.body.message,
    user: req.body.user,
    location: req.body.location || "",
    status: req.body.status || "Pendiente",
    time: new Date().toISOString(),
    createdAt: useMongo ? new Date() : (admin ? admin.firestore.FieldValue.serverTimestamp() : new Date().toISOString()),
    approved: false,
    geocoded: false
  };

  if (db) {
    try {
      const docRef = await db.collection('reports').add(newReport);
      res.status(201).json({ _docId: docRef.id, ...newReport });
    } catch (error) {
      console.error('Error guardando reporte en Firestore:', error);
      res.status(500).json({ error: 'No se pudo guardar el reporte' });
    }
    return;
  }

  if (useMongo) {
    try {
      const Report = require('./models/Report');
      const created = await Report.create(newReport);
      res.status(201).json({ _docId: created._id, ...newReport });
      return;
    } catch (error) {
      console.error('Error guardando reporte en MongoDB:', error);
      return res.status(500).json({ error: 'No se pudo guardar el reporte' });
    }
  }

  reports.push(newReport);
  localDb.save();
  res.status(201).json(newReport);
});

// Actualizar reporte
app.put('/api/reports/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (db) {
    try {
      const existing = await findFirestoreReportById(id);
      if (!existing) {
        return res.status(404).json({ error: 'Report not found' });
      }
      await db.collection('reports').doc(existing._docId).update(req.body);
      const updated = await findFirestoreReportById(id);
      return res.json(updated);
    } catch (error) {
      console.error('Error actualizando reporte en Firestore:', error);
      return res.status(500).json({ error: 'No se pudo actualizar el reporte' });
    }
  }

  if (useMongo) {
    try {
      const Report = require('./models/Report');
      const updated = await Report.findOneAndUpdate({ id: Number(id) }, req.body, { new: true }).lean();
      if (!updated) return res.status(404).json({ error: 'Report not found' });
      return res.json({ _docId: updated._id, ...updated });
    } catch (error) {
      console.error('Error actualizando reporte en MongoDB:', error);
      return res.status(500).json({ error: 'No se pudo actualizar el reporte' });
    }
  }

  const report = reports.find(r => r.id === id);
  if (!report) {
    return res.status(404).json({ error: 'Report not found' });
  }

  Object.assign(report, req.body);
  localDb.save();
  res.json(report);
});

// Eliminar reporte
app.delete('/api/reports/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (db) {
    try {
      const existing = await findFirestoreReportById(id);
      if (!existing) {
        return res.status(404).json({ error: 'Report not found' });
      }
      await db.collection('reports').doc(existing._docId).delete();
      return res.json({ success: true });
    } catch (error) {
      console.error('Error eliminando reporte en Firestore:', error);
      return res.status(500).json({ error: 'No se pudo eliminar el reporte' });
    }
  }

  if (useMongo) {
    try {
      const Report = require('./models/Report');
      const deleted = await Report.findOneAndDelete({ id: Number(id) });
      if (!deleted) return res.status(404).json({ error: 'Report not found' });
      return res.json({ success: true });
    } catch (error) {
      console.error('Error eliminando reporte en MongoDB:', error);
      return res.status(500).json({ error: 'No se pudo eliminar el reporte' });
    }
  }

  const exists = reports.some(r => r.id === id);
  if (!exists) {
    return res.status(404).json({ error: 'Report not found' });
  }

  reports = reports.filter(r => r.id !== id);
  localDb.save();
  res.json({ success: true });
});

// Usuarios
app.get('/api/users', async (req, res) => {
  try {
    const allUsers = await getFirestoreUsers();
    res.json(allUsers.map(({ password, ...safeUser }) => safeUser));
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error interno al obtener usuarios' });
  }
});

// Actualizar usuario
app.put('/api/users/:name', async (req, res) => {
  const name = req.params.name;

  if (db) {
    try {
      const user = await findFirestoreUserByName(name);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      await db.collection('users').doc(user._docId).update(req.body);
      const updatedDoc = await db.collection('users').doc(user._docId).get();
      const updated = updatedDoc.data();
      const { password, ...safeUser } = updated;
      return res.json(safeUser);
    } catch (error) {
      console.error('Error actualizando usuario en Firestore:', error);
      return res.status(500).json({ error: 'No se pudo actualizar el usuario' });
    }
  }

  if (useMongo) {
    try {
      const User = require('./models/User');
      const updated = await User.findOneAndUpdate({ name }, req.body, { new: true }).lean();
      if (!updated) return res.status(404).json({ error: 'User not found' });
      const { password, ...safeUser } = updated;
      return res.json(safeUser);
    } catch (error) {
      console.error('Error actualizando usuario en MongoDB:', error);
      return res.status(500).json({ error: 'No se pudo actualizar el usuario' });
    }
  }

  const user = users.find(u => u.name === name);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  Object.assign(user, req.body);
  localDb.save();
  const { password, ...safeUser } = user;
  res.json(safeUser);
});

// Login
app.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    if (useMongo) {
      const User = require('./models/User');
      const userDoc = await User.findOne({ email }).lean();
      if (userDoc && await bcrypt.compare(password, userDoc.password)) {
        res.json({ exists: true, role: userDoc.role, name: userDoc.name });
      } else {
        res.json({ exists: false });
      }
    } else if (db) {
      // Usar Firebase Firestore
      const userSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
      if (!userSnapshot.empty) {
        const userDoc = userSnapshot.docs[0];
        const user = userDoc.data();
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (isValidPassword) {
          res.json({ exists: true, role: user.role, name: user.name });
        } else {
          res.json({ exists: false });
        }
      } else {
        res.json({ exists: false });
      }
    } else {
      const user = users.find(u => u.email === email);
      if (user && await bcrypt.compare(password, user.password)) {
        res.json({ exists: true, role: user.role, name: user.name });
      } else {
        res.json({ exists: false });
      }
    }
  } catch (error) {
    console.error('Error verifying user:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Registro
app.post('/api/users', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (useMongo) {
      const User = require('./models/User');
      const existing = await User.findOne({ email }).lean();
      if (existing) {
        return res.status(400).json({ error: 'Usuario ya existe' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      await User.create({ name, email, password: hashedPassword, role: 'user', blocked: false });
      return res.json({ success: true });
    } else if (db) {
      // Usar Firebase Firestore
      const existingSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
      if (!existingSnapshot.empty) {
        res.status(400).json({ error: 'Usuario ya existe' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.collection('users').add({
          name,
          email,
          password: hashedPassword,
          role: 'user',
          blocked: false
        });
        res.json({ success: true });
      }
    } else {
      // Usar array local de usuarios
      const existing = users.find(u => u.email === email);
      if (existing) {
        res.status(400).json({ error: 'Usuario ya existe' });
      } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        users.push({ name, email, password: hashedPassword, role: 'user', blocked: false });
        localDb.save();
        res.json({ success: true });
      }
    }
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Weather API
app.get('/api/weather', async (req, res) => {
  try {
    const weather = await geosentinel.weather.getRouteWeather();
    res.json(weather);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo clima' });
  }
});

// Ruta para login con JWT
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    let user = null;

    if (useMongo) {
      const User = require('./models/User');
      user = await User.findOne({ email }).lean();
    } else if (db) {
      const userSnapshot = await db.collection('users').where('email', '==', email).limit(1).get();
      if (!userSnapshot.empty) {
        user = userSnapshot.docs[0].data();
      }
    } else {
      user = users.find((u) => u.email === email);
    }

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ email: user.email, role: user.role, name: user.name }, 'secret_key', { expiresIn: '1h' });
    res.json({ message: 'Login exitoso', token, name: user.name, role: user.role });
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});

// Ejemplo de ruta protegida
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'Acceso autorizado', user: req.user });
});

// Fallback para SPA preview local
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Endpoint no encontrado' });
  }
  res.sendFile(path.join(__dirname, '../public/index.html'));
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