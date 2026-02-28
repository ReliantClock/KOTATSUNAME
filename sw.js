const CACHE_NAME = 'kotatsuname-v2'; // Incrementamos versión
const OFFLINE_URL = '/offline.html';

const ASSETS = [
'/',
'/index.html',
'/escritos.html',
'/escritos_capitulos.html',
'/libro_capitulo.html',
'/registrarse.html',
'/panel_autor.html',
'/gestion_capítulos.html',
'/nueva_obra.html',
'/buscador.js',
'/catalogo.js',
'/escrito_buscador.js',
'/escrito_data.js',
'/manifest.json',
'/buscador.css',
'/ICONO_192.png',
'/ICONO_512.png',
OFFLINE_URL // ¡Simplemente usa la variable aquí!
];

// Instalación
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); // Fuerza a que el nuevo SW tome el control de inmediato
});

// Activación (Limpieza de cachés viejas)
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Fetch con estrategia híbrida
self.addEventListener('fetch', (evt) => {
  if (evt.request.mode === 'navigate') {
    evt.respondWith(
      fetch(evt.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    evt.respondWith(
      caches.match(evt.request).then((response) => {
        // Retorna caché o busca en red
        return response || fetch(evt.request);
      })
    );
  }
});
