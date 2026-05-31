import Link from 'next/link';
import { GitHubLogoIcon } from '@radix-ui/react-icons';

export default function Footer() {
  return (
    <footer className="py-6">
      <div className="flex flex-col items-center justify-center gap-3 text-sm text-slate-500 sm:flex-row">
        <p>
          Built by{' '}
          <Link
            href="https://nhanluong.dev"
            className="font-bold text-teal-300"
          >
            Nhan Luong
          </Link>
        </p>
        <span className="hidden h-1 w-1 rounded-full bg-slate-700 sm:block" />
        <Link
          className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-semibold text-slate-400 transition hover:bg-slate-800 hover:text-white"
          href="https://github.com/nhanluongoe/ielts-writing-buddy"
        >
          <GitHubLogoIcon height={16} width={16} />
          GitHub
        </Link>
      </div>
    </footer>
  );
}
