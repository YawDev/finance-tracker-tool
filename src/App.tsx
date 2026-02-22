import FinanceTrackerView from "./components/FinanceTrackerView";
import "./styles/App.css";
import type { Transaction } from "./utils/Types";
import { useState } from "react";
import AppContext from "./utils/Context";

function App() {
  const [totalSpent, setTotalSpent] = useState(0);
  const [transactionList, setTransactionList] = useState<Transaction[]>([
    {
      id: "uuid",
      name: "Test Transaction",
      description: "This is a test transaction",
      amount: 100,
      date: "2024-06-01",
      type: { name: "Expense" },
    },
  ]);
  const [query, setQuery] = useState("");

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
