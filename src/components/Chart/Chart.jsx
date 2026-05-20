import { useSelector } from "react-redux";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import {
  selectExpenseCategories,
  selectExpenseTotal,
} from "../../redux/statistics/selectors";
import css from "./Chart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

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

const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => {
          const value = Number(ctx.parsed);

          return ` ${ctx.label}: ${Number.isFinite(value) ? value.toFixed(2) : "0.00"}`;
        },
      },
    },
  },
};

export function Chart() {
  const categories = useSelector(selectExpenseCategories);
  const expenseTotal = useSelector(selectExpenseTotal);

  const expenseCategories = Array.isArray(categories)
    ? categories.filter(
        (category) =>
          !category.type || String(category.type).toUpperCase() === "EXPENSE",
      )
    : [];
  const chartCategories = expenseCategories.filter(
    (category) => getCategoryTotal(category) > 0,
  );

  if (chartCategories.length === 0) {
    return (
      <div className={css.wrapper}>
        <div className={css.empty}>
          <p>No expense data for this period</p>
        </div>
      </div>
    );
  }

  const data = {
    labels: chartCategories.map((category) => getCategoryName(category)),
    datasets: [
      {
        data: chartCategories.map((category) => getCategoryTotal(category)),
        backgroundColor: chartCategories.map(
          (_, index) => COLORS[index % COLORS.length],
        ),
        borderWidth: 0,
      },
    ],
  };

  const total = typeof expenseTotal === "number" ? expenseTotal : 0;

  return (
    <div className={css.wrapper}>
      <div className={css.chartContainer}>
        <Doughnut data={data} options={options} />
        <div className={css.centerLabel}>
          <span className={css.totalAmount}>
            {"\u20b4 "}
            {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
