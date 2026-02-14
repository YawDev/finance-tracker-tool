import { createContext } from "react";
import type { Transaction } from "./Types";

export interface ITrackerContext {
  totalSpent: number;
  setTotalSpent: (value: number) => void;
  transactionList: Transaction[];
  setTransactionList: (value: Transaction[]) => void;
  query: string;
  setQuery: (value: string) => void;
}

const AppContext = createContext<ITrackerContext | null>(null);

export default AppContext;
