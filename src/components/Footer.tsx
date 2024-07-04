import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="my-5">
      <p className="text-center text-white">
        Built by{' '}
        <Link href="https://nhanluong.dev" className="font-bold">
          Nhan Luong
        </Link>
      </p>
    </footer>
  );
}
