import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn, selectToken } from "../redux/auth/selectors";

export function PrivateRoute() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const token = useSelector(selectToken);

  return isLoggedIn || token ? <Outlet /> : <Navigate to="/login" replace />;
}
