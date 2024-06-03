import { Metadata } from 'next';
import React from 'react';
import Write from './components/Write';

export const metadata: Metadata = {
  title: 'Product Page',
  description: 'Description of the product page',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    // ... add more open graph meta tags
  },
};

export default function ImprovementPage() {
  return (
    <div>
      <Write />
    </div>
  );
}