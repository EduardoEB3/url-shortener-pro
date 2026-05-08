import { Request, Response } from "express";

export class HealthController {
  static check(_req: Request, res: Response): Response {
    return res.json({
      status: "ok",
      uptime: process.uptime(),
      timestamp: new Date().toISOString(),
    });
  }
}
