export const roleAccess = (allowRoles) => {
  return (req, res, next) => {
    try {
      const userRole = req.user?.role;

      if (allowRoles.includes("admin")) {
        return next();
      }

      if (!allowRoles.includes(userRole)) {
        return res.status(403).json({ message: "Access Denied" });
      } else {
        next();
      }
    } catch (error) {
      console.log("role error : ", error.message);
      return res.status(403).json({ message: "Access Denied" });
    }
  };
};
