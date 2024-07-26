import { cn } from '@/utils/helpers';
import { ImageIcon } from '@radix-ui/react-icons';
import { FieldApi } from '@tanstack/react-form';
import { ChangeEvent, useState } from 'react';

interface UploadImageButtonProps {
  field: FieldApi<any, any, any, any, any>;
  onUpload?: (base64Data: string) => void;
}

export default function UploadImageButton(props: UploadImageButtonProps) {
  const { field, onUpload } = props;

  const [previewImage, setPreviewImage] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
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
    <div className="my-3">
      <div
        className={cn('form-field rounded-full', {
          hidden: !!previewImage,
        })}
      >
        <label
          className="flex flex-col justify-center items-center bg-[#2B2F36] rounded-full p-6 mx-auto cursor-pointer"
          htmlFor="image"
        >
          <div className="icon-button bg-[#2B2F36]">
            <ImageIcon className="text-gray-300 w-[40px] h-[40px]" />
          </div>
          <span className="block mt-1 text-gray-300">Upload Image</span>
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
        <div className="h-[140px]">
          <img
            alt="preview-image"
            className="h-full w-full object-contain"
            src={previewImage}
          />
        </div>
      )}
    </div>
  );
}
