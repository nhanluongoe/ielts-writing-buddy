import { useForm } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Answer from './Answer';
import toast from 'react-stacked-toast';
import { cn } from '@/utils/helpers';
import { EraserIcon, MagicWandIcon } from '@radix-ui/react-icons';
import { streamImproveSecondTask } from '@/libs/ai/ielts-ai';
import FormFieldLabel from '@/components/FormFieldLabel';
import useElementHeight from '@/hooks/useElementHeight';

interface FormInput {
  question: string;
  answer: string;
}

const PROMPT_TEXTAREA_ROWS = 8;
const ANSWER_TEXTAREA_ROWS = 30;
const EMPTY_WORD_COUNT = 0;
const SINGULAR_WORD_COUNT = 1;

export default function SecondTask() {
  const [answer, setAnswer] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const formPanelRef = useRef<HTMLDivElement>(null);
  const responsePanelHeight = useElementHeight(formPanelRef);
  const streamControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => {
      streamControllerRef.current?.abort();
    };
  }, []);

  const form = useForm({
    onSubmit: async ({ value }) => {
      streamControllerRef.current?.abort();
      setAnswer('');
      setIsLoading(true);

      const streamController = new AbortController();
      streamControllerRef.current = streamController;

      try {
        for await (const text of streamImproveSecondTask(value, {
          signal: streamController.signal,
        })) {
          setAnswer((prev) => prev + text);
        }
      } catch (error) {
        if (streamController.signal.aborted) return;

        toast.error({
          description:
            error instanceof Error
              ? error.message
              : 'The API gets its limit. Please try again later!',
          className: 'border border-red-500 !text-red-500',
        });
      } finally {
        if (streamControllerRef.current === streamController) {
          streamControllerRef.current = null;
          setIsLoading(false);
        }
      }
    },
    defaultValues: {
      question: '',
      answer: '',
    } satisfies FormInput,
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };
  return (
    <div className="grid items-start gap-4 lg:grid-cols-2">
      <div
        ref={formPanelRef}
        className="rounded-lg border border-slate-800 bg-slate-900/55 p-4"
      >
        <div className="mb-4">
          <p className="text-sm font-semibold text-teal-200">Improve Task 2</p>
          <h1 className="mt-1 text-2xl font-bold text-white">
            Review your essay
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Paste the prompt and your response to receive targeted feedback on
            coherence, development, vocabulary, and grammar.
          </p>
        </div>
        <form className="flex flex-col items-stretch" onSubmit={handleSubmit}>
          <form.Field
            name="question"
            children={(field) => (
              <div className="form-field">
                <FormFieldLabel
                  htmlFor="question"
                  text="Paste the full IELTS Task 2 question, including the topic and instruction such as agree or disagree, discuss both views, or give your opinion."
                >
                  Essay requirement
                </FormFieldLabel>
                <textarea
                  id="question"
                  className="input"
                  rows={PROMPT_TEXTAREA_ROWS}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter requirements..."
                />
              </div>
            )}
          />

          <form.Field
            name="answer"
            children={(field) => {
              const words = field.state.value.split(' ').filter(Boolean).length;

              return (
                <div className="form-field mt-1">
                  <FormFieldLabel
                    htmlFor="answer"
                    text="Paste your own essay here. The assistant will review coherence, development, vocabulary, grammar, and possible improvements."
                  >
                    Your essay
                  </FormFieldLabel>
                  <textarea
                    id="answer"
                    className="input min-h-[28rem]"
                    rows={ANSWER_TEXTAREA_ROWS}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your answer..."
                  />
                  <p
                    className={cn('px-4 pb-3 text-sm text-slate-500', {
                      invisible: words === EMPTY_WORD_COUNT,
                    })}
                  >
                    {words} {words > SINGULAR_WORD_COUNT ? 'words' : 'word'}
                  </p>
                </div>
              );
            }}
          />

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="mt-4 flex flex-col items-center justify-center gap-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="button--primary"
                >
                  <MagicWandIcon />
                  {isLoading || isSubmitting ? 'Reviewing...' : 'Review answer'}
                </button>
                <button
                  type="reset"
                  onClick={() => form.reset()}
                  className="button--danger"
                >
                  <EraserIcon />
                  Clear
                </button>
              </div>
            )}
          />
        </form>
      </div>
      <Answer
        content={answer}
        isLoading={isLoading}
        panelHeight={responsePanelHeight}
      />
    </div>
  );
}
