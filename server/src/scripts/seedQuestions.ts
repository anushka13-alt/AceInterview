import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import Question from "../models/Question";

import { generateAIQuestion } from "../services/gemini";

const topics = [
  "Arrays",
  "Strings",
  "Linked List",
  "Stack",
  "Queue",
  "Binary Search",
  "Recursion",
  "Trees",
  "BST",
  "Heap",
  "Graph",
  "Greedy",
  "DP",
  "Trie",
  "Sliding Window",
  "Hash Map"
];

const difficulties = [
  "Easy",
  "Medium",
  "Hard"
];

async function seed() {

  await mongoose.connect(
    process.env.MONGODB_URI!
  );

  console.log("Mongo Connected");

  for (const topic of topics) {

    for (const difficulty of difficulties) {

      try {

        console.log(
          `Generating ${topic} ${difficulty}`
        );

        const q =
          await generateAIQuestion(
            topic,
            difficulty
          );

        await Question.create({

          title: q.title,

          slug:
            q.title
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              + "-" +
            Date.now(),

          leetcodeId: 0,

          description: q.description,

         difficulty: difficulty as "Easy" | "Medium" | "Hard",

          companies: q.companies || ["Amazon"],

          topics: q.topics || [topic],

          acceptance: 0,

          constraints:
            q.constraints || [],

          examples:
            q.examples || [],

          starterCode:
            q.starterCode || {},

          testCases:
            q.testCases || [],

          hints: [],

          premium: false,

          frequency: 0,

          timeLimit: 1,

          memoryLimit: 256,

        });

        console.log("Saved");

      } catch (err) {

        console.log(err);

      }

    }

  }

  console.log("DONE");

  process.exit();

}

seed();