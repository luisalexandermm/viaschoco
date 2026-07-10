const express = require('express');
const prisma = require('../services/prismaClient');
const { authenticateToken, requireRole, roles } = require('../services/auth');
const { createDevice, rotateDeviceKey } = require('../services/deviceAuth');

const router = express.Router();

router.use(authenticateToken, requireRole(roles.ADMIN));

router.post('/', async (req, res) => {
  const { deviceId, name, description, latitude, longitude } = req.body;

  if (!deviceId || !name || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'deviceId, name, latitude y longitude son obligatorios' });
  }

  const existing = await prisma.device.findUnique({ where: { deviceId } });
  if (existing) {
    return res.status(400).json({ error: 'El dispositivo ya existe' });
  }

  const { device, apiKey } = await createDevice({ deviceId, name, description, latitude, longitude });

  res.status(201).json({
    message: 'Dispositivo registrado exitosamente',
    device: { id: device.id, deviceId: device.deviceId, name: device.name, status: device.status },
    apiKey,
    notice: 'GUARDA ESTA API KEY DE FORMA SEGURA - no se mostrará de nuevo'
  });
});

router.get('/', async (req, res) => {
  const devices = await prisma.device.findMany({
    select: { id: true, deviceId: true, name: true, description: true, status: true, latitude: true, longitude: true, lastSeenAt: true, createdAt: true }
  });
  res.json(devices);
});

router.get('/:deviceId', async (req, res) => {
  const device = await prisma.device.findUnique({
    where: { deviceId: req.params.deviceId },
    select: { id: true, deviceId: true, name: true, description: true, status: true, latitude: true, longitude: true, lastSeenAt: true, createdAt: true, updatedAt: true }
  });
  if (!device) {
    return res.status(404).json({ error: 'Dispositivo no encontrado' });
  }
  res.json(device);
});

router.put('/:deviceId', async (req, res) => {
  const { name, description, status } = req.body;
  const updateData = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (status) updateData.status = status;

  const device = await prisma.device.update({
    where: { deviceId: req.params.deviceId },
    data: updateData,
    select: { id: true, deviceId: true, name: true, status: true }
  });
  res.json(device);
});

router.post('/:deviceId/rotate-key', async (req, res) => {
  const result = await rotateDeviceKey(req.params.deviceId);
  if (!result) {
    return res.status(404).json({ error: 'Dispositivo no encontrado' });
  }

  res.json({
    message: 'API Key rotada exitosamente',
    device: { id: result.device.id, deviceId: result.device.deviceId },
    apiKey: result.apiKey,
    notice: 'GUARDA ESTA NUEVA API KEY - reemplaza la anterior en el dispositivo'
  });
});

router.delete('/:deviceId', async (req, res) => {
  await prisma.device.delete({ where: { deviceId: req.params.deviceId } });
  res.json({ success: true });
});

module.exports = router;
