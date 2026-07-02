import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";


dotenv.config();

const app = express();

// Connect Database
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Home Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully 🚀",
  });
});



// Auth Routes
app.use("/api/auth", authRoutes);



// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});