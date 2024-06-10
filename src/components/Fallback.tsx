import React from 'react';

export default function Fallback() {
  return (
    <div className="w-screen h-screen">
      <div className="flex items-center justify-center w-full h-full">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
          <div className="text-gray-900 text-2xl font-bold mt-4">
            Loading...
          </div>
        </div>
      </div>
    </div>
  );
}
