let staticCacheName = 'curr-cnv-static-cache-v1';
self.addEventListener('install', (event)=> {
  event.waitUntil(
    caches.open(staticCacheName).then(function(cache) {
      return cache.addAll([
        './',
        'https://fonts.googleapis.com/css?family=Montserrat',
        'js/app.js',
        'js/sweetalert/sweetalert.min.js',
        'css/sweetalert/sweetalert.css',
        'css/styles.css',
        'images/bg.jpg',
        'images/favicon.ico',
        'indexController.js'
      ]);
    })
  );
});

self.addEventListener('activate', (event)=> {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return cacheName.startsWith('curr-cnv--') &&
                 cacheName != staticCacheName;
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  );
});

self.addEventListener('fetch', (event)=> {
  let requestUrl = new URL(event.request.url);
  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === './') {
      event.respondWith(caches.match('./'));
      return;
    }
  }
  event.respondWith(
    caches.match(event.request).then((response)=> {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', (event)=> {
  if (event.data.action === 'skipWaiting') {
    self.skipWaiting();
  }
});