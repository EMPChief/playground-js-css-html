/**
 * Service Worker for Pomodoro Timer PWA
 * Provides offline functionality and caching
 */

const CACHE_NAME = 'pomodoro-timer-v2';
const urlsToCache = [
  './',
  './index.html',
  './info.html',
  './css/base.css',
  './css/timer.css',
  './css/buttons.css',
  './css/tasks.css',
  './css/quote.css',
  './css/responsive.css',
  './css/info.css',
  './css/features.css',
  './js/app.js',
  './js/config.js',
  './js/utils.js',
  './js/storage-new.js',
  './js/timer-new.js',
  './js/tasks-new.js',
  './js/sounds-new.js',
  './js/quotes-new.js',
  './js/statistics.js',
  './js/notifications.js',
  './js/keyboard.js',
  './js/ui.js',
  './db/quotes.json',
  './db/sounds.json',
  './assets/logo/favicon-32x32.png',
  './assets/logo/favicon-16x16.png',
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching app resources');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('[SW] Cache failed:', error);
      })
  );

  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...');

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => {
            console.log('[SW] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          })
      );
    })
  );

  return self.clients.claim();
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        // Clone the request
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          // Cache the new response for next time
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        }).catch((error) => {
          console.error('[SW] Fetch failed:', error);

          // Return offline page if available
          return caches.match('./index.html');
        });
      })
  );
});

// Background sync for offline data
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'sync-pomodoro-data') {
    event.waitUntil(syncPomodoroData());
  }
});

/**
 * Syncs pomodoro data when online
 */
async function syncPomodoroData() {
  console.log('[SW] Syncing pomodoro data...');
  // Add any sync logic here if needed
  return Promise.resolve();
}

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);

  const options = {
    body: event.data ? event.data.text() : 'Time for a break!',
    icon: './assets/logo/favicon-32x32.png',
    badge: './assets/logo/favicon-16x16.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };

  event.waitUntil(
    self.registration.showNotification('Pomodoro Timer', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked');

  event.notification.close();

  event.waitUntil(
    clients.openWindow('./')
  );
});
