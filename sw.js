const CACHE_NAME = "he-zhiying-physics-star-v25";
const ASSETS = [
  "./",
  "./index.html",
  "./styles.css",
  "./data.js",
  "./learning.js",
  "./mood.js",
  "./lab.js",
  "./main.js",
  "./script.js",
  "./robots.txt",
  "./manifest.json",
  "./icon.svg",
  "./assets/line-dog-953.gif",
  "./assets/line-dog-785.gif",
  "./assets/line-dog-1001.gif"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then((cached) => cached || fetch(event.request)));
});
