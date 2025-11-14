const { neon } = require('@netlify/neon');

// Automatically uses NETLIFY_DATABASE_URL or DATABASE_URL from environment
const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

exports.handler = async function handler(event) {
  const method = event.httpMethod;
  const qs = event.queryStringParameters || {};
  const id = qs.id ? parseInt(qs.id, 10) : null;

  try {
    if (method === 'GET') {
      if (id) {
        const result = await sql`SELECT * FROM reports WHERE id = ${id}`;
        return {
          statusCode: 200,
          body: JSON.stringify(result[0] || null)
        };
      }
      const result = await sql`SELECT * FROM reports ORDER BY id DESC`;
      return {
        statusCode: 200,
        body: JSON.stringify(result)
      };
    }

    if (method === 'POST') {
      const body = JSON.parse(event.body || '{}');
      const result = await sql`
        INSERT INTO reports(title, road, location, message, "user", "time", lat, lng, approved, status, files)
        VALUES(${body.title || null}, ${body.road || null}, ${body.location || null}, 
               ${body.message || null}, ${body.user || null}, ${body.time || null}, 
               ${body.lat || null}, ${body.lng || null}, ${body.approved === true}, 
               ${body.status || null}, ${JSON.stringify(body.files) || null})
        RETURNING *
      `;
      return {
        statusCode: 201,
        body: JSON.stringify(result[0])
      };
    }

    if (method === 'PUT') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'Missing id' }) };
      const body = JSON.parse(event.body || '{}');
      
      // Construct UPDATE query dynamically
      const entries = Object.entries(body);
      if (entries.length === 0) return { statusCode: 400, body: JSON.stringify({ error: 'No fields to update' }) };
      
      // Build SET clause with parameters
      let queryStr = 'UPDATE reports SET ';
      const params = [];
      entries.forEach((kv, idx) => {
        params.push(kv[1]);
        if (idx > 0) queryStr += ', ';
        queryStr += `"${kv[0]}" = $${idx + 1}`;
      });
      queryStr += ` WHERE id = ${id} RETURNING *`;
      
      // Use unsafe for dynamic query (carefully vetted)
      const result = await sql.unsafe(queryStr, params);
      
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true, updated: result[0] })
      };
    }

    if (method === 'DELETE') {
      if (!id) return { statusCode: 400, body: JSON.stringify({ error: 'Missing id' }) };
      await sql`DELETE FROM reports WHERE id = ${id}`;
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true })
      };
    }

    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  } catch (err) {
    console.error('reports function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};

