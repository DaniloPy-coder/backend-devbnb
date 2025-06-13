import { compare } from "bcryptjs";
import { prismaClient } from "../../prisma";

interface AuthRequest {
  email: string;
  password: string;
}

class AuthUserService {
  async execute({ email, password }: AuthRequest) {
    // Verificar se o email existe
    const user = await prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      throw new Error("User/password incorrect");
    }

    // Verificar se a senha está correta
    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("User/password incorrect");
    }

    // Remover senha antes de retornar
    const { password: _, ...userWithoutPassword } = user;

    return { ok: true, user: userWithoutPassword };
  }
}

export { AuthUserService };
