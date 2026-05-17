import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Navigation } from "../../components/Navigation/Navigation";
import { Balance } from "../../components/Balance/Balance";

// Kisi 3 - /dashboard layout
// Kullanilacak componentler: Header, Navigation, Balance, Outlet.
// Alt route'lar: /home, /statistics, /currency App icinde bu layout altinda calisir.
export default function DashboardPage() {
  return (
    <>
      <Header />
      <Navigation />
      <Balance />
      <Outlet />
    </>
  );
}
