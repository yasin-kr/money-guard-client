import { useEffect } from "react";

import { MdClose } from "react-icons/md";

import { EditTransactionForm } from "../EditTransactionForm/EditTransactionForm";

import css from "./ModalEditTransaction.module.css";

const ModalEditTransaction = ({ onClose, transaction }) => {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleEscape);

      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button type="button" className={css.closeBtn} onClick={onClose}>
          <MdClose />
        </button>

        <EditTransactionForm onClose={onClose} transaction={transaction} />
      </div>
    </div>
  );
};

export default ModalEditTransaction;
