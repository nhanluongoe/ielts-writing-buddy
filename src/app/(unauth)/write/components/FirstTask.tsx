import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import Answer from './Answer';
import toast from 'react-stacked-toast';
import UploadImageButton from '@/components/UploadImageButton';
import { EraserIcon, MagicWandIcon } from '@radix-ui/react-icons';
import {
  getGeminiApiErrorMessage,
  withGeminiApiKey,
} from '@/libs/gemini-api-key';

interface FormInput {
  question: string;
  image: string;
}

export default function FirstTask() {
  const [answer, setAnswer] = useState<string>('');

  const form = useForm<FormInput>({
    onSubmit: async ({ value }) => {
      setAnswer('');

      try {
        const res = await fetch('/write/api/first-task/stream', {
          method: 'POST',
          body: JSON.stringify(withGeminiApiKey(value)),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!res.ok) {
          toast.error({
            description: await getGeminiApiErrorMessage(res),
            className: 'border border-red-500 !text-red-500',
          });
          return;
        }

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();

        while (true) {
          const { done, value } = await reader?.read();
          if (done) break;

          const text = decoder.decode(value);
          setAnswer((prev) => prev + text);
        }
      } catch {
        toast.error({
          description: 'The API gets its limit. Please try again later!',
          className: 'border border-red-500 !text-red-500',
        });
      }
    },
    defaultValues: {
      question: '',
      image: '',
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="rounded-lg border border-slate-800 bg-slate-900/55 p-4">
        <div className="mb-4">
          <p className="text-sm font-semibold text-teal-200">Write Task 1</p>
          <h1 className="mt-1 text-2xl font-bold text-white">
            Generate a report sample
          </h1>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            Add the chart, map, process, or table prompt. Uploading the image
            helps the answer stay grounded in the visual data.
          </p>
        </div>
        <form className="flex flex-col items-stretch" onSubmit={handleSubmit}>
          <form.Field
            name="question"
            children={(field) => (
              <div className="form-field">
                <label
                  className="px-4 pt-4 text-sm font-semibold text-slate-300"
                  htmlFor="question"
                >
                  Task prompt
                </label>
                <textarea
                  id="question"
                  className="input"
                  rows={8}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter requirements..."
                />
              </div>
            )}
          />

          <form.Field
            name="image"
            children={(field) => <UploadImageButton field={field} />}
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
                  {isSubmitting ? 'Generating...' : 'Generate answer'}
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
      <Answer content={answer} isLoading={form.state.isSubmitting} />
    </div>
  );
}
