import '@/styles/global.css';
import ClientToaster from '@/components/ClientToaster';
import { ApiKeyProvider } from '@/contexts/ApiKeyContext';
import { cn } from '@/utils/helpers';
import type { Metadata } from 'next';

import { Roboto } from 'next/font/google';
import type { ReactNode } from 'react';

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
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(roboto.className)} suppressHydrationWarning>
        <ClientToaster />
        <ApiKeyProvider>
          <div id="root">{children}</div>
        </ApiKeyProvider>
      </body>
    </html>
  );
}
