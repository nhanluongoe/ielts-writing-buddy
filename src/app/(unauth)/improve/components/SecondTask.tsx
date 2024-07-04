import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import Answer from './Answer';
import ParagraphLoadingSkeleton from '@/components/ParagraphLoadingSkeleton';
import httpClient from '@/libs/axios';
import toast from 'react-stacked-toast';

interface FormInput {
  question: string;
  answer: string;
}

export default function SecondTask() {
  const [enhancedAnswer, setEnhancedAnswer] = useState<string>('');

  const form = useForm<FormInput>({
    onSubmit: async ({ value }) => {
      try {
        const res = await httpClient.post('/improve/api/second-task', value);
        const { data } = res.data;
        setEnhancedAnswer(data);
      } catch {
        toast.error({
          description: 'The API gets its limit. Please try again later!',
          className: 'border border-red-500 !text-red-500',
        });
      }
    },
    defaultValues: {
      question: '',
      answer: '',
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };
  return (
    <div>
      <form
        className="flex flex-col items-center gap-10"
        onSubmit={handleSubmit}
      >
        <form.Field
          name="question"
          children={(field) => (
            <div className="form-field">
              <textarea
                id="question"
                className="input"
                rows={5}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter requirements..."
              />
            </div>
          )}
        />

        <form.Field
          name="answer"
          children={(field) => (
            <div className="form-field">
              <textarea
                id="answer"
                className="input"
                rows={10}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter your answer..."
              />
            </div>
          )}
        />

        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={!canSubmit}
                className="button--primary"
              >
                {isSubmitting ? '...' : 'Go'}
              </button>
              <button
                type="reset"
                onClick={() => form.reset()}
                className="button--danger"
              >
                Clear
              </button>
            </div>
          )}
        />
      </form>

      {form.state.isSubmitting && <ParagraphLoadingSkeleton />}
      <Answer content={enhancedAnswer} />
    </div>
  );
}
