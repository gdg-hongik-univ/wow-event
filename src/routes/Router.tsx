import { createBrowserRouter, type RouteObject } from "react-router";
import FormLayout from "../components/FormLayout";
import AuthServerRedirectPage from "../pages/AuthServerRedirectPage";
import BasicInfoPage from "../pages/BasicInfoPage";
import FormPage from "../pages/FormPage";
import NotFoundErrorPage from "../pages/NotFoundPage";
import SignInPage from "../pages/SignInPage";
import { RoutePath } from "./routePath";

const routes: RouteObject[] = [
  {
    element: <FormLayout />,
    children: [
      { path: RoutePath.Form, element: <FormPage /> },
      { path: RoutePath.Info, element: <BasicInfoPage /> },
      { path: RoutePath.SignIn, element: <SignInPage /> },
    ],
  },
  { path: "*", element: <NotFoundErrorPage /> },
  { path: RoutePath.AuthServerRedirect, element: <AuthServerRedirectPage /> },
];

const Router = createBrowserRouter(routes);

export default Router;
