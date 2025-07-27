import { Router } from "express";
import { isAuthenticated } from "../middlewares/auth.middleware";
import { urlController } from "../controllers/url.controller";

const router = Router();

router.get("/:shortCode", isAuthenticated, urlController.redirectToOriginalUrl);

export { router as redirectRoutes };
