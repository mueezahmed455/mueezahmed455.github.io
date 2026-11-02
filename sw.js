// Retire the previous portfolio cache worker.
// The redesigned site is intentionally network-first and does not cache stale HTML.
self.addEventListener("install", function (event) {
  self.skipWaiting();
});

self.addEventListener("activate", function (event) {
  event.waitUntil((async function () {
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map(function (name) {
      return caches.delete(name);
    }));
    await self.registration.unregister();
    await self.clients.claim();
  })());
});
