import express from "express";
import { connectDB } from "./config/db.config.js";
import userRouter from "./routes/auth.routes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = 5001;

connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello From User");
});

app.use("/api/user", userRouter);

app.listen(port, () => {
  console.log(`server start for user on http://localhost:${port}`);
});
