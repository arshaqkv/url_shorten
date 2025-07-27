import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "../config/config";
import { connectDB } from "../infrastructure/database/db";
import { errorHandler } from "../interface/middlewares/error.middleware";

import { authRoutes } from "../interface/routes/auth.routes";
import { urlRoutes } from "../interface/routes/url.routes";
import { redirectRoutes } from "../interface/routes/redirect.routes";

const app: Application = express();
const PORT: number = config.PORT;

//middlewares
app.use(express.json());
app.use(cookieParser());
if (config.ENVIRONMENT === "development") {
  app.use(morgan("dev"));
}

//cors setup
app.use(
  cors({
    origin: config.CORS.CLIENT_URL,
    allowedHeaders: config.CORS.ALLOWED_HEADERS,
    methods: config.CORS.ALLOWED_METHODS,
    credentials: config.CORS.CREDENTIALS,
  })
);
app.set('trust proxy', true);

//test api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/url", urlRoutes);
app.use("/", redirectRoutes);

//error handling middleware
app.use(errorHandler);

//listen port
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
