import { Metadata } from 'next';
import Improve from './components/Improve';

interface ImprovePageProps {
  searchParams: Promise<{
    task?: string | string[];
  }>;
}

export const metadata: Metadata = {
  title: 'IELTS Writing Buddy | Improving',
  description: 'Improving your IELTS Writing skills with AI-powered assistant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
};

export default async function ImprovementPage({
  searchParams,
}: ImprovePageProps) {
  const taskParam = (await searchParams).task;
  const task = Array.isArray(taskParam)
    ? taskParam[0] ?? 'task1'
    : taskParam ?? 'task1';

  return (
    <div>
      <Improve task={task} />
    </div>
  );
}
