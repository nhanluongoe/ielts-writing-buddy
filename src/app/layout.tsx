import '@/styles/global.css';
import { cn } from '@/utils/helpers';
import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // ... add more open graph meta tags
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className, 'bg-gray-50')}>{children}</body>
    </html>
  );
}
