// roleMiddleware.js
// Role-based access middleware to restrict access to certain routes based on user roles
export const authorizeRole = (roles) => {
  return (req, res, next) => {
    // Check if the user's role is included in the allowed roles for the route
    if (!roles.includes(req.user.role))
      return res.status(403).json({ message: "Access denied" });
    next();
  };
};
