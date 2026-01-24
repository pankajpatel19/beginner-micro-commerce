import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controller/product.controller.js";
import { userAuth } from "../middleware/authMiddleware.js";
import { roleAccess } from "../middleware/roleAccess.js";

const productRouter = Router();

productRouter.post("/add-product", userAuth, createProduct);
productRouter.get("/products", userAuth, getAllProducts);
productRouter.get(
  "/products/:id",
  userAuth,
  roleAccess("user"),
  getProductById,
);
productRouter.patch(
  "/products/:id",
  userAuth,
  roleAccess("admin"),
  updateProduct,
);
productRouter.delete(
  "/products/:id",
  userAuth,
  roleAccess("admin"),
  deleteProduct,
);

export default productRouter;
