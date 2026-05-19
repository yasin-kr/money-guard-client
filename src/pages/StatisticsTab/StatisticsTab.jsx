import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSummary } from "../../redux/statistics/operations";
import {
  selectSelectedMonth,
  selectSelectedYear,
} from "../../redux/statistics/selectors";
import { Chart } from "../../components/Chart/Chart";
import { StatisticsDashboard } from "../../components/StatisticsDashboard/StatisticsDashboard";
import { StatisticsTable } from "../../components/StatisticsTable/StatisticsTable";
import css from "./StatisticsTab.module.css";

export default function StatisticsTab() {
  const dispatch = useDispatch();
  const selectedMonth = useSelector(selectSelectedMonth);
  const selectedYear = useSelector(selectSelectedYear);

  useEffect(() => {
    dispatch(fetchSummary({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  return (
    <section className={css.statistics}>
      <h2 className={css.title}>Statistics</h2>
      <div className={css.content}>
        <Chart />
        <div className={css.right}>
          <StatisticsDashboard />
          <StatisticsTable />
        </div>
      </div>
    </section>
  );
}
