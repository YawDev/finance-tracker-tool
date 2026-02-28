import FinanceTrackerView from "./components/FinanceTrackerView";
import "./styles/App.css";
import type { Transaction } from "./utils/Types";
import { useState, useEffect } from "react";
import AppContext from "./utils/Context";
import { saveToLocalStorage, getFromLocalStorage } from "./utils/LocalStorage";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactionList, setTransactionList] = useState<Transaction[]>(
    (): Transaction[] => {
      return getFromLocalStorage("transactions") ?? [];
    },
  );

  const [query, setQuery] = useState("");

  useEffect(() => {
    saveToLocalStorage("transactions", transactionList);
  }, [transactionList]);

  return (
    <>
      <AppContext.Provider
        value={{
          totalSpent,
          setTotalSpent,
          transactionList,
          setTransactionList,
          query,
          setQuery,
        }}
      >
        <h1 className="app-title">Finance Tracker Tool</h1>
        <FinanceTrackerView />
      </AppContext.Provider>
    </>
  );
}

export default App;
