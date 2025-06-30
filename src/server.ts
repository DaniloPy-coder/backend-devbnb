import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors";
import { resolve } from "path";
import cookieParser from "cookie-parser";

import { router } from "./routes";

const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());


app.use(router);

app.use("/files", express.static(resolve(__dirname, "..", "..", "tmp")));

// Middleware de tratamento de erros — deve vir por último
const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof Error) {
    res.status(400).json({
      error: err.message,
    });
    return;
  }

  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
};

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server is running on port 3333");
});
