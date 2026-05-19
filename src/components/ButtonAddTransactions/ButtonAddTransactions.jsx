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
      >
        +
      </button>

      {isModalOpen && (
        <ModalAddTransaction onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
