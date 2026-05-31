interface ParagraphLoadingSkeletonProps {
  lines?: number;
}

const DEFAULT_SKELETON_LINE_COUNT = 5;
const SKELETON_WIDTH_VARIATION_COUNT = 5;
const SKELETON_WIDTH_PERCENT_STEP = 20;

export default function ParagraphLoadingSkeleton({
  lines = DEFAULT_SKELETON_LINE_COUNT,
}: ParagraphLoadingSkeletonProps) {
  return (
    <div className="animate-pulse my-6">
      {[...Array(lines)].map((_, index) => {
        const width = `${
          ((index % SKELETON_WIDTH_VARIATION_COUNT) + 1) *
          SKELETON_WIDTH_PERCENT_STEP
        }%`;
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
