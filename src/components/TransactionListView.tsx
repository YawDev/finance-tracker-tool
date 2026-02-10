import React from "react";
import type { Transaction } from "../utils/Types";
import TransactionListItem from "./TransactionListItem";
import AddTransactionButton from "./AddTransactionButton";
import { useContext } from "react";
import AppContext from "../utils/Context";

const TransactionListView = ({
  setEditMode,
  setModalIsOpen,
}: {
  setEditMode: React.Dispatch<
    React.SetStateAction<{ isEdit: boolean; transaction: Transaction | null }>
  >;
  setModalIsOpen: (boolean: boolean) => void;
}) => {
  const context = useContext(AppContext);
  const transactionList = context ? context.transactionList : [];

  return (
    <div className="transaction-list-container">
      <div className="transaction-header">
        <h2 className="transaction-title">Transactions</h2>
        <AddTransactionButton setModalIsOpen={setModalIsOpen} />
      </div>
      {transactionList?.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactionList.map((transaction) => (
              <TransactionListItem
                key={transaction.id}
                transaction={transaction}
                setEditMode={setEditMode}
                setModalIsOpen={setModalIsOpen}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TransactionListView;
