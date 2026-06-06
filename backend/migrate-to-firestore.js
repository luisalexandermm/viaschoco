const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK
const serviceAccount = require('./firebase-service-account.json'); // You'll need to add this file
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function migrateData() {
  try {
    // Read existing data
    const data = JSON.parse(fs.readFileSync('./data/database.json', 'utf8'));

    console.log('Starting migration...');

    // Migrate users
    console.log('Migrating users...');
    for (const user of data.users) {
      const userRef = db.collection('users').doc(user.email);
      await userRef.set({
        name: user.name,
        email: user.email,
        password: user.password, // Note: In production, hash passwords!
        role: user.role,
        blocked: user.blocked,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Migrated user: ${user.email}`);
    }

    // Migrate reports
    console.log('Migrating reports...');
    for (const report of data.reports) {
      const reportRef = db.collection('reports').doc();
      await reportRef.set({
        title: report.title,
        message: report.message,
        user: report.user,
        location: report.location,
        status: report.status,
        time: admin.firestore.Timestamp.fromDate(new Date(report.time)),
        approved: report.approved,
        geocoded: report.geocoded,
        createdAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log(`Migrated report: ${report.title}`);
    }

    // Migrate alerts if any
    if (data.alerts && data.alerts.length > 0) {
      console.log('Migrating alerts...');
      for (const alert of data.alerts) {
        const alertRef = db.collection('alerts').doc();
        await alertRef.set({
          ...alert,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`Migrated alert: ${alert.id || 'unknown'}`);
      }
    }

    // Migrate geosentinels if any
    if (data.geosentinels && data.geosentinels.length > 0) {
      console.log('Migrating geosentinels...');
      for (const geosentinel of data.geosentinels) {
        const geoRef = db.collection('geosentinels').doc();
        await geoRef.set({
          ...geosentinel,
          createdAt: admin.firestore.FieldValue.serverTimestamp()
        });
        console.log(`Migrated geosentinel: ${geosentinel.id || 'unknown'}`);
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    process.exit();
  }
}

migrateData();