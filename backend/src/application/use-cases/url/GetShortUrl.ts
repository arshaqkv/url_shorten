import { Url } from "../../../domain/entities/url.entity";
import { IUrlRepository } from "../../../domain/interface/url.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";

export class GetShortUrl {
  constructor(private urlRepository: IUrlRepository) {}

  async execute(userId: string, id: string): Promise<Url> {
    if (!userId) {
      throw new CustomError("User not found", HttpStatus.NOT_FOUND);
    }

    const shortUrl = await this.urlRepository.getShortUrlById(id);

    if (!shortUrl) {
      throw new CustomError("Url data not found", HttpStatus.NOT_FOUND);
    }

    return shortUrl;
  }
}
