import Button from "react-bootstrap/Button";

const AddTransactionButton = ({
  setModalIsOpen,
}: {
  setModalIsOpen: (boolean: boolean) => void;
}) => {
  return (
    <Button
      variant="success"
      size="lg"
      className="add-transaction-btn"
      onClick={() => setModalIsOpen(true)}
    >
      Add Transaction
    </Button>
  );
};

export default AddTransactionButton;
