const cacheName = 'v1';
const filesToCache = [
  '/',
  '/index.html',
  '/Research/',
  '/CommAct/',
  '/PatentAndAward/',
  '/News/',
  'asset/pics/myself.webp'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
