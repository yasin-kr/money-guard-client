export const selectSummary = (state) => state.statistics.summary;
export const selectSelectedMonth = (state) => state.statistics.selectedMonth;
export const selectSelectedYear = (state) => state.statistics.selectedYear;
export const selectStatisticsLoading = (state) => state.statistics.isLoading;
export const selectStatisticsError = (state) => state.statistics.error;

export const selectExpenseCategories = (state) =>
  state.statistics.summary?.categoriesSummary ||
  state.statistics.summary?.expenseSummary ||
  [];

export const selectIncomeTotal = (state) =>
  state.statistics.summary?.incomeSummary ||
  state.statistics.summary?.incomeTotal ||
  0;

export const selectExpenseTotal = (state) =>
  state.statistics.summary?.expenseSummary ||
  state.statistics.summary?.expenseTotal ||
  0;
