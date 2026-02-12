import Modal from "react-modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import type { Transaction } from "../utils/Types";
import AppContext from "../utils/Context";
import { useContext, useEffect, useState } from "react";
import { validateField } from "../utils/FormValidator";

type NumberFormField = {
  value: string;
  error: string | null;
}

type TextFormField = {
  value: string;
  error: string | null;
}

type FormState = {
  fieldsUnchanged: boolean;
  formInput: {
    name: TextFormField;
    description: TextFormField;
    amount: NumberFormField;
    date: TextFormField; // or Date depending on your needs
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
      name: { value: "", error: null },
      description: { value: "", error: null },
      amount: { value: "", error: null },
      date: { value: new Date("yyyy-MM-dd").toDateString(), error: null },
    },
  });

  useEffect(() => {
    // When editMode.transaction changes, update the form state
    if (editMode.transaction) {
      setFormState({
        fieldsUnchanged: true,
        formInput: {
          name: { value: editMode.transaction.name || "", error: null },
          description: { value: editMode.transaction.description || "", error: null },
          amount: { value: editMode.transaction.amount ? editMode.transaction.amount.toString() : "", error: null },
          date: { value: editMode.transaction.date || new Date().toISOString(), error: null },
        },
      });
    } else {
      // Clear the form when not in edit mode
      setFormState({
        fieldsUnchanged: true,
        formInput: {
          name: { value: "", error: null },
          description: { value: "", error: null },
          amount: { value: "", error: null },
          date: { value: new Date().toISOString(), error: null },
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


  const handleFieldChange = (field : any , value : string | number, shouldFormat: boolean = false) => 
  {
       const validationResult = validateField(field, value);
       if(!validationResult.isValid)
       {
          setFormState((prevState) => ({
            ...prevState,
            formInput: {
              ...prevState.formInput,
              [field]: { value, error: validationResult.errorMessage || null },
            },
          }));
       }
       else
       {
          // Only format on blur if there are more than 2 decimal places
          if(field === "amount" && shouldFormat && value !== "")
          {
              const numValue = parseFloat(value.toString());
              const decimalPart = value.toString().split('.')[1];
              // Only round if there are more than 2 decimal places
              if(decimalPart && decimalPart.length > 2) {
                  value = (Math.round(numValue * 100) / 100).toString();
              }
              // Otherwise keep the user's input as-is (preserving trailing zeros)
          }
          
          setFormState((prevState) => ({
              ...prevState,
                 formInput: {
                  ...prevState.formInput,
                  [field]: { value, error: null },
                },
             }));
       }
  }

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
          name: formState.formInput.name.value,
          description: formState.formInput.description.value,
          amount: parseFloat(parseFloat(formState.formInput.amount.value).toFixed(2)),
          date: formState.formInput.date.value,
        };
      }
      return transaction;
    });
    setTransactionList(updatedItem);
  };

  const AddNewItem = () => {
    const newItem = {
      name: formState.formInput.name.value,
      description: formState.formInput.description.value,
      amount: parseFloat(parseFloat(formState.formInput.amount.value).toFixed(2)),
      date: formState.formInput.date.value,
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
                value={formState.formInput.name.value}
                onChange={(e) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    formInput: {
                      ...prevState.formInput,
                      name: { value: e.target.value, error: null },
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
                value={formState.formInput.description.value}
                onChange={(e) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    formInput: {
                      ...prevState.formInput,
                      description: { value: e.target.value, error: null },
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
                value={formState.formInput.amount.value}
                onChange={(e) => handleFieldChange("amount", e.target.value, false)}
                onBlur={(e) => {handleFieldChange("amount", e.target.value, true)}}             
                 />
            </Form.Group>
            {formState.formInput.amount.error && (
              <span className="error-message">{formState.formInput.amount.error}</span>
            )}
            <Form.Group className="mb-3">
              <Form.Label htmlFor="Date">Date: </Form.Label>
              <Form.Control
                type="date"
                id="Date"
                value={formState.formInput.date.value}
                onChange={(e) => {
                  setFormState((prevState) => ({
                    ...prevState,
                    formInput: {
                      ...prevState.formInput,
                      date: { value: e.target.value, error: null },
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
                  name: { value: "", error: null },
                  description: { value: "", error: null },
                  amount: { value: "", error: null },
                  date: { value: new Date("yyyy-MM-dd").toDateString(), error: null },
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
                  name: { value: "", error: null },
                  description: { value: "", error: null },
                  amount: { value: "", error: null },
                  date: { value: new Date("yyyy-MM-dd").toDateString(), error: null },
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
