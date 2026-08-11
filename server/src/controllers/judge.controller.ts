import { Request, Response } from "express";
import axios from "axios";
import Submission from "../models/Submission";

const JUDGE0 = "http://localhost:2358";

export const runCode = async (
  req: Request,
  res: Response
) => {
  try {
    const result = await axios.post(
      `${JUDGE0}/submissions?base64_encoded=false&wait=true`,
      req.body
    );

    return res.json(result.data);

  } catch (err) {
    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Judge Error",
    });
  }
};

export const submitCode = async (
  req: Request,
  res: Response
) => {
  try {

    const result = await axios.post(
      `${JUDGE0}/submissions?base64_encoded=false&wait=true`,
      req.body
    );

    const data = result.data;

    await Submission.create({

      question: req.body.question || "",

      language: req.body.language_id,

      code: req.body.source_code,

      status: data.status?.description,

      runtime: data.time,

      memory: data.memory,

      stdout: data.stdout,

      stderr: data.stderr,

    });

    return res.json(data);

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
      message: "Judge Error",
    });

  }
};
export const getSubmissionHistory = async (
  req: Request,
  res: Response
) => {
  try {
    const submissions = await Submission.find()
      .sort({ createdAt: -1 });

    return res.json({
      success: true,
      submissions,
    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({
      success: false,
    });

  }
};