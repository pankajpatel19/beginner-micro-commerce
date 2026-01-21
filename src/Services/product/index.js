import express from "express";
import cors from "cors";
import productRouter from "./routes/product.routes.js";
import { connectDB } from "./config/db.config.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/product", productRouter);

connectDB();

const PORT = 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
