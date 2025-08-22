import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const protect = (req: any, res: Response, next: Function) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ message: "No token provided" });
    return;
  }
  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      req.user = decoded;
      next();
    }
  );
};
