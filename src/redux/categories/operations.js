import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, getApiErrorMessage } from "../../api/client";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkApi) => {
    try {
      const { data } = await apiClient.get("/api/transaction-categories");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);
