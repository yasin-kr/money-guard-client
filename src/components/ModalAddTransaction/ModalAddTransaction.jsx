import { useEffect } from "react";
import { AddTransactionForm } from "../AddTransactionForm/AddTransactionForm";
import css from "./ModalAddTransaction.module.css";
import { RxCross1 } from "react-icons/rx";

const ModalAddTransaction = ({ onClose }) => {
  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.modal}>
        <button
          type="button"
          className={css.closeBtn}
          onClick={onClose}
          aria-label="Close add transaction modal">
          <RxCross1 />
        </button>

        <AddTransactionForm onClose={onClose} />
      </div>
    </div>
  );
};

export default ModalAddTransaction;
