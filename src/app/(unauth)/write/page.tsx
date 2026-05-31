import { Metadata } from 'next';
import Write from './components/Write';

interface WritePageProps {
  searchParams: Promise<{
    task?: string | string[];
  }>;
}

const DEFAULT_TASK = 'task1';
const FIRST_QUERY_PARAM_VALUE_INDEX = 0;

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
    ? taskParam[FIRST_QUERY_PARAM_VALUE_INDEX] ?? DEFAULT_TASK
    : taskParam ?? DEFAULT_TASK;

  return (
    <div>
      <Write task={task} />
    </div>
  );
}
