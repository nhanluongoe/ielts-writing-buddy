import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import Answer from './Answer';
import httpClient from '@/libs/axios';
import toast from 'react-stacked-toast';
import UploadImageButton from '@/components/UploadImageButton';
import { cn } from '@/utils/helpers';

interface FormInput {
  question: string;
  answer: string;
  image: string;
}

export default function FirstTask() {
  const [enhancedAnswer, setEnhancedAnswer] = useState<string>('');

  const form = useForm<FormInput>({
    onSubmit: async ({ value }) => {
      try {
        const res = await httpClient.post('/improve/api/first-task', value);
        const { data } = res.data;
        setEnhancedAnswer(data);
      } catch (err) {
        toast.error({
          description: 'The API gets its limit. Please try again later!',
          className: 'border border-red-500 !text-red-500',
        });
      }
    },
    defaultValues: {
      question: '',
      answer: '',
      image: '',
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

          <form.Field
            name="answer"
            children={(field) => {
              const words = field.state.value.split(' ').filter(Boolean).length;

              return (
                <div className="form-field mt-1">
                  <textarea
                    id="answer"
                    className="input"
                    rows={30}
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter your answer..."
                  />
                  <p
                    className={cn('py-1 px-3 text-gray-400', {
                      invisible: words === 0,
                    })}
                  >
                    {words} {words > 1 ? 'Words' : 'Word'}{' '}
                  </p>
                </div>
              );
            }}
          />

          <form.Field
            name="image"
            children={(field) => <UploadImageButton field={field} />}
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
