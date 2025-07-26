import jwt from "jsonwebtoken";
import { config } from "./config";

const ACCESS_TOKEN_SECRET = config.JWT_ACCESS_SECRET;
const REFRESH_TOKEN_SECRET = config.JWT_REFRESH_SECRET;

const generateAccessToken = (payload: { id?: string }): string => {
  const accessToken = jwt.sign(payload, ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
  return accessToken;
};

const generateRefreshToken = (payload: { id?: string }): string => {
  const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return refreshToken;
};

export { generateAccessToken, generateRefreshToken };
