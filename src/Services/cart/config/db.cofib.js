import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("Cart DB connected 🔗");
    })
    .catch((err) => {
      (console.error(err), process.exit(0));
    });
};
