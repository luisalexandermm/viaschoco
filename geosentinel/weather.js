/**
 * 🌦️ CLIMA - Gestión de datos meteorológicos
 * Integración con OpenWeatherMap API y simulación
 */

const fetch = globalThis.fetch || ((...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args)));

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

/**
 * Obtener clima de una ciudad desde OpenWeatherMap
 */
async function fetchWeather(city) {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    console.error('OPENWEATHER_API_KEY no configurada');
    return null;
  }
  const encodedCity = encodeURIComponent(city);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}&units=metric&lang=es`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenWeather error ${response.status}: ${errorText}`);
    }
    const data = await response.json();
    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      humidity: data.main.humidity,
      rainfall: data.rain ? data.rain['1h'] || 0 : 0
    };
  } catch (error) {
    console.error('Error fetching weather for', city, error);
    return null;
  }
}

/**
 * Obtener clima para las rutas
 */
async function getRouteWeather() {
  const quibdo = await fetchWeather('Quibdó,CO');
  const tado = await fetchWeather('Tadó,CO');
  return { quibdo, tado };
}

module.exports = {
  getWeather,
  updateWeather,
  simulateWeather,
  calculateWeatherRiskFactor,
  isDangerousWeather,
  fetchWeather,
  getRouteWeather
};
