import { Request, Response } from "express";

import Submission from "../models/Submission";

export const codingAnalytics = async (
  req: Request,
  res: Response
) => {
  try {

    const accepted = await Submission.find({
      status: "Accepted",
    });

    const solved = accepted.length;

    const easy = accepted.filter(
      (q: any) => q.question?.difficulty === "Easy"
    ).length;

    const medium = accepted.filter(
      (q: any) => q.question?.difficulty === "Medium"
    ).length;

    const hard = accepted.filter(
      (q: any) => q.question?.difficulty === "Hard"
    ).length;

    res.json({
      solved,
      easy,
      medium,
      hard,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      success: false,
    });

  }
};