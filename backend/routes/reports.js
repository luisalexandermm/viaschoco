const express = require('express');
const prisma = require('../services/prismaClient');
const { authenticateToken } = require('../services/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  const reports = await prisma.report.findMany({
    include: { author: { select: { id: true, name: true, email: true } } },
    orderBy: { createdAt: 'desc' }
  });
  res.json(reports);
});

router.post('/', authenticateToken, async (req, res) => {
  const { title, message, location, status } = req.body;

  if (!title || !message) {
    return res.status(400).json({ error: 'Título y mensaje son obligatorios' });
  }

  const report = await prisma.report.create({
    data: {
      title,
      message,
      location: location || null,
      status: status || 'Pendiente',
      authorId: req.user.id
    },
    include: { author: { select: { id: true, name: true, email: true } } }
  });

  res.status(201).json(report);
});

router.get('/:id', async (req, res) => {
  const report = await prisma.report.findUnique({
    where: { id: Number(req.params.id) },
    include: { author: { select: { id: true, name: true, email: true } } }
  });
  if (!report) {
    return res.status(404).json({ error: 'Reporte no encontrado' });
  }
  res.json(report);
});

router.put('/:id', authenticateToken, async (req, res) => {
  const { title, message, location, status } = req.body;
  const updateData = {};
  if (title) updateData.title = title;
  if (message) updateData.message = message;
  if (location) updateData.location = location;
  if (status) updateData.status = status;

  const report = await prisma.report.update({
    where: { id: Number(req.params.id) },
    data: updateData,
    include: { author: { select: { id: true, name: true, email: true } } }
  });
  res.json(report);
});

router.delete('/:id', authenticateToken, async (req, res) => {
  await prisma.report.delete({ where: { id: Number(req.params.id) } });
  res.json({ success: true });
});

module.exports = router;
