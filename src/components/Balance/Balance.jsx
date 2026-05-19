import { useSelector } from "react-redux";
import { selectBalance } from "../../redux/transactions/selectors";
import styles from "./Balance.module.css";

const Balance = () => {
  const totalBalance = useSelector(selectBalance);

  const formattedBalance = new Intl.NumberFormat("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(totalBalance || 0);

  return (
    <div className={styles.balanceCard}>
      <p className={styles.label}>YOUR BALANCE</p>
      <p className={styles.amount}>
        <span className={styles.currencySymbol}>{"\u20b4"}</span>{" "}
        {formattedBalance}
      </p>
    </div>
  );
};

export default Balance;
