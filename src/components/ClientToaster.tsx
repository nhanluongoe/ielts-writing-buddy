'use client';

import dynamic from 'next/dynamic';

const Toaster = dynamic(
  () => import('react-stacked-toast').then((module) => module.Toaster),
  { ssr: false }
);

export default function ClientToaster() {
  return <Toaster position="center" />;
}
