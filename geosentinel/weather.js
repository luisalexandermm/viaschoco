/**
 * 🌦️ CLIMA - Gestión de datos meteorológicos
 * Integración con OpenWeatherMap API y simulación
 */

let weatherData = {
  temperature: 28,
  humidity: 75,
  rainfall: 0,
  windSpeed: 5,
  lastUpdate: new Date()
};

/**
 * Obtener clima actual
 */
function getWeather() {
  return weatherData;
}

/**
 * Actualizar datos de clima
 */
function updateWeather(data) {
  Object.assign(weatherData, data);
  weatherData.lastUpdate = new Date();
  return weatherData;
}

/**
 * Simular cambios de clima
 */
function simulateWeather() {
  weatherData.temperature = 25 + Math.random() * 8;
  weatherData.humidity = 60 + Math.random() * 35;
  weatherData.rainfall = Math.max(0, weatherData.rainfall - 1 + Math.random() * 3);
  weatherData.windSpeed = Math.random() * 15;
  weatherData.lastUpdate = new Date();
  return weatherData;
}

/**
 * Calcular índice de riesgo basado en clima
 */
function calculateWeatherRiskFactor() {
  let riskFactor = 0;
  
  if (weatherData.rainfall > 50) riskFactor += 30;
  if (weatherData.humidity > 80) riskFactor += 15;
  
  return Math.min(riskFactor, 45);
}

/**
 * ¿Condiciones peligrosas?
 */
function isDangerousWeather() {
  return weatherData.rainfall > 50 || weatherData.humidity > 85;
}

module.exports = {
  getWeather,
  updateWeather,
  simulateWeather,
  calculateWeatherRiskFactor,
  isDangerousWeather
};
