import { Request, Response, NextFunction } from "express";

export const validateUrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { url } = req.body;

  const urlRegex = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

  if (!url || !urlRegex.test(url)) {
    return res.status(400).json({
      error:
        "Invalid URL. Please provide a valid URL starting with http:// or https://",
    });
  }

  next();
};
