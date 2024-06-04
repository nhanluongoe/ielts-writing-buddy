import React from 'react';

interface ParagraphLoadingSkeletonProps {
  lines?: number;
}

export default function ParagraphLoadingSkeleton({
  lines = 5,
}: ParagraphLoadingSkeletonProps) {
  return (
    <div className="animate-pulse my-6">
      {[...Array(lines)].map((_, index) => {
        const randomWidth = Math.floor(Math.random() * 5) + 1;
        return (
          <div
            key={index}
            className={`bg-gray-400 h-4 mb-2 rounded-lg`}
            style={{ width: `${randomWidth * 20}%` }}
          ></div>
        );
      })}
    </div>
  );
}
