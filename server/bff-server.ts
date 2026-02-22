import axios from "axios";
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

//TODO: BE microservice needs to be implemented
const microservice = axios.create({
  baseURL: "https://localhost:6701",
  timeout: 5000,
});

app.get("/api/transactions", async (_, res) => {
  try {
    const { data } = await microservice.get(`/finance/transactions`);
    res.json(data);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({ error: "Service error" });
  }
});

app.post("/api/transactions/add", async (req, res) => {
  try {
    const { data } = await microservice.post(
      "/finance/transactions/add",
      req.body,
    );
    res.json(data);
  } catch (error) {
    res.status(400).json({ error: "Post failed" });
  }
});

app.listen(8080);
