const CACHE_NAME = 'mueez-portfolio-v1';
const ASSETS = [
    '/',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/js/three-bg.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)));
});
