import Link from 'next/link';
import React from 'react';

export default function Footer() {
  return (
    <footer className="py-6">
      <p className="text-center text-sm text-slate-500">
        Built by{' '}
        <Link href="https://nhanluong.dev" className="font-bold text-teal-300">
          Nhan Luong
        </Link>
      </p>
    </footer>
  );
}
