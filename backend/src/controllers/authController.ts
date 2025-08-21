import { Request, Response } from "express";

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
};

export const signup = (req: Request, res: Response) => {
  const { email, password } = req.body;
};
