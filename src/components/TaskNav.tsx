'use client';

import React, { useEffect } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/utils/helpers';

const FIRST_TASK = 'task1';
const SECOND_TASK = 'task2';

export default function TaskNav() {
  const router = useRouter();
  const pathname = usePathname();

  const [task, setTask] = React.useState<string>(FIRST_TASK);
  const searchParams = useSearchParams();
  const taskParam = searchParams.get('task') ?? FIRST_TASK;

  useEffect(() => {
    setTask(taskParam);
  }, [taskParam]);

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams();
    params.set('task', value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={() => handleValueChange(FIRST_TASK)}
        className={cn('nav__item', {
          'nav__item--active': task === FIRST_TASK,
        })}
      >
        Task 1
      </button>
      <button
        onClick={() => handleValueChange(SECOND_TASK)}
        className={cn('nav__item', {
          'nav__item--active': task === SECOND_TASK,
        })}
      >
        Task 2
      </button>
    </div>
  );
}
