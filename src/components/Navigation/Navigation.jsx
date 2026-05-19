import { NavLink } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";
import { AiOutlinePieChart } from "react-icons/ai";
import { AiOutlineDollarCircle } from "react-icons/ai";
import styles from "./Navigation.module.css";

const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <NavLink to="/dashboard/home" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
        <span className={styles.iconWrap}><AiOutlineHome className={styles.icon} /></span>
        <span className={styles.navText}>Home</span>
      </NavLink>

      <NavLink to="/dashboard/statistics" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink}` : styles.link}>
        <span className={styles.iconWrap}><AiOutlinePieChart className={styles.icon} /></span>
        <span className={styles.navText}>Statistics</span>
      </NavLink>

      <NavLink to="/dashboard/currency" className={({ isActive }) => isActive ? `${styles.link} ${styles.activeLink} ${styles.mobileCurrencyOnly}` : `${styles.link} ${styles.mobileCurrencyOnly}`}>
        <span className={styles.iconWrap}><AiOutlineDollarCircle className={styles.icon} /></span>
        <span className={styles.navText}>Currency</span>
      </NavLink>
    </nav>
  );
};

export default Navigation;