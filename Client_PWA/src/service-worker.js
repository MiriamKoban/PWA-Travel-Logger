import { precacheAndRoute, createHandlerBoundToURL } from 'workbox-precaching';
import { registerRoute, Route, NavigationRoute } from 'workbox-routing';
import { NetworkFirst, CacheFirst } from 'workbox-strategies';
import { ExpirationPlugin } from 'workbox-expiration';

self.skipWaiting();
precacheAndRoute(self.__WB_MANIFEST);
registerRoute(new NavigationRoute(createHandlerBoundToURL('index.html')));

const VisitRoute = new Route(
  ({ url }) => url.pathname === '/visits',
  new NetworkFirst({
    cacheName: 'visit-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  }),
);
const fonRoute = new Route(
  ({ url }) => /.*assets\/.*.woff/.test(url.pathname),
  new CacheFirst({
    cacheName: 'fon-cache',
    plugins: [
      new ExpirationPlugin({
        maxAgeSeconds: 60 * 60 * 24 * 1,
      }),
    ],
    cacheableResponse: {
      statuses: [0, 200],
    },
  }),
);
registerRoute(VisitRoute);
registerRoute(fonRoute);
