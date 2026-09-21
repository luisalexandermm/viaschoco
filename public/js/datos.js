// ============================================================
//  DATOS DE LA APLICACION
//  Aqui estan las vias del Choco, las noticias de ejemplo y los
//  datos demo que se usan cuando no hay servidor conectado.
//  Todo en un solo objeto llamado DATOS.
// ============================================================

window.DATOS = {
  // ---- Lista de vias que se monitorean ----
  // Cada via tiene su nombre, estado, kilometros y coordenadas
  // (lat y lng) para poder pintarla en el mapa.
  vias: [
    { id: 1, titulo: "Vía Quibdó - Medellín (Túnel de Occidente)", estado: "Regular", alcance: "exterior", desde: "Quibdó", hasta: "Medellín", km: "240 km", descripcion: "Principal vía que conecta el Chocó con Antioquia.", humedad: 78, precipitacion: 55, temperatura: 24, lat: 6.2442, lng: -75.5812 },
    { id: 2, titulo: "Vía Quibdó - Pereira (Anserma - Tadó)", estado: "Regular", alcance: "exterior", desde: "Quibdó", hasta: "Pereira", km: "195 km", descripcion: "Conecta con Risaralda pasando por Tadó.", humedad: 83, precipitacion: 65, temperatura: 23, lat: 5.0353, lng: -75.6757 },
    { id: 3, titulo: "Vía Quibdó - Istmina - Condoto", estado: "Buena", alcance: "interior", desde: "Quibdó", hasta: "Istmina", km: "86 km", descripcion: "Vía intermunicipal que conecta la capital con Istmina y Condoto.", humedad: 85, precipitacion: 52, temperatura: 25, lat: 5.1589, lng: -76.6521 },
    { id: 4, titulo: "Vía Quibdó - Lloró", estado: "Regular", alcance: "interior", desde: "Quibdó", hasta: "Lloró", km: "72 km", descripcion: "Conecta con el municipio de Lloró en la zona del medio San Juan.", humedad: 88, precipitacion: 68, temperatura: 22, lat: 5.6817, lng: -76.5428 },
    { id: 5, titulo: "Vía Tadó - Certeguí", estado: "Mala", alcance: "interior", desde: "Tadó", hasta: "Certeguí", km: "45 km", descripcion: "Vía en mal estado que requiere mantenimiento constante.", humedad: 92, precipitacion: 77, temperatura: 21, lat: 5.2637, lng: -76.5595 },
    { id: 6, titulo: "Vía Istmina - Río Iró", estado: "Buena", alcance: "interior", desde: "Istmina", hasta: "Río Iró", km: "32 km", descripcion: "Vía hacia la zona del Río Iró en buen estado.", humedad: 80, precipitacion: 45, temperatura: 26, lat: 5.1823, lng: -76.6685 },
    { id: 7, titulo: "Vía Carmen de Atrato - Vigía del Fuerte", estado: "Regular", alcance: "interior", desde: "Carmen de Atrato", hasta: "Vigía del Fuerte", km: "55 km", descripcion: "Conecta con la zona del Atrato medio.", humedad: 84, precipitacion: 60, temperatura: 23, lat: 5.8986, lng: -76.1425 },
    { id: 8, titulo: "Vía Quibdó - Unión Panamericana", estado: "Buena", alcance: "interior", desde: "Quibdó", hasta: "Unión Panamericana", km: "38 km", descripcion: "Vía en buen estado hacia el norte del departamento.", humedad: 79, precipitacion: 50, temperatura: 25, lat: 5.2874, lng: -76.6299 },
  ],

  // ---- Noticias de ejemplo (simulan redes sociales) ----
  noticias: [
    { id: 1, titulo: "Derrumbe en la vía Quibdó - Medellín", fuente: "Facebook", tiempo: "Hace 12 min", resumen: "Vecinos reportan caída de piedras alrededor del Km 145. Tránsito lento.", enlace: "https://facebook.com/viaschoco" },
    { id: 2, titulo: "Inundación en el sector de Tadó", fuente: "Facebook", tiempo: "Hace 25 min", resumen: "Video del desbordamiento que afecta el tramo Tadó - Pereira.", enlace: "https://facebook.com/viaschoco" },
    { id: 3, titulo: "Vehículo varado en Condoto", fuente: "Facebook", tiempo: "Hace 38 min", resumen: "Un camión quedó atravesado en el puente de Condoto.", enlace: "https://facebook.com/viaschoco" },
  ],

  // ---- Usuarios demo (para cuando no hay servidor) ----
  usuariosDemo: [
    { nombre: "Administrador", email: "admin@viaschoco.com", clave: "admin123", rol: "admin", bloqueado: false },
    { nombre: "Usuario Demo", email: "usuario@viaschoco.com", clave: "12345", rol: "usuario", bloqueado: false },
  ],

  // ---- Reportes demo ----
  reportesDemo: [
    { id: 1001, via: "Vía Tadó - Certeguí", titulo: "Vía Tadó - Certeguí", estado: "Mala", ubicacion: "Km 20 aprox.", descripcion: "Derrumbe parcial sobre la calzada tras las lluvias. Paso a un solo carril.", recomendacion: "Conducir con precaución y reducir velocidad.", autor: "Usuario Demo", lat: 5.2637, lng: -76.5595, aprobado: true, fecha: "2026-09-18T14:30:00.000Z" },
    { id: 1002, via: "Vía Quibdó - Istmina - Condoto", titulo: "Vía Quibdó - Istmina - Condoto", estado: "Buena", ubicacion: "Sector Istmina", descripcion: "Vía despejada y en buen estado, tránsito normal.", recomendacion: "Sin novedad.", autor: "Usuario Demo", lat: 5.1589, lng: -76.6521, aprobado: true, fecha: "2026-09-19T08:15:00.000Z" },
  ],

  // ---- Alertas demo (sensores) ----
  alertasDemo: [
    { id: 2001, sensorId: "S-01", ubicacion: "Sensor Km 145 Quibdó - Medellín", estado: "Mala", nivelRiesgo: 74, resumen: "Sensor detecta alta humedad e inclinación del terreno. Riesgo de deslizamiento.", fuente: "GeoSentinel", fecha: "2026-09-19T18:40:00.000Z", lat: 6.10, lng: -76.05 },
  ],
};
