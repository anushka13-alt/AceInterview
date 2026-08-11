import { askGroq } from "./groq";

export async function generateCodingQuestion(
  topic: string,
  difficulty: string
) {
  const prompt = `
Generate ONE coding interview question.

Topic: ${topic}

Difficulty: ${difficulty}

Return ONLY valid JSON.

{
"title":"",
"description":"",
"difficulty":"",
"topics":[""],
"companies":["Amazon"],
"constraints":[""],
"examples":[
{
"input":"",
"output":"",
"explanation":""
}
],
"starterCode":{
"cpp":""
},
"testCases":[
{
"input":"",
"output":"",
"hidden":false
}
]
}
`;

  const text = await askGroq(prompt);

  return JSON.parse(
    text.replace(/```json|```/g, "").trim()
  );
}