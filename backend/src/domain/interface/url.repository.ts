import { Url } from "../entities/url.entity";

export interface IUrlRepository {
  createShortUrl(urlData: Url): Promise<Url>;
  getAllUrls(userId: string): Promise<Url[]>;
  getShortUrl(userId: string, shortCode: string): Promise<Url | null>;
  getUrlByOriginalUrl(userId: string, originalUrl: string): Promise<Url | null>;
  updateUrl(
    userId: string,
    shortCode: string,
    updateData: Partial<Url>
  ): Promise<void>;
  countUrlDocuments(userId: string): Promise<number>;
  getShortUrlById(id: string): Promise<Url | null>;
}
