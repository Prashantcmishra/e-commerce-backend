import jwt from "jsonwebtoken";

// Short-lived - sent in JSON response, stored in memory/localStorage on frontend
export const generateAccessToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });
};

// Long-lived - sent as httpOnly cookie, also saved (hashed) in DB for revocation
export const generateRefreshToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: "30d",
  });
};