import { useEffect, lazy, Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { PrivateRoute } from "../../routes/PrivateRoute";
import { RestrictedRoute } from "../../routes/RestrictedRoute";
import { refreshUser } from "../../redux/auth/operations";
import {
  selectIsLoggedIn,
  selectIsRefreshing,
  selectToken,
} from "../../redux/auth/selectors";
import { clearGlobalError } from "../../redux/global/slice";
import { selectGlobalError } from "../../redux/global/selectors";
import { Loader } from "../Loader/Loader";
import css from "./App.module.css";

const RegistrationPage = lazy(
  () => import("../../pages/RegistrationPage/RegistrationPage"),
);
const LoginPage = lazy(() => import("../../pages/LoginPage/LoginPage"));
const DashboardPage = lazy(
  () => import("../../pages/DashboardPage/DashboardPage"),
);
const HomeTab = lazy(() => import("../../pages/HomeTab/HomeTab"));
const StatisticsTab = lazy(
  () => import("../../pages/StatisticsTab/StatisticsTab"),
);
const CurrencyTab = lazy(() => import("../../pages/CurrencyTab/CurrencyTab"));

export default function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isRefreshing = useSelector(selectIsRefreshing);
  const token = useSelector(selectToken);
  const globalError = useSelector(selectGlobalError);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser());
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (!globalError) {
      return;
    }

    toast.error(globalError);
    dispatch(clearGlobalError());
  }, [dispatch, globalError]);

  return isRefreshing ? (
    <Loader />
  ) : (
    <div className={css.app}>
      <Toaster position="top-right" />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Navigate
                to={isLoggedIn ? "/dashboard/home" : "/login"}
                replace
              />
            }
          />
          <Route element={<RestrictedRoute />}>
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<DashboardPage />}>
              <Route index element={<Navigate to="home" replace />} />
              <Route path="home" element={<HomeTab />} />
              <Route path="statistics" element={<StatisticsTab />} />
              <Route path="currency" element={<CurrencyTab />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <Navigate
                to={isLoggedIn ? "/dashboard/home" : "/login"}
                replace
              />
            }
          />
        </Routes>
      </Suspense>
      <Loader />
    </div>
  );
}
