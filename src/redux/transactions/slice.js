import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from "./operations";

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const normalizeTransactions = (payload) =>
  Array.isArray(payload) ? payload : payload?.transactions || [];

const calculateBalance = (transactions) =>
  transactions.reduce((total, transaction) => {
    const amount = Number(transaction.amount ?? transaction.sum ?? 0);
    return total + amount;
  }, 0);

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.items = normalizeTransactions(action.payload);
        state.isLoading = false;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Transactions request failed";
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.items = state.items.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        );
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (transaction) => transaction.id !== action.payload,
        );
      });
  },
});

export { calculateBalance };
export const transactionsReducer = transactionsSlice.reducer;
