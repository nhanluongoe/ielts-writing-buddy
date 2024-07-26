import Link from 'next/link';
import React from 'react';

interface Feature {
  icon: string;
  title: string;
  desc: string;
  href: string;
}

const FEATURES: Feature[] = [
  {
    icon: '✍🏼',
    title: 'Write',
    desc: 'Just input the requirement and the assistant will write a sample for you based on the requirements.',
    href: '/write',
  },
  {
    icon: '🧑🏼‍🏫',
    title: 'Improve',
    desc: 'You can write your own answer and the assistant will provide feedback and suggestions to help you improve your score.',
    href: '/improve',
  },
];

export default function Features() {
  return (
    <div className="my-12">
      <h1 className="text-blue-300 text-3xl font-bold capitalize leading-10 my-2 text-center">
        Features
      </h1>

      <div className="flex justify-center items-center gap-8">
        {FEATURES.map((feature, index) => (
          <Link
            href={feature.href}
            key={index}
            className="flex gap-3 my-3 p-5 rounded-lg items-center flex-grow basis-0 bg-[#202127] hover:border-blue-300 border border-transparent"
          >
            <span className="flex items-center justify-center p-6 text-4xl flex-shrink-0 rounded-full bg-[#2B2F36] w-16  h-16 mx-3">
              {feature.icon}
            </span>
            <div>
              <h2 className="text-2xl text-blue-300 mb-2">{feature.title}</h2>
              <p className="text-gray-400">{feature.desc}</p>
              <p className="text-link mt-3">Learn more →</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
