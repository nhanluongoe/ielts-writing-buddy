import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import Answer from './Answer';
import httpClient from '@/libs/axios';
import toast from 'react-stacked-toast';

interface FormInput {
  question: string;
}

export default function SecondTask() {
  const [enhancedAnswer, setEnhancedAnswer] = useState<string>('');

  const form = useForm<FormInput>({
    onSubmit: async ({ value }) => {
      try {
        const res = await httpClient.post('/write/api/second-task', value);
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
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };
  return (
    <div className="flex">
      <div className="w-1/2">
        <form className="flex flex-col items-center" onSubmit={handleSubmit}>
          <form.Field
            name="question"
            children={(field) => (
              <div className="form-field">
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

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex gap-2 my-3">
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
      </div>
      <Answer content={enhancedAnswer} isLoading={form.state.isSubmitting} />
    </div>
  );
}
