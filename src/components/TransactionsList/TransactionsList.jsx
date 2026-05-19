import { TransactionItem } from "../TransactionItem/TransactionItem";
import styles from "./TransactionsList.module.css";

export function TransactionsList({ transactions, isLoading }) {
  if (isLoading) return <p>Loading...</p>;

  if (!transactions || transactions.length === 0) {
    return <p className={styles.empty}>You have no transactions yet</p>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Comment</th>
            <th>Sum</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <TransactionItem key={transaction.id} transaction={transaction} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
