# Vías del Chocó 🚧🌿

Plataforma web colaborativa para consultar el **estado de las carreteras del Chocó**
en tiempo real: reportes de la comunidad, alertas de sensores, mapa interactivo,
clima de las rutas y un panel de administración.

Hecho con **React (por CDN, sin compilar)** en el frontend y un **backend sencillo
en Node + Express con base de datos en archivo JSON**.

---

## 📁 Estructura del proyecto

```
viaschoco/
├── public/                 → Frontend (lo que ve el usuario)
│   ├── index.html
│   ├── estilos/estilos.css  → Estilos y colores de la marca
│   ├── img/                 → Logos y fotos del equipo
│   ├── vendor/              → Librerías (React, Leaflet, Babel...)
│   └── js/
│       ├── config.js        → Direcciones y llaves
│       ├── datos.js         → Vías, noticias y datos demo
│       ├── api.js           → Habla con el backend (o usa el navegador)
│       ├── main.js          → Aplicación principal
│       ├── componentes/     → Header, Footer, Mapa, Modales, Panel admin...
│       └── paginas/         → Sobre nosotros, Legal, Términos, Cookies...
│   └── app.build.js         → Código de arriba ya "armado" (lo carga el navegador)
│
├── compilar.js             → Junta el código de js/ en app.build.js (opcional)
│
├── backend/                → Servidor (Node + Express)
│   ├── server.js            → Servidor y rutas de la API
│   ├── basededatos.js       → Lee y guarda el archivo JSON
│   └── data/db.json         → La base de datos (usuarios, reportes, alertas)
│
├── preview.js              → Servidor rápido para ver el frontend
└── README.md
```

---

## ▶️ Cómo correr el proyecto

### Opción 1: solo el frontend (más fácil)

```bash
npm start
```

Luego abre en el navegador: **http://localhost:4173**

> El frontend funciona solo, guardando los datos en el navegador (localStorage).
> No necesitas el backend para probarlo.
>
> También puedes abrir directamente `public/index.html` con doble clic:
> ahora la página carga rápido porque el código ya viene compilado en
> `app.build.js` (no se compila en el navegador).

### Instalar en Android como aplicación

La web es instalable desde Chrome cuando está publicada por HTTPS. En Android,
abre la dirección de Vías del Chocó en Chrome y toca **Instalar** (o **⋮ →
Instalar aplicación**). Los archivos propios de la aplicación quedan disponibles
sin conexión; los reportes del servidor, el clima y otros servicios externos sí
necesitan internet.

Esto instala la PWA desde el navegador, pero no la publica en Google Play. Para
aparecer en Play Store hay que empaquetarla como Trusted Web Activity y completar
el proceso de publicación de Google Play Console.

### ✏️ Si editas el código del frontend

Los archivos de `js/componentes` y `js/paginas` están escritos con JSX (fácil
de leer). Después de cambiarlos, vuelve a "armar" el bundle con:

```bash
node compilar.js
```

Eso regenera `public/app.build.js`, que es lo que realmente carga el navegador.

### Opción 2: con el backend (base de datos JSON)

```bash
cd backend
npm install
npm start
```

El servidor queda en **http://localhost:3001** y también sirve el frontend.
Los reportes se guardan en `backend/data/db.json`.

---

## 🚪 Cómo se entra (sin registro)

Es un sitio **público de reportes**, así que no hay inicio de sesión para la gente:

1. Al abrir aparece una pantalla de bienvenida con un control **"Desliza para entrar"**
   (o el botón "o entra directo"). Al entrar ya puedes ver y crear reportes.
2. Para reportar solo pones el nombre (opcional) y los datos de la vía.

### Acceso de administrador (oculto)

El panel de administrador está escondido en un **punto pequeño** al final del pie
de página (junto a los íconos de redes). Al hacer clic pide la contraseña:

| Rol           | Correo                | Contraseña |
|---------------|-----------------------|------------|
| Administrador | `admin@viaschoco.com` | `admin123` |

> Cambia esta contraseña antes de publicar el proyecto en internet.
> El administrador puede aprobar/eliminar reportes y ver el estado de las vías.

---

## 🌐 Rutas de la API (backend)

| Método | Ruta                        | Para qué sirve            |
|--------|-----------------------------|---------------------------|
| GET    | `/api/salud`                | Ver si el servidor vive   |
| GET    | `/api/reportes`             | Listar reportes           |
| POST   | `/api/reportes`             | Crear un reporte          |
| PUT    | `/api/reportes/:id`         | Aprobar/editar un reporte |
| DELETE | `/api/reportes/:id`         | Eliminar un reporte       |
| GET    | `/api/usuarios`             | Listar usuarios           |
| POST   | `/api/usuarios/registro`    | Registrar usuario         |
| POST   | `/api/usuarios/login`       | Iniciar sesión            |
| PUT    | `/api/usuarios/:email`      | Bloquear/desbloquear      |
| DELETE | `/api/usuarios/:email`      | Eliminar usuario          |
| GET    | `/api/alertas`              | Listar alertas de sensores|

---

Hecho por **Luis Alexander Maturana** — Maturana Tech · Quibdó, Chocó 🇨🇴
