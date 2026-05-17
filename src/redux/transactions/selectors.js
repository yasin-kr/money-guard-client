import { createSelector } from "@reduxjs/toolkit";
import { calculateBalance } from "./slice";

export const selectTransactions = (state) => state.transactions.items;
export const selectTransactionsLoading = (state) => state.transactions.isLoading;
export const selectTransactionsError = (state) => state.transactions.error;

export const selectTransactionById = (transactionId) => (state) =>
  state.transactions.items.find((transaction) => transaction.id === transactionId);

export const selectTotalBalance = createSelector(
  [selectTransactions],
  (transactions) => calculateBalance(transactions),
);
