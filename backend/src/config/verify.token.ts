import jwt from "jsonwebtoken";
import { config } from "./config";

const verifyAccessToken = (token: string): any => {
  try {
    return jwt.verify(token, config.JWT_ACCESS_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

const verifyRefreshToken = (token: string): any => {
  try {
    return jwt.verify(token, config.JWT_REFRESH_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export { verifyAccessToken, verifyRefreshToken };
