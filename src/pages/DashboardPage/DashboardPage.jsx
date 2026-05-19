import { Outlet, useLocation } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import Currency from '../../components/Currency/Currency';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const { pathname } = useLocation();
  const isCurrencyPage = pathname.endsWith('/currency');

  return (
    <div className={styles.dashboardContainer}>
      <Header />

      <div
        className={`${styles.mainWrapper} ${
          isCurrencyPage ? styles.currencyPage : ''
        }`}
      >
        {/* SOL PANEL (Sidebar) */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <Navigation />
            {!isCurrencyPage && <Balance />}
          </div>
          <div
            className={`${styles.currencyWrap} ${
              isCurrencyPage ? styles.hiddenOnCurrencyPage : ''
            }`}
          >
            <Currency />
          </div>
        </aside>

        {/* SAĞ PANEL (Dinamik Sayfalar) */}
        <main className={styles.contentArea}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;
