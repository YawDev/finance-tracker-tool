import axios from "axios";

const bffClient = axios.create({
  baseURL: "https://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

export const financeTrackerService = () => {
  getTransactions: async () => {
    const res = await bffClient.get("/api/transactions");
    return res.data;
  };

  addTransaction: async (payload: any) => {
    const { data } = await bffClient.post("/api/transactions/add", payload);
    return data;
  };
};
