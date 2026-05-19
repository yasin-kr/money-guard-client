import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { selectUser } from "../../redux/auth/selectors";
import LogoutModal from "../LogoutModal/LogoutModal";
import { IoIosLogOut } from "react-icons/io";
import styles from "./Header.module.css";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = useSelector(selectUser);
  const username = user?.email?.split("@")[0] || "User";

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isModalOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/dashboard/home" className={styles.logoWrap}>
            <img className={styles.logoIcon} src="/favicon.svg" alt="" />
            <span className={styles.logoText}>Money Guard</span>
          </Link>

          <div className={styles.actions}>
            <span className={styles.username}>{username}</span>
            <div className={styles.divider}></div>
            <button
              className={styles.logoutBtn}
              onClick={() => setIsModalOpen(true)}
              aria-label="Logout"
              type="button"
            >
              <IoIosLogOut className={styles.exitIcon} />
              <span className={styles.exitText}>Exit</span>
            </button>
          </div>
        </div>
      </header>
      {isModalOpen && <LogoutModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;
