Uso de Neon (Postgres) + Netlify Functions para el backend

Resumen
- Backend serverless: Netlify Functions con SDK oficial `@netlify/neon`.
- Base de datos: Postgres en Neon (https://neon.tech).
- Las funciones están en `netlify/functions/reports.js` y `netlify/functions/users.js`.
- La app frontend apunta a las funciones mediante rutas: `/.netlify/functions/reports` y `/.netlify/functions/users`.

Pasos para desplegar en Netlify + Neon
1. Crear una base de datos en Neon
   - Ve a https://neon.tech, crea una cuenta y un proyecto.
   - Obtén la connection string (formato: `postgresql://user:password@host/dbname`).
   - En Neon, puedes copiar la "Connection string" desde el dashboard.

2. Conectar Netlify a Neon (integración oficial)
   - En Netlify Dashboard, ve a Integrations o Settings.
   - Busca "Neon" y conecta tu proyecto de Neon.
   - Netlify automáticamente poblará la variable de entorno `NETLIFY_DATABASE_URL`.

   Alternativa: establecer manualmente la variable de entorno
   - En Netlify, Site settings → Build & deploy → Environment → Environment variables.
   - Crear: `NETLIFY_DATABASE_URL` = <tu_connection_string> (o `DATABASE_URL` si lo prefieres).

3. Ejecutar migración (crear tablas)
   - Puedes ejecutar el SQL en `migrations/001_init.sql` desde:
     a) La interfaz SQL de Neon (botón "SQL Editor" en el dashboard).
     b) Localmente con psql:
        psql "<tu_connection_string>" -f migrations/001_init.sql

4. Push a GitHub y conectar a Netlify
   - Si el repo ya está conectado a Netlify, solo haz push.
   - Si no, conecta el repo en Netlify Dashboard (New site from Git).
   - Netlify detectará el repo y desplegará automáticamente.
   - Las Netlify Functions se expondrán en producción como `/.netlify/functions/<name>`.

5. Verificar el despliegue
   - Abre la URL de tu sitio en Netlify.
   - Desde la UI de la app, el frontend harará peticiones a `/.netlify/functions/reports` y `/.netlify/functions/users`.
   - Comprueba en Netlify → Functions que las funciones estén activas.

Notas técnicas
- **SDK usado:** `@netlify/neon` — integración oficial de Netlify para Neon.
- **Variables de entorno:** Usa `NETLIFY_DATABASE_URL` (recomendado) o `DATABASE_URL`.
- **Template literals SQL:** Las funciones usan `` await sql`SELECT ...` `` para queries (más seguro que concatenación de strings).
- **Connection pooling:** El SDK maneja automáticamente el pool de conexiones para serverless.

Soporte local (desarrollo)
- Para ejecutar Netlify Functions localmente:
  1. Instala el CLI de Netlify: `npm install -g netlify-cli`
  2. En PowerShell, exporta la variable de entorno:
     ```powershell
     $env:NETLIFY_DATABASE_URL = "<tu_connection_string>"
     ```
     O crea un archivo `.env` en la raíz:
     ```
     NETLIFY_DATABASE_URL=postgresql://user:password@host/dbname
     ```
  3. Ejecuta las funciones localmente:
     ```bash
     netlify dev
     ```
  4. Las funciones estarán disponibles en `http://localhost:8888/.netlify/functions/reports` y `http://localhost:8888/.netlify/functions/users`.

Solución de problemas
- **Error: "Database not configured"** — Asegúrate de que `NETLIFY_DATABASE_URL` o `DATABASE_URL` esté establecida.
- **Error de conexión CORS** — Neon puede requerir ajustes de políticas. Revisa la documentación de Neon para serverless.
- **Tablas no existen** — Ejecuta la migración: `psql "<connection_string>" -f migrations/001_init.sql`.

Archivos clave
- `netlify/functions/reports.js` — API para reportes (GET/POST/PUT/DELETE).
- `netlify/functions/users.js` — API para usuarios (GET/POST/PUT).
- `migrations/001_init.sql` — Script SQL para crear tablas.
- `package.json` — Dependencias (incluye `@netlify/neon`).

Si tienes preguntas o necesitas ayuda, revisa:
- Documentación de Netlify: https://docs.netlify.com/functions/overview/
- Documentación de Neon: https://neon.tech/docs/


Soporte local (desarrollo)
- Para ejecutar Netlify Functions localmente:
  1. Instala el CLI de Netlify: `npm install -g netlify-cli`
  2. En PowerShell, exporta la variable de entorno:
     ```powershell
     $env:NETLIFY_DATABASE_URL = "<tu_connection_string>"
     ```
     O crea un archivo `.env` en la raíz:
     ```
     NETLIFY_DATABASE_URL=postgresql://user:password@host/dbname
     ```
  3. Ejecuta las funciones localmente:
     ```bash
     netlify dev
     ```
  4. Las funciones estarán disponibles en `http://localhost:8888/.netlify/functions/reports` y `http://localhost:8888/.netlify/functions/users`.

