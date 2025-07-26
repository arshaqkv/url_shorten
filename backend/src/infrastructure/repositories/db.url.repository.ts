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

  async getShortUrl(shortCode: string): Promise<Url | null> {
    return await UrlModel.findOne({ shortCode });
  }

  async getUrlByOriginalUrl(originalUrl: string): Promise<Url | null> {
    return await UrlModel.findOne({ originalUrl });
  }

  async updateUrl(shortCode: string, updateData: Partial<Url>): Promise<void> {
    await UrlModel.findOneAndUpdate({ shortCode }, updateData, { new: true });
  }

  async countUrlDocuments(userId: string): Promise<number> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return await UrlModel.countDocuments({
      userId,
      createdAt: { $gte: today },
    });
  }
}
