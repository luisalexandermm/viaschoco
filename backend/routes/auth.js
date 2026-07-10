const express = require('express');
const prisma = require('../services/prismaClient');
const { hashPassword, verifyPassword, issueUserToken, findUserByEmail, authenticateToken, requireRole, roles } = require('../services/auth');

const router = express.Router();

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  const user = await findUserByEmail(email.toLowerCase());
  if (!user || user.blocked) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = await issueUserToken(user);
  res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Nombre, email y contraseña son obligatorios' });
  }

  const normalizedEmail = email.toLowerCase();
  const existing = await findUserByEmail(normalizedEmail);
  if (existing) {
    return res.status(400).json({ error: 'El usuario ya existe' });
  }

  const passwordHash = await hashPassword(password);
  const user = await prisma.user.create({
    data: {
      name,
      email: normalizedEmail,
      passwordHash,
      role: roles.USER
    }
  });

  const token = await issueUserToken(user);
  res.status(201).json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

router.get('/me', authenticateToken, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.user.id) },
    select: { id: true, name: true, email: true, role: true, blocked: true }
  });
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(user);
});

router.post('/seed-admin', async (req, res) => {
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@viaschoco.test';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const existing = await findUserByEmail(adminEmail);
  if (existing) {
    return res.json({ message: 'Admin ya existe', adminEmail });
  }
  const passwordHash = await hashPassword(adminPassword);
  const user = await prisma.user.create({
    data: {
      name: 'Admin Vías del Chocó',
      email: adminEmail,
      passwordHash,
      role: roles.ADMIN
    }
  });
  res.status(201).json({ 
    message: 'Admin principal creado', 
    user: { id: user.id, email: user.email },
    note: 'Para agregar más admins: POST /api/auth/register con role=ADMIN (requiere acceso BD)'
  });
});
});

module.exports = router;
