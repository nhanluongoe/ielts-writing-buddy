'use client';

import { cn } from '@/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { path: '/improve', name: 'Improve' },
  { path: '/write', name: 'Write' },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="p-3">
      <ul>
        {navItems.map((item) => (
          <li
            key={item.path}
            className={cn('nav__item', {
              'nav__item--active': pathname === item.path,
            })}
          >
            <Link href={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
