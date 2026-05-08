import { nanoid } from "nanoid";
import { urlModel } from "../models/url.model.js";
import { IUrl } from "../shared/interfaces/url.interface.js";
import { redisClient } from "../config/redis.js";

export class UrlService {
  static async createShortUrl(originalUrl: string): Promise<IUrl> {
    const shortCode = nanoid(6);

    const newUrl = new urlModel({
      originalUrl,
      shortCode,
    });

    return await newUrl.save();
  }

  static async getOriginalUrl(shortCode: string): Promise<string | null> {
    const cachedUrl = await redisClient.get(shortCode);

    if (cachedUrl) {
      console.log("🚀 Cache Hit: Serving from Redis");
      urlModel.updateOne({ shortCode }, { $inc: { clicks: 1 } }).exec();

      return cachedUrl;
    }

    console.log("🐢 Cache Miss: Searching in MongoDB");
    const urlDoc = await urlModel.findOne({ shortCode });

    if (urlDoc) {
      console.log("🚀 MongoDB Hit: Serving from MongoDB");
      await redisClient.set(shortCode, urlDoc.originalUrl, {
        expiration: {
          type: "EX",
          value: parseInt(process.env.REDIS_EXPIRATION as string, 10) || 86400,
        },
      });

      urlDoc.clicks++;
      await urlDoc.save();

      return urlDoc.originalUrl;
    }

    return null;
  }
}
