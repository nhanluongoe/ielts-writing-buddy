import model from '@/libs/google-gemini';

const PROMPT = `Based on the provided question and image for Task 1 in the IELTS Writing exam, write a response in IELTS style. Ensure the response is between 150 and 160 words in length. Do not include any instructions.`;

export async function POST(request: Request) {
  const { question, answer, image } = await request.json();

  const prompt = `
    "${PROMPT}"
    Question: "${question}"
    Answer: "${answer}"
  `;

  const imageParts: string[] = [image];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = result.response;
  const text = response.text();

  return Response.json({ data: text });
}
