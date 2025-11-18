const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

(async () => {
  const client = new Client({
    connectionString: process.env.NETLIFY_DATABASE_URL,
  });

  try {
    console.log('Conectando a la base de datos...');
    await client.connect();

    const migrationPath = path.join(__dirname, 'migrations', '001_init.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf8');

    console.log('Ejecutando migraciones...');
    await client.query(migrationSQL);

    console.log('Migraciones ejecutadas con éxito.');
  } catch (error) {
    console.error('Error ejecutando migraciones:', error);
  } finally {
    await client.end();
    console.log('Conexión cerrada.');
  }
})();