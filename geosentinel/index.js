/**
 * 📡 GEOSENTINEL - Sistema de Monitoreo de Deslizamientos
 * Punto de entrada principal
 */

const sensors = require('./sensors');
const alerts = require('./alerts');
const weather = require('./weather');
const routes = require('./routes');
const simulator = require('./simulator');

module.exports = {
  sensors,
  alerts,
  weather,
  routes,
  simulator
};
