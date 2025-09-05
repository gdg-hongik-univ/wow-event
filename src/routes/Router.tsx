import { createBrowserRouter, type RouteObject } from "react-router";
import Layout from "../components/Layout";
import NotFoundErrorPage from "../pages/NotFoundPage";
import SignInPage from "../pages/SignInPage";
import { RoutePath } from "./routePath";

const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: RoutePath.Index, element: <></> },
      { path: RoutePath.SignIn, element: <SignInPage /> },
    ],
  },
  { path: "*", element: <NotFoundErrorPage /> },
];

const Router = createBrowserRouter(routes);

export default Router;
