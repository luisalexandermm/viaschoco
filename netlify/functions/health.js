const { neon } = require('@netlify/neon');

// usa NETLIFY_DATABASE_URL o DATABASE_URL
const sql = neon(process.env.NETLIFY_DATABASE_URL || process.env.DATABASE_URL);

exports.handler = async function handler() {
  try {
    // Simple query para verificar conectividad
    const res = await sql`SELECT 1 as ok`;
    if (res && res.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify({ ok: true })
      };
    }
    return { statusCode: 500, body: JSON.stringify({ ok: false }) };
  } catch (err) {
    console.error('health check error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ ok: false, error: err.message }) };
  }
};
