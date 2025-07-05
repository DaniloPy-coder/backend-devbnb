import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors({
  origin: "https://devbnb-front.vercel.app",
  credentials: true,
  allowedHeaders: ["Authorization", "Content-Type"]
}));


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

app.listen(3333, () => console.log("Server is running on port 3333"));

export default app; 
