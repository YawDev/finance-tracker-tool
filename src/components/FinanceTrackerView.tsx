import type { IConfirmDeleteModal, Transaction } from "../utils/Types";
import AddOrEditModal from "./AddOrEditModal";
import BalanceCalculator from "./BalanceCalculator";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import TransactionListView from "./TransactionListView";
import { useState } from "react";

const FinanceTrackerView = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [confirmDeleteModalData, setConfirmDeleteModalData] =
    useState<IConfirmDeleteModal>({
      isOpen: false,
      transaction: null,
    });
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
        setConfirmDeleteModalData={setConfirmDeleteModalData}
      />

      <AddOrEditModal
        modalIsOpen={modalIsOpen}
        handleCloseModal={() => {
          setModalIsOpen(false);
          setEditMode({ isEdit: false, transaction: null });
        }}
        editMode={editMode}
      />

      <ConfirmDeleteModal
        confirmDeleteModalData={confirmDeleteModalData}
        setConfirmDeleteModalData={setConfirmDeleteModalData}
      />
    </>
  );
};

export default FinanceTrackerView;
