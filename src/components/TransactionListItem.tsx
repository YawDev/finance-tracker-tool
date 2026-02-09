import React from "react";
import type { Transaction } from "../utils/Types";

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
            onClick={() => {
              setEditMode({ isEdit: true, transaction });
              setModalIsOpen(true);
            }}
          >
            Edit
          </button>

          <button>Delete</button>
        </div>
      </td>
    </tr>
  );
};

export default TransactionListItem;
