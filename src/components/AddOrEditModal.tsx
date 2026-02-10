import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import type { Transaction } from "../utils/Types";
import AppContext from "../utils/Context";
import { useContext, useEffect, useState } from "react";

type FormState = {
  fieldsUnchanged: boolean;
  formInput: {
    name: string;
    description: string;
    amount: number;
    date: string; // or Date depending on your needs
  };
};

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
  const [formState, setFormState] = useState<FormState>({
    fieldsUnchanged: true,
    formInput: {
      name: "",
      description: "",
      amount: 0,
      date: new Date().toDateString(),
    },
  });

  useEffect(() => {
    // When editMode.transaction changes, update the form state
    if (editMode.transaction) {
      setFormState({
        fieldsUnchanged: true,
        formInput: {
          name: editMode.transaction.name || "",
          description: editMode.transaction.description || "",
          amount: editMode.transaction.amount || 0,
          date: editMode.transaction.date || new Date().toDateString(),
        },
      });
    } else {
      // Clear the form when not in edit mode
      setFormState({
        fieldsUnchanged: true,
        formInput: {
          name: "",
          description: "",
          amount: 0,
          date: new Date().toDateString(),
        },
      });
    }
  }, [editMode.transaction]);

  if (!context) {
    throw new Error(
      "AddOrEditModal must be used within an AppContext Provider",
    );
  }

  const { transactionList, setTransactionList } = context;

  const handleAddOrEditTransaction = () => {
    if (editMode.isEdit && editMode.transaction) {
      // field validation goes here.
      updateItem(editMode.transaction);
      handleCloseModal();
    } else {
      AddNewItem();
      handleCloseModal();
    }
  };

  const updateItem = (item: Transaction) => {
    const updatedItem = transactionList.map((transaction) => {
      if (transaction.id === item.id) {
        return {
          ...transaction,
          name: formState.formInput.name,
          description: formState.formInput.description,
          amount: formState.formInput.amount,
          date: formState.formInput.date,
        };
      }
      return transaction;
    });
    setTransactionList(updatedItem);
  };

  const AddNewItem = () => {
    const newItem = {
      name: formState.formInput.name,
      description: formState.formInput.description,
      amount: formState.formInput.amount,
      date: formState.formInput.date,
      id: crypto.randomUUID(),
      type: { name: "Expense" },
    };
    setTransactionList([...transactionList, newItem as Transaction]);
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
              <Form.Label htmlFor="Name">Transaction Name: </Form.Label>
              <Form.Control
                type="text"
                id="Name"
                placeholder="Enter transaction name"
                value={formState.formInput.name}
                onChange={(e) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    formInput: {
                      ...prevState.formInput,
                      name: e.target.value,
                    },
                  }));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="Description">Description: </Form.Label>
              <Form.Control
                type="text"
                id="Description"
                placeholder="Enter description"
                value={formState.formInput.description}
                onChange={(e) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    formInput: {
                      ...prevState.formInput,
                      description: e.target.value,
                    },
                  }));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="Amount">Amount ($): </Form.Label>
              <Form.Control
                type="number"
                id="Amount"
                placeholder="0.00"
                step="0.01"
                value={formState.formInput.amount}
                onChange={(e) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    formInput: {
                      ...prevState.formInput,
                      amount: parseFloat(e.target.value),
                    },
                  }));
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label htmlFor="Date">Date: </Form.Label>
              <Form.Control
                type="date"
                id="Date"
                value={formState.formInput.date}
                onChange={(e) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    formInput: {
                      ...prevState.formInput,
                      date: e.target.value,
                    },
                  }));
                }}
              />
            </Form.Group>
          </Form>
        </div>

        <div className="modal-footer">
          <Button
            variant="secondary"
            className="modal-cancel-btn"
            onClick={() => {
              setFormState({
                fieldsUnchanged: true,
                formInput: {
                  name: "",
                  description: "",
                  amount: 0,
                  date: new Date().toISOString(),
                },
              });
              handleCloseModal();
            }}
          >
            Cancel
          </Button>
          <Button
            variant="success"
            className="modal-submit-btn"
            onClick={() => {
              handleAddOrEditTransaction();
              setFormState({
                fieldsUnchanged: true,
                formInput: {
                  name: "",
                  description: "",
                  amount: 0,
                  date: new Date().toISOString(),
                },
              });
              handleCloseModal();
            }}
          >
            {editMode.isEdit ? "Update Transaction" : "Create Transaction"}
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default AddOrEditModal;
