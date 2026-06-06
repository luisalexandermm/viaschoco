const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

require('dotenv').config();

const User = require('./models/User');
const Report = require('./models/Report');

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error('MONGODB_URI no definido. Exporta la variable y vuelve a ejecutar.');
    process.exit(1);
  }

  console.log('Conectando a MongoDB...');
  await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  const dbPath = path.join(__dirname, 'data', 'database.json');
  const raw = fs.readFileSync(dbPath, 'utf8');
  const data = JSON.parse(raw);

  // Usuarios
  if (Array.isArray(data.users)) {
    for (const u of data.users) {
      try {
        const exists = await User.findOne({ email: u.email }).exec();
        if (exists) {
          console.log(`Usuario existente: ${u.email} — omitiendo`);
          continue;
        }
        const user = new User({
          name: u.name,
          email: u.email,
          password: u.password,
          role: u.role || 'user',
          blocked: !!u.blocked
        });
        await user.save();
        console.log(`Usuario creado: ${u.email}`);
      } catch (err) {
        console.error('Error creando usuario', u.email, err.message);
      }
    }
  }

  // Reportes
  if (Array.isArray(data.reports)) {
    for (const r of data.reports) {
      try {
        const exists = await Report.findOne({ id: r.id }).exec();
        if (exists) {
          console.log(`Reporte existente id=${r.id} — omitiendo`);
          continue;
        }
        const report = new Report({
          id: r.id,
          title: r.title,
          message: r.message,
          user: r.user,
          location: r.location,
          status: r.status || 'Pendiente',
          time: r.time,
          approved: !!r.approved,
          geocoded: !!r.geocoded,
          createdAt: r.createdAt || Date.now()
        });
        await report.save();
        console.log(`Reporte creado id=${r.id}`);
      } catch (err) {
        console.error('Error creando reporte id=', r.id, err.message);
      }
    }
  }

  console.log('Migración completada.');
  await mongoose.disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('Error en migración:', err);
  process.exit(1);
});
