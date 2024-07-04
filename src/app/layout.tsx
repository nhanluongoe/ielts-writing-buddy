import '@/styles/global.css';
import { cn } from '@/utils/helpers';
import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';
import { Toaster } from 'react-stacked-toast';

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'IELTS Writing Buddy',
  description: 'Your AI-powered IELTS Writing assistant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, 'bg-[#0f172a]')}>
        <Toaster position="center" />
        <div id="root">{children}</div>
      </body>
    </html>
  );
}
