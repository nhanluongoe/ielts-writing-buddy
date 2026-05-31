import { twMerge } from 'tailwind-merge';
import { type ClassValue, clsx } from 'clsx';

const LOCAL_DEVELOPMENT_PORT = 3000;

export const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return `http://localhost:${LOCAL_DEVELOPMENT_PORT}`;
};

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
