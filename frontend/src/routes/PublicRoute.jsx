import { Navigate, Outlet } from "react-router-dom";

function PublicRoute() {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    return <Navigate to="/" />;
  } else {
    return <Outlet />;
  }
}

export default PublicRoute;
