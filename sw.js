const CACHE = "treino-v5";
const CORE = [
  "./",
  "index.html",
  "styles.css",
  "app.js",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const isImg = req.destination === "image" || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(new URL(req.url).pathname);

  if (isImg) {
    // imagens: cache-first (offline, raramente mudam)
    e.respondWith(
      caches.match(req).then((hit) => hit || fetch(req).then((res) => {
        if (res && res.status === 200) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); }
        return res;
      }).catch(() => hit))
    );
    return;
  }

  // HTML/CSS/JS/etc: network-first (sempre atualiza), cai pro cache offline
  e.respondWith(
    fetch(req).then((res) => {
      if (res && res.status === 200) { const c = res.clone(); caches.open(CACHE).then((x) => x.put(req, c)); }
      return res;
    }).catch(() => caches.match(req).then((hit) => hit || caches.match("index.html")))
  );
});
