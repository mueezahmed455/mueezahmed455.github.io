const CACHE_NAME = 'mueez-portfolio-v1';
const ASSETS = [
    '/',
    '/assets/css/main.css',
    '/assets/js/main.js',
    '/assets/js/three-bg.js',
    '/assets/js/performance.js',
    '/assets/js/terminal-kernel.js',
    '/assets/js/neural-core.js',
    '/assets/js/security-lab.js',
    '/assets/js/multiplayer.js'
];

self.addEventListener('install', (e) => {
    e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)).catch(err => console.log('Cache install error:', err)));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then(res => res || fetch(e.request)).catch(err => console.log('Fetch error:', err)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))));
});
