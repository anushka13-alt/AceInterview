import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

function clean(text: string) {
  return text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();
}

async function ask(prompt: string) {
  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return clean(response.text ?? "");
}

// =======================
// Resume Analysis
// =======================

export async function analyzeResume(
  resumeText: string
) {
  const prompt = `
You are an ATS Resume Analyzer.

Analyze the resume below.

Resume:
${resumeText}

Return ONLY valid JSON.

{
  "overallScore": 0,
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingKeywords": [],
  "suggestions": []
}
`;

  return ask(prompt);
}

// =======================
// Interview Questions
// =======================

export async function generateInterviewQuestions(
  company: string,
  role: string,
  level: string
) {
  const prompt = `
Generate 10 interview questions.

Company: ${company}
Role: ${role}
Level: ${level}

Return ONLY valid JSON.

{
  "questions": [
    {
      "question": "",
      "type": "technical"
    }
  ]
}
`;

  return ask(prompt);
}

// =======================
// Bulk Coding Questions
// =======================

export async function generateBulkCodingChallenges(
  company: string,
  role: string,
  difficulty: string,
  count: number
) {
  const prompt = `
You are generating coding interview problems for a
LeetCode-style online coding platform.

Company: ${company}
Role: ${role}
Difficulty: ${difficulty}

Generate EXACTLY ${count} original coding interview questions.

IMPORTANT PLATFORM RULES:

1. Every question must be solved by implementing a FUNCTION.
2. The candidate must NOT write main().
3. starterCode must contain ONLY the function signature and function body.
4. Do NOT include main() in starterCode.
5. Do NOT include hardcoded example input inside starterCode.
6. The judge will automatically create main() and call the candidate function.
7. testCases must contain machine-readable input data.
8. NEVER use natural-language inputs such as:
   "watchTimes = [1, 3, 5], k = 3"
9. For array problems, use a simple serialization format.
10. The input format must be clearly described in the problem description.
11. Every test case input must follow exactly that format.
12. The output must contain ONLY the expected function result.
13. Generate at least 5 test cases per question.
14. Include edge cases.
15. Make sure every test case is logically correct.
16. C++ starterCode should use std::vector where necessary.
17. C++ starterCode should NOT include main().
18. The function signature must be directly callable by the judge.
19. The examples and testCases must use the SAME input format.
20. Do not put markdown fences around the JSON.

For example, if generating:

Problem:
Given an array watchTimes and integer k, return true if
there are at least k consecutive elements forming a strictly
increasing sequence.

The input format should be:

n k
a1 a2 a3 ... an

Example:

Input:
5 3
1 3 5 4 7

Output:
true

Another test case:

Input:
4 2
2 2 2 2

Output:
false

C++ starterCode should look like:

bool hasMilestone(vector<int>& watchTimes, int k) {
    // candidate writes solution
}

NOT:

#include <bits/stdc++.h>
using namespace std;

int main() {
    ...
}

Return ONLY valid JSON in exactly this structure:

{
  "questions": [
    {
      "title": "",
      "description": "",
      "topics": [],
      "examples": [
        {
          "input": "",
          "output": "",
          "explanation": ""
        }
      ],
      "constraints": [],
      "starterCode": {
        "cpp": "",
        "python": "",
        "java": "",
        "javascript": ""
      },
      "testCases": [
        {
          "input": "",
          "output": ""
        }
      ]
    }
  ]
}

Before returning the JSON, internally verify:

- Every test case follows the described input format.
- Every expected output is correct.
- C++ starterCode has no main().
- Python starterCode has no unnecessary input() calls if the platform calls the function directly.
- Java starterCode is a callable method.
- JavaScript starterCode is a callable function.
`;

  return ask(prompt);
}