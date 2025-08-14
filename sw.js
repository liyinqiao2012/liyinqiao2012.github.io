const cacheName = 'v4';
const filesToCache = [
  '/',
  '/Research/',
  '/CommAct/',
  '/PatentAndAward/',
  'asset/pics/myself.webp',
  'public/css/lanyon.css',
  'public/css/poole.css',
  'public/css/syntax.css'
];

self.addEventListener('install', event => {
  self.skipWaiting(); // 安装后立即激活
  event.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', event => {
  clients.claim(); // 激活后立即接管页面
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName).map(key => caches.delete(key))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const copy = response.clone();
          caches.open(cacheName).then(cache => cache.put(event.request, copy));
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // 其他静态资源使用原来的 Cache First
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
