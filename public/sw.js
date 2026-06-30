const CACHE = 'rotaeletrica-v4';
const GRAPH_CACHE = 'rotaeletrica-graph-v4';
const GRAPH_FILES = ['graph-nn.json', 'graph-ad.json', 'graph-meta.json'];

self.addEventListener('install', (e) => {
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter((k) => k !== CACHE && k !== GRAPH_CACHE).map((k) => caches.delete(k))
    )).then(() => clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const url = e.request.url;
  const isGraph = GRAPH_FILES.some((f) => url.includes('/' + f));
  if (isGraph) {
    // cache-first for large graph files
    e.respondWith(
      caches.open(GRAPH_CACHE).then((c) => c.match(e.request).then((cached) =>
        cached || fetch(e.request).then((res) => { c.put(e.request, res.clone()); return res; })
      ))
    );
  } else if (e.request.url.startsWith(self.location.origin)) {
    // network-first for HTML/JS to avoid stale code
    e.respondWith(
      fetch(e.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then((c) => c.put(e.request, clone));
        }
        return res;
      }).catch(() => caches.match(e.request))
    );
  }
});
