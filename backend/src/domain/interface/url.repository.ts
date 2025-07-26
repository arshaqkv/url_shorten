import { Url } from "../entities/url.entity";

export interface IUrlRepository {
  createShortUrl(urlData: Url): Promise<Url>;
  getAllUrls(userId: string): Promise<Url[]>;
  getShortUrl(shortCode: string): Promise<Url | null>;
  getUrlByOriginalUrl(originalUrl: string): Promise<Url | null>;
  updateUrl(shortCode: string, updateData: Partial<Url>): Promise<void>;
  countUrlDocuments(userId: string): Promise<number>;
}
