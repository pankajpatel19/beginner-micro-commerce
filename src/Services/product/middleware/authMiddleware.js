import jwt from "jsonwebtoken";

export const userAuth = async (req, res, next) => {
  try {
    let token = req.cookies?.token;

    if (!token) {
      return res.status(404).json({ message: "unAuthorized" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(404).json({ message: "user Not Found" });
    }

    req.user = decode;
    next();
  } catch (error) {
    console.log(error.message);
  }
};
