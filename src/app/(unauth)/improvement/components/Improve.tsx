'use client';

import { useForm } from '@tanstack/react-form';
import React from 'react';

interface Given {
  question: string;
  answer: string;
  image: string;
}

export default function Improve() {
  const form = useForm<Given>({
    onSubmit: async ({ value }) => {
      console.log(value);
    },
    defaultValues: {
      question: '',
      answer: '',
      image: '',
    },
  });

  return (
    <form
      className="flex flex-col items-center"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
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
            <label htmlFor="answer">Your answer:</label>
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
              Reset
            </button>
          </div>
        )}
      />
    </form>
  );
}
