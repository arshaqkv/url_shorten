import { Url } from "../../../domain/entities/url.entity";
import { IUrlRepository } from "../../../domain/interface/url.repository";
import { CustomError } from "../../../interface/middlewares/error.middleware";
import { HttpStatus } from "../../../utils/http.status";

export class GetAllUrls {
  constructor(private urlRepository: IUrlRepository) {}

  async execute(userId: string): Promise<Url[] | null> {
    if (!userId) {
      throw new CustomError("User not found", HttpStatus.NOT_FOUND);
    }

    const urls = await this.urlRepository.getAllUrls(userId);

    return urls;
  }
}
