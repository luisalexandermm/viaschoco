const { neon } = require('@netlify/neon');
const bcrypt = require('bcryptjs');

// Automatically uses NETLIFY_DATABASE_URL or DATABASE_URL from environment
const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

// Default admin credentials (used for direct login if desired)
const DEFAULT_ADMIN_EMAIL = 'alrxandermarturana76.admin@gmail.com';
const DEFAULT_ADMIN_PASSWORD = '3145312045La';
// Allow overriding via environment variables (safer for production)
const ADMIN_EMAIL = process.env.NETLIFY_ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.NETLIFY_ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD;
const SALT_ROUNDS = 10;

// Ensure default admin exists in DB (best-effort)
(async () => {
  try {
    const existingAdmin = await sql`SELECT * FROM users WHERE email = ${ADMIN_EMAIL}`;

    if (existingAdmin.length === 0) {
      // Hash admin password before inserting
      const hash = await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS);
      await sql`
        INSERT INTO users (name, email, password, blocked, role)
        VALUES ('Admin', ${ADMIN_EMAIL}, ${hash}, false, 'admin')
      `;
      console.log('Default admin created (hashed):', ADMIN_EMAIL);
    }
  } catch (error) {
    console.error('Error ensuring default admin:', error);
  }
})();

exports.handler = async function handler(event) {
  const method = event.httpMethod;
  const qs = event.queryStringParameters || {};
  const name = qs.name || null;

  try {
    if (method === 'GET') {
      const result = await sql`SELECT * FROM users`;
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      };
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const { email, password, name } = body;

      // Verificar si el usuario existe
      const user = await sql`SELECT * FROM users WHERE email = ${email}`;

      if (user.length > 0) {
        // Validar contraseña usando bcrypt
        const storedHash = user[0].password || '';
        const match = await bcrypt.compare(password || '', storedHash);
        if (match) {
          return {
            statusCode: 200,
            body: JSON.stringify({ exists: true, role: user[0].role })
          };
        } else {
          return {
            statusCode: 401,
            body: JSON.stringify({ error: 'Contraseña incorrecta' })
          };
        }
      } else {
        // Si no existe, registrar el usuario (hash password)
        if (name && password) {
          const hash = await bcrypt.hash(password, SALT_ROUNDS);
          await sql`
            INSERT INTO users (name, email, password, blocked, role)
            VALUES (${name}, ${email}, ${hash}, false, 'user')
          `;
          return {
            statusCode: 201,
            body: JSON.stringify({ exists: true, role: 'user' })
          };
        } else {
          return {
            statusCode: 404,
            body: JSON.stringify({ exists: false })
          };
        }
      }
    }

    if (method === 'PUT') {
      if (!name) return { statusCode: 400, body: JSON.stringify({ error: 'Missing name' }) };
      const body = JSON.parse(event.body || '{}');
      
      // Construct UPDATE query dynamically
      const entries = Object.entries(body);
      if (entries.length === 0) return { statusCode: 400, body: JSON.stringify({ error: 'No fields to update' }) };
      
      // Build SET clause with parameters
      let queryStr = 'UPDATE users SET ';
      const params = [];
      entries.forEach((kv, idx) => {
        params.push(kv[1]);
        if (idx > 0) queryStr += ', ';
        queryStr += `"${kv[0]}" = $${idx + 1}`;
      });
      queryStr += ` WHERE name = '${name}' RETURNING *`;
      
      // Use unsafe for dynamic query (carefully vetted)
      const result = await sql.unsafe(queryStr, params);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, updated: result[0] })
      };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    console.error('users function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};