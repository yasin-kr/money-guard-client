import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransactions } from "../../redux/transactions/operations";
import { fetchCategories } from "../../redux/categories/operations";
import { selectTransactions, selectTransactionsLoading } from "../../redux/transactions/selectors";
import { TransactionsList } from "../../components/TransactionsList/TransactionsList";
import { ButtonAddTransactions } from "../../components/ButtonAddTransactions/ButtonAddTransactions";

export default function HomeTab() {
  const dispatch = useDispatch();
  const transactions = useSelector(selectTransactions);
  const isLoading = useSelector(selectTransactionsLoading);

  useEffect(() => {
    dispatch(fetchTransactions());
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <div>
      <TransactionsList transactions={transactions} isLoading={isLoading} />
      <ButtonAddTransactions />
    </div>
  );
}
