/**
 * 📡 RUTAS API GEOSENTINEL
 * Endpoints para sensores, alertas y clima
 */

const sensors = require('./sensors');
const alerts = require('./alerts');
const weather = require('./weather');

module.exports = function setupGeosentinelRoutes(app, io) {
  
  // ==================== GEOSENTINELS ====================
  
  /**
   * GET /api/geosentinels - Obtener todos los sensores
   */
  app.get('/api/geosentinels', (req, res) => {
    res.json(sensors.getAllSensors());
  });

  /**
   * GET /api/geosentinels/:id - Obtener sensor por ID
   */
  app.get('/api/geosentinels/:id', (req, res) => {
    const sensor = sensors.getSensorById(req.params.id);
    if (!sensor) return res.status(404).json({ error: 'Sensor no encontrado' });
    res.json(sensor);
  });

  /**
   * POST /api/geosentinels - Crear nuevo sensor
   */
  app.post('/api/geosentinels', (req, res) => {
    const { name, lat, lng } = req.body;
    if (!name || lat === undefined || lng === undefined) {
      return res.status(400).json({ error: 'Faltan campos: name, lat, lng' });
    }
    const newSensor = sensors.createSensor(name, lat, lng);
    io.emit('geosentinel:created', newSensor);
    res.status(201).json(newSensor);
  });

  /**
   * PUT /api/geosentinels/:id - Actualizar sensor
   */
  app.put('/api/geosentinels/:id', (req, res) => {
    const sensor = sensors.getSensorById(req.params.id);
    if (!sensor) return res.status(404).json({ error: 'Sensor no encontrado' });
    
    const updated = sensors.updateSensor(req.params.id, req.body);
    
    // Si riesgo supera 75%, generar alerta
    if (updated.riskLevel > 75 && updated.status !== 'ALERTA') {
      updated.status = 'ALERTA';
      const alert = alerts.createAlertWithCoordinates(
        updated.id,
        updated.name,
        Math.round(updated.riskLevel),
        updated.lat,
        updated.lng
      );
      io.emit('alert:landslide', alert);
      console.log(`🚨 ALERTA GENERADA: ${alert.location}`);
    } else if (updated.riskLevel < 50 && updated.status === 'ALERTA') {
      updated.status = 'normal';
    }
    
    res.json(updated);
  });

  // ==================== ALERTAS ====================

  /**
   * GET /api/alerts - Obtener todas las alertas
   */
  app.get('/api/alerts', (req, res) => {
    res.json(alerts.getAllAlerts());
  });

  /**
   * GET /api/alerts/active - Obtener alertas activas (24h)
   */
  app.get('/api/alerts/active', (req, res) => {
    res.json(alerts.getActiveAlerts());
  });

  /**
   * POST /api/alerts - Crear alerta manual
   */
  app.post('/api/alerts', (req, res) => {
    const { sensorId, location, riskLevel } = req.body;
    const alert = alerts.createAlert(sensorId, location, riskLevel);
    io.emit('alert:landslide', alert);
    res.status(201).json(alert);
  });

  /**
   * DELETE /api/alerts/:id - Resolver alerta
   */
  app.delete('/api/alerts/:id', (req, res) => {
    const success = alerts.resolveAlert(req.params.id);
    if (!success) return res.status(404).json({ error: 'Alerta no encontrada' });
    io.emit('alert:resolved', { alertId: parseInt(req.params.id) });
    res.json({ success: true });
  });

  // ==================== CLIMA ====================

  /**
   * GET /api/weather - Obtener clima actual
   */
  app.get('/api/weather', (req, res) => {
    res.json(weather.getWeather());
  });

  /**
   * PUT /api/weather - Actualizar clima
   */
  app.put('/api/weather', (req, res) => {
    const updated = weather.updateWeather(req.body);
    io.emit('weather:updated', updated);
    res.json(updated);
  });
};
