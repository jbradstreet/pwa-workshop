console.log('service worker file loaded.');
// load assets
const ASSETS = [
  "/favicon.ico",
  "/img/bg.jpg",
  "/img/logo.png",
  "/img/logo-small.png",
  "/img/logo-w.png",
  "/img/logo-w-small.png",
  "./",
  "./index.html",
  "./css/style.css",
  "./js/app.js",
];


// need to cache resources
self.addEventListener('install', function() {
  console.log('Installing service worker...');
  caches.open('workshopCache').then(cache => {
    console.log('Caching assets in workshopCache');
      if(cache) {
        cache.addAll(ASSETS);
      }
  });
});

// add event listeners to handle events
// self = obj of service worker
// self.addEventListener('fetch', function(event) {})
self.addEventListener('fetch', event => {
  console.log('Fetch: ', event.request.url);

  let cacheResponsePromise = caches.match(event.request).then(response => {
    console.log(response ? 'found' : 'not cached', response);
    return response;
  });
  event.respondWith(cacheResponsePromise);
});
