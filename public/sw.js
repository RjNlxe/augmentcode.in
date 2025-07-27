// Service Worker for Vercel Free Tier Performance Optimization
const CACHE_NAME = 'augmentcode-v1'
const STATIC_CACHE = 'static-v1'
const DYNAMIC_CACHE = 'dynamic-v1'

// Cache static assets
const STATIC_ASSETS = [
  '/',
  '/rules',
  '/generate',
  '/mcp',
  '/manifest.json',
  '/image.png',
  '/favicon.ico'
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('[SW] Installing service worker...')
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('[SW] Caching static assets')
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log('[SW] Static assets cached successfully')
        return self.skipWaiting()
      })
      .catch((error) => {
        console.error('[SW] Failed to cache static assets:', error)
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating service worker...')
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => {
        console.log('[SW] Service worker activated')
        return self.clients.claim()
      })
  )
})

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  
  // Skip non-GET requests
  if (request.method !== 'GET') return
  
  // Skip external API calls
  if (url.origin !== self.location.origin && 
      !url.hostname.includes('pollinations.ai') && 
      !url.hostname.includes('nvidia.com')) {
    return
  }
  
  // Handle different types of requests
  if (STATIC_ASSETS.includes(url.pathname)) {
    // Static assets - cache first
    event.respondWith(cacheFirst(request))
  } else if (url.pathname.startsWith('/api/')) {
    // API routes - network first with short cache
    event.respondWith(networkFirst(request, 5000)) // 5 second timeout
  } else if (url.pathname.includes('pollinations.ai') || url.pathname.includes('nvidia.com')) {
    // External AI APIs - network only with timeout
    event.respondWith(networkOnly(request, 10000)) // 10 second timeout
  } else {
    // Other requests - stale while revalidate
    event.respondWith(staleWhileRevalidate(request))
  }
})

// Cache strategies
async function cacheFirst(request) {
  try {
    const cachedResponse = await caches.match(request)
    if (cachedResponse) {
      return cachedResponse
    }
    
    const networkResponse = await fetch(request)
    if (networkResponse.ok) {
      const cache = await caches.open(STATIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.error('[SW] Cache first failed:', error)
    return new Response('Offline', { status: 503 })
  }
}

async function networkFirst(request, timeout = 5000) {
  try {
    const networkResponse = await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), timeout)
      )
    ])
    
    if (networkResponse.ok) {
      const cache = await caches.open(DYNAMIC_CACHE)
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  } catch (error) {
    console.log('[SW] Network first fallback to cache:', error.message)
    const cachedResponse = await caches.match(request)
    return cachedResponse || new Response('Offline', { status: 503 })
  }
}

async function networkOnly(request, timeout = 10000) {
  try {
    return await Promise.race([
      fetch(request),
      new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Network timeout')), timeout)
      )
    ])
  } catch (error) {
    console.error('[SW] Network only failed:', error)
    return new Response('Service unavailable', { status: 503 })
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(DYNAMIC_CACHE)
  const cachedResponse = await cache.match(request)
  
  const networkResponsePromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone())
    }
    return networkResponse
  }).catch(() => null)
  
  return cachedResponse || await networkResponsePromise || new Response('Offline', { status: 503 })
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('[SW] Background sync triggered')
    event.waitUntil(doBackgroundSync())
  }
})

async function doBackgroundSync() {
  // Retry failed requests when back online
  console.log('[SW] Performing background sync')
}

// Push notifications (optional)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    console.log('[SW] Push notification received:', data)
    
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/image.png',
        badge: '/image.png',
        tag: 'augmentcode-notification'
      })
    )
  }
})

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  
  event.waitUntil(
    clients.openWindow('/')
  )
})

console.log('[SW] Service worker loaded successfully')
