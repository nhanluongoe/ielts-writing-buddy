type IeltsTask = 'first' | 'second';

const taskDetails: Record<
  IeltsTask,
  {
    label: string;
    minimumWords: number;
    targetWords: string;
    criteria: string;
    taskInstruction: string;
  }
> = {
  first: {
    label: 'IELTS Writing Task 1',
    minimumWords: 160,
    targetWords: '170-200',
    criteria:
      'Task Achievement, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy',
    taskInstruction:
      'Summarize the main features from the prompt and visual, make relevant comparisons, include a clear overview, and avoid inventing information that is not shown.',
  },
  second: {
    label: 'IELTS Writing Task 2',
    minimumWords: 280,
    targetWords: '290-330',
    criteria:
      'Task Response, Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy',
    taskInstruction:
      'Write a fully developed essay with a clear position, relevant ideas, logical paragraphing, and specific support for the argument.',
  },
};

function splitPrompt(prompt: string) {
  return prompt.trim().split('\n');
}

function buildCriteriaScoreLines(criteria: string) {
  return criteria
    .split(', ')
    .map((criterion) => `- ${criterion}: [brief reason]`)
    .join('\n');
}

export function buildWritePrompt(task: IeltsTask, question: string) {
  const details = taskDetails[task];

  return splitPrompt(`
You are an expert IELTS Writing examiner and model-answer writer.

Task: Produce a high-scoring sample answer for ${details.label}.

IELTS requirements:
- Use formal, natural academic English.
- Aim for Band 8+ quality across ${details.criteria}.
- Write at least ${details.minimumWords} words; ideally ${details.targetWords} words.
- ${details.taskInstruction}
- Do not include a title, score, notes, analysis, bullet points, or instructions.
- Return only the final sample answer.

Question:
"""
${question}
"""
`);
}

export function buildImprovePrompt(
  task: IeltsTask,
  question: string,
  answer: string
) {
  const details = taskDetails[task];
  const visualInstruction =
    task === 'first'
      ? '- Do not invent data or visual details that are not present in the question or uploaded image.'
      : '';

  return splitPrompt(`
You are an expert IELTS Writing examiner and writing coach.

Task: Evaluate the student's ${details.label} answer, then rewrite it into a stronger IELTS-style response.

IELTS requirements:
- Judge the original answer against ${details.criteria}.
- Be honest but constructive.
- Keep the student's core meaning where possible, but correct weak logic, unclear organization, grammar issues, repetition, and unnatural vocabulary.
- The enhanced response must be at least ${details.minimumWords} words; ideally ${details.targetWords} words.
- ${details.taskInstruction}
${visualInstruction}

Return the response in this exact Markdown structure:

## Estimated Band Score
- Overall: [band score]
${buildCriteriaScoreLines(details.criteria)}

## Priority Improvements
- [most important improvement]
- [second most important improvement]
- [third most important improvement]

## Enhanced Response
[rewrite the full answer here]

## Sentence-Level Changes
Add 3 to 6 high-value rows.

| Original sentence | Improved sentence | Why this is better |
| --- | --- | --- |
| [quote a weak sentence or phrase] | [improved version] | [short reason] |

Question:
"""
${question}
"""

Student answer:
"""
${answer}
"""
`);
}
