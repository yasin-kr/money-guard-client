export const selectSummary = (state) => state.statistics.summary;
export const selectSelectedMonth = (state) => state.statistics.selectedMonth;
export const selectSelectedYear = (state) => state.statistics.selectedYear;
export const selectStatisticsLoading = (state) => state.statistics.isLoading;
export const selectStatisticsError = (state) => state.statistics.error;

const EMPTY_SUMMARY = {};
const EMPTY_CATEGORIES = [];

const toNumber = (value) => {
  const numericValue = Number(value);

  return Number.isFinite(numericValue) ? numericValue : 0;
};

const getSummary = (state) => state.statistics.summary || EMPTY_SUMMARY;

export const selectExpenseCategories = (state) => {
  const summary = getSummary(state);
  const categories =
    summary.categoriesSummary ||
    summary.expensesSummary ||
    summary.expenseCategories;

  return Array.isArray(categories) ? categories : EMPTY_CATEGORIES;
};

export const selectIncomeTotal = (state) =>
  toNumber(
    getSummary(state).incomeSummary ||
      getSummary(state).incomeTotal ||
      getSummary(state).incomesSummary ||
      0,
  );

export const selectExpenseTotal = (state) =>
  Math.abs(
    toNumber(
      getSummary(state).expenseSummary ||
        getSummary(state).expenseTotal ||
        getSummary(state).expensesSummary ||
        0,
    ),
  );
