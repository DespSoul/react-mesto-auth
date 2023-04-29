import { Navigate } from "react-router-dom";

export function ProtectedRouteElement({ element: Component, ...props }) {
  return props.loggedIn ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sing-up" replace />
  );
}

export default ProtectedRouteElement;