import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedMonth,
  selectSelectedYear,
} from "../../redux/statistics/selectors";
import { fetchSummary } from "../../redux/statistics/operations";
import css from "./StatisticsDashboard.module.css";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: currentYear - 2019 }, (_, i) => currentYear - i);

export function StatisticsDashboard() {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(selectSelectedMonth);
  const selectedYear = useSelector(selectSelectedYear);

  function handleMonthChange(e) {
    dispatch(fetchSummary({ month: Number(e.target.value), year: selectedYear }));
  }

  function handleYearChange(e) {
    dispatch(fetchSummary({ month: selectedMonth, year: Number(e.target.value) }));
  }

  return (
    <div className={css.dashboard}>
      <div className={css.selectWrapper}>
        <select
          className={css.select}
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {MONTHS.map((name, i) => (
            <option key={i + 1} value={i + 1}>
              {name}
            </option>
          ))}
        </select>
        <span className={css.chevron}>▾</span>
      </div>

      <div className={css.selectWrapper}>
        <select
          className={css.select}
          value={selectedYear}
          onChange={handleYearChange}
        >
          {YEARS.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <span className={css.chevron}>▾</span>
      </div>
    </div>
  );
}
