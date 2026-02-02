import express from "express";
import cors from "cors";
import productRouter from "./routes/product.routes.js";
import { connectDB } from "./config/db.config.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { connectProducer, SubscribeConsumer } from "./kafka/client.js";
dotenv.config();

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use("/api/product", productRouter);

connectDB();
connectProducer();
SubscribeConsumer();

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
