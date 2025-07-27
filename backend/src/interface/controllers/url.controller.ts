import { NextFunction, Request, Response } from "express";
import { UrlDIContainer } from "../../infrastructure/Di/url.di.container";
import { HttpStatus } from "../../utils/http.status";
import geoip from "geoip-lite";

class UrlController {
  //shorten url
  async createShortUrl(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    const { originalUrl, title } = req.body;
    try {
      const createShortUrl = UrlDIContainer.getCreateShortUrlUseCase();
      const shortCode = await createShortUrl.execute(id, originalUrl, title);
      const shortUrl = `${req.protocol}://${req.get("host")}/${shortCode}`;
      res.status(HttpStatus.CREATED).json({ shortUrl });
    } catch (error: any) {
      next(error);
    }
  }

  //get all urls
  async getAllUrls(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    try {
      const urls = await UrlDIContainer.getAllUrlsUseCase().execute(id);
      res.status(HttpStatus.OK).json({ urls });
    } catch (error: any) {
      next(error);
    }
  }

  //redirect to original url
  async redirectToOriginalUrl(req: Request, res: Response, next: NextFunction) {
    const { id } = req.user;
    const { shortCode } = req.params;
    try {
      const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
      const realIp = ip === "::1" ? "8.8.8.8" : ip;
      const geo = geoip.lookup(realIp as string);
      let country = geo?.country;
      if (!country) {
        country = "unknown";
      }
      const originalUrl =
        await UrlDIContainer.getRedirectToUrlUseCase().execute(
          id,
          shortCode,
          country
        );
      res.redirect(originalUrl);
    } catch (error: any) {
      next(error);
    }
  }

  //url analytis
  async getShortUrlAnalytics(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { id: useId } = req.user;
    try {
      const shortUrl = await UrlDIContainer.getShortUrlUseCase().execute(
        useId,
        id
      );
      res.status(HttpStatus.OK).json({ shortUrl });
    } catch (error: any) {
      next(error);
    }
  }
}

const urlController = new UrlController();
export { urlController };
