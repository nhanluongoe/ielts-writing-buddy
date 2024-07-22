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
      <h1 className="text-blue-300 text-3xl font-bold capitalize leading-10 my-2 text-center">
        Features
      </h1>

      <div className="flex justify-center items-center gap-8">
        {FEATURES.map((feature, index) => (
          <div
            key={index}
            className="flex gap-3 my-3 p-5 rounded-lg items-center flex-grow basis-0"
          >
            <span className="flex items-center justify-center p-6 text-4xl flex-shrink-0 rounded-full border-blue-500 bg-blue-500 border w-16  h-16 mx-3">
              {feature.icon}
            </span>
            <div>
              <h2 className="text-2xl text-blue-300 mb-2">{feature.title}</h2>
              <p className="text-gray-200">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
