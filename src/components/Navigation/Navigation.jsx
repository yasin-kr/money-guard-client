import { NavLink } from "react-router-dom";
// 🔥 Yeni klasör yapısına göre img klasöründen direkt çağırıyoruz
import HomeIcon from "../../img/home.svg";
import StatsIcon from "../../img/statistics.svg"; // Klasördeki adıyla (genelde statistics veya balance olur, ağaca göre sync ettik)
import CurrencyIcon from "../../img/currency.svg";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      {/* 1. ANA SAYFA LİNKİ */}
      <NavLink
        to="/dashboard/home"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
      >
        <span className={styles.iconWrap}>
          <img src={HomeIcon} className={styles.icon} alt="Home" />
        </span>
        <span className={styles.navText}>Home</span>
      </NavLink>

      {/* 2. İSTATİSTİK LİNKİ */}
      <NavLink
        to="/dashboard/statistics"
        className={({ isActive }) =>
          isActive ? `${styles.link} ${styles.activeLink}` : styles.link
        }
      >
        <span className={styles.iconWrap}>
          <img src={StatsIcon} className={styles.icon} alt="Statistics" />
        </span>
        <span className={styles.navText}>Statistics</span>
      </NavLink>

      {/* 3. MOBİL DÖVİZ LİNKİ (Sadece mobilde ortaya çıkar, büyük ekranda gizlidir) */}
      <NavLink
        to="/dashboard/currency"
        className={({ isActive }) =>
          isActive 
            ? `${styles.link} ${styles.activeLink} ${styles.mobileCurrencyOnly}` 
            : `${styles.link} ${styles.mobileCurrencyOnly}`
        }
      >
        <span className={styles.iconWrap}>
          <img src={CurrencyIcon} className={styles.icon} alt="Currency" />
        </span>
        <span className={styles.navText}>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;