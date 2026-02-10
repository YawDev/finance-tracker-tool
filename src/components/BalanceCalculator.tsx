import { useContext, useEffect } from "react";
import AppContext from "../utils/Context";

const BalanceCalculator = () => {
  const context = useContext(AppContext);
  const totalSpent = context ? context.totalSpent : 0;

  useEffect(() => {
    if (context) {
      const total = context.transactionList.reduce((acc, transaction) => {
        return acc + transaction.amount;
      }, 0);
      context.setTotalSpent(Math.round(total * 100) / 100);
    }
  }, [context]);

  return (
    <div className="balance-calculator-container">
      <span className="balance-label">Total Balance</span>
      <div className="balance-amount">
        <span className="currency">$</span>
        <span className="amount">{totalSpent}</span>
      </div>
      <span className="balance-subtitle">Current Spending</span>
    </div>
  );
};

export default BalanceCalculator;
