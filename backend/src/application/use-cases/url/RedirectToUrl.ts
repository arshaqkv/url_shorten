import { IUrlRepository } from "../../../domain/interface/url.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";

export class RedirectToOriginalUrl {
  constructor(private urlRepository: IUrlRepository) {}

  async execute(
    userId: string,
    shortCode: string,
    country: string
  ): Promise<string> {
    const url = await this.urlRepository.getShortUrl(userId, shortCode);

    if (!url) {
      throw new CustomError("URL not found", HttpStatus.NOT_FOUND);
    }

    const now = new Date();
    if (url.expiresAt && url.expiresAt < now) {
      throw new CustomError("This short URL has expired", HttpStatus.GONE);
    }

    if (!url.analytics) {
      url.analytics = {
        clicks: 0,
        geoStats: new Map(),
      };
    }

    url.analytics.clicks += 1;

    const count = url.analytics.geoStats.get(country) || 0;
    url.analytics.geoStats.set(country, count + 1);

    await this.urlRepository.updateUrl(userId, shortCode, url);

    return url.originalUrl;
  }
}
