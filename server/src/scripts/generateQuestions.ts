import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Question from "../models/Question";
import { generateBulkCodingChallenges } from "../services/gemini";

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);

    console.log("Mongo Connected");
console.log("Requesting Gemini...");
    const ai = await generateBulkCodingChallenges(
      "Amazon",
      "SDE",
      "Medium",
      50
    );
console.log("Gemini Response Received");
console.log(ai);
    const cleaned = ai
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const parsed = JSON.parse(cleaned);

    const docs = parsed.questions.map((q: any, i: number) => ({
      title: q.title,
      slug:
        q.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
        "-" +
        i,

      description: q.description,

      difficulty: "Medium",

      companies: ["Amazon"],

      topics: q.topics || [],

      acceptance: 70,

      constraints: q.constraints || [],

      examples: q.examples || [],

      starterCode: q.starterCode || {},

      testCases: q.testCases || [],

      hints: [],

      premium: false,

      frequency: 0,

      timeLimit: 1,

      memoryLimit: 256,
    }));

    await Question.insertMany(docs);

    console.log(`${docs.length} Questions Added`);

    process.exit();

  } catch (err) {

    console.log(err);

    process.exit(1);

  }
}

main();