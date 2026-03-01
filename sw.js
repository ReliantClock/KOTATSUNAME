const CACHE_NAME = 'kotatsuname-v1';
const OFFLINE_URL = '/offline.html'; // Definimos la ruta offline

const ASSETS = [
  '/',
  '/v2/index.html',

  '/v2/escritos_capitulos.html',
  '/v2/libro_capitulo.html',
  '/v2/registrarse.html',
  '/v2/panel_autor.html',
  '/v2/gestion_capítulos.html',
  '/v2/nueva_obra.html',
  '/v2/escrito_buscador.js',
  '/v2/escrito_data.js',
  '/v2/staff_auth.js',
  '/v2/perfil_autor.html',
  '/v2/panel_owner.html',
  '/v2/panel_mod.html',
  '/v2/panel_autor.html',
  '/v2/panel_admin.html',
  '/v2/manifest.json',
  '/v2/buscador.css',
  '/ICONO_192.png',
  '/ICONO_512.png',
  OFFLINE_URL // ¡Simplemente usa la variable aquí!
];

self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Intenta cachear todos los archivos definidos
      return cache.addAll(ASSETS);
    })
  );
});

// Lógica mejorada para detectar fallos de red
self.addEventListener('fetch', (evt) => {
  // Solo interceptamos navegaciones de páginas (HTML)
  if (evt.request.mode === 'navigate') {
    evt.respondWith(
      fetch(evt.request).catch(() => {
        // Si el fetch falla (no hay internet), devolvemos la página offline
        return caches.match(OFFLINE_URL);
      })
    );
  } else {
    // Para imágenes/CSS/JS usamos la estrategia normal
    evt.respondWith(
      caches.match(evt.request).then((response) => {
        return response || fetch(evt.request);
      })
    );
  }
});
