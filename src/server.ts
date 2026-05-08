import app from "./app";
import { connectMongoDB } from "./config/database";
import { connectRedis } from "./config/redis";

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await connectMongoDB();
  await connectRedis();

  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
};

startServer();
