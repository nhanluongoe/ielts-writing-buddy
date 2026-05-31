import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'IELTS Writing Buddy',
  description: 'Boost your IELTS Writing score with AI-powered assistant',
  openGraph: {
    type: 'website',
    locale: 'en_US',
  },
};

export default function IndexPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:px-8">
      <Header />

      <main className="flex-grow">
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  );
}
