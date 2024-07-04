import React from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="my-5 flex justify-between items-center">
      <Link className="flex items-center" href="/">
        <h1 className="font-bold text-3xl text-white">IELTS Writing Buddy</h1>
      </Link>

      <div>
        <Link href="https://github.com/nhanluongoe/ielts-writing-buddy">
          <GitHubLogoIcon height={24} width={24} color="white" />
        </Link>
      </div>
    </header>
  );
}
