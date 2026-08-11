import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

function cleanJSON(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

// ===============================
// BUILD PROMPT
// ===============================

function buildPrompt(
  mode: string,
  value: string,
  role: string,
  difficulty: string
) {
  let context = "";

  switch (mode) {
    case "Company":
      context = `
Generate ONE original coding interview question.

Company: ${value}
Role: ${role}
Difficulty: ${difficulty}

The style should resemble recent interview questions asked by ${value}.
`;
      break;

    case "Topic":
      context = `
Generate ONE coding interview question.

Topic: ${value}
Difficulty: ${difficulty}

Focus ONLY on ${value}.
`;
      break;

    case "Blind75":
      context = `
Generate ONE Blind 75 style coding interview problem.

Difficulty: ${difficulty}

Do NOT copy LeetCode exactly.
Create an original variation.
`;
      break;

    case "Striver":
      context = `
Generate ONE Striver A2Z style coding problem.

Difficulty: ${difficulty}

Question should match Striver roadmap difficulty.
`;
      break;

    case "NeetCode":
      context = `
Generate ONE NeetCode 150 style coding problem.

Difficulty: ${difficulty}
`;
      break;

    case "Random":
      context = `
Generate ONE random DSA interview problem.

Difficulty: ${difficulty}
`;
      break;

    default:
      context = `
Generate ONE coding interview problem.

Difficulty: ${difficulty}
`;
  }

  return `
You are an expert DSA interviewer.

${context}

IMPORTANT RULES

Return ONLY valid JSON.

Do NOT wrap in markdown.

No explanation.

No comments.

Schema:

{
"title":"",
"difficulty":"",
"description":"",
"topics":[],
"examples":[
{
"input":"",
"output":"",
"explanation":""
}
],
"constraints":[],
"starterCode":{
"cpp":"",
"python":"",
"java":"",
"javascript":""
},
"testCases":[
{
"input":"",
"output":""
}
]
}

Requirements:

- LeetCode style
- Original
- Hidden test cases
- Starter code compilable
`;
}

// ===============================
// QUESTION
// ===============================

export async function generateQuestion(
  mode: string,
  value: string,
  role: string,
  difficulty: string
) {
  const prompt = buildPrompt(
    mode,
    value,
    role,
    difficulty
  );

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  const text = cleanJSON(response.text ?? "");

  return JSON.parse(text);
}

// ===============================
// HINT
// ===============================

export async function generateHint(problem: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `
You are a FAANG interviewer.

Give ONLY three progressive hints.

Do not reveal the full solution.

Problem:

${problem}
`,
  });

  return response.text ?? "";
}

// ===============================
// REVIEW
// ===============================

export async function reviewCode(
  problem: string,
  code: string
) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: `
You are a Senior Software Engineer at Google.

Review this code.

Problem:
${problem}

Code:
${code}

Return in this format.

Correctness

Time Complexity

Space Complexity

Edge Cases

Optimization

Better Approach
`,
  });

  return response.text ?? "";
}