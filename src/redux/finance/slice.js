import { createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  editTransaction,
  fetchTransactions,
} from "../transactions/operations";
import { calculateBalance } from "../transactions/slice";

const initialState = {
  totalBalance: 0,
  transactions: [],
};

const normalizeTransactions = (payload) =>
  Array.isArray(payload) ? payload : payload?.transactions || [];

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = normalizeTransactions(action.payload);
        state.totalBalance = calculateBalance(state.transactions);
      })
      .addCase(addTransaction.fulfilled, (state, action) => {
        state.transactions.unshift(action.payload);
        state.totalBalance = calculateBalance(state.transactions);
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.map((transaction) =>
          transaction.id === action.payload.id ? action.payload : transaction,
        );
        state.totalBalance = calculateBalance(state.transactions);
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.transactions = state.transactions.filter(
          (transaction) => transaction.id !== action.payload,
        );
        state.totalBalance = calculateBalance(state.transactions);
      });
  },
});

export const financeReducer = financeSlice.reducer;
