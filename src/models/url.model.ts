import mongoose, { Schema } from "mongoose";
import { IUrl } from "../shared/interfaces/url.interface";

const urlSchema: Schema = new Schema(
  {
    originalUrl: { type: String, required: true },
    shortCode: { type: String, required: true, unique: true },
    clicks: { type: Number, required: true, default: 0 },
  },
  {
    timestamps: true,
  },
);

export const urlModel = mongoose.model<IUrl>("urls", urlSchema);
