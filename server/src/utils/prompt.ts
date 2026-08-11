export function codingQuestionPrompt(
  company: string,
  role: string,
  difficulty: string
) {
  return `
You are an expert DSA interviewer.

Generate ONE original coding interview question.

Company: ${company}
Role: ${role}
Difficulty: ${difficulty}

IMPORTANT RULES:

- Return ONLY valid JSON.
- Do NOT wrap in markdown.
- Do NOT write \`\`\`.
- No explanation outside JSON.
- No comments.
- Every field must exist.
- Escape new lines properly.
- starterCode must contain escaped newlines (\\n).

Return this exact schema:

{
  "title": "",
  "difficulty": "",
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

Requirements:

- Give 3-6 hidden test cases.
- Description should resemble LeetCode.
- Constraints should be realistic.
- Starter code should compile.
- Test cases must match the problem exactly.
- Return ONLY JSON.
`;
}