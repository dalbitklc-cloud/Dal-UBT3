const CACHE_NAME = 'eps-ubt-v5'; // Tumaas ang version
const ASSETS = [
  './',
  'index.html', // Tinanggal ang ./ para mas safe sa GitHub
  'manifest.json',
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json',
  './audio/T721.mp3',
  './audio/T722.mp3',
  './audio/T723.mp3',
  './audio/T724.mp3',
  './audio/T725.mp3',
  './audio/T726.mp3',
  './audio/T727.mp3',
  './audio/T728.mp3',
  './audio/T729.mp3',
  './audio/T730.mp3',
  './audio/T731.mp3',
  './audio/T732.mp3',
  './audio/T733.mp3',
  './audio/T734.mp3',
  './audio/T735.mp3',
  './audio/T736.mp3',
  './audio/T737.mp3',
  './audio/T738.mp3',
  './audio/T739.mp3',
  './audio/T740.mp3',
  'https://cdn-icons-png.flaticon.com/512/3062/3062634.png'
];

// Install Service Worker
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets...');
      // Ginawang map para ma-detect kung anong specific na file ang nag-error
      return Promise.all(
        ASSETS.map(url => {
          return cache.add(url).catch(err => console.error(`Failed to cache: ${url}`, err));
        })
      );
    })
  );
});

// Fetch Assets
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => {
      // Kung audio ang request, mas safe na hayaan muna ang network kung may issue ang cache
      if (e.request.url.includes('.mp3')) {
        return res || fetch(e.request);
      }
      return res || fetch(e.request);
    })
  );
});

// Activate - Clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});
