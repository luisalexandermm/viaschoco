const express = require('express');
const prisma = require('../services/prismaClient');
const { verifyDeviceCredentials } = require('../services/deviceAuth');
const { storeSensorReading, getDeviceReadings, getLatestReadingByType, getReadingStatistics } = require('../services/sensorReadings');
const { createAlertIfNeeded, getActiveAlerts } = require('../services/alertEngine');

const router = express.Router();

async function authenticateDevice(req, res, next) {
  const deviceId = req.headers['x-device-id'] || req.body.deviceId;
  const apiKey = req.headers['x-device-key'] || req.body.apiKey;

  if (!deviceId || !apiKey) {
    return res.status(401).json({ error: 'Credenciales de dispositivo requeridas' });
  }

  const device = await verifyDeviceCredentials(deviceId, apiKey);
  if (!device) {
    return res.status(403).json({ error: 'Credenciales de dispositivo inválidas' });
  }

  req.device = device;
  next();
}

router.post('/readings', authenticateDevice, async (req, res) => {
  const { readings } = req.body;

  if (!Array.isArray(readings) || readings.length === 0) {
    return res.status(400).json({ error: 'Lecturas requeridas (array)' });
  }

  const results = [];
  for (const reading of readings) {
    const { measurementType, value, unit, readingUuid } = reading;
    if (!measurementType || value === undefined) {
      results.push({ success: false, reason: 'MISSING_FIELDS' });
      continue;
    }

    const result = await storeSensorReading({
      deviceId: req.device.id,
      measurementType,
      value,
      unit,
      readingUuid
    });
    results.push(result);
  }

  await createAlertIfNeeded(req.device.id, req.app.get('io'));

  res.json({ success: true, processed: results.length, results });
});

router.get('/readings', authenticateDevice, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 100, 1000);
  const hours = Math.min(Number(req.query.hours) || 24, 720);

  const readings = await getDeviceReadings(req.device.id, limit, hours);
  res.json(readings);
});

router.get('/readings/latest/:type', authenticateDevice, async (req, res) => {
  const reading = await getLatestReadingByType(req.device.id, req.params.type.toUpperCase());
  if (!reading) {
    return res.status(404).json({ error: 'No hay lecturas de este tipo' });
  }
  res.json(reading);
});

router.get('/statistics/:type', authenticateDevice, async (req, res) => {
  const hours = Math.min(Number(req.query.hours) || 24, 720);
  const stats = await getReadingStatistics(req.device.id, req.params.type.toUpperCase(), hours);
  if (!stats) {
    return res.status(404).json({ error: 'No hay datos' });
  }
  res.json(stats);
});

router.get('/alerts', authenticateDevice, async (req, res) => {
  const alerts = await getActiveAlerts();
  const deviceAlerts = alerts.filter(a => a.deviceId === req.device.id);
  res.json(deviceAlerts);
});

router.get('/health', authenticateDevice, async (req, res) => {
  res.json({
    device: { id: req.device.id, deviceId: req.device.deviceId, status: req.device.status },
    timestamp: new Date(),
    connected: true
  });
});

module.exports = router;
