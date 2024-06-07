import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const HERO_IMAGE_SCALE = 2;

export default function Hero() {
  return (
    <div className="flex items-start justify-between">
      <div className="flex flex-col my-auto">
        <div className="my-5">
          <h1 className="text-blue-500 text-3xl font-bold capitalize leading-10 my-2">
            Boost your IELTS Writing score <br /> with AI-powered assistant
          </h1>
          <p className="text-gray-500">
            Let the assistant write a sample for you or get instant feedback on
            your writing and improve your score
          </p>
        </div>
        <div>
          <Link href="/improve">
            <button className="button--primary">Get Started</button>
          </Link>
        </div>
      </div>
      <Image
        className="rounded-full"
        src="/assets/images/hero-image.png"
        alt="hero-image"
        width={HERO_IMAGE_SCALE * 300}
        height={HERO_IMAGE_SCALE * 200}
      />
    </div>
  );
}
