import { GoogleGenerativeAI } from '@google/generative-ai';

const PROMPT = `Based on the provided question, answer and image for Task 1 in the IELTS Writing exam, write an enhanced answer in IELTS style. Do not include any additional information or instructions; simply write the enhanced answer. Ensure the enhanced answer is between 150 to 160 words in length.

  After giving the answer, provide the table in markdown format with the following information:
  - The first column will be the original sentence.
  - The second column will be the enhanced sentence.
  - The third column will be the reason for the enhancement.
  `;
const MODEL = 'gemini-1.5-flash';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY as string;

export async function POST(request: Request) {
  const { question, answer, image } = await request.json();

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({ model: MODEL });

  const prompt = `
    ${PROMPT}
    Question: ${question}
    Answer: ${answer}
  `;

  const imageParts: string[] = [image];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();

  return Response.json({ data: text });
}
