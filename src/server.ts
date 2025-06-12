import express, { Request, Response, NextFunction } from "express";
import { router } from "./routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Registrar as rotas antes do middleware de erro
app.use(router);

// Middleware de tratamento de erro - tem que vir por último
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof Error) {
    // Se for uma instância de Error, então é um erro de negócio
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
