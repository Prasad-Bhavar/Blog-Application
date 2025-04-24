import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://prasadbhavar04:8KHlqiBpoD8B8hNH@cluster0.2ay6ud8.mongodb.net/blog-app"
    );
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
