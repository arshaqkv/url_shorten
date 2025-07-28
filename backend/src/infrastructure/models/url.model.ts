import mongoose, { Document, Schema } from "mongoose";

interface IUrl extends Document {
  userId: string;
  originalUrl: string;
  shortCode: string;
  createdAt: Date;
  expiresAt: Date;
  analytics?: {
    clicks: number;
    geoStats: Map<string, number>;
  };
}

const analyticsSchema: Schema = new Schema({
  clicks: {
    type: Number,
    default: 0,
  },
  geoStats: {
    type: Map,
    of: Number,
    default: {},
  },
});

const UrlSchema: Schema = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortCode: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: 0 },
  },
  analytics: {
    type: analyticsSchema,
    default: () => ({}),
  },
});

export const UrlModel = mongoose.model<IUrl>("Url", UrlSchema);
