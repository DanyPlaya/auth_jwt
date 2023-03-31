import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { router } from "./routes/index.js";
dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    app.listen(PORT, () => console.log(`Server ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
