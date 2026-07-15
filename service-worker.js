// Huddle — service worker with Firebase Cloud Messaging support.
// Handles push notifications even when the app is closed.

// Load Firebase messaging in the service worker
importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/12.15.0/firebase-app-compat.min.js');
importScripts('https://cdnjs.cloudflare.com/ajax/libs/firebase/12.15.0/firebase-messaging-compat.min.js');

// Initialize Firebase in the service worker (same config as index.html)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT-default-rtdb.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Handle messages received when the app is closed
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);
  const { title, body, icon } = payload.notification || {};
  const notificationOptions = {
    body: body || 'You have a new notification',
    icon: icon || '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'huddle-notification'
  };
  self.registration.showNotification(title || 'Huddle', notificationOptions);
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Pass-through: just let the network handle every request.
  event.respondWith(fetch(event.request));
});
