const CACHE_NAME = 'kotatsuname-v2'; // Incrementa la versión al hacer cambios grandes
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

// 1. Instalación: Cachea todo lo esencial
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Cacheando archivos críticos...');
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting(); 
});

// 2. Activación: Limpia cachés antiguos de versiones previas
self.addEventListener('activate', (evt) => {
  evt.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// 3. Estrategia de Carga Inteligente
self.addEventListener('fetch', (evt) => {
  // Ignorar peticiones de otros dominios (como APIs externas si las tuvieras)
  if (!evt.request.url.startsWith(self.location.origin)) return;

  if (evt.request.mode === 'navigate') {
    // Para las páginas HTML: Intentar red, si falla, mostrar Offline
    evt.respondWith(
      fetch(evt.request).catch(() => caches.match(OFFLINE_URL))
    );
  } else {
    // Para Assets (CSS, JS, Imágenes): Stale-While-Revalidate
    evt.respondWith(
      caches.match(evt.request).then((cachedResponse) => {
        const fetchPromise = fetch(evt.request).then((networkResponse) => {
          // Actualizamos el caché con la nueva versión encontrada
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(evt.request, networkResponse.clone());
          });
          return networkResponse;
        });
        // Devuelve el caché si existe, o la red si no
        return cachedResponse || fetchPromise;
      })
    );
  }
});
