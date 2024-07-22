import model from '@/libs/google-gemini';

const PROMPT = `Based on the provided question and answer for Task 2 in the IELTS Writing exam, write an enhanced response in IELTS style. Ensure the enhanced response is between 270 to 280 words in length.

After providing the enhanced response, present a table in markdown format with the following information:

The first column will contain the original sentence.
The second column will contain the enhanced sentence.
The third column will explain the reason for the enhancement.`;

export async function POST(request: Request) {
  const { question, answer } = await request.json();

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
