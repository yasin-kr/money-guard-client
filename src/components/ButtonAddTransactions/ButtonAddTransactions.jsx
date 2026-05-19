import { useState } from "react";
import ModalAddTransaction from "../ModalAddTransaction/ModalAddTransaction";
import styles from "./ButtonAddTransactions.module.css";

export function ButtonAddTransactions() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.button}
        onClick={() => setIsModalOpen(true)}
        aria-label="Add transaction"
      >
        +
      </button>

      {isModalOpen && (
        <ModalAddTransaction onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
