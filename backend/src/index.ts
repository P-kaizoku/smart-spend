import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mongoose from "mongoose";
import authRouter from "./routes/authRoutes";
config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;

if (!PORT) {
  throw new Error("Port not defined");
}

if (!MONGO_URI) {
  throw new Error("MongoDB URI not defined");
}

const app = express();
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", authRouter);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log("Server running at http://localhost:" + PORT);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });
