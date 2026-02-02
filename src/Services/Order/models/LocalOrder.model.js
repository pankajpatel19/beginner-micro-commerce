import mongoose, { Schema } from "mongoose";

const synchProductSchema = new Schema({
  productId: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
  },
  name: {
    type: String,
  },
});

const SynchProduct = mongoose.model("SynchProduct", synchProductSchema);
export default SynchProduct;
