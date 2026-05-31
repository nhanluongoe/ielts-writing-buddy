interface ParagraphLoadingSkeletonProps {
  lines?: number;
}

export default function ParagraphLoadingSkeleton({
  lines = 5,
}: ParagraphLoadingSkeletonProps) {
  return (
    <div className="animate-pulse my-6">
      {[...Array(lines)].map((_, index) => {
        const width = `${((index % 5) + 1) * 20}%`;
        return (
          <div
            key={index}
            className={`bg-gray-400 h-4 mb-2 rounded-lg`}
            style={{ width }}
          ></div>
        );
      })}
    </div>
  );
}
