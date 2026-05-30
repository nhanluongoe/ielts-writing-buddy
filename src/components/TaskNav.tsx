'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { cn } from '@/utils/helpers';

const FIRST_TASK = 'task1';
const SECOND_TASK = 'task2';

export default function TaskNav() {
  const pathname = usePathname();

  const [task, setTask] = React.useState<string>(FIRST_TASK);
  const searchParams = useSearchParams();
  const taskParam = searchParams.get('task') ?? FIRST_TASK;

  useEffect(() => {
    setTask(taskParam);
  }, [taskParam]);

  return (
    <div className="flex justify-center">
      <Link
        href={`${pathname}?task=${FIRST_TASK}`}
        className={cn('tab tab__left', {
          'tab--active': task === FIRST_TASK,
        })}
      >
        Task 1
      </Link>
      <Link
        href={`${pathname}?task=${SECOND_TASK}`}
        className={cn('tab tab__right', {
          'tab--active': task === SECOND_TASK,
        })}
      >
        Task 2
      </Link>
    </div>
  );
}
