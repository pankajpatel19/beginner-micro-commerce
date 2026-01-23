import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const userAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      return res.status(404).json({ message: "unAuthorized" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user Not Found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error.message);
  }
};
