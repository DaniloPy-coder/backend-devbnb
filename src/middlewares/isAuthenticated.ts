import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

interface AuthenticatedRequest extends Request {
    user_id?: string;
}

export function isAuthenticated(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers.authorization;
    let token: string | undefined;

    if (authHeader?.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    } else if (req.cookies?.token) {
        token = req.cookies.token;
    }

    if (!token) {
        res.status(401).json({ error: "Token não encontrado" });
        return;
    }

    try {
        const { sub } = verify(token, process.env.JWT_SECRET!) as Payload;
        req.user_id = sub;
        next();
    } catch {
        res.status(401).json({ error: "Token inválido" });
    }
}
