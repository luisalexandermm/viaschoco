const CACHE_NAME = "viaschoco-static-v1";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./estilos/estilos.css",
  "./vendor/react.development.js",
  "./vendor/react-dom.development.js",
  "./vendor/leaflet.js",
  "./vendor/leaflet.css",
  "./vendor/turf.min.js",
  "./js/config.js",
  "./js/datos.js",
  "./js/api.js",
  "./js/pwa.js",
  "./app.build.js",
  "./img/logoviaa.png",
  "./img/pwa-192.png",
  "./img/pwa-512.png"
];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function (cache) { return cache.addAll(APP_SHELL); })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys()
      .then(function (keys) {
        return Promise.all(keys.filter(function (key) {
          return key.indexOf("viaschoco-") === 0 && key !== CACHE_NAME;
        }).map(function (key) { return caches.delete(key); }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

self.addEventListener("fetch", function (event) {
  var request = event.request;
  var url = new URL(request.url);
  if (request.method !== "GET" || url.origin !== self.location.origin || url.pathname.indexOf("/api/") === 0) return;

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(function (response) {
          if (response.ok) {
            var copy = response.clone();
            caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
          }
          return response;
        })
        .catch(function () { return caches.match(request).then(function (cached) { return cached || caches.match("./index.html"); }); })
    );
    return;
  }

  event.respondWith(
    caches.match(request).then(function (cached) {
      if (cached) return cached;
      return fetch(request).then(function (response) {
        if (response.ok) {
          var copy = response.clone();
          caches.open(CACHE_NAME).then(function (cache) { cache.put(request, copy); });
        }
        return response;
      });
    })
  );
});