import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post("/signup", authController.signup);
router.post("/login", authController.login);
router.post("/logout", authController.logout);
router.post("/refresh-token", authController.refreshToken);

export { router as authRoutes };
