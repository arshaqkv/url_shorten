import { NextFunction, Request, Response } from "express";
import {
  accessCookieOptions,
  resetCookieOptions,
} from "../../utils/cookie.helper";
import { AuthDIContainer } from "../../infrastructure/Di/auth.di.container";
import { HttpStatus } from "../../utils/http.status";
import { config } from "../../config/config";

class AuthController {
  //user signup
  async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const signupUser = AuthDIContainer.getSignupUserUseCase();
      await signupUser.execute(req.body);
      res
        .status(HttpStatus.CREATED)
        .json({ success: true, message: "User registered successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  //user login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const data = {
        email,
        password,
      };
      const loginUser = AuthDIContainer.getLoginUserUseCase();
      const { accessToken, refreshToken, user } = await loginUser.execute(data);
      res
        .cookie("accessToken", accessToken, accessCookieOptions)
        .cookie("refreshToken", refreshToken, resetCookieOptions)
        .status(HttpStatus.OK)
        .json({ succuess: true, message: "Logged in successfully", user });
    } catch (error: any) {
      next(error);
    }
  }

  //user logout
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      res.clearCookie("accessToken", {
        httpOnly: true,
        secure: config.ENVIRONMENT === "production",
        sameSite: "strict",
      });

      res.clearCookie("refreshToken", {
        httpOnly: true,
        secure: config.ENVIRONMENT === "production",
        sameSite: "strict",
      });

      res
        .status(200)
        .send({ success: true, message: "Logged out successfully" });
    } catch (error: any) {
      next(error);
    }
  }

  //refresh token
  async refreshToken(req: Request, res: Response, next: NextFunction) {
    try {
      console.log("#################Cookies refreshed");
      const { refreshToken } = req.cookies;
      const newAccessToken =
        await AuthDIContainer.getRefreshTokenUseCase().execute(refreshToken);
      res
        .cookie("accessToken", newAccessToken, accessCookieOptions)
        .status(200)
        .json({ message: "Token refreshed" });
    } catch (error: any) {
      next(error);
    }
  }
}

const authController = new AuthController();
export { authController };
