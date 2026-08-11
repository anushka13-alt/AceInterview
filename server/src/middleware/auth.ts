import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const auth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("========== AUTH ==========");

    const header = req.headers.authorization;

    console.log("Authorization Header:", header);
    console.log("JWT_SECRET:", process.env.JWT_SECRET);

    if (!header) {
      console.log("❌ Token Missing");

      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    const token = header.split(" ")[1];

    console.log("Token:", token);

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    console.log("Decoded:", decoded);

    req.user = {
      id: decoded.id,
    };

    console.log("✅ Auth Success");

    next();
  } catch (err) {
    console.log("========== JWT ERROR ==========");
    console.error(err);

    return res.status(401).json({
      success: false,
      message: "Invalid Token",
    });
  }
};