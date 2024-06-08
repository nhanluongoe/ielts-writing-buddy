import Header from '@/components/Header';
import React from 'react';
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
    <div className="container mx-auto bg-white px-10 py-4 h-screen flex flex-col">
      <Header />

      <main className="flex-grow gap-24">
        <Hero />
        <Features />
      </main>

      <Footer />
    </div>
  );
}
