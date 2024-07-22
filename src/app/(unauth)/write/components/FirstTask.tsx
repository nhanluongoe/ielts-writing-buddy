import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import Answer from './Answer';
import { ImageIcon } from '@radix-ui/react-icons';
import { cn } from '@/utils/helpers';
import ParagraphLoadingSkeleton from '@/components/ParagraphLoadingSkeleton';
import httpClient from '@/libs/axios';
import toast from 'react-stacked-toast';

interface FormInput {
  question: string;
  image: string;
}

export default function FirstTask() {
  const [enhancedAnswer, setEnhancedAnswer] = useState<string>('');
  const [previewImage, setPreviewImage] = useState<string>('');

  const form = useForm<FormInput>({
    onSubmit: async ({ value }) => {
      try {
        const res = await httpClient.post('/write/api/first-task', value);
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
                placeholder="Enter requirements..."
              />
            </div>
          )}
        />

        <form.Field
          name="image"
          children={(field) => (
            <div
              className={cn('form-field', {
                hidden: Boolean(previewImage),
              })}
            >
              <label
                className="flex flex-col justify-center items-center bg-white px-5 py-8 w-1/3 mx-auto rounded-lg cursor-pointer"
                htmlFor="image"
              >
                <div className="icon-button ">
                  <ImageIcon height={50} width={50} />
                </div>
                <span className="block my-2 text-zinc-800">Upload Image</span>
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
