import { createBrowserRouter, type RouteObject } from "react-router";
import Layout from "../components/Layout";
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
];

const Router = createBrowserRouter(routes);

export default Router;
