import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, getApiErrorMessage, setAuthHeader } from "../../api/client";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await apiClient.post("/api/auth/sign-up", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, thunkApi) => {
    try {
      const { data } = await apiClient.post("/api/auth/sign-in", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const logoutUser = createAsyncThunk(
  "auth/logoutUser",
  async (_, thunkApi) => {
    try {
      await apiClient.delete("/api/auth/sign-out");
      return null;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    } finally {
      setAuthHeader(null);
    }
  },
);

export const refreshUser = createAsyncThunk(
  "auth/refreshUser",
  async (_, thunkApi) => {
    const { token } = thunkApi.getState().auth;

    if (!token) {
      return thunkApi.rejectWithValue("No saved token");
    }

    try {
      setAuthHeader(token);
      const { data } = await apiClient.get("/api/users/current");
      return data;
    } catch (error) {
      setAuthHeader(null);
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const logOut = logoutUser;