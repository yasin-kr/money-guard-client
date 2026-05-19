import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedMonth,
  selectSelectedYear,
} from "../../redux/statistics/selectors";
import { setStatisticsPeriod } from "../../redux/statistics/slice";
import css from "./StatisticsDashboard.module.css";

const MONTHS = [
  "January", "February", "March", "April",
  "May", "June", "July", "August",
  "September", "October", "November", "December",
];

const currentYear = new Date().getFullYear();
const YEARS = Array.from(
  { length: currentYear - 2019 },
  (_, i) => currentYear - i,
);

export function StatisticsDashboard() {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(selectSelectedMonth);
  const selectedYear = useSelector(selectSelectedYear);
  const [openDropdown, setOpenDropdown] = useState(null);
  const dashboardRef = useRef(null);

  useEffect(() => {
    if (!openDropdown) return undefined;

    function handleOutsideClick(event) {
      if (!dashboardRef.current?.contains(event.target)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [openDropdown]);

  function handleMonthChange(month) {
    dispatch(
      setStatisticsPeriod({
        month,
        year: selectedYear,
      }),
    );
    setOpenDropdown(null);
  }

  function handleYearChange(year) {
    dispatch(
      setStatisticsPeriod({
        month: selectedMonth,
        year,
      }),
    );
    setOpenDropdown(null);
  }

  return (
    <div className={css.dashboard} ref={dashboardRef}>
      <div className={css.selectWrapper}>
        <button
          className={css.select}
          type="button"
          aria-label="Select statistics month"
          onClick={() =>
            setOpenDropdown((current) => (current === "month" ? null : "month"))
          }
        >
          <span>{MONTHS[selectedMonth - 1]}</span>
          <span
            className={`${css.chevron} ${
              openDropdown === "month" ? css.chevronOpen : ""
            }`}
            aria-hidden="true"
          ></span>
        </button>

        {openDropdown === "month" && (
          <ul className={css.dropdown}>
            {MONTHS.map((name, i) => (
              <li key={name}>
                <button
                  className={`${css.dropdownOption} ${
                    selectedMonth === i + 1 ? css.dropdownOptionActive : ""
                  }`}
                  type="button"
                  onClick={() => handleMonthChange(i + 1)}
                >
                  {name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={css.selectWrapper}>
        <button
          className={css.select}
          type="button"
          aria-label="Select statistics year"
          onClick={() =>
            setOpenDropdown((current) => (current === "year" ? null : "year"))
          }
        >
          <span>{selectedYear}</span>
          <span
            className={`${css.chevron} ${
              openDropdown === "year" ? css.chevronOpen : ""
            }`}
            aria-hidden="true"
          ></span>
        </button>

        {openDropdown === "year" && (
          <ul className={css.dropdown}>
            {YEARS.map((year) => (
              <li key={year}>
                <button
                  className={`${css.dropdownOption} ${
                    selectedYear === year ? css.dropdownOptionActive : ""
                  }`}
                  type="button"
                  onClick={() => handleYearChange(year)}
                >
                  {year}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
