import { useSelector } from "react-redux";
// Hatalı finance path'i ekip standartına göre transactions/selectors olarak güncellendi
import { selectBalance } from "../../redux/transactions/selectors"; 
import styles from "./Balance.module.css";

const Balance = () => {
  // Core yapıdaki selector kullanıldı
  const totalBalance = useSelector(selectBalance);

  const formattedBalance = new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalBalance || 0);

  return (
    <div className={styles.balanceCard}>
      <p className={styles.label}>YOUR BALANCE</p>
      <p className={styles.amount}>
        <span className={styles.currencySymbol}>₴</span> {formattedBalance}
      </p>
    </div>
  );
};

export default Balance;