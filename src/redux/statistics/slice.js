import { createSlice } from "@reduxjs/toolkit";
import { fetchSummary } from "./operations";

const now = new Date();

const initialState = {
  summary: null,
  selectedMonth: now.getMonth() + 1,
  selectedYear: now.getFullYear(),
  isLoading: false,
  error: null,
};

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  reducers: {
    setStatisticsPeriod: (state, action) => {
      state.selectedMonth = action.payload.month;
      state.selectedYear = action.payload.year;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSummary.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.summary = action.payload.data;
        state.selectedMonth = action.payload.month;
        state.selectedYear = action.payload.year;
        state.isLoading = false;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Statistics request failed";
      });
  },
});

export const { setStatisticsPeriod } = statisticsSlice.actions;
export const statisticsReducer = statisticsSlice.reducer;
