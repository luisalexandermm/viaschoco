require('dotenv').config();
const path = require('path');

const usersFn = require(path.join(__dirname, '..', 'netlify', 'functions', 'users.js'));

async function run() {
  console.log('Using env:', {
    NETLIFY_ADMIN_EMAIL: process.env.NETLIFY_ADMIN_EMAIL,
    NETLIFY_ADMIN_PASSWORD: process.env.NETLIFY_ADMIN_PASSWORD ? '***' : undefined,
    NETLIFY_DATABASE_URL: !!process.env.NETLIFY_DATABASE_URL
  });

  // Test GET to list users
  try {
    const resGet = await usersFn.handler({ httpMethod: 'GET' });
    console.log('\nGET /users -> status', resGet.statusCode);
    try { console.log('Body:', JSON.parse(resGet.body)); } catch(e){ console.log(resGet.body); }
  } catch (err) {
    console.error('GET error:', err);
  }

  // Test admin POST login using env creds
  try {
    const adminEmail = process.env.NETLIFY_ADMIN_EMAIL;
    const adminPass = process.env.NETLIFY_ADMIN_PASSWORD;
    const resPost = await usersFn.handler({ httpMethod: 'POST', body: JSON.stringify({ email: adminEmail, password: adminPass }) });
    console.log('\nPOST admin login -> status', resPost.statusCode);
    try { console.log('Body:', JSON.parse(resPost.body)); } catch(e){ console.log(resPost.body); }
  } catch (err) {
    console.error('POST admin error:', err);
  }

  // Optional: register a test user
  try {
    const resRegister = await usersFn.handler({ httpMethod: 'POST', body: JSON.stringify({ email: 'test.user@example.com', password: 'TestPass123!', name: 'Test User' }) });
    console.log('\nPOST register test user -> status', resRegister.statusCode);
    try { console.log('Body:', JSON.parse(resRegister.body)); } catch(e){ console.log(resRegister.body); }
  } catch (err) {
    console.error('POST register error:', err);
  }
}

run().then(()=>process.exit(0)).catch(e=>{ console.error(e); process.exit(1); });
