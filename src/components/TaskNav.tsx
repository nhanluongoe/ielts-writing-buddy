'use client';

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/utils/helpers';

export default function TaskNav() {
  const [task, setTask] = React.useState<string>('task1');

  const router = useRouter();
  const pathname = usePathname();

  const handleValueChange = (value: string) => {
    const params = new URLSearchParams();
    params.set('task', value);
    router.push(`${pathname}?${params.toString()}`);
    setTask(value);
  };

  return (
    <div className="flex justify-center gap-3">
      <button
        onClick={() => handleValueChange('task1')}
        className={cn('nav__item', {
          'nav__item--active': task === 'task1',
        })}
      >
        Task 1
      </button>
      <button
        onClick={() => handleValueChange('task2')}
        className={cn('nav__item', {
          'nav__item--active': task === 'task2',
        })}
      >
        Task 2
      </button>
    </div>
  );
}
