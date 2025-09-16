import { createBrowserRouter, type RouteObject } from "react-router";
import FormLayout from "../components/FormLayout";
import FormPage from "../pages/FormPage";
import NotFoundErrorPage from "../pages/NotFoundPage";
import { RoutePath } from "./routePath";

const routes: RouteObject[] = [
  {
    element: <FormLayout />,
    children: [{ path: RoutePath.Form, element: <FormPage /> }],
  },
  { path: "*", element: <NotFoundErrorPage /> },
];

const Router = createBrowserRouter(routes);

export default Router;
