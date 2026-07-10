const express = require('express');
const prisma = require('../services/prismaClient');
const { authenticateToken, requireRole, hashPassword, roles } = require('../services/auth');

const router = express.Router();

router.use(authenticateToken);

router.get('/', requireRole(roles.ADMIN), async (req, res) => {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, email: true, role: true, blocked: true, createdAt: true, updatedAt: true }
  });
  res.json(users);
});

router.get('/me', async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: Number(req.user.id) },
    select: { id: true, name: true, email: true, role: true, blocked: true, createdAt: true, updatedAt: true }
  });
  if (!user) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json(user);
});

router.put('/:id', requireRole(roles.ADMIN), async (req, res) => {
  const id = Number(req.params.id);
  const { name, role, blocked, password } = req.body;
  const updateData = {};
  if (name) updateData.name = name;
  if (role) updateData.role = role;
  if (blocked !== undefined) updateData.blocked = blocked;
  if (password) updateData.passwordHash = await hashPassword(password);

  const user = await prisma.user.update({
    where: { id },
    data: updateData,
    select: { id: true, name: true, email: true, role: true, blocked: true }
  });
  res.json(user);
});

router.delete('/:id', requireRole(roles.ADMIN), async (req, res) => {
  const id = Number(req.params.id);
  await prisma.user.delete({ where: { id } });
  res.json({ success: true });
});

module.exports = router;
