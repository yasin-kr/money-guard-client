import { createSlice } from "@reduxjs/toolkit";
import { fetchCurrency } from "./operations";

const initialState = {
  rates: [],
  lastFetchedAt: null,
  isLoading: false,
  error: null,
};

const currencySlice = createSlice({
  name: "currency",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrency.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrency.fulfilled, (state, action) => {
        state.rates = action.payload.rates;
        state.lastFetchedAt = action.payload.createdAt;
        state.isLoading = false;
      })
      .addCase(fetchCurrency.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Currency request failed";
      });
  },
});

export const currencyReducer = currencySlice.reducer;
