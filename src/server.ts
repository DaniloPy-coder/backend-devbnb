import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "https://devbnb-front.vercel.app",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(router);

// Middleware de tratamento de erros
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(400).json({ error: err.message });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};

app.use(errorHandler);

export default app; 
