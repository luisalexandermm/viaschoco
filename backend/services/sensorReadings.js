const prisma = require('./prismaClient');
const { v4: uuidv4 } = require('uuid');

async function storeSensorReading({ deviceId, measurementType, value, unit, readingUuid }) {
  const uuid = readingUuid || uuidv4();

  try {
    const reading = await prisma.sensorReading.create({
      data: {
        readingUuid: uuid,
        deviceId: Number(deviceId),
        measurementType,
        value: Number(value),
        unit: unit || 'default'
      }
    });

    await prisma.device.update({
      where: { id: Number(deviceId) },
      data: { lastSeenAt: new Date() }
    });

    return { success: true, reading };
  } catch (error) {
    if (error.code === 'P2002') {
      return { success: false, reason: 'DUPLICATE', message: 'Lectura duplicada detectada' };
    }
    throw error;
  }
}

async function getDeviceReadings(deviceId, limit = 100, hours = 24) {
  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  return prisma.sensorReading.findMany({
    where: {
      deviceId: Number(deviceId),
      timestamp: { gte: cutoffTime }
    },
    orderBy: { timestamp: 'desc' },
    take: limit
  });
}

async function getLatestReadingByType(deviceId, measurementType) {
  return prisma.sensorReading.findFirst({
    where: { deviceId: Number(deviceId), measurementType },
    orderBy: { timestamp: 'desc' }
  });
}

async function getReadingStatistics(deviceId, measurementType, hours = 24) {
  const cutoffTime = new Date(Date.now() - hours * 60 * 60 * 1000);
  const readings = await prisma.sensorReading.findMany({
    where: {
      deviceId: Number(deviceId),
      measurementType,
      timestamp: { gte: cutoffTime }
    }
  });

  if (readings.length === 0) {
    return null;
  }

  const values = readings.map(r => r.value);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  return { count: readings.length, avg, min, max, latest: readings[0].value };
}

module.exports = {
  storeSensorReading,
  getDeviceReadings,
  getLatestReadingByType,
  getReadingStatistics
};
