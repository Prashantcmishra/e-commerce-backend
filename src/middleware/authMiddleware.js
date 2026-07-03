import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Verifies the ACCESS token, attaches logged-in user to req.user
export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      req.user = await User.findById(decoded.id).select("-password -refreshToken");
      return next();
    } catch (error) {
      return res.status(401).json({ message: "Access token invalid or expired" });
    }
  }

  return res.status(401).json({ message: "Not authorized, no token" });
};

// Must be used AFTER protect - checks req.user.role
export const admin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ message: "Admin access only" });
};