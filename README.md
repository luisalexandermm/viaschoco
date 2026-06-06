# Vías del Chocó

Plataforma colaborativa para reportes de estado de carreteras en tiempo real en el departamento del Chocó, Colombia.

## 🚀 Estructura del Proyecto

```
viaschoco/
│
├── public/
│   ├── index.html          # Punto de entrada HTML
│   ├── img/               # Imágenes y logos
│   └── css/               # Estilos CSS
│
├── src/
│   ├── components/        # Componentes React reutilizables
│   │   ├── Header.jsx     # Barra de navegación
│   │   ├── Footer.jsx     # Pie de página
│   │   ├── CardVia.jsx    # Tarjeta de reporte de vía
│   │   └── Alertas.jsx    # Componente de alertas
│   │
│   ├── pages/            # Páginas principales de la aplicación
│   │   ├── Home.jsx      # Página principal
│   │   ├── Reportes.jsx  # Página de reportes
│   │   ├── Admin.jsx     # Panel de administración
│   │   └── SobreNosotros.jsx # Página "Sobre nosotros"
│   │
│   ├── services/         # Servicios y configuraciones
│   │   └── firebase.js   # Configuración de Firebase
│   │
│   ├── App.jsx           # Componente principal con routing
│   ├── main.jsx          # Punto de entrada de React
│   └── index.css         # Estilos globales
│
├── backend/              # Servidor Node.js/Express
│   ├── server.js         # Servidor principal
│   ├── db.js            # Utilidades de base de datos
│   ├── migrate-to-firestore.js # Script de migración
│   └── data/
│       └── database.json # Datos locales (fallback)
│
├── test-alerts.js       # Script de pruebas de alertas
├── .env                 # Variables de entorno
├── package.json         # Dependencias del proyecto
├── preview.js           # Servidor estático para preview
├── firebase.json        # Configuración de Firebase
├── firestore.rules      # Reglas de seguridad de Firestore
└── firestore.indexes.json # Índices de Firestore
```

## 🛠️ Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn
- Cuenta de Firebase

### Instalación

1. **Clona el repositorio:**
   ```bash
   git clone <url-del-repositorio>
   cd vias-choco
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura las variables de entorno:**
   Copia el archivo `.env` y configura tus credenciales de Firebase.

4. **Configura Firebase:**
   - Crea un proyecto en Firebase Console
   - Habilita Firestore Database
   - Configura Authentication
   - Descarga el service account key para el backend

### Migración de Datos

Para migrar los datos existentes a Firestore:

1. Coloca el archivo `firebase-service-account.json` en la carpeta `backend/`
2. Ejecuta el script de migración:
   ```bash
   cd backend
   node migrate-to-firestore.js
   ```

## 🚀 Ejecutar el Proyecto

### Desarrollo
```bash
# Frontend + Backend (preview estático)
npm run preview

# Alias equivalente para compatibilidad
npm run dev

# Solo backend (en otra terminal)
cd backend && node server.js
```

## 🚀 Despliegue

### Backend (Google Cloud Run)
```bash
# Opción 1: Usar script automático
chmod +x deploy.sh
./deploy.sh

# Opción 2: Pasos manuales
gcloud auth login
gcloud config set project vias-choco
gcloud builds submit --config cloudbuild.yaml .
gcloud run deploy viaschoco-backend \
  --image gcr.io/vias-choco/viaschoco-backend \
  --platform managed \
  --region southamerica-east1 \
  --allow-unauthenticated \
  --port 3000 \
  --memory 1Gi \
  --cpu 1
```

### Frontend (Firebase Hosting)
```bash
npm run build
firebase deploy --only hosting
```

### URLs de Producción
- **Frontend**: https://vias-choco.web.app
- **Backend**: Se asigna automáticamente por Cloud Run

## 📁 Descripción de Carpetas

- **`public/`**: Archivos estáticos servidos por el servidor
- **`src/`**: Código fuente de la aplicación React
- **`backend/`**: API REST con Node.js/Express
- **`src/components/`**: Componentes reutilizables
- **`src/pages/`**: Páginas principales (SPA)
- **`src/services/`**: Configuraciones de servicios externos

## 🔧 Tecnologías Utilizadas

### Frontend
- **React 18**: Framework JavaScript
- **Babel standalone + CDN**: Carga de React en el navegador sin bundling
- **Tailwind CSS**: Framework CSS
- **Leaflet**: Mapas interactivos

### Backend
- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web
- **Firebase Admin SDK**: Acceso a Firestore
- **Socket.io**: Comunicación en tiempo real

### Base de Datos
- **Firestore**: Base de datos NoSQL de Firebase
- **JSON local**: Fallback para desarrollo

## 📋 Funcionalidades

- ✅ Reportes de estado de vías en tiempo real
- ✅ Sistema de autenticación de usuarios
- ✅ Panel de administración
- ✅ Mapas interactivos con Leaflet
- ✅ Alertas y notificaciones
- ✅ Interfaz responsive
- ✅ API REST completa

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

**Maturana Innovate Tech**
- Email: AlexanderMaturana76@gmail.com
- WhatsApp: +57 314 531 2045
- Ubicación: Quibdó, Chocó

---

⭐ Si este proyecto te resulta útil, ¡dale una estrella!