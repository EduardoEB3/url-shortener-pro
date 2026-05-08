import { createClient } from "redis";

// Redis Connection
export const redisClient = createClient({
  url: process.env.REDIS_URL || "redis://localhost:6379",
});

redisClient.on("error", (err) => console.error("❌ Redis Client Error:", err));
redisClient.on("connect", () => console.log("⚡ Redis Connected Successfully"));

export const connectRedis = async () => {
  try {
    await redisClient.connect();
  } catch (error) {
    console.error("❌ Redis Connection Error:", error);
    process.exit(1);
  }
};
