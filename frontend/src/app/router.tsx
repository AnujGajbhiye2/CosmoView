import { RouterProvider, createRootRoute, createRoute, createRouter, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import type { ReactElement } from 'react';
import { AppShell } from '@/components/layout/AppShell';
import { LibraryPage } from '@/routes/LibraryPage';
import { RootPage } from '@/routes/RootPage';
import { ApodPage } from '@/routes/ApodPage';
import { AsteroidsPage } from '@/routes/AsteroidsPage';
import { EarthPage } from '@/routes/EarthPage';

const rootRoute = createRootRoute({
  component: () => (
    <>
      <AppShell>
        <Outlet />
      </AppShell>
      <TanStackRouterDevtools position="bottom-right" />
    </>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: RootPage
});

const apodRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/apod',
  component: ApodPage
});

const asteroidsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/asteroids',
  component: AsteroidsPage
});

const earthRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/earth',
  component: EarthPage
});

const libraryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/library',
  component: LibraryPage
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  apodRoute,
  asteroidsRoute,
  earthRoute,
  libraryRoute
]);

const router = createRouter({
  routeTree,
  defaultPreload: 'intent'
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export const AppRouter = (): ReactElement => <RouterProvider router={router} />;
