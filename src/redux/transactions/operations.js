import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient, getApiErrorMessage } from "../../api/client";

export const fetchTransactions = createAsyncThunk(
  "transactions/fetchTransactions",
  async (_, thunkApi) => {
    try {
      const { data } = await apiClient.get("/api/transactions");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const addTransaction = createAsyncThunk(
  "transactions/addTransaction",
  async (transaction, thunkApi) => {
    try {
      const { data } = await apiClient.post("/api/transactions", transaction);
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const editTransaction = createAsyncThunk(
  "transactions/editTransaction",
  async ({ id, data: transaction }, thunkApi) => {
    try {
      const { data } = await apiClient.patch(
        `/api/transactions/${id}`,
        transaction,
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);

export const deleteTransaction = createAsyncThunk(
  "transactions/deleteTransaction",
  async (id, thunkApi) => {
    try {
      await apiClient.delete(`/api/transactions/${id}`);
      return id;
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);
