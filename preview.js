const http = require('http');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const port = process.env.PORT || 4173;

const mimeTypes = {
  '.html': 'text/html; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.jsx': 'application/javascript; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.json': 'application/json; charset=UTF-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

function sendFile(res, filePath) {
  const contentType = getContentType(filePath);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(`❌ Error al leer: ${filePath}`, err.message);
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
      res.end('404 - No se encontró el archivo: ' + path.basename(filePath));
      return;
    }
    res.writeHead(200, { 
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(data);
  });
}

const server = http.createServer((req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  const requestedPath = decodeURIComponent(req.url.split('?')[0] || '/');
  let filePath = path.join(publicDir, requestedPath);

  if (requestedPath === '/' || requestedPath === '') {
    filePath = path.join(publicDir, 'index.html');
  }

  if (!filePath.startsWith(publicDir)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=UTF-8' });
    res.end('403 - Acceso denegado');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // Si no existe, intentar como directorio
      if (fs.existsSync(filePath + '.html')) {
        filePath = filePath + '.html';
      } else if (fs.existsSync(filePath + '.js')) {
        filePath = filePath + '.js';
      } else {
        console.error(`❌ No encontrado: ${requestedPath}`);
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>404 - No encontrado</h1><p>Archivo: ${requestedPath}</p>`);
        return;
      }
    } else if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }

    console.log(`📄 Sirviendo: ${path.relative(publicDir, filePath)}`);
    sendFile(res, filePath);
  });
});

server.listen(port, () => {
  console.log(`\n✅ Preview estático iniciado:`);
  console.log(`   📍 http://localhost:${port}`);
  console.log(`   📁 Directorio: ${publicDir}\n`);
});
