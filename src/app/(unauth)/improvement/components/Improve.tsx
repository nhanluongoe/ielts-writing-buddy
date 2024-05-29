'use client';

import FirstTask from './FirstTask';
import SecondTask from './SecondTask';
import { useSearchParams } from 'next/navigation';

export default function Improve() {
  const searchParams = useSearchParams();
  const task = searchParams.get('task');

  if (task === 'task1') return <FirstTask />;
  return <SecondTask />;
}
