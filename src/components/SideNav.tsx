'use client';

import { cn } from '@/utils/helpers';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { icon: '🧑🏼‍🏫', path: '/improve', name: 'Improve' },
  { icon: '✍🏼', path: '/write', name: 'Write' },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="p-3 flex-shrink-0">
      <ul>
        {navItems.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className={cn('nav__item block', {
              'nav__item--active': pathname === item.path,
            })}
          >
            <i className="mr-2">{item.icon}</i>
            {item.name}
          </Link>
        ))}
      </ul>
    </nav>
  );
}
