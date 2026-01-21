import { Router } from "express";
import {
  currentUser,
  login,
  logout,
  register,
} from "../controller/auth.controller.js";

const userRouter = Router();

userRouter.post("/signup", register);
userRouter.post("/login", login);
userRouter.get("/current-user", currentUser);
userRouter.get("/logout", logout);

export default userRouter;
