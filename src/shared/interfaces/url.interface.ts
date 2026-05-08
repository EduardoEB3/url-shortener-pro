import { Document } from "mongoose";

export interface IUrl extends Document {
  createdAt: Date;
  updatedAt: Date;
  originalUrl: string;
  shortCode: string;
  clicks: number;
}
