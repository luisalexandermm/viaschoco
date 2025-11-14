const { neon } = require('@netlify/neon');

// Automatically uses NETLIFY_DATABASE_URL or DATABASE_URL from environment
const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

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
      const result = await sql`
        INSERT INTO users(name, email, blocked, role)
        VALUES(${body.name || null}, ${body.email || null}, ${body.blocked === true}, ${body.role || 'user'})
        RETURNING *
      `;
      return {
        statusCode: 201,
        body: JSON.stringify(result[0])
      };
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

