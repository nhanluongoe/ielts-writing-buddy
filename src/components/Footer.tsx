import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="my-5">
      <p className="text-center text-gray-400">
        Built by{' '}
        <Link href="https://nhanluong.dev" className="font-bold text-blue-400">
          Nhan Luong
        </Link>
      </p>
    </footer>
  );
}
