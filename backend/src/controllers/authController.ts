import { Request, Response } from "express";
import { User } from "../models/model";
import bcrypt from "bcryptjs";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.json({
      message: "User not found",
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.json({
      message: "Invalid password",
    });
    return;
  }

  res.json({
    message: "Login successful",
    user,
  });
};

export const signup = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    res.json({ message: "User already exists" });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

  const newUser = new User({ email, username, password: hashedPassword });
  await newUser.save();

  res.json({ message: "User created successfully", user: newUser });
};
