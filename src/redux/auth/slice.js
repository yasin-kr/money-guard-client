import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, refreshUser, registerUser } from "./operations";

const initialState = {
  user: null,
  token: null,
  isLoggedIn: false,
  isRefreshing: false,
  error: null,
};

const getUserFromPayload = (payload) => payload?.user || payload || null;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = getUserFromPayload(action.payload);
        state.token = action.payload?.token || null;
        state.isLoggedIn = Boolean(state.token);
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = getUserFromPayload(action.payload);
        state.token = action.payload?.token || null;
        state.isLoggedIn = Boolean(state.token);
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, () => initialState)
      .addCase(logoutUser.rejected, () => initialState)
      .addCase(refreshUser.pending, (state) => {
        state.isRefreshing = true;
        state.error = null;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = getUserFromPayload(action.payload);
        state.isLoggedIn = true;
        state.isRefreshing = false;
        state.error = null;
      })
      .addCase(refreshUser.rejected, (state, action) => {
        state.user = null;
        state.token = null;
        state.isLoggedIn = false;
        state.isRefreshing = false;
        state.error = action.payload || null;
      })
      .addMatcher(
        (action) =>
          action.type.startsWith("auth/") && action.type.endsWith("/rejected"),
        (state, action) => {
          state.error = action.payload || "Auth request failed";
        },
      );
  },
});

export const { clearAuth } = authSlice.actions;
export const authReducer = authSlice.reducer;
