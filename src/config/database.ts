import mongoose from "mongoose";

mongoose.connection.on("connected", () =>
  console.log("📦 MongoDB Connected (Listener)"),
);
mongoose.connection.on("error", (err) =>
  console.error("❌ MongoDB Error (Listener):", err),
);
mongoose.connection.on("disconnected", () =>
  console.log("⚠️ MongoDB Disconnected"),
);

// MongoDB Connection
export const connectMongoDB = async () => {
  try {
    const mongoURI =
      process.env.MONGO_URI || "mongodb://localhost:27017/url-short-pro";
    await mongoose.connect(mongoURI);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
