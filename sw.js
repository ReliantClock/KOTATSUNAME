const CACHE_NAME = 'kotatsuname-v1';
const OFFLINE_URL = '/offline.html';

const ASSETS = [
  '/',
  '/index.html', // Actualizado: antes tenías escritos.html
  '/escritos_capitulos.html',
  '/libro_capitulo.html',
  '/registrarse.html',
  '/panel_autor.html',
  '/gestion_capítulos.html',
  '/nueva_obra.html',
  '/escrito_buscador.js',
  '/escrito_data.js',
  '/manifest.json',
  '/buscador.css',
  '/ICONO_192.png',
  '/ICONO_512.png',
  OFFLINE_URL 
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Intenta cachear todos los archivos definidos
      return cache.addAll(ASSETS);
    })
  );
  // Añadimos esto para que Brave reconozca la app más rápido
  self.skipWaiting();
});

// Lógica para detectar fallos de red (La que tenías en GitHub)
self.addEventListener('fetch', (evt) => {
  if (evt.request.mode === 'navigate') {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    evt.respondWith(
      caches.match(evt.request).then((response) => {
        return response || fetch(evt.request);
      })
    );
  }
});
