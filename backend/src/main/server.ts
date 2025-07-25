import express, { Request, Response, Application } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "../config/config";

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

//test api
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});

//listen port
app.listen(PORT, () => {
  console.log(`Server is running on port : http://localhost:${PORT}`);
});
