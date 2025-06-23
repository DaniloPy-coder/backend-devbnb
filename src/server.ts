import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";



const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,               // aceita envio de cookies/credenciais
}));
app.use(cookieParser());

app.use(router);

app.use("/files", express.static(path.resolve(__dirname, "..", "tmp")));

// Middleware de tratamento de erro - tem que vir por último
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    return res.status(400).json({
      error: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
});

app.listen(3333, () => console.log("Server is running on port 3333"));
