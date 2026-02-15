import React, { useEffect, useMemo } from "react";
import type { IPagination, Transaction } from "../utils/Types";
import TransactionListItem from "./TransactionListItem";
import AddTransactionButton from "./AddTransactionButton";
import { useContext } from "react";
import AppContext from "../utils/Context";
import SearchBar from "./Search";
import { useState } from "react";
import Pagination from "./Pagination";
import { FilterList, GetCurrentItems } from "../utils/Filtering";

const TransactionListView = ({
  setEditMode,
  setModalIsOpen,
}: {
  setEditMode: React.Dispatch<
    React.SetStateAction<{ isEdit: boolean; transaction: Transaction | null }>
  >;
  setModalIsOpen: (boolean: boolean) => void;
}) => {
  const context = useContext(AppContext);
  const transactionList = context ? context.transactionList : [];
  const [paginationData, setPaginationData] = useState<IPagination>({
    itemsPerPage: 5,
    totalItems: transactionList?.length ?? 0,
    currentPage: 1,
  });

  const filteredTransactions = transactionList.filter((transaction) => {
    return (
      transaction.name
        .toLowerCase()
        .includes(context?.query.toLowerCase() || "") ||
      transaction.description
        .toLowerCase()
        .includes(context?.query.toLowerCase() || "") ||
      transaction.type.name
        .toLowerCase()
        .includes(context?.query.toLowerCase() || "") ||
      transaction.amount.toString().includes(context?.query || "")
    );
  });

  useEffect(() => {
    if (filteredTransactions) {
      setPaginationData((prev) => ({
        ...prev,
        totalItems: filteredTransactions.length,
        // We might need to reset to page 1 if data changes
        currentPage: 1,
      }));
    }
  }, [filteredTransactions.length]);

  const currentItems = GetCurrentItems(filteredTransactions, paginationData);
  return (
    <div className="transaction-list-container">
      <div className="transaction-header">
        <h2 className="transaction-title">Transactions</h2>
        <AddTransactionButton setModalIsOpen={setModalIsOpen} />
      </div>
      <div className="search-bar-container">
        <SearchBar />
      </div>
      {filteredTransactions?.length === 0 ? (
        <p>No transactions available.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((transaction) => (
              <TransactionListItem
                key={transaction.id}
                transaction={transaction}
                setEditMode={setEditMode}
                setModalIsOpen={setModalIsOpen}
              />
            ))}
          </tbody>
        </table>
      )}
      <Pagination
        paginationData={paginationData}
        setPaginationData={setPaginationData}
      />
    </div>
  );
};

export default TransactionListView;
