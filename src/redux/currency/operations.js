import { createAsyncThunk } from "@reduxjs/toolkit";
import { monobankClient } from "../../api/monobank";

const CACHE_KEY = "moneyGuardCurrency";
const CACHE_TTL = 60 * 60 * 1000;
const UAH_CODE = 980;
const TARGET_CURRENCIES = [840, 978];
const FALLBACK_RATES = [
  { currencyCodeA: 840, currencyCodeB: UAH_CODE, rateBuy: 27.55, rateSell: 27.65 },
  { currencyCodeA: 978, currencyCodeB: UAH_CODE, rateBuy: 30.0, rateSell: 30.1 },
];

const getCachedCurrency = ({ allowExpired = false } = {}) => {
  try {
    const cached = JSON.parse(localStorage.getItem(CACHE_KEY) || "null");

    if (!cached?.rates || !cached?.createdAt) {
      return null;
    }

    if (!allowExpired && Date.now() - cached.createdAt > CACHE_TTL) {
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
  async () => {
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
    } catch {
      const staleCache = getCachedCurrency({ allowExpired: true });

      if (staleCache) {
        return staleCache;
      }

      return saveCachedCurrency(FALLBACK_RATES);
    }
  },
);
