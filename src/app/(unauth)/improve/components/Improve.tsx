'use client';

import FirstTask from './FirstTask';
import SecondTask from './SecondTask';
import { useSearchParams } from 'next/navigation';

const taskComponentMapping: Record<string, React.ComponentType> = {
  task1: FirstTask,
  task2: SecondTask,
};

export default function Improve() {
  const searchParams = useSearchParams();
  const task = searchParams.get('task') ?? 'task1';
  const TaskComponent = taskComponentMapping[task] ?? FirstTask;

  return <TaskComponent />;
}
