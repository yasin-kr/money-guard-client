import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import DatePicker from "react-datepicker";

import * as yup from "yup";

import "react-datepicker/dist/react-datepicker.css";

import { FiCalendar } from "react-icons/fi";

import css from "./EditTransactionForm.module.css";

import {
  selectCategories,
  selectCategoriesLoading,
} from "../../redux/categories/selectors";
import { fetchCategories } from "../../redux/categories/operations";

import { editTransaction } from "../../redux/transactions/operations";

const schema = yup.object({
  amount: yup
    .number()
    .typeError("Amount must be a number")
    .positive("Amount must be greater than 0")
    .required("Amount is required"),

  comment: yup.string().required("Comment is required"),

  date: yup
    .date()
    .nullable()
    .typeError("Please select a valid date")
    .required("Date is required"),

  category: yup.string().when("$type", {
    is: "expense",
    then: (schema) => schema.required("Category is required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

function formatTransactionDate(date) {
  return date.toISOString().slice(0, 10);
}

export function EditTransactionForm({ onClose, transaction }) {
  const type = transaction?.type === "INCOME" ? "income" : "expense";

  const dispatch = useDispatch();

  const categories = useSelector(selectCategories);

  const isLoadingCategories = useSelector(selectCategoriesLoading);

  useEffect(() => {
    if (type === "expense" && !categories.length) {
      dispatch(fetchCategories());
    }
  }, [categories.length, dispatch, type]);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),

    context: { type },

    defaultValues: {
      amount: Math.abs(transaction?.amount || 0),

      comment: transaction?.comment || "",

      category: transaction?.categoryId || "",

      date: transaction?.transactionDate
        ? new Date(transaction.transactionDate)
        : null,
    },
  });

  async function onSubmit(data) {
    const finalData = {
      amount: Number(data.amount),
      transactionDate: formatTransactionDate(data.date),
      comment: data.comment,
      ...(type === "expense" ? { categoryId: data.category } : {}),
    };

    try {
      await dispatch(
        editTransaction({
          id: transaction.id,
          data: finalData,
        }),
      ).unwrap();

      reset();

      onClose();
    } catch {
      // Global error toast is handled in App; keep the modal open for retry.
    }
  }

  return (
    <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.title}>Edit transaction</h2>

      <div className={css.typeBox}>
        <span className={type === "income" ? css.activeIncome : css.typeText}>
          Income
        </span>

        <span className={css.divider}>/</span>

        <span className={type === "expense" ? css.activeExpense : css.typeText}>
          Expense
        </span>
      </div>

      {type === "expense" && (
        <div className={css.field}>
          {isLoadingCategories ? (
            <p>Loading...</p>
          ) : (
            <select className={css.select} {...register("category")}>
              <option value="">Select category</option>

              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          )}

          {errors.category && (
            <p className={css.error}>{errors.category.message}</p>
          )}
        </div>
      )}

      <div className={css.row}>
        <div className={css.field}>
          <input
            className={css.input}
            type="number"
            placeholder="0.00"
            {...register("amount")}
          />

          {errors.amount && (
            <p className={css.error}>{errors.amount.message}</p>
          )}
        </div>

        <div className={css.field}>
          <div className={css.dateBox}>
            <Controller
              control={control}
              name="date"
              render={({ field }) => (
                <DatePicker
                  className={css.input}
                  wrapperClassName={css.datePicker}
                  placeholderText="Select date"
                  selected={field.value}
                  onChange={(date) => field.onChange(date)}
                  dateFormat="dd.MM.yyyy"
                  maxDate={new Date()}
                />
              )}
            />

            <FiCalendar className={css.calendarIcon} />
          </div>

          {errors.date && <p className={css.error}>{errors.date.message}</p>}
        </div>
      </div>

      <div className={css.field}>
        <input
          className={css.input}
          type="text"
          placeholder="Comment"
          {...register("comment")}
        />

        {errors.comment && (
          <p className={css.error}>{errors.comment.message}</p>
        )}
      </div>

      <div className={css.buttonBox}>
        <button className={css.saveBtn} type="submit">
          Save
        </button>

        <button className={css.cancelBtn} type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
}
