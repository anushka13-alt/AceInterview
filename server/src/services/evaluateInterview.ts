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

export async function evaluateInterview(
  questions: any[],
  answers: any[]
) {
  const prompt = `
You are an experienced Software Engineering Interviewer.

Evaluate the interview.

Questions:
${JSON.stringify(questions, null, 2)}

Answers:
${JSON.stringify(answers, null, 2)}

Return ONLY valid JSON.

{
  "overallScore": 0,
  "communication": 0,
  "technicalKnowledge": 0,
  "problemSolving": 0,
  "strengths": [],
  "weaknesses": [],
  "improvements": [],
  "questionWiseFeedback": [
    {
      "question": "",
      "score": 0,
      "feedback": ""
    }
  ]
}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return clean(response.text ?? "");
}