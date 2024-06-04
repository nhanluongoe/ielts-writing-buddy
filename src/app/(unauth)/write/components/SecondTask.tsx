import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import Answer from './Answer';
import ParagraphLoadingSkeleton from '@/components/ParagraphLoadingSkeleton';

interface FormInput {
  question: string;
}

export default function SecondTask() {
  const [enhancedAnswer, setEnhancedAnswer] = useState<string>('');

  const form = useForm<FormInput>({
    onSubmit: async ({ value }) => {
      const res = await fetch('/write/api/second-task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(value),
      });

      const { data } = await res.json();

      setEnhancedAnswer(data);
    },
    defaultValues: {
      question: '',
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
                placeholder="Enter the question in the IELTS Writing exam..."
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
                className="button--secondary"
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
