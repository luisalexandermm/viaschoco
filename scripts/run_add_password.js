require('dotenv').config();
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

(async () => {
  const client = new Client({ connectionString: process.env.NETLIFY_DATABASE_URL });
  try {
    await client.connect();
    const migrationPath = path.join(__dirname, '..', 'migrations', '002_add_password.sql');
    const sql = fs.readFileSync(migrationPath, 'utf8');
    console.log('Applying migration 002_add_password...');
    await client.query(sql);
    console.log('Migration applied.');
  } catch (err) {
    console.error('Migration error:', err);
    process.exitCode = 1;
  } finally {
    await client.end();
  }
})();
