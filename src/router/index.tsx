import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { LayoutPrincipal } from "../layouts/LayoutPrincipal";

const IndexPage = lazy(() => import("../pages/Index"));
const FavoritesPage = lazy(() => import("../pages/FavoritesPage"));

export const route = createBrowserRouter([
  {
    path: "/",
    element: <LayoutPrincipal />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <IndexPage />
          </Suspense>
        ),
      },
      {
        path: "/favoritos",
        element: <Suspense fallback={<div>Loading...</div>}>
          <FavoritesPage />
        </Suspense>,
      },
    ],
  },
]);
