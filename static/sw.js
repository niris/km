const version = "0.0.1";
const cacheName = `km-${version}`;
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      return cache.addAll([//(grep -o 'http[^")'"']*" static/index.html ; ls static/*) | sed -E "s:(.*):'\1',:"
        `/`,
'https://unpkg.com/chota@0.6.2/dist/chota.min.css',
'https://d3js.org/d3.v5.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/marked/0.4.0/marked.min.js',
'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
'https://unpkg.com/vue-router@3.1.3/dist/vue-router.min.js',
'https://unpkg.com/vue-authfetch@0.0.4/index.js',
'static/graph.js',
'static/index.html',
'static/KmAvatar.js',
'static/KmField.js',
'static/KmFieldList.js',
'static/KmGraph.js',
'static/logo.png',
'static/logo.svg',
'static/manifest.json',
'static/PageActivity.js',
'static/PageHome.js',
'static/PageSign.js',
'static/PageUser.js',
'static/sw.js',
      ])
          .then(() => self.skipWaiting());
    })
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => {
      return response || fetch(event.request);
    })
  );
});
