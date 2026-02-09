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
