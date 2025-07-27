import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { urlController } from "../controllers/url.controller";

const router = Router();

router.use(isAuthenticated);

router.post("/shorten", urlController.createShortUrl);
router.get("/", urlController.getAllUrls);
router.get("/analytics/:id", urlController.getShortUrlAnalytics);

export { router as urlRoutes };
