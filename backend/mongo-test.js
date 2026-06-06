const { MongoClient, ServerApiVersion } = require('mongodb');

require('dotenv').config();

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error('MONGODB_URI no definido. Exporta la variable y vuelve a ejecutar.');
  process.exit(1);
}

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    console.log('Ping exitoso: conectado a MongoDB Atlas!');
  } catch (err) {
    console.error('Error conexión MongoDB:', err);
    process.exitCode = 1;
  } finally {
    await client.close();
  }
}

run().catch(err => {
  console.error('Error inesperado:', err);
  process.exit(1);
});
