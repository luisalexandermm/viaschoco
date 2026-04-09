#!/usr/bin/env node

/**
 * Script de Testing para Sistema de Alertas Geosentinel
 * Genera alertas de prueba y simula sensores
 * 
 * Uso: node test-alerts.js
 */

const http = require('http');

const API_URL = 'http://localhost:3000';

// Colores para terminal
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function makeRequest(method, path, data = null) {
  return new Promise((resolve, reject) => {
    const url = new URL(API_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port || 80,
      path: url.pathname + url.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';
      res.on('data', chunk => responseData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(responseData);
          resolve({ status: res.statusCode, data: parsed });
        } catch {
          resolve({ status: res.statusCode, data: responseData });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function runTests() {
  log('\n╔════════════════════════════════════════════════════════╗', 'cyan');
  log('║  🚨 TESTING: Sistema de Alertas Geosentinel           ║', 'cyan');
  log('╚════════════════════════════════════════════════════════╝\n', 'cyan');

  try {
    // Test 1: Health Check
    log('1️⃣  Verificando conexión al backend...', 'blue');
    const healthRes = await makeRequest('GET', '/api/health');
    if (healthRes.status === 200) {
      log('   ✓ Backend conectado\n', 'green');
    } else {
      log('   ✗ Error conectando al backend\n', 'red');
      return;
    }

    // Test 2: Obtener sensores
    log('2️⃣  Obteniendo sensores geosentinels...', 'blue');
    const sensorsRes = await makeRequest('GET', '/api/geosentinels');
    if (sensorsRes.status === 200) {
      log(`   ✓ ${sensorsRes.data.length} sensores encontrados:`, 'green');
      sensorsRes.data.forEach(s => {
        log(`      📡 ${s.name} - Riesgo: ${s.riskLevel.toFixed(1)}% - Estado: ${s.status}`, 'cyan');
      });
    }

    // Test 3: Obtener alertas actuales
    log('\n3️⃣  Obteniendo alertas actuales...', 'blue');
    const alertsRes = await makeRequest('GET', '/api/alerts');
    if (alertsRes.status === 200) {
      log(`   ✓ ${alertsRes.data.length} alerta(s) encontrada(s)`, 'green');
      if (alertsRes.data.length > 0) {
        alertsRes.data.forEach(a => {
          log(`      🚨 ${a.location} - Riesgo: ${a.riskLevel.toFixed(1)}%`, 'yellow');
        });
      }
    }

    // Test 4: Obtener clima
    log('\n4️⃣  Obteniendo condiciones climáticas...', 'blue');
    const weatherRes = await makeRequest('GET', '/api/weather');
    if (weatherRes.status === 200) {
      const w = weatherRes.data;
      log(`   ✓ Clima actual:`, 'green');
      log(`      🌡️  Temperatura: ${w.temperature.toFixed(1)}°C`, 'cyan');
      log(`      💧 Humedad: ${w.humidity.toFixed(1)}%`, 'cyan');
      log(`      🌧️  Lluvia: ${w.rainfall.toFixed(1)}mm/h`, 'cyan');
      log(`      💨 Viento: ${w.windSpeed.toFixed(1)} km/h\n`, 'cyan');
    }

    // Test 5: Crear alerta de prueba
    log('5️⃣  Creando alerta de prueba (riesgo alto)...', 'blue');
    const newAlertRes = await makeRequest('POST', '/api/alerts', {
      sensorId: 1,
      location: 'GEO-Quibdó-Medellín-km145',
      riskLevel: 88
    });
    
    if (newAlertRes.status === 201) {
      log('   ✓ Alerta de prueba creada exitosamente', 'green');
      log(`      ID: ${newAlertRes.data.id}`, 'green');
      log(`      Riesgo: ${newAlertRes.data.riskLevel}%`, 'green');
      log(`      ETA: ${newAlertRes.data.timeToEvent}\n`, 'green');

      // Test 6: Resolver alerta
      log('6️⃣  Resolviendo alerta de prueba...', 'blue');
      const resolveRes = await makeRequest('DELETE', `/api/alerts/${newAlertRes.data.id}`);
      if (resolveRes.status === 200) {
        log('   ✓ Alerta resuelta exitosamente\n', 'green');
      }
    }

    // Test 7: Crear nuevo geosentinel
    log('7️⃣  Creando nuevo sensor geosentinel...', 'blue');
    const newSensorRes = await makeRequest('POST', '/api/geosentinels', {
      name: 'GEO-Test-NewSensor',
      lat: 5.8000,
      lng: -75.8000
    });
    
    if (newSensorRes.status === 201) {
      log('   ✓ Nuevo sensor creado', 'green');
      log(`      ID: ${newSensorRes.data.id}`, 'green');
      log(`      Nombre: ${newSensorRes.data.name}`, 'green');
      log(`      Ubicación: (${newSensorRes.data.lat}, ${newSensorRes.data.lng})\n`, 'green');

      // Test 8: Actualizar datos del sensor
      log('8️⃣  Actualizando datos del sensor...', 'blue');
      const updateRes = await makeRequest('PUT', `/api/geosentinels/${newSensorRes.data.id}`, {
        riskLevel: 42,
        humidity: 65,
        pressure: 1012
      });
      
      if (updateRes.status === 200) {
        log('   ✓ Sensor actualizado correctamente', 'green');
        log(`      Riesgo: ${updateRes.data.riskLevel.toFixed(1)}%`, 'green');
        log(`      Humedad: ${updateRes.data.humidity.toFixed(1)}%`, 'green');
        log(`      Presión: ${updateRes.data.pressure.toFixed(1)} mb\n`, 'green');
      }
    }

    // Resumen final
    log('╔════════════════════════════════════════════════════════╗', 'green');
    log('║  ✓ TODOS LOS TESTS COMPLETADOS EXITOSAMENTE          ║', 'green');
    log('╚════════════════════════════════════════════════════════╝', 'green');
    
    log('\n📊 Próximos pasos:', 'yellow');
    log('1. Abre admin.html en http://localhost/admin.html', 'cyan');
    log('2. Inicia sesión como admin', 'cyan');
    log('3. Dirígete a la pestaña "Alertas"', 'cyan');
    log('4. Verás los sensores y alertas en tiempo real', 'cyan');
    log('\n⏱️  Las alertas se generan automáticamente cuando:', 'yellow');
    log('   - Riesgo de sensor > 75%', 'cyan');
    log('   - Lluvia > 50mm/h', 'cyan');
    log('   - Humedad del suelo > 80%\n', 'cyan');

  } catch (error) {
    log(`\n❌ Error durante los tests: ${error.message}`, 'red');
    log('Asegúrate que el backend esté corriendo con: npm start\n', 'yellow');
  }
}

// Ejecutar tests
runTests();
