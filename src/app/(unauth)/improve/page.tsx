import { Metadata } from 'next';
import React from 'react';
import Improve from './components/Improve';
import { PageProps } from '.next/types/app/page';

export const metadata: Metadata = {
  title: 'IELTS Writing Buddy | Improving',
  description: 'Improving your IELTS Writing skills with AI-powered assistant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
};

export default function ImprovementPage({ searchParams }: PageProps) {
  const task = searchParams['task'] ?? 'task1';

  return (
    <div>
      <Improve task={task} />
    </div>
  );
}
