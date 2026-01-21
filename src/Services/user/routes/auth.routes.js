import { Router } from "express";
import {
  currentUser,
  login,
  logout,
  register,
} from "../controller/auth.controller.js";
import { userAuth } from "../middleware/authMiddleware.js";

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.get("/current-user", userAuth, currentUser);
userRouter.get("/logout", logout);

export default userRouter;
