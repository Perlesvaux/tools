'use strict'

const CURRENT_CACHE = 'v0.1.0'
const OLD_CACHE = null

addEventListener('install', event => {

   skipWaiting()

   event.waitUntil(
      caches
         .open(CURRENT_CACHE)
         .then(cache => cache.addAll([
            '/',
            '/index.html',
            '/app.js',
            'toDoList.json'
         ]))
   )
})

addEventListener('activate', event => {

   event.waitUntil(
      caches
         .delete(OLD_CACHE)
         .then(_ => clients.claim())
   )
})

addEventListener("fetch", event => {

   event.respondWith(
      caches
         .match(event.request)
         .then(cachedResponse => cachedResponse ?? fetch(event.request))
   )
})

addEventListener('message', event => {

   if (event.data === 'delete cache')
   {
      event.waitUntil(caches.delete(CURRENT_CACHE))
   }
})