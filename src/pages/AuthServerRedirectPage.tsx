import { Navigate } from "react-router";
import { RoutePath } from "../routes/routePath";

const AuthServerRedirectPage = () => {
  return <Navigate to={RoutePath.Form} />;
};

export default AuthServerRedirectPage;
