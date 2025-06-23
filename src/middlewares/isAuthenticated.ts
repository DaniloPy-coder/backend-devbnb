import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface Payload {
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ error: "Token não encontrado" });
    }

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as Payload;
        req.user_id = sub;
        return next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}
