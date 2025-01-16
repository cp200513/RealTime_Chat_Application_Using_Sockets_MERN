import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`MongoDB Connected: ${con.connection.host}`);
  } catch (e) {
    console.log(`MongoDB Connection Error: ${e.message}`);
  }
};
