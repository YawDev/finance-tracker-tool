import type { ITrackerContext } from "./Context";
import type { IPagination, Transaction } from "./Types";

export const FilterList = (
  transactions: Transaction[],
  context: ITrackerContext | null,
): Transaction[] => {
  transactions.filter((transaction) => {
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

  return transactions;
};

export const GetCurrentItems = (
  filteredTransactions: Transaction[],
  paginationData: IPagination,
): Transaction[] => {
  const indexOfLastItem =
    paginationData.currentPage * paginationData.itemsPerPage;

  const indexOfFirstItem = indexOfLastItem - paginationData.itemsPerPage;

  const currentItems = filteredTransactions.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return currentItems;
};
