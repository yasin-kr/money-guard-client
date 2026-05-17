import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectUser } from '../../redux/auth/authSelectors';
import LogoutModal from '../LogoutModal/LogoutModal';
import LogoIcon from '../../img/logo.svg'; 
import ExitIcon from '../../img/exit.svg'; 
import styles from './Header.module.css';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useSelector(selectUser);
  
  const username = user?.username || user?.name || user?.email?.split('@')[0] || 'User';

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };

    if (isModalOpen) {
      window.addEventListener('keydown', handleEsc);
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isModalOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          {/* LOGO ALANI */}
          <Link
            to="/dashboard/home"
            className={styles.logoWrap}
          >
            {/* SVG ikonları standart img etiketiyle çağırmak çakışmaları önler */}
            <img src={LogoIcon} className={styles.logo} alt="Money Guard" />
            <span className={styles.logoText}>Money Guard</span>
          </Link>

          {/* KULLANICI İŞLEMLERİ (Sağ Üst Köşe) */}
          <div className={styles.actions}>
            <span className={styles.username}>{username}</span>

            {/* Dikey İnce Çizgi */}
            <div className={styles.divider}></div>

            {/* Çıkış Butonu */}
            <button
              className={styles.logoutBtn}
              onClick={() => setIsModalOpen(true)}
              aria-label="Logout"
            >
              <img src={ExitIcon} alt="logout" className={styles.exitIcon} />
              <span className={styles.exitText}>Exit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Çıkış Onay Modalı */}
      {isModalOpen && <LogoutModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default Header;