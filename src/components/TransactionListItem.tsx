import React, { useContext } from "react";
import type { Transaction } from "../utils/Types";
import AppContext from "../utils/Context";

const TransactionListItem = ({
  transaction,
  setEditMode,
  setModalIsOpen,
}: {
  transaction: Transaction;
  setEditMode: React.Dispatch<
    React.SetStateAction<{ isEdit: boolean; transaction: Transaction | null }>
  >;
  setModalIsOpen: (boolean: boolean) => void;
}) => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "TransactionListItem must be used within an AppContext Provider",
    );
  }

  const { transactionList, setTransactionList } = context;

  const handleDeleteItem = (transactionToDelete: Transaction) => {
    window.confirm("Are you sure you want to delete this transaction?") &&
      deleteItem(transactionToDelete);
  };
  const deleteItem = (transactionToDelete: Transaction) => {
    const updatedItem = transactionList.filter(
      (transaction) => transaction.id !== transactionToDelete.id,
    );
    setTransactionList(updatedItem);
  };
  return (
    <tr className="transaction-row" key={transaction.id}>
      <td>{transaction.name}</td>
      <td>{transaction.description}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.date}</td>
      <td>{transaction.type.name}</td>
      <td>
        <div className="action-buttons">
          <button
            className="edit-btn"
            onClick={() => {
              setEditMode({ isEdit: true, transaction });
              setModalIsOpen(true);
            }}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => handleDeleteItem(transaction)}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionListItem;
