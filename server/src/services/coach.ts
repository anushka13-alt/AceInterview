import dotenv from "dotenv";
dotenv.config();

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export async function askCoach(
  message: string,
  history: {
    role: string;
    message: string;
  }[]
) {
  const prompt = `
You are AceInterview AI Career Coach.

You help students with:

- DSA
- Resume
- Interview
- HR
- System Design
- Career Guidance
- Placements

Conversation History:

${history
  .map(
    (m) =>
      `${m.role.toUpperCase()}: ${m.message}`
  )
  .join("\n")}

USER:

${message}

Reply naturally.
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.5-flash",
    contents: prompt,
  });

  return response.text ?? "";
}