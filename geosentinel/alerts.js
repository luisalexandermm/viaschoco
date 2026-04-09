/**
  ALERTAS DE DESLIZAMIENTOS
 * Gestiona creación, resolución y estado de alertas
 */

let landslideAlerts = [];
let nextAlertId = 1;

/**
 * Obtener todas las alertas
 */
function getAllAlerts() {
  return landslideAlerts;
}

/**
 * Obtener alertas activas (últimas 24 horas)
 */
function getActiveAlerts() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  return landslideAlerts.filter(a => new Date(a.timestamp) > oneDayAgo);
}

/**
 * Crear nueva alerta
 */
function createAlert(sensorId, location, riskLevel) {
  const alert = {
    id: nextAlertId++,
    sensorId,
    location,
    riskLevel: riskLevel || 85,
    timeToEvent: '30 minutos',
    recommendation: '⚠️ EVACUACIÓN RECOMENDADA',
    timestamp: new Date(),
    coordinates: { lat: null, lng: null }
  };
  landslideAlerts.push(alert);
  return alert;
}

/**
 * Crear alerta con coordenadas
 */
function createAlertWithCoordinates(sensorId, location, riskLevel, lat, lng) {
  const alert = {
    id: nextAlertId++,
    sensorId,
    location,
    riskLevel: riskLevel || 85,
    timeToEvent: '30 minutos',
    recommendation: '⚠️ EVACUACIÓN RECOMENDADA - DESLIZAMIENTO INMINENTE',
    timestamp: new Date(),
    coordinates: { lat, lng }
  };
  landslideAlerts.push(alert);
  return alert;
}

/**
 * Resolver (eliminar) alerta
 */
function resolveAlert(alertId) {
  const index = landslideAlerts.findIndex(a => a.id === parseInt(alertId));
  if (index > -1) {
    landslideAlerts.splice(index, 1);
    return true;
  }
  return false;
}

/**
 * Obtener alertas por sensor
 */
function getAlertsBySensor(sensorId) {
  return landslideAlerts.filter(a => a.sensorId === sensorId);
}

/**
 * Limpiar alertas antiguas (más de 24 horas)
 */
function cleanOldAlerts() {
  const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
  landslideAlerts = landslideAlerts.filter(a => new Date(a.timestamp) > oneDayAgo);
  return landslideAlerts.length;
}

module.exports = {
  getAllAlerts,
  getActiveAlerts,
  createAlert,
  createAlertWithCoordinates,
  resolveAlert,
  getAlertsBySensor,
  cleanOldAlerts
};
