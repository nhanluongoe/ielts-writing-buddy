import { generateContent } from '@/libs/google-gemini';

const PROMPT = `Based on the provided question for Task 2 in the IELTS Writing exam, write a response in IELTS style.
  The response must be no less than 280 words in length. Do not include any instructions.`;

export async function POST(request: Request) {
  const { question, answer } = await request.json();

  const prompt = `
    "${PROMPT}"
    Question: "${question}"
    Answer: "${answer}"
  `;
  const promptParts: string[] = prompt.split('\n');

  const result = await generateContent(promptParts);
  const text = result.text;

  return Response.json({ data: text });
}
