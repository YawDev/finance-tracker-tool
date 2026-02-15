// import { v4 as uuidv4 } from "uuid";

export type Transaction = {
  id: string;
  name: string;
  description: string;
  amount: number;
  date: string;
  type: ITransactionType;
};

export interface ITransactionType {
  name: string;
}

export const TransactionTypes: ITransactionType[] = [
  { name: "Groceries" },
  { name: "Utilities" },
  { name: "Entertainment" },
  { name: "Transportation" },
  { name: "Healthcare" },
  { name: "Dining" },
  { name: "Education" },
  { name: "Personal Care" },
  { name: "Clothing" },
  { name: "Other" },
  { name: "Housing Expense" },
  { name: "Food" },
  { name: "Travel Accommodation" },
  { name: "Travel Expense" },
  { name: "Travel Activities" },
  { name: "Flight Cost" },
  { name: "Miscellaneous" },
];

export type IPagination = {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
};
