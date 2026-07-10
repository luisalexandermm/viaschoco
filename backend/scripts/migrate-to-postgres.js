require('dotenv').config();
const prisma = require('./services/prismaClient');
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

async function migrateFromJSON() {
  const dbPath = path.join(__dirname, 'data', 'database.json');

  if (!fs.existsSync(dbPath)) {
    console.log('⚠️  database.json no encontrado. Saltando migración.');
    return;
  }

  const raw = fs.readFileSync(dbPath, 'utf8');
  const data = JSON.parse(raw);

  console.log('📊 Iniciando migración de datos JSON → PostgreSQL...\n');

  // Migrar usuarios
  if (Array.isArray(data.users)) {
    console.log('👥 Migrando usuarios...');
    for (const u of data.users) {
      try {
        const existing = await prisma.user.findUnique({
          where: { email: u.email }
        });
        if (existing) {
          console.log(`  ⊘ Usuario ${u.email} ya existe, omitiendo.`);
          continue;
        }

        let passwordHash = u.password;
        if (!u.password?.startsWith('$2')) {
          passwordHash = await bcrypt.hash(u.password || 'changeme', 10);
        }

        const user = await prisma.user.create({
          data: {
            name: u.name || u.email.split('@')[0],
            email: u.email,
            passwordHash,
            role: u.role === 'admin' ? 'ADMIN' : 'USER',
            blocked: u.blocked || false
          }
        });
        console.log(`  ✓ Usuario creado: ${user.email}`);
      } catch (error) {
        console.error(`  ✗ Error migrand usuario ${u.email}:`, error.message);
      }
    }
    console.log('');
  }

  // Migrar reportes
  if (Array.isArray(data.reports)) {
    console.log('📝 Migrando reportes...');
    for (const r of data.reports) {
      try {
        const report = await prisma.report.create({
          data: {
            title: r.title || 'Sin título',
            message: r.message || '',
            location: r.location || null,
            status: r.status || 'Pendiente',
            authorId: null // Los reportes existentes no tienen autor definido
          }
        });
        console.log(`  ✓ Reporte creado: "${report.title}"`);
      } catch (error) {
        console.error(`  ✗ Error migrando reporte:`, error.message);
      }
    }
    console.log('');
  }

  console.log('✅ Migración completada.\n');
}

async function main() {
  try {
    await migrateFromJSON();
    await prisma.$disconnect();
    console.log('🎉 Proceso finalizado exitosamente.');
  } catch (error) {
    console.error('❌ Error fatal:', error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

main();
