import { Request, Response } from "express";
import Submission from "../models/Submission";

export const getSubmissionHistory = async (
  req: Request,
  res: Response
) => {
  try {

    const history = await Submission.find()
      .populate("question", "title difficulty companies")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: history,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch submission history",
    });

  }
};