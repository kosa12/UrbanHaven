"use client";

const SkeletonCard = () => {
  return (
    <div className="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800 animate-pulse">
      {/* Image Placeholder */}
      <div className="relative w-full h-[300px] bg-gray-300 dark:bg-gray-700" />

      {/* Content Placeholder */}
      <div className="px-6 py-4">
        {/* Title Placeholder */}
        <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-4" />

        {/* Description Placeholder */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full" />
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6" />
        </div>
      </div>

      {/* Footer Placeholder */}
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-1/3" />
        <br />
        <span className="inline-block h-6 bg-gray-300 dark:bg-gray-700 rounded-full w-1/4 mt-2" />
      </div>
    </div>
  );
};

export default SkeletonCard;
