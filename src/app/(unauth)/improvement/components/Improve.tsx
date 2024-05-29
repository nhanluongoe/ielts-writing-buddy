'use client';

import { useForm } from '@tanstack/react-form';
import React, { useState } from 'react';
import Answer from './Answer';
import { ImageIcon } from '@radix-ui/react-icons';
import { cn } from '@/utils/helpers';

interface Given {
  question: string;
  answer: string;
  image: string;
}

export default function Improve() {
  const [enhancedAnswer, setEnhancedAnswer] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');

  const form = useForm<Given>({
    onSubmit: async ({ value }) => {
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
              <textarea
                id="question"
                className="input"
                rows={5}
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Enter the task 1 question in the IELTS Writing exam..."
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

        <form.Field
          name="image"
          children={(field) => (
            <div
              className={cn('form--field', {
                hidden: Boolean(previewImage),
              })}
            >
              <label htmlFor="image" className="icon-button">
                <ImageIcon height={50} width={50} />
              </label>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const base64String = reader.result as string;
                      field.handleChange(base64String);
                      setPreviewImage(base64String);
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </div>
          )}
        />

        {previewImage && (
          <div className="w-52">
            <img alt="preview-image" src={previewImage} />
          </div>
        )}

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
