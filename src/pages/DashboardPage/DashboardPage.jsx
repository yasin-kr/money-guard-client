import { Outlet } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Navigation from '../../components/Navigation/Navigation';
import Balance from '../../components/Balance/Balance';
import Currency from '../../components/Currency/Currency';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  return (
    <div className={styles.dashboardContainer}>
      <Header />

      <div className={styles.mainWrapper}>
        {/* SOL PANEL (Sidebar) */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTop}>
            <Navigation />
            <Balance />
          </div>
          <div className={styles.currencyWrap}>
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