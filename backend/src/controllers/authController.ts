import { Request, Response } from "express";
import { User } from "../models/model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      res.status(201).json({
        message: "User not found",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(201).json({
        message: "Invalid password",
      });
      return;
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET as string, {
      expiresIn: "7d",
    });

    res.json({
      message: "Login successful",
      user,
      token,
    });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
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
  const token = jwt.sign(
    { id: newUser._id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );

  res.json({
    message: "User created successfully",
    user: newUser,
    token: token,
  });
};
