const CACHE_NAME = "urban-haven-cache-v3";
const ASSETS_TO_CACHE = [
  "/",
  "/styles/globals.css",
  "/icons/icon.png",
  "/tos/page.tsx",
  "/upload/page.tsx",
  "/offline.html", // Offline fallback oldal
];

// Telepítés és precache
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Aktiválás és régi cache-ek törlése
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch stratégia: Cache-first, fallback hálózatra, végső esetben offline oldal
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Ha statikus asset, mindig cache-ből próbálja
  if (
    url.pathname.startsWith("/_next/static/") ||
    url.pathname.startsWith("/styles/")
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request);
      })
    );
    return;
  }

  // Ha _rsc van az URL-ben, ne cache-eljen
  if (url.searchParams.has("_rsc")) {
    return;
  }

  // Dinamikus oldalak (ingatlanok/[id]) és egyéb oldalak cache-first
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const responseClone = response.clone();
              caches
                .open(CACHE_NAME)
                .then((cache) => cache.put(event.request, responseClone));
            }
            return response;
          })
          .catch(() => caches.match("/offline.html")) // Ha nincs net és nincs cache, offline oldal
      );
    })
  );
});
