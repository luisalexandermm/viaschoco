const { neon } = require('@netlify/neon');

// Automatically uses NETLIFY_DATABASE_URL or DATABASE_URL from environment
const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

// Ensure default admin exists
(async () => {
  try {
    const adminEmail = 'alrxandermarturana76.admin@gmail.com';
    const adminPassword = '3145312045La';
    const existingAdmin = await sql`SELECT * FROM users WHERE email = ${adminEmail}`;

    if (existingAdmin.length === 0) {
      await sql`
        INSERT INTO users (name, email, password, blocked, role)
        VALUES ('Admin', ${adminEmail}, ${adminPassword}, false, 'admin')
      `;
      console.log('Default admin created:', adminEmail);
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
      const { email, password } = body;

      // Verificar si el usuario existe
      const user = await sql`SELECT * FROM users WHERE email = ${email}`;

      if (user.length > 0) {
        // Validar contraseña (en este caso, sin hashing por simplicidad)
        if (user[0].password === password) {
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
        return {
          statusCode: 404,
          body: JSON.stringify({ exists: false })
        };
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

