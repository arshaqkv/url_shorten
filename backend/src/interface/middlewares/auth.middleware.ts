import { NextFunction, Request, Response } from "express";
import { CustomError } from "./error.middleware";
import { HttpStatus } from "../../utils/http.status";
import { verifyAccessToken } from "../../config/verify.token";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    throw new CustomError("Unauthorized", HttpStatus.UNAUTHORIZED);
  }
  try {
    const decoded = verifyAccessToken(token);
    if (!decoded) {
      throw new CustomError("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};
