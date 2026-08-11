import { Request, Response } from "express";
import Resume from "../models/Resume";
import Interview from "../models/Interview";

export const getReport = async (
  req: Request,
  res: Response
) => {
  try {
    const resumes = await Resume.find();

    const interviews = await Interview.find();

    const avgInterviewScore =
      interviews.length === 0
        ? 0
        : interviews.reduce(
            (sum: number, item: any) =>
              sum + (item.overallScore || 0),
            0
          ) / interviews.length;

    res.json({
      totalResumes: resumes.length,
      totalInterviews: interviews.length,
      averageInterviewScore: Number(
        avgInterviewScore.toFixed(1)
      ),
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      success: false,
    });
  }
};