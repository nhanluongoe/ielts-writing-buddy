import Image from 'next/image';
import React from 'react';
import { GitHubLogoIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="my-5 flex justify-between items-center">
      <Link className="flex items-center" href="/">
        <Image
          src="/assets/images/logo.png"
          alt="IELTS Writing Buddy"
          width={100}
          height={100}
        />
        <h1 className="font-bold text-3xl bg-gradient-to-r from-red-500 to-blue-500 text-transparent bg-clip-text">
          IELTS Writing Buddy
        </h1>
      </Link>

      <div>
        <Link href="https://github.com/nhanluongoe/ielts-writing-buddy">
          <GitHubLogoIcon height={24} width={24} />
        </Link>
      </div>
    </header>
  );
}
