import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, getApiErrorMessage } from "../../api/client";

export const fetchSummary = createAsyncThunk(
  "statistics/fetchSummary",
  async ({ month, year }, thunkApi) => {
    try {
      const { data } = await apiClient.get("/api/transactions-summary", {
        params: { month, year },
      });
      return { data, month, year };
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);
