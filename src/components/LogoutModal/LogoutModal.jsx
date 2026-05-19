import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../../redux/auth/operations";
import styles from "./LogoutModal.module.css";

const LogoutModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
    } catch {
      // Global toast handles backend logout errors.
    } finally {
      localStorage.clear();
      navigate("/login", { replace: true });
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <p className={styles.text}>Are you sure you want to log out?</p>
        <div className={styles.btnGroup}>
          <button className={styles.logoutBtn} type="button" onClick={handleLogout}>
            Logout
          </button>
          <button className={styles.cancelBtn} type="button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
