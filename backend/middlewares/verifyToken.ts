import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// 🏷 On ajoute `userId` à `Request` pour pouvoir l'utiliser plus tard
declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

// 🛑 Vérification du ticket (token)
const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies["auth_token"]; // 🍪 On prend le token du cookie

  if (!token) {
    return res.status(401).json({ success: false, message: "Accès refusé - Pas de token 🚫" });
  }

  try {
    // 🔍 Vérifier si le token est valide
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as JwtPayload;
    req.userId = decoded.userId; // 🎫 On extrait l'ID de l'utilisateur

    next(); // ✅ Tout est bon, on passe à la suite
  } catch (error) {
    console.error("❌ Erreur vérification token:", error);
    return res.status(401).json({ success: false, message: "Token invalide ou expiré 🚨" });
  }
};

export default verifyToken;
