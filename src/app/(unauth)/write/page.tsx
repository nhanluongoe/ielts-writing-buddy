import { Metadata } from 'next';
import Write from './components/Write';

interface WritePageProps {
  searchParams: Promise<{
    task?: string | string[];
  }>;
}

export const metadata: Metadata = {
  title: 'IELTS Writing Buddy | Write',
  description:
    'Get feedback on your IELTS Writing tasks with AI-powered assistant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
};

export default async function ImprovementPage({
  searchParams,
}: WritePageProps) {
  const taskParam = (await searchParams).task;
  const task = Array.isArray(taskParam)
    ? taskParam[0] ?? 'task1'
    : taskParam ?? 'task1';

  return (
    <div>
      <Write task={task} />
    </div>
  );
}
