import { Request, Response } from "express";
import Resume from "../models/Resume";
import Interview from "../models/Interview";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const resumes = await Resume.countDocuments();

    const interviews =
      await Interview.countDocuments();

    const latestResume = await Resume.findOne()
      .sort({ createdAt: -1 });

    const latestInterview =
      await Interview.findOne().sort({
        createdAt: -1,
      });

    res.json({
      resumes,
      interviews,
      latestResume,
      latestInterview,
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};