import axios from "axios";

export const MONOBANK_API_URL =
  import.meta.env.VITE_MONOBANK_API_URL ||
  "https://api.monobank.ua/bank/currency";

export const monobankClient = axios.create({
  baseURL: MONOBANK_API_URL,
});
