import { Request, Response } from "express";
import Submission from "../models/Submission";

export const getHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const { userId } = req.params;

    const submissions = await Submission.find({
      user: userId,
    })
      .populate("challenge")
      .sort({ createdAt: -1 });

    res.json({
      submissions,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to load history",
    });
  }
};