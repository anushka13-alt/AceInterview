import { askGroq } from "./groq";

export async function generateQuestions(
  role: string,
  level: string
) {
  const prompt = `
Generate 5 interview questions.

Role: ${role}

Difficulty: ${level}

Return ONLY JSON.

{
  "questions":[
    "...",
    "...",
    "...",
    "...",
    "..."
  ]
}
`;

  return await askGroq(prompt);
}

export async function evaluateAnswer(
  question: string,
  answer: string
) {
  const prompt = `
Evaluate this interview answer.

Question:
${question}

Answer:
${answer}

Return ONLY JSON.

{
"score":0,
"feedback":"",
"improvement":""
}
`;

  return await askGroq(prompt);
}