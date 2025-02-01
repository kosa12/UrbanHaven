const CACHE_NAME = "urban-haven-cache-v1";
const ASSETS_TO_CACHE = [
  "/",
  "/styles/globals.css",
  "/icons/icon.png",
  "/tos/page.tsx",
];

// Precache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Fetch strategy for dynamic content (like Next.js chunks)
self.addEventListener("fetch", (event) => {
  // Always serve static files from the cache
  if (event.request.url.includes("/_next/static/")) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Serve from cache
        }

        // Try to fetch from the network and cache if successful
        return fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch((error) => {
            // Handle failed network request, possibly show fallback
            console.error("Failed to fetch", error);
            return new Response("Offline", { status: 503 });
          });
      })
    );
  } else if (event.request.url.includes("/ingatlanok/")) {
    // Handle specific API requests for ingatlanok
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse; // Serve from cache
        }

        // Try fetching from the network
        return fetch(event.request)
          .then((response) => {
            if (response.ok) {
              const responseToCache = response.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseToCache);
              });
            }
            return response;
          })
          .catch((error) => {
            // Handle failed network request, possibly show fallback
            console.error("Failed to fetch", error);
            return new Response("Offline", { status: 503 });
          });
      })
    );
  } else {
    // Default handling for other requests (fallback to network)
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      })
    );
  }
});

// Optional: Cache invalidation during activation
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
