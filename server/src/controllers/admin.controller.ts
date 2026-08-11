import { Request, Response } from "express";
import Question from "../models/Question";

import {
  generateBulkCodingChallenges,
} from "../services/gemini";

export const generateBulkQuestions = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      company,
      role,
      difficulty,
      count,
    } = req.body;

    const ai =
      await generateBulkCodingChallenges(
        company,
        role,
        difficulty,
        count
      );

    const cleaned = ai
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    if (!parsed.questions) {

      return res.status(500).json({
        success: false,
        message: "Gemini returned invalid JSON",
      });

    }

    const docs = parsed.questions.map(
      (q: any, index: number) => ({

        title: q.title,

        slug:
          q.title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") +
          "-" +
          Date.now() +
          "-" +
          index,

        leetcodeId: 0,

        description: q.description || "",

        difficulty,

        companies: [company],

        topics: q.topics || [],

        acceptance: 0,

        constraints: q.constraints || [],

        examples: q.examples || [],

        starterCode: q.starterCode || {},

        testCases: q.testCases || [],

        hints: [],

        premium: false,

        frequency: 0,

        timeLimit: 1,

        memoryLimit: 256,

      })
    );

    await Question.insertMany(docs);

    return res.json({

      success: true,

      total: docs.length,

      message: `${docs.length} Questions Generated Successfully`

    });

  }

  catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false,

      message: "Bulk generation failed",

    });

  }

};