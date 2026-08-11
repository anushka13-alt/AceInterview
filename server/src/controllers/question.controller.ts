import { Request, Response } from "express";
import Question from "../models/Question";
import { generateQuestion } from "../services/geminiCoding";

function createSlug(title: string) {
  return (
    title
      .toLowerCase()
      .replace(/[^a-z0-9 ]/g, "")
      .trim()
      .replace(/\s+/g, "-") +
    "-" +
    Date.now()
  );
}

// ======================================
// CREATE QUESTION
// ======================================

export async function createQuestion(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      mode = "Company",
      company,
      topic,
      role = "SDE",
      difficulty = "Easy",
    } = req.body;

    let value = "";

    switch (mode) {
      case "Company":
        value = company;
        break;

      case "Topic":
        value = topic;
        break;

      case "Blind75":
        value = "Blind75";
        break;

      case "Striver":
        value = "Striver";
        break;

      case "NeetCode":
        value = "NeetCode";
        break;

      case "Random":
        value = "Random";
        break;

      default:
        value = company || topic || "Random";
    }

    console.log("========== REQUEST ==========");
    console.log({
      mode,
      value,
      role,
      difficulty,
    });

    const aiQuestion = await generateQuestion(
      mode,
      value,
      role,
      difficulty
    );

    console.log("========== AI RESPONSE ==========");
    console.log(aiQuestion);

    const question = await Question.create({
      ...aiQuestion,

      company: mode === "Company" ? value : "",

      role,

      slug: createSlug(aiQuestion.title),
    });

    res.status(201).json({
      success: true,
      question,
    });

  } catch (err: any) {
    console.log("========== ERROR ==========");
    console.log(err);
    console.log("===========================");

    res.status(500).json({
      success: false,
      message:
        err?.message || "Failed to generate question",
    });
  }
}

// ======================================
// GET QUESTION
// ======================================

export async function getQuestion(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const question = await Question.findOne({
      slug: req.params.slug,
    });

    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question not found",
      });
      return;
    }

    res.json({
      success: true,
      question,
    });

  } catch (err: any) {
    console.log(err);

    res.status(500).json({
      success: false,
      message:
        err?.message || "Unable to fetch question",
    });
  }
}