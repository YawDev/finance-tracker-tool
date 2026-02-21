import Modal from "react-modal";
import Button from "react-bootstrap/Button";
import type { IConfirmDeleteModal, Transaction } from "../utils/Types";
import { useContext } from "react";
import AppContext from "../utils/Context";

const ConfirmDeleteModal = ({
  confirmDeleteModalData,
  setConfirmDeleteModalData,
}: {
  confirmDeleteModalData: IConfirmDeleteModal;
  setConfirmDeleteModalData: React.Dispatch<
    React.SetStateAction<IConfirmDeleteModal>
  >;
}) => {
  const { isOpen, transaction } = confirmDeleteModalData;
  const context = useContext(AppContext);
  if (!context) {
    throw new Error(
      "TransactionListItem must be used within an AppContext Provider",
    );
  }

  const { transactionList, setTransactionList } = context;
  console.log("delete modal state ", confirmDeleteModalData);

  const handleCloseModal = () => {
    setConfirmDeleteModalData((prev: IConfirmDeleteModal) => ({
      ...prev,
      isOpen: false,
      transaction: null,
    }));
  };

  const handleConfirmDelete = () => {
    deleteItem(transaction);
    setConfirmDeleteModalData((prev: IConfirmDeleteModal) => ({
      ...prev,
      isOpen: false,
      transaction: null,
    }));
  };

  const deleteItem = (transactionToDelete: Transaction | null) => {
    const updatedItem = transactionList.filter(
      (transaction) => transaction.id !== transactionToDelete?.id,
    );
    setTransactionList(updatedItem);
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={handleCloseModal}
        ariaHideApp={false}
        contentLabel="Delete Transaction"
        className="transaction-modal"
        overlayClassName="transaction-modal-overlay"
      >
        <div className="modal-header">
          <h2>Delete Transaction</h2>
          <button className="close-button" onClick={handleCloseModal}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <h2>Are you sure you want to delete {transaction?.name}?</h2>
        </div>

        <div className="modal-footer">
          <Button
            variant="secondary"
            className="modal-cancel-btn"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            className="modal-submit-btn"
            onClick={handleConfirmDelete}
          >
            Confirm Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default ConfirmDeleteModal;
