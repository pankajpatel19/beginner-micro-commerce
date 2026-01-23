export const roleAccess = (allowRoles) => {
  return (req, res, next) => {
    try {
      console.log(req.user);

      const userRole = req.user.role;
      console.log(userRole);

      if (!allowRoles.includes(userRole)) {
        res.status(403).json({ message: "Access Denied" });
      } else {
        next();
      }
    } catch (error) {
      console.log("role error : ", error.message);
      res.status(403).json({ message: "Access Denied" });
    }
  };
};
