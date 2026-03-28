# Vías del Chocó - Configuración OpenWeather

## 🌤️ Integración con OpenWeather API

Para obtener datos meteorológicos reales en tiempo real:

### 1. Obtener API Key Gratuita
1. Ve a [OpenWeather](https://openweathermap.org/api)
2. Crea una cuenta gratuita
3. Ve a "My API Keys" en tu dashboard
4. Copia tu API key

### 2. Configurar en el Código
En `index.html`, busca esta línea:
```javascript
const API_KEY = 'TU_API_KEY_DE_OPENWEATHER_AQUI'; // Reemplaza con tu API key gratuita de OpenWeather
```

Reemplaza `'TU_API_KEY_DE_OPENWEATHER_AQUI'` con tu API key real.

### 3. Funcionalidades
- **Humedad**: Porcentaje de humedad del aire
- **Temperatura**: En grados Celsius
- **Precipitación**: Probabilidad/Intensidad de lluvia (cuando está lloviendo)
- **Estado de vía**: Se actualiza automáticamente basado en condiciones climáticas:
  - Buena: Humedad < 75% y Precipitación < 25%
  - Regular: Humedad 75-85% o Precipitación 25-50%
  - Mala: Humedad > 85% o Precipitación > 50%

### 4. Actualización
- Los datos se actualizan cada 10 minutos automáticamente
- Si falla la API, usa simulación como respaldo

### 5. Notas
- La API gratuita tiene límite de 1000 llamadas/día
- Las coordenadas de las vías están pre-configuradas
- Funciona offline con simulación si no hay internet</content>
<parameter name="filePath">c:\Users\Maritza\Documents\GitHub\viaschoco\OPENWEATHER_SETUP.md