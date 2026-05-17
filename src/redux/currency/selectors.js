const CURRENCY_LABELS = {
  840: "USD",
  978: "EUR",
};

export const selectCurrencyRates = (state) => state.currency.rates;
export const selectCurrencyLoading = (state) => state.currency.isLoading;
export const selectCurrencyError = (state) => state.currency.error;
export const selectCurrencyLastFetchedAt = (state) => state.currency.lastFetchedAt;

export const selectFormattedCurrencyRates = (state) =>
  state.currency.rates.map((rate) => ({
    ...rate,
    code: CURRENCY_LABELS[rate.currencyCodeA] || String(rate.currencyCodeA),
    purchase: rate.rateBuy ?? rate.rateCross ?? 0,
    sale: rate.rateSell ?? rate.rateCross ?? 0,
  }));
