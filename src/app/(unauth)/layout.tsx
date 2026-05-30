import Fallback from '@/components/Fallback';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import TaskNav from '@/components/TaskNav';
import type { Metadata } from 'next';
import { Suspense } from 'react';
import ApiKeyWarningBanner from '@/components/ApiKeyWarningBanner';

export const metadata: Metadata = {
  title: 'IELTS Writing Buddy',
  description: 'Write and improve IELTS Writing answers with AI feedback',
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
    <Suspense fallback={Fallback()}>
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
        <Header />
        <main className="flex-grow rounded-lg border border-slate-800/90 bg-slate-950/35 p-3 shadow-2xl shadow-black/20 sm:p-4">
          <ApiKeyWarningBanner
            hasServerApiKey={Boolean(process.env.GEMINI_API_KEY)}
          />
          <TaskNav />
          <div className="mt-4 flex w-full flex-col gap-4 lg:flex-row">
            <SideNav />
            <div className="min-w-0 flex-grow">{children}</div>
          </div>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}
