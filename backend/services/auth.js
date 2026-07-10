const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('./prismaClient');

const JWT_SECRET = process.env.JWT_SECRET || 'change-this-secret';
const JWT_EXPIRATION = process.env.JWT_EXPIRATION || '8h';

const roles = {
  ADMIN: 'ADMIN',
  OPERATOR: 'OPERATOR',
  USER: 'USER'
};

async function hashPassword(password) {
  return bcrypt.hash(password, 10);
}

async function verifyPassword(password, hash) {
  return bcrypt.compare(password, hash);
}

async function issueUserToken(user) {
  const payload = {
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name
  };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION });
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
  if (!token) {
    return res.status(401).json({ error: 'Token de acceso requerido' });
  }

  try {
    req.user = verifyToken(token);
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido o expirado' });
  }
}

function requireRole(role) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Acceso denegado' });
    }
    if (req.user.role !== role && req.user.role !== roles.ADMIN) {
      return res.status(403).json({ error: 'Permisos insuficientes' });
    }
    next();
  };
}

async function findUserByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function findUserById(id) {
  return prisma.user.findUnique({ where: { id: Number(id) } });
}

module.exports = {
  roles,
  hashPassword,
  verifyPassword,
  issueUserToken,
  authenticateToken,
  requireRole,
  findUserByEmail,
  findUserById
};
