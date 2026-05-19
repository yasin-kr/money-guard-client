import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { selectUsername } from '../../redux/auth/selectors';
import LogoutModal from '../LogoutModal/LogoutModal';
import { IoIosLogOut } from 'react-icons/io'; // Exit ikonu
import styles from './Header.module.css';

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const username = useSelector(selectUsername) || 'User';

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false);
    };
    if (isModalOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isModalOpen]);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <Link to="/dashboard/home" className={styles.logoWrap}>
            {/* Logo yerine metin veya bir div ikon */}
            <span className={styles.logoText}>Money Guard</span>
          </Link>

          <div className={styles.actions}>
            <span className={styles.username}>{username}</span>
            <div className={styles.divider}></div>
            <button
              className={styles.logoutBtn}
              onClick={() => setIsModalOpen(true)}
              aria-label="Logout"
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