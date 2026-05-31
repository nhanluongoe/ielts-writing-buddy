import { cn } from '@/utils/helpers';
import { ImageIcon } from '@radix-ui/react-icons';
import Image from 'next/image';
import { ChangeEvent, useState } from 'react';
import { InfoTooltip } from './FormFieldLabel';

interface UploadImageButtonProps {
  field: {
    handleChange: (value: string) => void;
  };
  onUpload?: (base64Data: string) => void;
}

const FIRST_SELECTED_FILE_INDEX = 0;

export default function UploadImageButton(props: UploadImageButtonProps) {
  const { field, onUpload } = props;

  const [previewImage, setPreviewImage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[FIRST_SELECTED_FILE_INDEX];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result as string;
        field.handleChange(base64String);
        setPreviewImage(base64String);
        if (onUpload) {
          onUpload(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="my-3 w-full">
      <div
        className={cn('form-field', {
          hidden: !!previewImage,
        })}
      >
        <label
          className="flex cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-slate-700 bg-slate-900/40 p-6 text-center transition hover:border-teal-400/70 hover:bg-slate-800/70"
          htmlFor="image"
        >
          <div className="icon-button">
            <ImageIcon className="h-8 w-8 text-teal-200" />
          </div>
          <span className="mt-3 flex items-center justify-center gap-2 font-semibold text-slate-200">
            Upload requirement image
            <InfoTooltip text="Upload the Task 1 chart, map, process, table, or diagram so the assistant can use the visual information." />
          </span>
          <span className="mt-1 block text-sm text-slate-500">
            Useful for Task 1 charts, maps, and diagrams
          </span>
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleChange}
        />
      </div>
      {previewImage && (
        <div className="relative h-[180px] rounded-lg border border-slate-700 bg-slate-900/70 p-3">
          <Image
            fill
            unoptimized
            alt="Uploaded prompt preview"
            className="object-contain p-3"
            src={previewImage}
          />
        </div>
      )}
    </div>
  );
}
