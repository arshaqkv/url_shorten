import { Url } from "../../../domain/entities/url.entity";
import { IUrlRepository } from "../../../domain/interface/url.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";
import { nanoid } from "nanoid";
import { isValidUrl } from "../../../utils/validateUrl";

export class CreateShortUrl {
  constructor(private urlRepository: IUrlRepository) {}

  async execute(
    userId: string,
    originalUrl: string,
    title: string
  ): Promise<string> {
    if (!originalUrl || !isValidUrl(originalUrl)) {
      throw new CustomError("Invalid or missing URL", HttpStatus.BAD_REQUEST);
    }

    if (!title) {
      throw new CustomError("Title is required", HttpStatus.BAD_REQUEST);
    }

    const existingUrl = await this.urlRepository.getUrlByOriginalUrl(
      userId,
      originalUrl
    );

    if (existingUrl) {
      return existingUrl.shortCode;
    }

    const totalRequestCount = await this.urlRepository.countUrlDocuments(
      userId
    );

    if (totalRequestCount > 100) {
      throw new CustomError(
        "Daily URL limit (100) reached.",
        HttpStatus.TOO_MANY_REQUEST
      );
    }

    const shortCode = nanoid(10);
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    const newUrl = new Url(
      userId,
      originalUrl,
      shortCode,
      title,
      undefined,
      expiresAt
    );

    const url = await this.urlRepository.createShortUrl(newUrl);
    return url.shortCode;
  }
}
