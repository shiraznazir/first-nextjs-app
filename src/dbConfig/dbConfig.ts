import mongoose from "mongoose";

export const connect = async () => {
  const url =
    "mongodb+srv://talmud786:5724208sN@users.zpm7hjp.mongodb.net/first-nextjs-app";
  try {
    await mongoose.connect(url);

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
