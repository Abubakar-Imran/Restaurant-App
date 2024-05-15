import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });
const MONGO_URI = process.env.MONGO_URI 

export const dbConnection = () => {
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("Connected to MongoDB successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
};
