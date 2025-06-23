import { Request, Response } from "express";
import { AuthUserService } from "../../services/user/AuthUserService";

class AuthUserController {
  async handle(req: Request, res: Response) {
    const { email, password } = req.body;

    const authUserService = new AuthUserService();

    const { user, token } = await authUserService.execute({ email, password });
    console.log("User recebido do service:", user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24, // 1 dia
    });

    return res.json({
      user,
      token,
    });
  }
}

export { AuthUserController };
