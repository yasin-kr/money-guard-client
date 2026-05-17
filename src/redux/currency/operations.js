import { createAsyncThunk } from "@reduxjs/toolkit";
import { monobankClient } from "../../api/monobank";
import { getApiErrorMessage } from "../../api/client";

const CACHE_KEY = "moneyGuardCurrency";
const CACHE_TTL = 60 * 60 * 1000;
const UAH_CODE = 980;
const TARGET_CURRENCIES = [840, 978];

const getCachedCurrency = () => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");

    if (!cached?.rates || !cached?.createdAt) {
      return null;
    }

    if (Date.now() - cached.createdAt > CACHE_TTL) {
      return null;
    }

    return cached;
  } catch {
    return null;
  }
};

const saveCachedCurrency = (rates) => {
  const cached = {
    rates,
    createdAt: Date.now(),
  };

  localStorage.setItem(CACHE_KEY, JSON.stringify(cached));
  return cached;
};

export const fetchCurrency = createAsyncThunk(
  "currency/fetchCurrency",
  async (_, thunkApi) => {
    const cached = getCachedCurrency();

    if (cached) {
      return cached;
    }

    try {
      const { data } = await monobankClient.get("");
      const rates = data.filter(
        ({ currencyCodeA, currencyCodeB }) =>
          currencyCodeB === UAH_CODE && TARGET_CURRENCIES.includes(currencyCodeA),
      );

      return saveCachedCurrency(rates);
    } catch (error) {
      return thunkApi.rejectWithValue(getApiErrorMessage(error));
    }
  },
);
