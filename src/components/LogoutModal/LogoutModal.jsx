import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../redux/auth/operations'; // Projedeki logout operation yolu
import styles from './LogoutModal.module.css';

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Önce backend'e istek atmayı deneriz
      await dispatch(logOut()).unwrap();
    } catch (error) {
      // Backend hata verse bile konsola basıp çökmeyi engelliyoruz
      console.error("Backend logout hatası, yine de çıkış yapılıyor:", error);
    } finally {
      // Ekip liderinin istediği tam olarak burası:
      // Backend'den ne dönerse dönsün kullanıcıyı login'e atıp state'i temizletiyoruz
      navigate('/login');
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <p className={styles.text}>Are you sure you want to log out?</p>
        <div className={styles.btnGroup}>
          <button className={styles.logoutBtn} onClick={handleLogout}>
            Logout
          </button>
          <button className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;