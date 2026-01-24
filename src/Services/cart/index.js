import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import CartRoutes from "./routes/cart.routes.js";
import { connectDB } from "./config/db.cofib.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
connectDB();
app.use("/api/cart", CartRoutes);

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
