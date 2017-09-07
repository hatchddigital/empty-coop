/* eslint-disable */

importScripts('workbox-sw.prod.js');

// Create Workbox service worker instance
const workboxSW = new WorkboxSW({ clientsClaim: true });

// Placeholder array which is populated automatically by workboxBuild.injectManifest()
workboxSW.precache([]);
