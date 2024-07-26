import React from 'react';

export default function Fallback() {
  return (
    <div className="w-screen h-screen">
      <div className="flex justify-center items-center h-full w-full">
        <div className="text-5xl font-bold text-gray-400">Loading...</div>
      </div>
    </div>
  );
}
