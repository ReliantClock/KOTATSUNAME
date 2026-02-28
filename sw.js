const CACHE_NAME = 'kotatsuname-v2'; // Actualizado a v2
const OFFLINE_URL = '/offline.html';

const ASSETS = [
  '/',
  '/index.html', // Ruta actualizada
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

// 1. Instalación: Cachea todo lo esencial
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cacheando archivos críticos...');
      return cache.addAll(ASSETS);
    })
  );
  // Fuerza al Service Worker a tomar el control inmediatamente
  self.skipWaiting(); 
});

// 2. Activación: Limpieza y Reclamación de Clientes
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    Promise.all([
      // Limpia cachés antiguos
      caches.keys().then((keys) => {
        return Promise.all(
          keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
        );
      }),
      // Permite que el SW controle las pestañas abiertas de inmediato
      self.clients.claim()
    ])
  );
});

// 3. Estrategia de Carga Inteligente (Network First para Navegación)
self.addEventListener('fetch', (evt) => {
  if (!evt.request.url.startsWith(self.location.origin)) return;

  if (evt.request.mode === 'navigate') {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        // Si falla la red, intenta buscar la página exacta en caché o el modo offline
        return caches.match(evt.request).then((response) => {
          return response || caches.match(OFFLINE_URL);
        });
      })
    );
  } else {
    // Para Assets: Stale-While-Revalidate
    evt.respondWith(
      caches.match(evt.request).then((cachedResponse) => {
        const fetchPromise = fetch(evt.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(evt.request, responseToCache);
            });
          }
          return networkResponse;
        });
        return cachedResponse || fetchPromise;
      })
    );
  }
});
