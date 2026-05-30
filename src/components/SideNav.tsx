'use client';

import { cn } from '@/utils/helpers';
import { MagicWandIcon, Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { icon: MagicWandIcon, path: '/improve', name: 'Improve' },
  { icon: Pencil2Icon, path: '/write', name: 'Write' },
];

export default function SideNav() {
  const pathname = usePathname();

  return (
    <nav className="flex-shrink-0 lg:w-36">
      <ul className="grid grid-cols-2 gap-2 lg:grid-cols-1 lg:gap-1.5">
        {navItems.map((item) => (
          <Link
            href={item.path}
            key={item.path}
            className={cn('nav__item', {
              'nav__item--active': pathname === item.path,
            })}
          >
            <span className="nav__item-icon">
              <item.icon className="h-4 w-4" />
            </span>
            <span>{item.name}</span>
          </Link>
        ))}
      </ul>
    </nav>
  );
}
