# 📡 Guía de Instalación de Sensores - Vías del Chocó

## Para operadores de campo

Esta guía es **SIMPLE Y DIRECTA** - sin tecnicismos. Si tienes dudas, llama al equipo técnico.

---

## ¿Qué es un sensor?

Es una "caja inteligente" que mide:
- 📐 Inclinación del terreno (¿está deslizándose?)
- 💧 Humedad del suelo (¿está mojado?)
- 🌧️ Lluvia acumulada (¿cuánto llueve?)
- 📳 Vibración/temblores (¿tiembla?)
- 🔲 Presión atmosférica (opcional)

Cada 5-10 minutos envía estos datos al servidor central por **WiFi o 4G**.

---

## Paso 1: Solicitar registro del sensor

**Contacta al equipo técnico con esta información:**

1. **Ubicación** (nombre del lugar)
   - Ej: "Km 145 Túnel Quibdó-Medellín"

2. **Coordenadas GPS** (si las tienes)
   - Ej: 5.8521, -75.6521

3. **Nombre único del dispositivo**
   - Ej: "DEVICE-001-QUIBDO" (sin espacios, solo letras/números/guión)

**El equipo técnico te responderá con:**
```
device_id:  DEVICE-001-QUIBDO
api_key:    a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3
url_api:    https://backend.viaschoco.app
```

**GUARDA ESTOS DATOS EN UN PAPEL O NOTA SEGURA** ⚠️

---

## Paso 2: Instalar el hardware

### Materiales necesarios
- ☐ Sensor (ESP32 o Arduino + sensores acoplados)
- ☐ SIM 4G o acceso a WiFi local
- ☐ Caja impermeable
- ☐ Fuente de poder 12V
- ☐ Cable de datos USB (para programar)

### Instalación física

1. **Ubicación:** 
   - ✓ Terreno donde pueda deslizarse (ladera)
   - ✓ Lugar seco y protegido de lluvia directa
   - ✓ Donde no lo moleste la gente

2. **Conexión:**
   - Conectar sensores al ESP32
   - Meter todo en caja impermeable
   - Conectar fuente de poder
   - Conectar SIM/WiFi

3. **Prueba inicial:**
   - ✓ Luz LED parpadeando = OK
   - ✗ Sin luz = problema, revisar conexiones

---

## Paso 3: Programar el dispositivo

### Si sabes programar Arduino/ESP32:

```cpp
#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

// REEMPLAZA ESTOS VALORES CON TUS DATOS
const char* DEVICE_ID = "DEVICE-001-QUIBDO";
const char* API_KEY = "a7f8c9d2e3b1a4f5c6d7e8f9a0b1c2d3";
const char* MQTT_BROKER = "broker.hivemq.com";
const int MQTT_PORT = 1883;

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

void setup() {
  Serial.begin(115200);
  WiFi.begin("SSID", "PASSWORD");  // REEMPLAZA CON TU WiFi
  
  mqttClient.setServer(MQTT_BROKER, MQTT_PORT);
  
  while (!WiFi.connected()) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("WiFi OK!");
}

void loop() {
  if (!mqttClient.connected()) {
    reconnect();
  }
  
  // Leer sensores
  float tilt = readTilt();
  float humidity = readHumidity();
  float rainfall = readRainfall();
  
  // Crear JSON
  StaticJsonDocument<200> doc;
  doc["readings"][0]["type"] = "TILT";
  doc["readings"][0]["value"] = tilt;
  doc["readings"][0]["uuid"] = "001";
  
  doc["readings"][1]["type"] = "HUMIDITY";
  doc["readings"][1]["value"] = humidity;
  doc["readings"][1]["uuid"] = "002";
  
  // Publicar a MQTT
  String topic = String("viaschoco/devices/") + DEVICE_ID + "/readings";
  String payload;
  serializeJson(doc, payload);
  
  mqttClient.publish(topic.c_str(), payload.c_str());
  Serial.println("✓ Datos enviados");
  
  delay(300000);  // Enviar cada 5 minutos
}

void reconnect() {
  while (!mqttClient.connected()) {
    if (mqttClient.connect(DEVICE_ID, DEVICE_ID, API_KEY)) {
      Serial.println("✓ MQTT conectado");
    } else {
      delay(5000);
    }
  }
}

// REEMPLAZA ESTO CON TU LECTURA DE SENSORES
float readTilt() { return 20.5; }
float readHumidity() { return 75.0; }
float readRainfall() { return 10.5; }
```

### Si NO sabes programar:
- Llama al equipo técnico
- El equipo enviará el código precargado
- Solo instala el hardware

---

## Paso 4: Validar funcionamiento

### ¿Cómo saber si funciona?

**Opción 1: Via web**
1. Abre: `https://viaschoco.app`
2. Inicia sesión como admin
3. Ve a "Dashboard de Sensores"
4. Busca tu `device_id`
5. Mira si ves datos recientes ✓

**Opción 2: Via línea de comandos** (si tienes acceso SSH)
```bash
# Ver logs del sensor
mosquitto_sub -h broker.hivemq.com \
  -t 'viaschoco/devices/DEVICE-001-QUIBDO/#'

# Debería mostrar mensajes cada 5 minutos:
{"readings":[{"type":"TILT","value":22.5,...}]}
```

---

## Mantenimiento

### Cada semana:
- ✓ Verifica que el LED esté parpadeando
- ✓ Limpia la "caja" de hojas/suciedad
- ✓ Revisa que no haya agua dentro

### Si falla:
- ❌ LED apagado → Revisa conexión de poder
- ❌ No envía datos → Revisa WiFi/4G
- ❌ Datos locos → Posible daño en sensores

**En caso de fallo, reporta al equipo técnico:**
```
Device ID: DEVICE-001-QUIBDO
Ubicación: [tu ubicación]
Problema: [qué no funciona]
Foto: [toma una foto del dispositivo]
```

---

## ¿Qué pasa con los datos?

```
Sensor (lectura)
    ↓
MQTT Broker (almacenamiento temporal)
    ↓
Servidor Vías del Chocó (análisis)
    ↓
Evalúa riesgo (tilt + lluvia + etc)
    ↓
SI RIESGO > 70% → 🚨 ALERTA en app web
```

**Los datos se usan para:**
- ✓ Mapeo en tiempo real
- ✓ Advertencias a vialistas
- ✓ Registros históricos
- ✓ Mejora de carreteras

**No se publican datos personales** (solo ubicación del sensor).

---

## Emergencias

**SI VES ALGO PELIGROSO:**
- 📞 Llama inmediatamente a vialidad
- 📱 Envía foto al grupo de WhatsApp
- 🚨 Reporta por app (botón de emergencia)

**NO esperes a que el sistema genere alerta**

---

## Contacto

- 📧 Email: soporte@viaschoco.app
- 📞 WhatsApp: +57 314 531 2045
- 🕐 Atención: Lunes a viernes 8am-5pm

---

**Última actualización:** 2026-07-09
**Versión:** 1.0
