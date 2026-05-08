import { Request, Response } from "express";
import { UrlService } from "../services/url.service";

export class UrlController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const { url } = req.body;

      if (!url) {
        return res.status(400).json({ error: "URL is required" });
      }

      const result = await UrlService.createShortUrl(url);
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
