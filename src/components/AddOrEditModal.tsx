import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import type { Transaction } from "../utils/Types";
import AppContext from "../utils/Context";
import { useContext } from "react";

const AddOrEditModal = ({
  modalIsOpen,
  handleCloseModal,
  editMode,
}: {
  modalIsOpen: boolean;
  handleCloseModal: () => void;
  editMode: { isEdit: boolean; transaction: Transaction | null };
}) => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "AddOrEditModal must be used within an AppContext Provider",
    );
  }

  const { transactionList, setTransactionList } = context;

  const handleAddOrEditTransaction = () => {
    if (editMode.isEdit && editMode.transaction) {
      // field validation goes here.
      alert("submitted!");
      //updateItem(editMode.transaction);
    } else {
      alert("submitted!");
    }
  };

  const updateItem = (item: Transaction) => {
    const updatedItem = transactionList.map((transaction) => {
      if (transaction.id === item.id) {
        return {
          ...transaction,
          name: "Updated Name",
          description: "Updated Description",
          amount: 100,
          date: "2024-06-01",
        };
      }
      return transaction;
    });
    setTransactionList(updatedItem);
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={handleCloseModal}
        contentLabel={
          editMode.isEdit ? "Edit Transaction Item" : "Add Transaction Item"
        }
        className="transaction-modal"
        overlayClassName="transaction-modal-overlay"
      >
        <div className="modal-header">
          <h2>{editMode.isEdit ? "Edit Transaction" : "Add Transaction"}</h2>
          <button className="close-button" onClick={handleCloseModal}>
            ×
          </button>
        </div>

        <div className="modal-body">
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Name">Transaction Name</Form.Label>
              <Form.Control
                type="text"
                id="Name"
                placeholder="Enter transaction name"
                value={editMode.transaction ? editMode.transaction.name : ""}
                onChange={(e) => {}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="Description">Description</Form.Label>
              <Form.Control
                type="text"
                id="Description"
                placeholder="Enter description"
                value={
                  editMode.transaction ? editMode.transaction.description : ""
                }
                onChange={() => {}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="Amount">Amount ($)</Form.Label>
              <Form.Control
                type="number"
                id="Amount"
                placeholder="0.00"
                step="0.01"
                value={editMode.transaction ? editMode.transaction.amount : ""}
                onChange={() => {}}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="Date">Date</Form.Label>
              <Form.Control
                type="date"
                id="Date"
                value={editMode.transaction ? editMode.transaction.date : ""}
                onChange={() => {}}
              />
            </Form.Group>
          </Form>
        </div>

        <div className="modal-footer">
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button
            variant="success"
            className="ms-2"
            onClick={() => handleAddOrEditTransaction()}
          >
            {editMode.isEdit ? "Update Transaction" : "Create Transaction"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddOrEditModal;
