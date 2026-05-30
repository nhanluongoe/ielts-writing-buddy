import React from 'react';
import Link from 'next/link';
import ApiKeySettings from './ApiKeySettings';

export default function Header() {
  return (
    <header className="flex items-center justify-between py-4">
      <Link className="group flex items-center gap-3" href="/">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-teal-400 text-lg font-black text-slate-950 shadow-lg shadow-teal-950/40">
          W
        </span>
        <span>
          <span className="block text-lg font-bold text-white sm:text-2xl">
            IELTS Writing Buddy
          </span>
          <span className="hidden text-sm text-slate-400 sm:block">
            Practice, feedback, and sample answers
          </span>
        </span>
      </Link>

      <div className="flex items-center gap-2">
        <Link
          href="/write"
          className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white sm:inline-flex"
        >
          Write
        </Link>
        <Link
          href="/improve"
          className="hidden rounded-lg px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-slate-800 hover:text-white sm:inline-flex"
        >
          Improve
        </Link>
        <ApiKeySettings />
      </div>
    </header>
  );
}
