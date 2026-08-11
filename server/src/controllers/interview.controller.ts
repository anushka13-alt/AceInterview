import { Response } from "express";
import Interview from "../models/Interview";
import { AuthRequest } from "../middleware/auth";
import {
  generateInterviewQuestions,
} from "../services/gemini";
import { evaluateInterview } from "../services/evaluateInterview";

// =============================
// CREATE INTERVIEW
// =============================
export const createInterview = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const company = (req.body.company || "").trim();
    const role = (req.body.role || "").trim();
    const level = (req.body.level || "Fresher").trim();

    console.log("========== REQUEST ==========");
    console.log(req.body);

    if (!company || !role) {
      return res.status(400).json({
        success: false,
        message: "Company and Role are required.",
      });
    }

    const ai = await generateInterviewQuestions(
      company,
      role,
      level
    );

    console.log("========== RAW GEMINI ==========");
    console.log(ai);

    const cleaned = ai
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    console.log("========== PARSED GEMINI ==========");
    console.log(JSON.stringify(parsed, null, 2));

    let questions: string[] = [];

    if (Array.isArray(parsed.questions)) {
      questions = parsed.questions.map((q: any) => {
        if (typeof q === "string") return q;

        if (typeof q === "object") {
          return (
            q.question ||
            q.title ||
            q.text ||
            JSON.stringify(q)
          );
        }

        return String(q);
      });
    }

    console.log("========== QUESTIONS ==========");
    console.log(questions);

    const interview = await Interview.create({
      user: req.user.id,
      company,
      role,
      level,
      questions,
      answers: [],
      evaluation: {},
    });

    return res.status(201).json({
      success: true,
      data: interview,
    });

  } catch (err: any) {
    console.error("========== ERROR ==========");
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Failed to create interview",
    });
  }
};

// =============================
// SUBMIT INTERVIEW
// =============================
export const submitInterview = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { id, answers } = req.body;

    const interview = await Interview.findOne({
      _id: id,
      user: req.user.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const ai = await evaluateInterview(
      interview.questions,
      answers
    );

    const cleaned = ai
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    interview.answers = answers;
    interview.evaluation = JSON.parse(cleaned);

    await interview.save();

    return res.json({
      success: true,
      data: interview,
    });

  } catch (err: any) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: err.message || "Interview submission failed",
    });
  }
};

// =============================
// GET INTERVIEW
// =============================
export const getInterviewById = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const interview = await Interview.findOne({
      _id: req.params.id,
      user: req.user?.id,
    });

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.json({
      success: true,
      data: interview,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// GET ALL INTERVIEWS
// =============================
export const getAllInterviews = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const interviews = await Interview.find({
      user: req.user?.id,
    }).sort({
      createdAt: -1,
    });

    return res.json({
      success: true,
      data: interviews,
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// =============================
// DELETE INTERVIEW
// =============================
export const deleteInterview = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    await Interview.findOneAndDelete({
      _id: req.params.id,
      user: req.user?.id,
    });

    return res.json({
      success: true,
      message: "Interview deleted successfully",
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};