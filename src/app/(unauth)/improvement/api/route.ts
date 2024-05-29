import { GoogleGenerativeAI } from '@google/generative-ai';

const PROMPT =
  'Base on the question and answer of the IELTS Writing exam, write an enhanced answer.';
const MODEL = 'gemini-1.5-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

export async function POST(request: Request) {
  const { question, answer } = await request.json();

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: MODEL });

  const prompt = `
    ${PROMPT}
    Question: ${question}
    Answer: ${answer}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();

  return Response.json({ data: text });
}
