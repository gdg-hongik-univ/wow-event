import { createBrowserRouter, type RouteObject } from "react-router";
import ErrorPage from "../pages/ErrorPage";
import FormPage from "../pages/FormPage";
import NotFoundErrorPage from "../pages/NotFoundPage";
import { RoutePath } from "./routePath";

const routes: RouteObject[] = [
  {
    path: RoutePath.Form,
    element: <FormPage />,
  },
  { path: RoutePath.Error, element: <ErrorPage /> },
  { path: "*", element: <NotFoundErrorPage /> },
];

const Router = createBrowserRouter(routes);

export default Router;
