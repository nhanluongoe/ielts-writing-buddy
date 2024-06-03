import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="my-5">
      <p className="text-center">
        Built with 🤞🏼 by{' '}
        <Link href="https://nhanluong.dev" className="text-blue-500">
          Nhan Luong
        </Link>
      </p>
    </footer>
  );
}
