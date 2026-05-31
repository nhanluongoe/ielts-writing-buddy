import { useForm } from '@tanstack/react-form';
import type { FormEvent } from 'react';
import { useEffect, useRef, useState } from 'react';
import Answer from './Answer';
import toast from 'react-stacked-toast';
import { EraserIcon, MagicWandIcon } from '@radix-ui/react-icons';
import { streamWriteSecondTask } from '@/libs/gemini-browser';
import FormFieldLabel from '@/components/FormFieldLabel';
import useElementHeight from '@/hooks/useElementHeight';

interface FormInput {
  question: string;
}

const PROMPT_TEXTAREA_ROWS = 8;

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
        for await (const text of streamWriteSecondTask(value, {
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
          <p className="text-sm font-semibold text-teal-200">Write Task 2</p>
          <h1 className="mt-1 text-2xl font-bold text-white">
            Generate an essay sample
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Paste the essay question and get a structured sample with a clear
            position, paragraphing, and development.
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

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="button--primary"
                >
                  <MagicWandIcon />
                  {isLoading || isSubmitting
                    ? 'Generating...'
                    : 'Generate answer'}
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
