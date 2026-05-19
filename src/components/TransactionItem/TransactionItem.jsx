import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { deleteTransaction } from "../../redux/transactions/operations";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import styles from "./TransactionItem.module.css";

function formatDate(date) {
  if (!date) {
    return "-";
  }

  return new Date(date).toLocaleDateString("uk-UA");
}

function formatAmount(amount) {
  return Number(amount || 0).toLocaleString("uk-UA", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function TransactionItem({ transaction, categoryName, variant = "row" }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isIncome = transaction.type === "INCOME";
  const date = formatDate(transaction.transactionDate);
  const amount = formatAmount(transaction.amount);

  const handleDelete = async () => {
    try {
      await dispatch(deleteTransaction(transaction.id)).unwrap();
    } catch {
      // Global error toast is handled in App.
    }
  };

  const modal = isModalOpen && (
    <ModalEditTransaction
      transaction={transaction}
      onClose={() => setIsModalOpen(false)}
    />
  );

  if (variant === "row") {
    return (
      <tr className={styles.row}>
        <td>{date}</td>
        <td>{isIncome ? "+" : "-"}</td>
        <td>{categoryName}</td>
        <td>{transaction.comment}</td>
        <td className={isIncome ? styles.income : styles.expense}>{amount}</td>
        <td>
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => setIsModalOpen(true)}
            aria-label="Edit transaction"
          >
            <MdEdit />
            <span className={styles.editText}>Edit</span>
          </button>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
          >
            Delete
          </button>
          {modal}
        </td>
      </tr>
    );
  }

  return (
    <>
      <div
        className={`${styles.card} ${
          isIncome ? styles.cardIncome : styles.cardExpense
        }`}
      >
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Date</span>
          <span>{date}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Type</span>
          <span>{isIncome ? "+" : "-"}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Category</span>
          <span>{categoryName}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Comment</span>
          <span>{transaction.comment}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Sum</span>
          <span className={isIncome ? styles.income : styles.expense}>
            {amount}
          </span>
        </div>
        <div className={styles.cardActions}>
          <button
            type="button"
            className={styles.editBtn}
            onClick={() => setIsModalOpen(true)}
            aria-label="Edit transaction"
          >
            <MdEdit />
          </button>
          <button
            type="button"
            className={styles.deleteBtn}
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      {modal}
    </>
  );
}
