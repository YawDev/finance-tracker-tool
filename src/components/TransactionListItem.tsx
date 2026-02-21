import type { IConfirmDeleteModal, Transaction } from "../utils/Types";

const TransactionListItem = ({
  transaction,
  setEditMode,
  setModalIsOpen,
  setConfirmDeleteModalData,
}: {
  transaction: Transaction;
  setEditMode: React.Dispatch<
    React.SetStateAction<{ isEdit: boolean; transaction: Transaction | null }>
  >;
  setModalIsOpen: (boolean: boolean) => void;
  setConfirmDeleteModalData: React.Dispatch<
    React.SetStateAction<IConfirmDeleteModal>
  >;
}) => {
  const handleDeleteItem = (transactionToDelete: Transaction) => {
    setConfirmDeleteModalData((prev: IConfirmDeleteModal) => ({
      ...prev,
      isOpen: true,
      transaction: transactionToDelete,
    }));
  };
  return (
    <tr className="transaction-row" key={transaction.id}>
      <td>{transaction.name}</td>
      <td>{transaction.description}</td>
      <td>${transaction.amount.toFixed(2)}</td>
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
