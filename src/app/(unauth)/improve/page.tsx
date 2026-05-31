import { Metadata } from 'next';
import Improve from './components/Improve';

interface ImprovePageProps {
  searchParams: Promise<{
    task?: string | string[];
  }>;
}

const DEFAULT_TASK = 'task1';
const FIRST_QUERY_PARAM_VALUE_INDEX = 0;

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
    ? taskParam[FIRST_QUERY_PARAM_VALUE_INDEX] ?? DEFAULT_TASK
    : taskParam ?? DEFAULT_TASK;

  return (
    <div>
      <Improve task={task} />
    </div>
  );
}
