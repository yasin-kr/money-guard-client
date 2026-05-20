import { TransactionItem } from "../TransactionItem/TransactionItem";
import styles from "./TransactionsList.module.css";

function getCategoryName(categories, categoryId) {
  if (!categoryId) {
    return "Income";
  }

  return (
    categories.find((category) => category.id === categoryId)?.name || "Other"
  );
}

export function TransactionsList({ transactions, categories = [], isLoading }) {
  if (isLoading) return <p className={styles.empty}>Loading...</p>;

  if (!transactions || transactions.length === 0) {
    return <p className={styles.empty}>You have no transactions yet</p>;
  }

  return (
    <div className={styles.wrapper}>
      <table className={styles.tableDesktop}>
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
            <TransactionItem
              key={transaction.id}
              transaction={transaction}
              categoryName={getCategoryName(categories, transaction.categoryId)}
              variant="row"
            />
          ))}
        </tbody>
      </table>

      <div className={styles.cardsMobile}>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            categoryName={getCategoryName(categories, transaction.categoryId)}
            variant="card"
          />
        ))}
      </div>
    </div>
  );
}
