import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import OrderRoutes from "./routes/order.routes.js";
import { connectDB } from "./config/db.cofib.js";
import { connectProducer, SubscribeConsumer } from "./kafka/client.js";

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
connectDB();
connectProducer();
SubscribeConsumer();
app.use("/api/order", OrderRoutes);

const PORT = process.env.PORT || 5005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
