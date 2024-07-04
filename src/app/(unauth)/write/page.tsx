import { Metadata } from 'next';
import React from 'react';
import Write from './components/Write';
import { PageProps } from '.next/types/app/page';

export const metadata: Metadata = {
  title: 'IELTS Writing Buddy | Write',
  description:
    'Get feedback on your IELTS Writing tasks with AI-powered assistant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
};

export default function ImprovementPage({ searchParams }: PageProps) {
  const task = searchParams['task'] ?? 'task1';

  return (
    <div>
      <Write task={task} />
    </div>
  );
}
