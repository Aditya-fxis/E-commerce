import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}
