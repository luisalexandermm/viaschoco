const crypto = require('crypto');
const bcrypt = require('bcrypt');
const prisma = require('./prismaClient');

function generateApiKey() {
  return crypto.randomBytes(24).toString('hex');
}

async function hashApiKey(apiKey) {
  return bcrypt.hash(apiKey, 10);
}

async function verifyApiKey(apiKey, hash) {
  return bcrypt.compare(apiKey, hash);
}

async function createDevice({ deviceId, name, description, latitude, longitude }) {
  const apiKey = generateApiKey();
  const apiKeyHash = await hashApiKey(apiKey);
  const device = await prisma.device.create({
    data: {
      deviceId,
      name,
      description,
      latitude,
      longitude,
      apiKeyHash
    }
  });

  return { device, apiKey };
}

async function rotateDeviceKey(deviceId) {
  const device = await prisma.device.findUnique({ where: { deviceId } });
  if (!device) return null;
  const apiKey = generateApiKey();
  const apiKeyHash = await hashApiKey(apiKey);
  const updated = await prisma.device.update({
    where: { deviceId },
    data: { apiKeyHash, lastKeyRotation: new Date() }
  });
  return { device: updated, apiKey };
}

async function findDeviceByDeviceId(deviceId) {
  return prisma.device.findUnique({ where: { deviceId } });
}

async function verifyDeviceCredentials(deviceId, apiKey) {
  const device = await findDeviceByDeviceId(deviceId);
  if (!device || !apiKey) return null;
  const valid = await verifyApiKey(apiKey, device.apiKeyHash);
  return valid ? device : null;
}

module.exports = {
  generateApiKey,
  hashApiKey,
  verifyApiKey,
  createDevice,
  rotateDeviceKey,
  findDeviceByDeviceId,
  verifyDeviceCredentials
};
