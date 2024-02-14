import mongoose from "mongoose";
import "dotenv/config";

export const connect = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/first_nextjs_app");

    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDB connected Succesfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error, Please check connection ", err);
      process.exit();
    });
  } catch (error) {
    console.log(error);
  }
};
