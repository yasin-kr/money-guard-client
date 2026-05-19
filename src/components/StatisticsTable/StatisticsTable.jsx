import { useSelector } from "react-redux";
import {
  selectExpenseCategories,
  selectExpenseTotal,
  selectIncomeTotal,
} from "../../redux/statistics/selectors";
import css from "./StatisticsTable.module.css";

const COLORS = [
  "#FED057", "#FFD8D0", "#FD9498", "#C5BAFF",
  "#6E78E8", "#4A56E2", "#81E1FF", "#24CCA7",
  "#00AD84", "#FFB627", "#FF7F7F", "#F4AD4C",
];

function getCategoryName(category) {
  return category.name || category.categoryName || "Other";
}

function getCategoryTotal(category) {
  const total = Number(category.total ?? category.amount ?? category.sum ?? 0);

  return Number.isFinite(total) ? Math.abs(total) : 0;
}

export function StatisticsTable() {
  const categories = useSelector(selectExpenseCategories);
  const expenseTotal = useSelector(selectExpenseTotal);
  const incomeTotal = useSelector(selectIncomeTotal);

  const expenseCategories = Array.isArray(categories)
    ? categories.filter(
        (category) =>
          !category.type || String(category.type).toUpperCase() === "EXPENSE",
      )
    : [];

  const income =
    typeof incomeTotal === "number" ? incomeTotal : 0;
  const expense =
    typeof expenseTotal === "number" ? expenseTotal : 0;

  return (
    <div className={css.wrapper}>
      <div className={css.header}>
        <span>Category</span>
        <span>Sum</span>
      </div>

      {expenseCategories.length === 0 ? (
        <p className={css.empty}>No transactions for this period</p>
      ) : (
        <ul className={css.list}>
          {expenseCategories.map((cat, i) => (
            <li key={`${getCategoryName(cat)}-${i}`} className={css.item}>
              <span
                className={css.colorDot}
                style={{ backgroundColor: COLORS[i % COLORS.length] }}
              />
              <span className={css.name}>{getCategoryName(cat)}</span>
              <span className={css.sum}>
                {getCategoryTotal(cat).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      )}

      <div className={css.totals}>
        <div className={css.totalRow}>
          <span className={css.totalLabel}>Expenses:</span>
          <span className={css.expenseValue}>{expense.toFixed(2)}</span>
        </div>
        <div className={css.totalRow}>
          <span className={css.totalLabel}>Income:</span>
          <span className={css.incomeValue}>{income.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
