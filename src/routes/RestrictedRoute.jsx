import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectToken } from "../redux/auth/selectors";

export function RestrictedRoute() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  return isLoggedIn || token ? (
    <Navigate to="/dashboard/home" replace />
  ) : (
    <Outlet />
  );
}
