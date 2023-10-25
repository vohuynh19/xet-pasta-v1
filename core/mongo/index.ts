import mongoose from "mongoose";

export const connectMongoDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || "");
    console.log("Mongo DB connected success");
  } catch (error) {
    console.log("Mongo DB connected failed");
    console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);
  }
};
