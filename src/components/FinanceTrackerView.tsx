import type { Transaction } from "../utils/Types";
import AddOrEditModal from "./AddOrEditModal";
import BalanceCalculator from "./BalanceCalculator";
import TransactionListView from "./TransactionListView";
import { useState } from "react";

const FinanceTrackerView = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editMode, setEditMode] = useState<{
    isEdit: boolean;
    transaction: Transaction | null;
  }>({
    isEdit: false,
    transaction: null,
  });
  return (
    <>
      <BalanceCalculator />
      <TransactionListView
        setEditMode={setEditMode}
        setModalIsOpen={setModalIsOpen}
      />

      <AddOrEditModal
        modalIsOpen={modalIsOpen}
        handleCloseModal={() => {
          setModalIsOpen(false);
          setEditMode({ isEdit: false, transaction: null });
        }}
        editMode={editMode}
      />
    </>
  );
};

export default FinanceTrackerView;
