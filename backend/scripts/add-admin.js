#!/usr/bin/env node

/**
 * Script para agregar admins adicionales a la BD
 * Uso: node scripts/add-admin.js "nombre@email.com" "nombre completo"
 */

require('dotenv').config();
const prisma = require('../services/prismaClient');
const bcrypt = require('bcrypt');

async function addAdmin() {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log('❌ Uso: node scripts/add-admin.js "email@example.com" "Nombre Completo" [password]');
    console.log('   Ejemplo: node scripts/add-admin.js "admin2@viaschoco.app" "Admin Dos"');
    process.exit(1);
  }

  const email = args[0].toLowerCase();
  const name = args[1];
  const password = args[2] || 'ChangeMe123!'; // Password temporal

  console.log('📝 Agregando admin...');
  console.log(`   Email: ${email}`);
  console.log(`   Nombre: ${name}`);

  try {
    // Verificar si ya existe
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      console.log(`❌ Error: El usuario ${email} ya existe`);
      process.exit(1);
    }

    // Hashear password
    const passwordHash = await bcrypt.hash(password, 10);

    // Crear admin
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash,
        role: 'ADMIN'
      }
    });

    console.log('\n✅ Admin creado exitosamente:');
    console.log(`   ID: ${user.id}`);
    console.log(`   Email: ${user.email}`);
    console.log(`   Nombre: ${user.name}`);
    console.log(`   Role: ${user.role}`);
    console.log(`\n⚠️  Password temporal: ${password}`);
    console.log('   El admin debe cambiar esto al primer login');

  } catch (error) {
    console.error('❌ Error al crear admin:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

addAdmin();
