import { CreateShortUrl } from "../../application/use-cases/url/CreateShortUrl";
import { GetAllUrls } from "../../application/use-cases/url/GetAllUrls";
import { GetShortUrl } from "../../application/use-cases/url/GetShortUrl";
import { RedirectToOriginalUrl } from "../../application/use-cases/url/RedirectToUrl";
import { DBUrlRepository } from "../repositories/db.url.repository";

export class UrlDIContainer {
  static getUrlRepository() {
    return new DBUrlRepository();
  }

  static getCreateShortUrlUseCase() {
    return new CreateShortUrl(this.getUrlRepository());
  }

  static getAllUrlsUseCase() {
    return new GetAllUrls(this.getUrlRepository());
  }

  static getRedirectToUrlUseCase() {
    return new RedirectToOriginalUrl(this.getUrlRepository());
  }

  static getShortUrlUseCase() {
    return new GetShortUrl(this.getUrlRepository());
  }
}
