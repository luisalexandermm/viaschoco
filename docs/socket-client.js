/**
 * Socket.io Cliente para alertas en tiempo real
 * Maneja conexión WebSocket con el backend
 * Emite eventos de geosentinels, klimayt alertas
 */

const SOCKET_SERVER_URL = 'http://localhost:3000';

class SocketClient {
  constructor() {
    this.socket = null;
    this.geosentinels = [];
    this.alerts = [];
    this.weather = {};
    this.listeners = {
      'geosentinels:updated': [],
      'alert:landslide': [],
      'weather:updated': [],
      'connection': [],
      'disconnect': []
    };
    this.init();
  }

  init() {
    // Cargar socket.io desde CDN si no está disponible
    if (typeof io === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdn.socket.io/4.5.4/socket.io.min.js';
      script.onload = () => this.connect();
      document.head.appendChild(script);
    } else {
      this.connect();
    }
  }

  connect() {
    this.socket = io(SOCKET_SERVER_URL);

    // Conexión establecida
    this.socket.on('connect', () => {
      console.log('✅ Conectado al servidor en tiempo real');
      this.emit('connection');
    });

    // Desconexión
    this.socket.on('disconnect', () => {
      console.log('❌ Desconectado del servidor');
      this.emit('disconnect');
    });

    // Geosentinels - estado inicial
    this.socket.on('geosentinels:all', (data) => {
      this.geosentinels = data;
      console.log('📡 Geosentinels cargados:', data);
    });

    // Geosentinels - actualizaciones en tiempo real
    this.socket.on('geosentinels:updated', (data) => {
      this.geosentinels = data;
      this.emit('geosentinels:updated', data);
    });

    // Nuevo geosentinel creado
    this.socket.on('geosentinel:created', (data) => {
      this.geosentinels.push(data);
      console.log('📍 Nuevo geosentinel agregado:', data);
    });

    // Alertas - cargar todas inicialmente
    this.socket.on('alerts:all', (data) => {
      this.alerts = data;
      console.log('🚨 Alertas cargadas:', data);
    });

    // ALERTA DE DESLIZAMIENTO - EVENTO CRÍTICO
    this.socket.on('alert:landslide', (alert) => {
      this.alerts.push(alert);
      console.log('🚨 ALERTA CRÍTICA:', alert);
      this.emit('alert:landslide', alert);
      this.showAlertBanner(alert);
      this.playAlertSound();
      this.requestNotification(alert);
    });

    // Alerta resuelta
    this.socket.on('alert:resolved', (data) => {
      this.alerts = this.alerts.filter(a => a.id !== data.alertId);
      console.log('✅ Alerta resuelta:', data.alertId);
    });

    // Clima - estado inicial
    this.socket.on('weather:current', (data) => {
      this.weather = data;
      console.log('🌦️ Clima actual:', data);
    });

    // Clima - actualizaciones
    this.socket.on('weather:updated', (data) => {
      this.weather = data;
      this.emit('weather:updated', data);
    });
  }

  // Mostrar banner rojo de alerta
  showAlertBanner(alert) {
    // Eliminar banner anterior si existe
    const oldBanner = document.getElementById('alert-banner');
    if (oldBanner) oldBanner.remove();

    const banner = document.createElement('div');
    banner.id = 'alert-banner';
    banner.style.cssText = `
      position: fixed; 
      top: 0; 
      left: 0; 
      right: 0; 
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
      color: white; 
      padding: 16px 24px; 
      z-index: 9999; 
      text-align: center; 
      font-size: 18px; 
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
      animation: slideDown 0.5s ease-out;
      letter-spacing: 0.5px;
    `;
    
    banner.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; gap: 12px;">
        <span style="font-size: 24px; animation: pulse 1s infinite;">🚨</span>
        <div>
          <div>${alert.recommendation}</div>
          <div style="font-size: 14px; margin-top: 4px;">
            ${alert.location} • Riesgo: ${alert.riskLevel.toFixed(1)}% • ETA: ${alert.timeToEvent}
          </div>
        </div>
        <span style="font-size: 24px; animation: pulse 1s infinite;">🚨</span>
      </div>
    `;
    
    document.body.prepend(banner);

    // Auto-remover después de 30 segundos
    setTimeout(() => {
      if (banner.parentNode) {
        banner.style.animation = 'slideUp 0.5s ease-out';
        setTimeout(() => banner.remove(), 500);
      }
    }, 30000);
  }

  // Reproducir sonido de alerta (si el navegador lo permite)
  playAlertSound() {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      
      // Crear un beep de 3 segundos
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.value = 800;
      oscillator.type = 'sine';
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
      console.log('Audio no disponible');
    }
  }

  // Solicitar permiso y enviar notificación del navegador
  requestNotification(alert) {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        this.sendNotification(alert);
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            this.sendNotification(alert);
          }
        });
      }
    }
  }

  sendNotification(alert) {
    const notification = new Notification('⚠️ ALERTA DE DESLIZAMIENTO', {
      body: `${alert.location}\nRiesgo: ${alert.riskLevel.toFixed(1)}%\nETA: ${alert.timeToEvent}`,
      icon: '⚠️',
      tag: 'landslide-alert',
      requireInteraction: true
    });

    notification.onclick = () => {
      window.focus();
      notification.close();
    };
  }

  // Sistema de escuchadores (listeners)
  on(event, callback) {
    if (this.listeners[event]) {
      this.listeners[event].push(callback);
    }
  }

  emit(event, data = null) {
    if (this.listeners[event]) {
      this.listeners[event].forEach(callback => callback(data));
    }
  }

  // Métodos para obtener datos
  getGeosentinels() {
    return this.geosentinels;
  }

  getAlerts() {
    return this.alerts;
  }

  getWeather() {
    return this.weather;
  }

  getAlertsBySensor(sensorId) {
    return this.alerts.filter(a => a.sensorId === sensorId);
  }

  // Métodos para enviar datos al servidor
  async updateSensorData(sensorId, data) {
    try {
      const response = await fetch(`http://localhost:3000/api/geosentinels/${sensorId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      return await response.json();
    } catch (error) {
      console.error('Error actualizando sensor:', error);
    }
  }

  async createAlert(sensorId, location, riskLevel) {
    try {
      const response = await fetch('http://localhost:3000/api/alerts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sensorId, location, riskLevel })
      });
      return await response.json();
    } catch (error) {
      console.error('Error creando alerta:', error);
    }
  }

  async resolveAlert(alertId) {
    try {
      await fetch(`http://localhost:3000/api/alerts/${alertId}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error('Error resolviendo alerta:', error);
    }
  }

  async updateWeather(weatherData) {
    try {
      const response = await fetch('http://localhost:3000/api/weather', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(weatherData)
      });
      return await response.json();
    } catch (error) {
      console.error('Error actualizando clima:', error);
    }
  }
}

// Crear instancia global
window.socketClient = new SocketClient();

// Añadir estilos de animación
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(0);
      opacity: 1;
    }
    to {
      transform: translateY(-100%);
      opacity: 0;
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes blink {
    0%, 100% {
      background-color: #ef4444;
    }
    50% {
      background-color: #dc2626;
    }
  }

  .geo-sensor-alert {
    animation: pulse 2s infinite;
  }
`;
document.head.appendChild(style);

console.log('🔌 Socket.io cliente cargado');
