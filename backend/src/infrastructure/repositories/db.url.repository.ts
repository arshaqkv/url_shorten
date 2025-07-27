import mongoose from "mongoose";
import { Url } from "../../domain/entities/url.entity";
import { IUrlRepository } from "../../domain/interface/url.repository";
import { UrlModel } from "../models/url.model";

export class DBUrlRepository implements IUrlRepository {
  async createShortUrl(urlData: Url): Promise<Url> {
    const newUrl = new UrlModel(urlData);
    return await newUrl.save();
  }

  async getAllUrls(userId: string): Promise<Url[]> {
    return await UrlModel.find({ userId });
  }

  async getShortUrl(userId: string, shortCode: string): Promise<Url | null> {
    return await UrlModel.findOne({ userId, shortCode });
  }

  async getUrlByOriginalUrl(
    userId: string,
    originalUrl: string
  ): Promise<Url | null> {
    return await UrlModel.findOne({ userId, originalUrl });
  }

  async updateUrl(
    userId: string,
    shortCode: string,
    updateData: Partial<Url>
  ): Promise<void> {
    await UrlModel.findOneAndUpdate({ userId, shortCode }, updateData, {
      new: true,
    });
  }

  async countUrlDocuments(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await UrlModel.countDocuments({
      userId,
      createdAt: { $gte: today },
    });
  }

  async getShortUrlById(id: string): Promise<Url | null> {
    const objectId = new mongoose.Types.ObjectId(id);
    return await UrlModel.findById(objectId);
  }
}
