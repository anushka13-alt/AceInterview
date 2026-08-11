import { Request, Response } from "express";
import bcrypt from "bcryptjs";

import User from "../models/User";
import { generateToken } from "../utils/jwt";

export const register = async (
  req: Request,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user._id.toString());

    res.status(201).json({
      success: true,
      token,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Registration failed",
    });

  }
};

export const login = async (
  req: Request,
  res: Response
) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {

      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });

    }

    const token = generateToken(user._id.toString());

    res.json({
      success: true,
      token,
      user,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
    });

  }
};