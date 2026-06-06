const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'database.json');
let database = null;

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function createDefaultData() {
  return {
    reports: [
      {
        id: 1,
        title: 'Vía Quibdó - Medellín',
        message: 'Estado regular debido a lluvias',
        user: 'usuario1',
        location: 'Km 45',
        status: 'Regular',
        time: new Date().toISOString(),
        approved: false,
        geocoded: false
      }
    ],
    users: [
      { name: 'usuario1', email: 'usuario1@example.com', password: 'pass', role: 'user', blocked: false },
      { name: 'admin', email: 'alexandermaturana76.admin@gmail.com', password: '3145312045La', role: 'admin', blocked: false }
    ],
    alerts: [],
    geosentinels: [],
    weather: {}
  };
}

function hashPasswordIfNeeded(user) {
  if (!user.password || typeof user.password !== 'string') {
    return user;
  }

  if (user.password.startsWith('$2a$') || user.password.startsWith('$2b$') || user.password.startsWith('$2y$')) {
    return user;
  }

  return {
    ...user,
    password: bcrypt.hashSync(user.password, 10)
  };
}

function load() {
  ensureDataDir();

  if (!fs.existsSync(DATA_FILE)) {
    database = createDefaultData();
    database.users = database.users.map(hashPasswordIfNeeded);
    save();
    return;
  }

  const fileContent = fs.readFileSync(DATA_FILE, 'utf8');
  try {
    database = JSON.parse(fileContent);
  } catch (error) {
    console.warn('Error parsing database.json, restaurando datos predeterminados:', error.message);
    database = createDefaultData();
  }

  if (!Array.isArray(database.reports)) database.reports = [];
  if (!Array.isArray(database.users)) database.users = [];
  if (!Array.isArray(database.alerts)) database.alerts = [];
  if (!Array.isArray(database.geosentinels)) database.geosentinels = [];
  if (typeof database.weather !== 'object' || database.weather === null) database.weather = {};

  database.users = database.users.map(hashPasswordIfNeeded);
  save();
}

function save() {
  if (!database) {
    load();
  }
  fs.writeFileSync(DATA_FILE, JSON.stringify(database, null, 2));
}

function getReports() {
  if (!database) load();
  return database.reports;
}

function getUsers() {
  if (!database) load();
  return database.users;
}

function getAlerts() {
  if (!database) load();
  return database.alerts;
}

function getGeosentinels() {
  if (!database) load();
  return database.geosentinels;
}

function getWeather() {
  if (!database) load();
  return database.weather;
}

module.exports = {
  load,
  save,
  getReports,
  getUsers,
  getAlerts,
  getGeosentinels,
  getWeather,
};
