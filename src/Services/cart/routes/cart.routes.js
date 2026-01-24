import { Router } from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import {
  addToCart,
  getCart,
  RemoveFromCart,
} from "../controller/cart.controller.js";

const router = Router();

router.post("/addToCart", userAuth, addToCart);
router.delete("/RemoveFromCart", userAuth, RemoveFromCart);
router.get("/carts", userAuth, getCart);

export default router;
