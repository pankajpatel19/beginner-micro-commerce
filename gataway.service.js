import express from "express";
export const app = express();
export const port = 5000;
import proxy from "express-http-proxy";

app.use("/user", proxy("http://localhost:5001"));
app.use("/product", proxy("http://localhost:5002"));
app.use("/cart", proxy("http://localhost:5004"));

app.listen(port, () => {
  console.log(`Gateway service running on http://localhost:${port}`);
});
