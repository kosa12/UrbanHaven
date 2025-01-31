// public/custom-sw.js
const CACHE_NAME = "urban-haven-cache-v1";
const ASSETS_TO_CACHE = ["/", "/styles/globals.css", "/icons/icon.png"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/static/js/i18n.js")) {
    return fetch(event.request); // Always fetch fresh
  }

  // Check if the request is for the ingatlan API
  if (event.request.url.includes("/ingatlanok/")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          console.log("Serving from cache: ", event.request.url);
          // Serve cached response if available
          return cachedResponse;
        }
        // Fetch from the network if not in cache
        return fetch(event.request).then((response) => {
          // Only cache successful responses
          if (response.ok) {
            console.log("Caching response: ", event.request.url);
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          return response;
        });
      })
    );
  } else {
    // Handle other requests (static assets)
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Optional: Cache invalidation when activating the service worker
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
