import { Request, Response } from "express";
import { CreateUserService } from "../../services/user/CreateUserService";

class CreateUserController {
  async handle(req: Request, res: Response) {
    console.log("Dados recebidos no corpo da requisição:", req.body);

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    try {
      const createUserService = new CreateUserService();

      const user = await createUserService.execute({
        name,
        email,
        password,
      });

      return res.status(201).json({ user });
    } catch (error: any) {
      return res.status(400).json({ error: error.message || "Erro ao criar usuário" });
    }
  }
}

export { CreateUserController };
