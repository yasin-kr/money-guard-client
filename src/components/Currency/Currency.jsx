import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../../redux/finance/financeOperations';
import {
  selectCurrency,
  selectIsLoading,
  selectCurrencyError,
} from '../../redux/finance/financeSelectors';
import Loader from '../Loader/Loader';
import styles from './Currency.module.css';

const CURRENCY_LABELS = { 840: 'USD', 978: 'EUR' };

const Currency = () => {
  const dispatch = useDispatch();
  const currency = useSelector(selectCurrency);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectCurrencyError);

  useEffect(() => {
    const checkAndFetchCurrency = () => {
      const localData = localStorage.getItem('currency_data');
      const localTimestamp = localStorage.getItem('currency_timestamp');
      const now = new Date().getTime();

      if (localData && localTimestamp && now - Number(localTimestamp) < 3600000) {
        return;
      }

      dispatch(fetchCurrency());
    };

    checkAndFetchCurrency();
  }, [dispatch]);

  useEffect(() => {
    if (currency && currency.length > 0) {
      localStorage.setItem('currency_data', JSON.stringify(currency));
      localStorage.setItem('currency_timestamp', new Date().getTime().toString());
    }
  }, [currency]);

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

  const displayData = currency && currency.length > 0 
    ? currency 
    : JSON.parse(localStorage.getItem('currency_data') || '[]');

  return (
    <div className={styles.currencyWrapper}>
      <div className={styles.currencyTable}>
        <div className={styles.currencyHeader}>
          <span>Currency</span>
          <span>Purchase</span>
          <span>Sale</span>
        </div>

        <div className={styles.tableBody}>
          {displayData.length === 0 ? (
            <div className={styles.currencyRow}>
              <span>-</span>
              <span>-</span>
              <span>-</span>
            </div>
          ) : (
            displayData.map((item) => (
              <div className={styles.currencyRow} key={item.currencyCodeA}>
                <span className={styles.currencyName}>
                  {CURRENCY_LABELS[item.currencyCodeA] ?? String(item.currencyCodeA)}
                </span>
                <span>{item.rateBuy?.toFixed(2) ?? '-'}</span>
                <span>{item.rateSell?.toFixed(2) ?? '-'}</span>
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