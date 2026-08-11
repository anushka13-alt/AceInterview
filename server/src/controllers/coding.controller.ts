import { Request, Response } from "express";
import Question from "../models/Question";

import {
  generateCodingChallenge,
  generateHint,
} from "../services/gemini";

export const createChallenge = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      company,
      role,
      difficulty,
    } = req.body;

    const ai = await generateCodingChallenge(
      company,
      role,
      difficulty
    );

    const cleaned = ai
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    const challenge =
      await Question.create({

  title: parsed.title,

 slug:
parsed.title
.toLowerCase()
.replace(/[^a-z0-9 ]/g,"")
.replace(/\s+/g,"-")
+
"-"+
Date.now(),
  description: parsed.description,

  difficulty,

  companies: [company],

  topics: parsed.topics ||[],

  acceptance: Math.floor(Math.random()*40)+55,

  constraints: parsed.constraints || [],

  examples: parsed.examples || [],

  starterCode: parsed.starterCode || {},

  testCases: parsed.testCases || [],

  hints: [],

  premium: false,

  frequency: 0,

  timeLimit: 1,

  memoryLimit: 256,

});

    return res.status(200).json({

      success: true,

      data: challenge,

    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false,

      message:
        "Failed to generate coding challenge",

    });

  }
};

export const getChallenge = async (
  req: Request,
  res: Response
) => {

  try {

    const challenge =
      await Question.findById(
        req.params.id
      );

    if (!challenge) {

      return res.status(404).json({

        success: false,

        message: "Challenge not found",

      });

    }

    return res.status(200).json({

      success: true,

      data: challenge,

    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false,

      message: "Server Error",

    });

  }

};

export const getHint = async (
  req: Request,
  res: Response
) => {

  try {

    const { problem } = req.body;

    if (!problem) {

      return res.status(400).json({

        success: false,

        message: "Problem is required",

      });

    }

    const hint =
      await generateHint(problem);

    return res.status(200).json({

      success: true,

      hint,

    });

  } catch (err) {

    console.log(err);

    return res.status(500).json({

      success: false,

      message:
        "Failed to generate hint",

    });

  }

};