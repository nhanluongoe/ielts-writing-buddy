'use client';

import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import Answer from './Answer';

interface Given {
  question: string;
  answer: string;
  image: string;
}

export default function Improve() {
  const [enhancedAnswer, setEnhancedAnswer] = useState<string>('');

  const form = useForm<Given>({
    onSubmit: async ({ value }) => {
      console.log(value);
      const res = await fetch('/improvement/api/first-task', {
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
    <div>
      <form
        className="flex flex-col items-center gap-10"
        onSubmit={handleSubmit}
      >
        <form.Field
          name="question"
          children={(field) => (
            <div className="form-field">
              <label htmlFor="question">Question</label>
              <textarea
                id="question"
                className="input"
                rows={5}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        <form.Field
          name="answer"
          children={(field) => (
            <div className="form-field">
              <label htmlFor="answer">Your answer</label>
              <textarea
                id="answer"
                className="input"
                rows={10}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />

        <form.Field
          name="image"
          children={(field) => (
            <div className="form--field">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const base64String = reader.result as string;
                      // Use the base64String as needed
                      console.log(base64String);
                      field.handleChange(base64String);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
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

      <Answer content={enhancedAnswer} />
    </div>
  );
}
