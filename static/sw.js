const version = "0.0.1";
const cacheName = `km-${version}`;
//(grep -o 'http[^")'"']*" static/index.html ; ls static) | sed -E "s:(.*):'\1',:"
const assets = [
'https://unpkg.com/chota@0.6.2/dist/chota.min.css',
'https://d3js.org/d3.v5.min.js',
'https://cdnjs.cloudflare.com/ajax/libs/marked/0.4.0/marked.min.js',
'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
'https://unpkg.com/vue-router@3.1.3/dist/vue-router.min.js',
'https://unpkg.com/vue-authfetch@0.0.4/index.js',
'graph.js',
'KmAvatar.js',
'KmField.js',
'KmFieldList.js',
'KmGraph.js',
'logo.png',
'logo.svg',
'manifest.json',
'PageActivity.js',
'PageHome.js',
'PageSign.js',
'PageUser.js',
'sw.js',
'/km/'
];

self.addEventListener('install', e => e.waitUntil(caches.open(cacheName).then(c => c.addAll(assets).then(() => self.skipWaiting()))));

self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  event.respondWith(caches.open(cacheName)
      .then(cache => cache.match(event.request, {ignoreSearch: true}))
      .then(response => response || fetch(event.request))
  );
});
