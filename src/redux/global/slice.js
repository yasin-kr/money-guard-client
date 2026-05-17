import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pendingCount: 0,
  isLoading: false,
  error: null,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    clearGlobalError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.pendingCount += 1;
          state.isLoading = true;
          state.error = null;
        },
      )
      .addMatcher(
        (action) =>
          action.type.endsWith("/fulfilled") || action.type.endsWith("/rejected"),
        (state, action) => {
          state.pendingCount = Math.max(0, state.pendingCount - 1);
          state.isLoading = state.pendingCount > 0;

          if (action.type.endsWith("/rejected")) {
            state.error = action.payload || "Request failed";
          }
        },
      );
  },
});

export const { clearGlobalError } = globalSlice.actions;
export const globalReducer = globalSlice.reducer;
