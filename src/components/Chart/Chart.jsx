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

const options = {
  cutout: "70%",
  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (ctx) => ` ${ctx.label}: ${ctx.parsed.toFixed(2)}`,
      },
    },
  },
};

export function Chart() {
  const categories = useSelector(selectExpenseCategories);
  const expenseTotal = useSelector(selectExpenseTotal);

  const expenseCategories = Array.isArray(categories)
    ? categories.filter((c) => !c.type || c.type === "EXPENSE")
    : [];

  if (expenseCategories.length === 0) {
    return (
      <div className={css.wrapper}>
        <div className={css.empty}>
          <p>No expense data for this period</p>
        </div>
      </div>
    );
  }

  const data = {
    labels: expenseCategories.map((c) => c.name),
    datasets: [
      {
        data: expenseCategories.map((c) => c.total),
        backgroundColor: expenseCategories.map(
          (_, i) => COLORS[i % COLORS.length]
        ),
        borderWidth: 0,
      },
    ],
  };

  const total =
    typeof expenseTotal === "number" ? expenseTotal : 0;

  return (
    <div className={css.wrapper}>
      <div className={css.chartContainer}>
        <Doughnut data={data} options={options} />
        <div className={css.centerLabel}>
          <span className={css.totalAmount}>
            ₴ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
