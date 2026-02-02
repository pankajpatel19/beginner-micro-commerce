import { Router } from "express";
import { userAuth } from "../middleware/authMiddleware.js";
import { createOrder } from "../controller/order.controller.js";

const router = Router();

router.post("/createOrder", userAuth, createOrder);

export default router;
