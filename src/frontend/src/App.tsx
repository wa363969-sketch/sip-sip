import { Layout } from "@/components/Layout";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Skeleton } from "@/components/ui/skeleton";
import { CartProvider } from "@/contexts/CartContext";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

const Home = lazy(() => import("@/pages/Home"));
const Menu = lazy(() => import("@/pages/Menu"));
const Cart = lazy(() => import("@/pages/Cart"));
const Orders = lazy(() => import("@/pages/Orders"));
const OrderTracking = lazy(() => import("@/pages/OrderTracking"));
const Admin = lazy(() => import("@/pages/Admin"));

function PageLoader() {
  return (
    <div className="flex flex-col gap-4 p-8 max-w-3xl mx-auto">
      <Skeleton className="h-10 w-64" />
      <Skeleton className="h-48 w-full" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-40" />
        <Skeleton className="h-40" />
      </div>
    </div>
  );
}

function AppLayout() {
  return (
    <CartProvider>
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Outlet />
        </Suspense>
      </Layout>
    </CartProvider>
  );
}

const rootRoute = createRootRoute({ component: AppLayout });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Home />
    </Suspense>
  ),
});

const menuRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Menu />
    </Suspense>
  ),
});

const menuCategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/menu/$category",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Menu />
    </Suspense>
  ),
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cart",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <Cart />
      </Suspense>
    </ProtectedRoute>
  ),
});

const ordersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <Orders />
      </Suspense>
    </ProtectedRoute>
  ),
});

const orderTrackingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  component: () => (
    <ProtectedRoute>
      <Suspense fallback={<PageLoader />}>
        <OrderTracking />
      </Suspense>
    </ProtectedRoute>
  ),
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Admin />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  menuRoute,
  menuCategoryRoute,
  cartRoute,
  ordersRoute,
  orderTrackingRoute,
  adminRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
