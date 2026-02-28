const CACHE_NAME = 'kotatsuname-v1';
const OFFLINE_URL = '/offline.html';

const ASSETS = [
  '/',
  '/index.html',
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
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting(); 
});

self.addEventListener('activate', (evt) => {
  evt.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (evt) => {
  if (evt.request.mode === 'navigate') {
    evt.respondWith(
      fetch(evt.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    evt.respondWith(
      caches.match(evt.request).then((response) => response || fetch(evt.request))
    );
  }
});
