import { nanoid } from "nanoid";
import { urlModel } from "../models/url.model.js";
import { IUrl } from "../shared/interfaces/url.interface.js";

export class UrlService {
  static async createShortUrl(originalUrl: string): Promise<IUrl> {
    const shortCode = nanoid(6);

    const newUrl = new urlModel({
      originalUrl,
      shortCode,
    });

    return await newUrl.save();
  }
}
