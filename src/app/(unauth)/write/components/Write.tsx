'use client';

import FirstTask from './FirstTask';
import SecondTask from './SecondTask';

interface ImproveProps {
  task: string;
}

const taskComponentMapping: Record<string, React.ComponentType> = {
  task1: FirstTask,
  task2: SecondTask,
};

export default function Write(props: ImproveProps) {
  const { task } = props;
  const TaskComponent = taskComponentMapping[task] ?? FirstTask;

  return <TaskComponent />;
}
