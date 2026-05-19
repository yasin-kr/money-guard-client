import { useState } from "react";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { deleteTransaction } from "../../redux/transactions/operations";
import ModalEditTransaction from "../ModalEditTransaction/ModalEditTransaction";
import styles from "./TransactionItem.module.css";

export function TransactionItem({ transaction }) {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isIncome = transaction.type === "INCOME";

  const handleDelete = () => {
    dispatch(deleteTransaction(transaction.id));
  };

  return (
    <>
      {/* Desktop/Tablet - tablo satırı */}
      <tr className={styles.row}>
        <td>{transaction.transactionDate?.slice(0, 10)}</td>
        <td>{isIncome ? "+" : "-"}</td>
        <td>{transaction.categoryId}</td>
        <td>{transaction.comment}</td>
        <td className={isIncome ? styles.income : styles.expense}>
          {transaction.amount}
        </td>
        <td>
          <button type="button" className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
            <MdEdit />
          </button>
          <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
        </td>
      </tr>

      {/* Mobile - kart */}
      <div className={`${styles.card} ${isIncome ? styles.cardIncome : styles.cardExpense}`}>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Date</span>
          <span>{transaction.transactionDate?.slice(0, 10)}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Type</span>
          <span>{isIncome ? "+" : "-"}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Category</span>
          <span>{transaction.categoryId}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Comment</span>
          <span>{transaction.comment}</span>
        </div>
        <div className={styles.cardRow}>
          <span className={styles.cardLabel}>Sum</span>
          <span className={isIncome ? styles.income : styles.expense}>
            {transaction.amount}
          </span>
        </div>
        <div className={styles.cardActions}>
          <button type="button" className={styles.editBtn} onClick={() => setIsModalOpen(true)}>
            <MdEdit />
          </button>
          <button type="button" className={styles.deleteBtn} onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>

      {isModalOpen && (
        <ModalEditTransaction
          transaction={transaction}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}
