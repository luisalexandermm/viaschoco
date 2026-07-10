const prisma = require('./prismaClient');

const DEFAULT_THRESHOLDS = {
  tilt: 25,
  rainfall: 60,
  humidity: 85,
  vibration: 7.5,
  pressure: 970
};

function mapMeasurementType(type) {
  const normalized = String(type).toLowerCase();
  if (normalized.includes('tilt')) return 'TILT';
  if (normalized.includes('humidity') || normalized.includes('moisture')) return 'HUMIDITY';
  if (normalized.includes('vibration') || normalized.includes('seismic')) return 'VIBRATION';
  if (normalized.includes('rain') || normalized.includes('rainfall')) return 'RAINFALL';
  if (normalized.includes('pressure')) return 'PRESSURE';
  return 'RAINFALL';
}

async function evaluateRisk(deviceId) {
  const device = await prisma.device.findUnique({ where: { id: Number(deviceId) } });
  if (!device) return { riskLevel: 0, factors: [] };

  const recentReadings = await prisma.sensorReading.findMany({
    where: { deviceId: Number(deviceId) },
    orderBy: { timestamp: 'desc' },
    take: 100
  });

  const factors = [];
  let riskLevel = 0;

  const tiltReadings = recentReadings.filter(r => r.measurementType === 'TILT');
  if (tiltReadings.length > 0) {
    const latestTilt = tiltReadings[0].value;
    if (latestTilt > DEFAULT_THRESHOLDS.tilt) {
      riskLevel += 25;
      factors.push(`Inclinación alta: ${latestTilt}°`);
    }
  }

  const rainfallReadings = recentReadings.filter(r => r.measurementType === 'RAINFALL');
  if (rainfallReadings.length > 0) {
    const last6h = rainfallReadings.filter(r => new Date(r.timestamp) > new Date(Date.now() - 6 * 60 * 60 * 1000));
    const totalRainfall = last6h.reduce((sum, r) => sum + r.value, 0);
    if (totalRainfall > DEFAULT_THRESHOLDS.rainfall) {
      riskLevel += 30;
      factors.push(`Lluvia acumulada: ${totalRainfall.toFixed(1)}mm`);
    }
  }

  const humidityReadings = recentReadings.filter(r => r.measurementType === 'HUMIDITY');
  if (humidityReadings.length > 0) {
    const latestHumidity = humidityReadings[0].value;
    if (latestHumidity > DEFAULT_THRESHOLDS.humidity) {
      riskLevel += 20;
      factors.push(`Humedad del suelo: ${latestHumidity}%`);
    }
  }

  const vibrationReadings = recentReadings.filter(r => r.measurementType === 'VIBRATION');
  if (vibrationReadings.length > 0) {
    const latestVibration = vibrationReadings[0].value;
    if (latestVibration > DEFAULT_THRESHOLDS.vibration) {
      riskLevel += 15;
      factors.push(`Vibración/sismicidad: ${latestVibration.toFixed(2)} m/s²`);
    }
  }

  return { riskLevel: Math.min(riskLevel, 100), factors };
}

async function createAlertIfNeeded(deviceId, io) {
  const { riskLevel, factors } = await evaluateRisk(deviceId);
  const device = await prisma.device.findUnique({ where: { id: Number(deviceId) } });

  if (!device) return null;

  if (riskLevel >= 70) {
    const severity = riskLevel >= 85 ? 'CRITICAL' : 'HIGH';
    const alert = await prisma.alert.create({
      data: {
        deviceId: Number(deviceId),
        alertType: 'LANDSLIDE_RISK',
        severity,
        message: `Riesgo de deslizamiento detectado en ${device.name}: ${factors.join(', ')}`,
        location: `${device.name} (${device.latitude}, ${device.longitude})`,
        status: 'ACTIVE'
      }
    });

    if (io) {
      io.emit('alert:landslide', {
        id: alert.id,
        deviceId: alert.deviceId,
        location: alert.location,
        riskLevel,
        severity,
        message: alert.message,
        timestamp: alert.createdAt,
        coordinates: { lat: device.latitude, lng: device.longitude }
      });
    }

    return alert;
  }

  return null;
}

async function resolveAlert(alertId) {
  return prisma.alert.update({
    where: { id: Number(alertId) },
    data: { status: 'RESOLVED', resolvedAt: new Date() }
  });
}

async function getActiveAlerts() {
  return prisma.alert.findMany({
    where: { status: 'ACTIVE' },
    orderBy: { createdAt: 'desc' },
    include: { device: true }
  });
}

module.exports = {
  DEFAULT_THRESHOLDS,
  mapMeasurementType,
  evaluateRisk,
  createAlertIfNeeded,
  resolveAlert,
  getActiveAlerts
};
