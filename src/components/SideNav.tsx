'use client';

import { cn } from '@/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="p-3">
      <ul>
        <li
          className={cn('nav__item', {
            'nav__item--active': pathname === '/improve',
          })}
        >
          <Link href="/improve">Improve</Link>
        </li>
        <li
          className={cn('nav__item', {
            'nav__item--active': pathname === '/write',
          })}
        >
          <Link href="/write">Write</Link>
        </li>
      </ul>
    </nav>
  );
}
