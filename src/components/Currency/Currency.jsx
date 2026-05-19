import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrency } from "../../redux/currency/operations";
import {
  selectCurrency,
  selectCurrencyError,
  selectIsLoading,
} from "../../redux/currency/selectors";
import { Loader } from "../Loader/Loader";
import styles from "./Currency.module.css";

const CURRENCY_LABELS = { 840: "USD", 978: "EUR" };

const Currency = () => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectCurrencyError);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div className={styles.currencyWrapper}>
        <div className={styles.loaderCenter}>
          <Loader />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.currencyWrapper}>
        <div className={styles.errorMessage}>Failed to load currency data.</div>
      </div>
    );
  }

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.currencyTable}>
        <div className={styles.currencyHeader}>
          <span>Currency</span>
          <span>Purchase</span>
          <span>Sale</span>
        </div>

        <div className={styles.tableBody}>
          {!currency || currency.length === 0 ? (
            <div className={styles.currencyRow}>
              <span>-</span>
              <span>-</span>
              <span>-</span>
            </div>
          ) : (
            currency.map((item) => (
              <div className={styles.currencyRow} key={item.currencyCodeA}>
                <span className={styles.currencyName}>
                  {CURRENCY_LABELS[item.currencyCodeA] ??
                    String(item.currencyCodeA)}
                </span>
                <span>{item.rateBuy?.toFixed(2) ?? "-"}</span>
                <span>{item.rateSell?.toFixed(2) ?? "-"}</span>
              </div>
            ))
          )}
        </div>
      </div>

      <div className={styles.chartWaveDecoration}></div>
    </div>
  );
};

export default Currency;
