const cacheName = 'v1';
const filesToCache = [
  '/',
  '/index.html',
  '/Research.html',
  '/CommAct.html',
  '/PatentAndAward.html',
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
