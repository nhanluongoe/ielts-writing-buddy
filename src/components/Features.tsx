import React from 'react';

interface Feature {
  icon: string;
  title: string;
  desc: string;
}

const FEATURES: Feature[] = [
  {
    icon: '📝',
    title: 'Write',
    desc: 'Just input the requirement and the assistant will write a sample for you based on the requirements.',
  },
  {
    icon: '🪄',
    title: 'Improve',
    desc: 'You can write your own answer and the assistant will provide feedback and suggestions to help you improve your score.',
  },
];

export default function Features() {
  return (
    <div className="">
      <h1 className="text-blue-500 text-3xl font-bold capitalize leading-10 my-2 text-center">
        Features
      </h1>

      <div className="flex justify-center items-center gap-8">
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="flex gap-3 my-3 bg-gradient-to-r from-blue-100 to-purple-100 p-5 rounded-lg items-center flex-grow"
          >
            <span className="flex items-center justify-center p-3 text-4xl flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 w-16  h-16">
              {feature.icon}
            </span>
            <div>
              <h2 className="text-2xl">{feature.title}</h2>
              <p className="text-gray-500">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
