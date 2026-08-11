import { Request, Response } from "express";

import Question from "../models/Question";
import Submission from "../models/Submission";

import { execute } from "../services/judge0";

import {
  generateHint,
  reviewCode,
} from "../services/geminiCoding";

/* ================= RUN ================= */

export async function runCode(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      language,
      sourceCode,
      input,
    } = req.body;

    const result = await execute(
      language,
      sourceCode,
      input || ""
    );

    res.json({
      success: true,

      stdout: result.stdout || "",

      stderr: result.stderr || "",

      compile_output:
        result.compile_output || "",

      runtime: result.time || "",

      memory: result.memory || "",
    });
  } catch (err) {
    console.log(
      "========== RUN ERROR =========="
    );

    console.log(err);

    console.log(
      "==============================="
    );

    res.status(500).json({
      success: false,
      message: "Execution Failed",
    });
  }
}

/* ================= SUBMIT ================= */

export async function submitSolution(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      language,
      sourceCode,
      questionId,
      userId,
    } = req.body;

    /* ---------- Find Question ---------- */

    const question =
      await Question.findById(questionId);

    if (!question) {
      res.status(404).json({
        success: false,
        message: "Question not found",
      });

      return;
    }

    /* ---------- Test Cases ---------- */

    let accepted = true;

    let runtime = "";

    let memory = "";

    let failedCase: any = null;

    for (const tc of question.testCases) {

      const result = await execute(
        language,
        sourceCode,
        tc.input
      );

      runtime = String(
        result.time || ""
      );

      memory = String(
        result.memory || ""
      );

      /* ---------- Compile / Runtime Error ---------- */

      if (
        result.compile_output ||
        result.stderr
      ) {

        accepted = false;

        failedCase = {
          input: tc.input,

          expected: String(
            tc.output
          ).trim(),

          output: String(
            result.compile_output ||
            result.stderr ||
            ""
          ).trim(),
        };

        break;
      }

      /* ---------- Compare Output ---------- */

      const output = String(
        result.stdout || ""
      ).trim();

      const expected = String(
        tc.output || ""
      ).trim();

      if (output !== expected) {

        accepted = false;

        failedCase = {
          input: tc.input,

          expected,

          output,
        };

        break;
      }
    }

    /* ---------- Create Submission ---------- */

    const submissionData: any = {

      question: question._id,

      language,

      code: sourceCode,

      status: accepted
        ? "Accepted"
        : "Wrong Answer",

      runtime,

      memory,
    };

    /*
     * user is optional in Submission schema.
     *
     * Frontend currently sends:
     * userId = "demo-user"
     *
     * That is NOT a MongoDB ObjectId.
     *
     * Therefore only save user when it is
     * a valid 24-character MongoDB ObjectId.
     */

    if (
      userId &&
      /^[0-9a-fA-F]{24}$/.test(userId)
    ) {
      submissionData.user = userId;
    }

    await Submission.create(
      submissionData
    );

    /* ---------- Response ---------- */

    res.json({
      success: true,

      accepted,

      runtime,

      memory,

      failedCase,
    });

  } catch (err) {

    console.log(
      "========== SUBMISSION ERROR =========="
    );

    console.log(err);

    console.log(
      "======================================"
    );

    res.status(500).json({
      success: false,
      message: "Submission Failed",
    });
  }
}

/* ================= AI HINT ================= */

export async function aiHint(
  req: Request,
  res: Response
): Promise<void> {
  try {

    const hint =
      await generateHint(
        req.body.problem
      );

    res.json({
      success: true,
      hint,
    });

  } catch (err) {

    console.log(
      "========== HINT ERROR =========="
    );

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Hint Failed",
    });
  }
}

/* ================= AI REVIEW ================= */

export async function aiReview(
  req: Request,
  res: Response
): Promise<void> {
  try {

    const review =
      await reviewCode(
        req.body.problem,
        req.body.code
      );

    res.json({
      success: true,
      review,
    });

  } catch (err) {

    console.log(
      "========== REVIEW ERROR =========="
    );

    console.log(err);

    res.status(500).json({
      success: false,
      message: "Review Failed",
    });
  }
}