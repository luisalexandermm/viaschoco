/**
 * 📡 GEOSENTINELS - Sensores IoT de detección de deslizamientos
 * Gestiona datos de sensores, riesgo y estado
 */

// Datos iniciales de sensores
let geosentinels = [
  { 
    id: 1, 
    name: "GEO-Quibdó-Medellín-km145", 
    lat: 5.8521, 
    lng: -75.6521, 
    riskLevel: 0, 
    status: "normal", 
    humidity: 45, 
    pressure: 1013, 
    lastUpdate: new Date() 
  },
  { 
    id: 2, 
    name: "GEO-Tadó-Certegui-km22", 
    lat: 5.7821, 
    lng: -76.2389, 
    riskLevel: 0, 
    status: "normal", 
    humidity: 52, 
    pressure: 1010, 
    lastUpdate: new Date() 
  },
  { 
    id: 3, 
    name: "GEO-Quibdó-Pereira-km78", 
    lat: 5.6321, 
    lng: -76.0521, 
    riskLevel: 0, 
    status: "normal", 
    humidity: 68, 
    pressure: 1011, 
    lastUpdate: new Date() 
  }
];

/**
 * Obtener todos los sensores
 */
function getAllSensors() {
  return geosentinels;
}

/**
 * Obtener sensor por ID
 */
function getSensorById(id) {
  return geosentinels.find(g => g.id === parseInt(id));
}

/**
 * Crear nuevo sensor
 */
function createSensor(name, lat, lng) {
  const newSensor = {
    id: geosentinels.length + 1,
    name,
    lat,
    lng,
    riskLevel: 0,
    status: 'normal',
    humidity: 50,
    pressure: 1013,
    lastUpdate: new Date()
  };
  geosentinels.push(newSensor);
  return newSensor;
}

/**
 * Actualizar datos de sensor
 */
function updateSensor(id, data) {
  const sensor = geosentinels.find(g => g.id === parseInt(id));
  if (!sensor) return null;
  
  Object.assign(sensor, data);
  sensor.lastUpdate = new Date();
  return sensor;
}

/**
 * Simular lecturas de sensores
 */
function simulateSensorReadings(weatherData) {
  geosentinels.forEach(sensor => {
    // Aumentar riesgo si lluvia es alta
    let baseRisk = Math.random() * 40;
    if (weatherData.rainfall > 50) baseRisk += 30;
    if (weatherData.humidity > 80) baseRisk += 15;
    
    sensor.riskLevel = Math.min(baseRisk, 100);
    sensor.humidity = 40 + Math.random() * 50;
    sensor.pressure = 1010 + (Math.random() - 0.5) * 10;
    sensor.lastUpdate = new Date();
  });
  
  return geosentinels;
}

module.exports = {
  getAllSensors,
  getSensorById,
  createSensor,
  updateSensor,
  simulateSensorReadings
};
