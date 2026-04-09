/**
 * 📡 SIMULADOR DE SENSORES GEOSENTINEL
 * Genera datos realistas de sensores y alertas
 */

const sensors = require('./sensors');
const alerts = require('./alerts');
const weather = require('./weather');

/**
 * Iniciar simulación de sensores
 */
function startSensorSimulation(io, intervalMs = 5000) {
  console.log(`📡 Iniciando simulación de sensores (cada ${intervalMs}ms)`);

  const interval = setInterval(() => {
    const weatherData = weather.getWeather();
    const updatedSensors = sensors.simulateSensorReadings(weatherData);

    updatedSensors.forEach(sensor => {
      // Generar alerta si riesgo > 75%
      if (sensor.riskLevel > 75 && sensor.status !== 'ALERTA') {
        sensor.status = 'ALERTA';
        const alert = alerts.createAlertWithCoordinates(
          sensor.id,
          sensor.name,
          Math.round(sensor.riskLevel),
          sensor.lat,
          sensor.lng
        );
        io.emit('alert:landslide', alert);
        console.log(`🚨 ALERTA GENERADA: ${alert.location} - Riesgo: ${alert.riskLevel}%`);
      } else if (sensor.riskLevel < 50 && sensor.status === 'ALERTA') {
        sensor.status = 'normal';
      }
    });

    io.emit('geosentinels:updated', updatedSensors);
  }, intervalMs);

  return interval;
}

/**
 * Iniciar simulación de clima
 */
function startWeatherSimulation(io, intervalMs = 10000) {
  console.log(`🌦️  Iniciando simulación de clima (cada ${intervalMs}ms)`);

  const interval = setInterval(() => {
    const updated = weather.simulateWeather();
    io.emit('weather:updated', updated);
  }, intervalMs);

  return interval;
}

/**
 * Limpiar alertas antiguas periódicamente
 */
function startAlertCleanup(intervalMs = 3600000) { // 1 hora
  console.log(`🧹 Iniciando limpieza de alertas (cada ${intervalMs}ms)`);

  const interval = setInterval(() => {
    const remaining = alerts.cleanOldAlerts();
    console.log(`✅ Alertas antiguas limpiadas. ${remaining} alertas activas.`);
  }, intervalMs);

  return interval;
}

module.exports = {
  startSensorSimulation,
  startWeatherSimulation,
  startAlertCleanup
};
